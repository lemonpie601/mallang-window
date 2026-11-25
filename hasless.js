// ──────────────────────────────────────────────────────────────
// Marinara Desktop — :has() without :has().
// Chromium re-checks a stylesheet's :has() rules on every node inserted
// anywhere on the page. Measured on Marinara 2.5.2 with this theme: each
// insertion (a keystroke's counter, a streamed token, the clock) restyled
// the whole page for ~100 ms; without the rules below it took ~4 ms.
//   1. The theme's own rules use data-mh-* attributes instead. This file
//      sets them: each attribute marks the element a former :has() rule
//      matched, re-derived after every batch of DOM changes (same
//      microtask, so nothing paints unstyled).
//   2. Four of Marinara's own rules cost the same alone; they are taken out
//      of its stylesheet while the theme runs and put back on cleanup:
//      the sprite-library drag hover tint (a :has() over every element)
//      and the phone-keyboard companion layout (phones only; kept there).
// ponytail: matched by rule text; if Marinara renames those rules they
// simply stay (slower, not broken). Upgrade path: fix them upstream.
// manifest.json loads it before desktop.js, which ends with `return`.
// ──────────────────────────────────────────────────────────────
(() => {
  "use strict";
  // [attribute, element inside, element to mark] — the old rule was
  // `mark:has(inside)` (a function marks a specific ancestor).
  const parent = (el) => el.parentElement;
  const up = (sel) => (el) => el.parentElement?.closest(sel) || null;
  const TAGS = [
    ["data-mh-composer", "textarea[data-chat-composer]", parent],
    ["data-mh-actions", ".mari-chat-mode-action", parent],
    ["data-mh-current", ".mari-chrome-accent-progress", parent],
    ["data-mh-link", "svg.lucide-link", up('[aria-haspopup="dialog"]')],
    ["data-mh-nav", ".mari-editor-header--with-nav", parent],
    ["data-mh-send", "svg.lucide-send, svg.lucide-send-horizontal", up("button")],
    ["data-mh-tabs", "[data-chat-mode-tab]", parent],
    ["data-mh-duo", '[data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child > :nth-child(2) img', up('[data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child')],
    ["data-mh-big", ".mlh-cr-big", up(".mlh-crcard")],
    ["data-mh-name", ".mari-message-name", parent],
    ["data-mh-x", ".lucide-x", up("button")],
    ["data-mh-chars", '[data-drag-kind="character"]', parent],
    ["data-mh-personas", '[data-drag-kind="persona"]', parent],
    ["data-mh-field", "input.mari-chrome-field", parent],
    ["data-mh-folderplus", "svg.lucide-folder-plus", up("button")],
    ["data-mh-img", "span.pointer-events-none.absolute > img", parent],
    ["data-mh-folded", "button.marinara-chat-input-shell", parent],
    ["data-mh-chosen", '.mari-connection-model-choice[aria-current="true"]', up(".mari-connection-model")],
    ["data-mh-warn", ".mari-connection-pill--warn", up("[data-connection-role]")],
    ["data-mh-provider", ".mari-provider-icon", parent],
    ["data-mh-dialogbtn", 'button[aria-haspopup="dialog"]', parent],
  ];
  const marked = TAGS.map(() => new Set());

  function retag() {
    TAGS.forEach(([attr, inside, markOf], i) => {
      const now = new Set();
      for (const el of document.querySelectorAll(inside)) {
        const target = markOf(el);
        if (target) now.add(target);
      }
      for (const el of marked[i]) if (!now.has(el)) el.removeAttribute(attr);
      for (const el of now) if (!marked[i].has(el)) el.setAttribute(attr, "");
      marked[i] = now;
    });
  }

  // Only structure, classes and aria-current decide the marks; text-only
  // changes (a streaming reply's words) skip the re-tag.
  const observer = new MutationObserver((records) => {
    if (records.some((r) => r.type === "attributes" || [...r.addedNodes, ...r.removedNodes].some((n) => n.nodeType === 1))) retag();
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "aria-current"] });
  retag();

  // Marinara's own heavy rules (see the header). Phones keep the keyboard one.
  const touch = matchMedia("(hover: none) and (pointer: coarse)").matches;
  const HEAVY = [(t) => t.includes("group-has-") && t.includes("sprite-library") && t.includes(":has("), (t) => !touch && t.includes("mari-companion-panel") && t.includes(":has(")];
  const taken = []; // [group, index, text] in removal order
  function takeHeavy() {
    const sheet = [...document.styleSheets].find((s) => /\/assets\/client-[^/]*\.css/.test(s.href || ""));
    if (!sheet) return;
    const walk = (group) => {
      let rules;
      try {
        rules = group.cssRules;
      } catch {
        return;
      }
      for (let i = rules.length - 1; i >= 0; i--) {
        const rule = rules[i];
        if (rule.cssRules && !rule.selectorText) walk(rule);
        else if (HEAVY.some((test) => test(rule.cssText))) {
          taken.push([group, i, rule.cssText]);
          group.deleteRule(i);
        }
      }
    };
    walk(sheet);
  }
  takeHeavy();

  marinara.onCleanup(() => {
    observer.disconnect();
    TAGS.forEach(([attr], i) => {
      for (const el of marked[i]) el.removeAttribute(attr);
    });
    // Put Marinara's rules back where they were (reverse of removal).
    for (const [group, i, text] of taken.reverse()) {
      try {
        group.insertRule(text, i);
      } catch {
        /* stylesheet replaced meanwhile */
      }
    }
  });
})();
