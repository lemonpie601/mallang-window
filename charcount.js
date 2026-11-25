// ──────────────────────────────────────────────────────────────
// Marinara Desktop — character count under messages and the composer.
// From the "글자 수 표시 · RP & Convo" 0.1.1 extension: characters,
// characters without spaces (공미포) and words, counted from the text on
// screen (no AI call, no network). Changes for this theme:
//   - looks like the token receipt's rows (styles.js, .mcc-meter);
//   - mutation records only mark work; the page is read once per flush;
//   - typing is recounted after 60 ms, a streaming reply at most every
//     300 ms, and nothing runs while the tab is hidden.
// It shares the standalone extension's key, so only one of the two runs.
// manifest.json loads it before desktop.js, which ends with `return`.
// ──────────────────────────────────────────────────────────────
(() => {
  "use strict";
  const KEY = Symbol.for("marinara.character-count.v1");
  if (typeof window[KEY] === "function") window[KEY]();

  const KO = /^ko/i.test(document.documentElement.lang || navigator.language || "");
  const T = KO
    ? { message: "본문", composer: "입력", editor: "수정", solid: "공미포", words: "단어" }
    : { message: "Text", composer: "Input", editor: "Edit", solid: "No spaces", words: "Words" };
  const MESSAGE = "[data-message-id], [data-vn-message-id]";
  const INPUT = "textarea[data-chat-composer], textarea[data-chat-message-editor]";
  const WATCHED = `${MESSAGE}, ${INPUT}`;
  const OWN = "[data-mcc-owned]";
  const SKIP = [
    OWN, "script", "style", "noscript", "template", "svg", "iframe",
    "button", "input", "textarea", "select", "audio", "video", "img",
    "[hidden]", '[aria-hidden="true"]', ".sr-only", ".translation-text",
    ".mari-message-meta", ".mari-message-name", ".mari-message-timestamp",
    ".mari-message-reactions-row", ".mari-pending-typing-dots", ".mari-message-typing",
  ].join(",");
  const BLOCK = /^(P|DIV|LI|UL|OL|PRE|BLOCKQUOTE|H[1-6]|TR|SECTION|ARTICLE)$/;
  const TYPING = 60;
  const SETTLE = 300;
  const segmenter = typeof Intl.Segmenter === "function" ? new Intl.Segmenter(KO ? "ko" : undefined, { granularity: "grapheme" }) : null;
  const number = new Intl.NumberFormat(KO ? "ko-KR" : undefined);
  const messages = new Map(); // message root → { meter, text, label, sig }
  const inputs = new Map(); // textarea → { meter, text, label }
  const dirty = new Set();
  const added = new Set([document.body]);
  const revealed = new Set(); // ancestors whose class/style changed: check visibility only
  let recheckAll = false;
  let stopped = false;
  let timer = null;
  let due = 0;

  function count(text) {
    const source = text.replace(/\r\n?/g, "\n");
    let all = 0;
    let solid = 0;
    for (const unit of segmenter ? segmenter.segment(source) : source) {
      all++;
      if (!/^\s+$/u.test(segmenter ? unit.segment : unit)) solid++;
    }
    // Words: whitespace-separated chunks with a letter or digit (Korean 어절, English words).
    const words = (source.match(/\S+/gu) || []).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    return { all, solid, words };
  }

  const visible = (el) =>
    el.isConnected && el.getClientRects().length > 0 && !el.closest('[hidden], [aria-hidden="true"]') && getComputedStyle(el).visibility !== "hidden";

  // Rendered text only: block boundaries become one newline; soft wraps,
  // Markdown syntax, image alt text and controls are not counted.
  function readText(root) {
    let out = "";
    const boundary = () => {
      if (out && !out.endsWith("\n")) out += "\n";
    };
    const visit = (node, space) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const raw = node.nodeValue || "";
        out += /^(pre|pre-wrap|break-spaces)$/.test(space) ? raw : space === "pre-line" ? raw.replace(/[\t\f\r ]+/g, " ") : raw.replace(/\s+/gu, " ");
        return;
      }
      if (!(node instanceof Element) || node.matches(SKIP)) return;
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse") return;
      if (node.tagName === "BR") {
        out += "\n";
        return;
      }
      const block = node !== root && BLOCK.test(node.tagName);
      if (block) boundary();
      for (const child of node.childNodes) visit(child, style.whiteSpace);
      if (block) boundary();
    };
    visit(root, getComputedStyle(root).whiteSpace);
    return out.replace(/^\n+|\n+$/g, "");
  }

  // <div class="mcc-meter"><span><i>입력</i><b>0</b></span> × 3</div>
  function makeMeter(kind) {
    const meter = document.createElement("div");
    meter.dataset.mccOwned = kind;
    meter.className = `mcc-meter mcc-${kind}`;
    meter.setAttribute("role", "note");
    meter.setAttribute("data-no-message-quick-edit", "true");
    meter.dir = "ltr";
    // Each label and number is one text node made here and later only
    // given new .data: replacing text (textContent) inserts a node, and on
    // Marinara's stylesheet every insertion restyles the whole page (~100 ms
    // per keystroke); changing a text node's data costs about 1 ms.
    for (let i = 0; i < 3; i++) {
      const item = document.createElement("span");
      const name = document.createElement("i");
      const value = document.createElement("b");
      name.append(document.createTextNode(""));
      value.append(document.createTextNode(""));
      item.append(name, value);
      meter.append(item);
    }
    return meter;
  }

  function paint(record, text, label) {
    if (record.text === text && record.label === label) return;
    record.text = text;
    record.label = label;
    const n = count(text);
    const cells = [
      [label, number.format(n.all)],
      [T.solid, number.format(n.solid)],
      [T.words, number.format(n.words)],
    ];
    cells.forEach(([name, value], i) => {
      const [nameEl, valueEl] = record.meter.children[i].children;
      if (nameEl.firstChild.data !== name) nameEl.firstChild.data = name;
      if (valueEl.firstChild.data !== value) valueEl.firstChild.data = value;
    });
    const detail = KO
      ? `${label}: 공백 포함 ${cells[0][1]}자, 공백 제외 ${cells[1][1]}자, 단어 ${cells[2][1]}개(띄어쓰기 기준)`
      : `${label}: ${cells[0][1]} characters, ${cells[1][1]} without spaces, ${cells[2][1]} words`;
    record.meter.title = detail;
    record.meter.setAttribute("aria-label", detail);
  }

  function bodyParts(root) {
    if (root.querySelector("textarea[data-chat-message-editor]")) return [];
    let candidates = [...root.querySelectorAll(".mari-message-content")];
    // The grouped conversation renderer has no .mari-message-content.
    if (root.matches('[data-component="ConversationMessage.Grouped"]')) {
      candidates = candidates.concat([...root.querySelectorAll(".break-words.whitespace-pre-wrap")]);
    }
    return candidates.filter(
      (part, i) =>
        candidates.indexOf(part) === i &&
        part.closest(MESSAGE) === root &&
        !part.closest(".translation-text") &&
        !candidates.some((other) => other !== part && other.contains(part)) &&
        visible(part),
    );
  }

  // A cheap "did the text change" mark: length plus both ends.
  const signature = (root) => {
    const text = root.textContent || "";
    return `${text.length}:${text.slice(0, 16)}:${text.slice(-16)}`;
  };

  function updateMessage(root) {
    const record = messages.get(root);
    if (!record) return;
    const parts = visible(root) ? bodyParts(root) : [];
    if (!parts.length) {
      record.meter.remove();
      record.sig = signature(root);
      return;
    }
    paint(record, parts.map(readText).filter(Boolean).join("\n"), T.message);
    // The translation extension (번역 프리셋·단어장 1.6) keeps its view right
    // after the body; sit after it so the two don't keep swapping places.
    let anchor = parts[parts.length - 1];
    while (anchor.nextElementSibling?.classList.contains("ptx-view")) anchor = anchor.nextElementSibling;
    if (anchor.nextSibling !== record.meter) anchor.after(record.meter);
    record.sig = signature(root);
  }

  function updateInput(input) {
    const record = inputs.get(input);
    if (!visible(input)) return record.meter.remove();
    const composer = input.hasAttribute("data-chat-composer");
    const anchor = composer ? input.closest("[data-chat-resource-drop-exclude]") || input : input;
    paint(record, input.value, composer ? T.composer : T.editor);
    if (anchor.nextSibling !== record.meter) anchor.after(record.meter);
  }

  // New messages and inputs get a meter; known messages are recounted only
  // when their meter is missing (hidden → shown) or, with checkText, when
  // their text changed.
  function scan(node, checkText) {
    if (!(node instanceof Element) || !node.isConnected || node.closest(OWN)) return;
    const found = node.matches(WATCHED) ? [node, ...node.querySelectorAll(WATCHED)] : node.querySelectorAll(WATCHED);
    for (const el of found) {
      if (el.matches(INPUT)) {
        if (!inputs.has(el)) inputs.set(el, { meter: makeMeter("input") });
        continue;
      }
      const record = messages.get(el);
      if (!record) {
        messages.set(el, { meter: makeMeter("message") });
        dirty.add(el);
      } else if (checkText === null || !record.meter.isConnected || (checkText && record.sig !== signature(el))) dirty.add(el);
    }
  }

  const observerOptions = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class", "style", "hidden", "aria-hidden", "data-message-id", "data-vn-message-id"],
  };
  // The callback only sorts records into sets; the DOM is read in flush().
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      const el = record.target instanceof Element ? record.target : record.target.parentElement;
      if (!el || el.closest(OWN)) continue;
      const root = el.closest(MESSAGE);
      if (root) dirty.add(root);
      if (record.type === "childList") {
        for (const node of record.addedNodes) if (node instanceof Element && !node.matches(OWN)) added.add(node);
      } else if (record.type === "attributes" && !root) revealed.add(el);
    }
    schedule(SETTLE);
  });

  function flush() {
    timer = null;
    if (stopped) return;
    if (document.hidden) {
      recheckAll = true;
      return;
    }
    observer.disconnect();
    try {
      for (const node of added) scan(node, null);
      added.clear();
      for (const node of revealed) scan(node, false);
      revealed.clear();
      if (recheckAll) {
        recheckAll = false;
        scan(document.body, true);
      }
      for (const [root, record] of messages) {
        if (!root.isConnected) {
          record.meter.remove();
          messages.delete(root);
          dirty.delete(root);
        }
      }
      for (const [input, record] of inputs) {
        if (input.isConnected) updateInput(input);
        else {
          record.meter.remove();
          inputs.delete(input);
        }
      }
      for (const root of dirty) updateMessage(root);
      dirty.clear();
    } finally {
      if (!stopped) observer.observe(document.body, observerOptions);
    }
  }

  // The earliest request wins: typing (60 ms) overtakes a pending 300 ms flush.
  function schedule(delay) {
    if (stopped) return;
    const at = performance.now() + delay;
    if (timer !== null) {
      if (due <= at) return;
      marinara.clearTimeout(timer);
    }
    due = at;
    timer = marinara.setTimeout(flush, delay);
  }
  const onInput = (event) => {
    if (event.target instanceof Element && event.target.matches(INPUT)) {
      added.add(event.target);
      schedule(TYPING);
    }
  };
  const onVisibility = () => {
    if (document.hidden) return;
    recheckAll = true;
    schedule(TYPING);
  };

  document.addEventListener("input", onInput, true);
  document.addEventListener("compositionend", onInput, true);
  document.addEventListener("visibilitychange", onVisibility);
  // Marinara clears or restores the composer without an input event, so the
  // tracked inputs are compared every 400 ms (a string compare, no counting).
  const poll = marinara.setInterval(() => {
    if (document.hidden || stopped) return;
    for (const [input, record] of inputs) {
      if (!input.isConnected || record.text !== input.value) return schedule(TYPING);
    }
  }, 400);

  function cleanup() {
    if (stopped) return;
    stopped = true;
    observer.disconnect();
    if (timer !== null) marinara.clearTimeout(timer);
    marinara.clearInterval(poll);
    document.removeEventListener("input", onInput, true);
    document.removeEventListener("compositionend", onInput, true);
    document.removeEventListener("visibilitychange", onVisibility);
    for (const record of [...messages.values(), ...inputs.values()]) record.meter.remove();
    messages.clear();
    inputs.clear();
    dirty.clear();
    added.clear();
    revealed.clear();
    if (window[KEY] === cleanup) delete window[KEY];
  }
  window[KEY] = cleanup;
  marinara.onCleanup(cleanup);
  flush();
})();
