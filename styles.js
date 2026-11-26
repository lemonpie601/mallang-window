// Marinara Desktop — the last stylesheets (apps, touch, sheets).
//
// Marinara caps an extension's CSS at 256 KiB: the manifest's cssPath files
// are joined and checked on import ("Validation Error" past the cap). These
// two stylesheets therefore ship inside this script. manifest.json lists it
// first in jsPaths, so MDOS_LATE_CSS is defined before desktop.js runs, and
// desktop.js puts it in a <style> after the manifest CSS, keeping the old
// order (desktop, theme, layout, home, then apps, touch).
// Edit the CSS here as plain CSS: it is a String.raw template, so it must not
// contain a backtick or a dollar sign followed by a brace.
const MDOS_LATE_CSS = [
  String.raw`/* ══════════════ apps.css ══════════════ */
/* ──────────────────────────────────────────────────────────────
   Marinara Desktop — chat screens modelled on desktop apps.

   Conversation (data-mdos-convo="messages"): a messaging app —
     your messages on the right in accent bubbles, the character's on
     the left in grey bubbles with a small round avatar, a translucent
     centred header and quiet date dividers.

   Roleplay (data-mdos-rp="book" | "night"): a reading view — a sepia
     (or light / dark) page, Pretendard text in a centred column, the name
     as a quiet label, your turns as a soft card, message buttons on hover
     and a rounded composer card. Narrow windows tighten the margins.

   Every look can be changed in Customize → Chat design. Those choices
   arrive as variables on <html> (--mdos-cv-* and --mdos-rp-*); when a
   variable is unset the default design below is used.

   Performance: no :has() selectors here — this area changes many times
   a second while a reply streams in.
   ────────────────────────────────────────────────────────────── */

/* ── Conversation: messaging app ─────────────────────────────── */

html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] {
  --mdos-bubble-max: min(74%, 560px);
  --mdos-cv-bubble-me: var(--mdos-cv-me, var(--mdos-accent, #0078d4));
  --mdos-cv-bubble-me-fg: var(--mdos-cv-me-fg, #ffffff);
  --mdos-cv-bubble-them: var(--mdos-cv-them, var(--mdos-bubble-other));
  --mdos-cv-bubble-them-fg: var(--mdos-cv-them-fg, var(--mdos-bubble-other-fg));
  background: var(--mdos-cv-bg, var(--mdos-win-bg)) !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message {
  padding-block: 1px !important;
  background: transparent !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-component="ConversationMessage.Content"] {
  gap: 8px !important;
  align-items: flex-end;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message-content {
  font-family: var(--mdos-cv-font, inherit) !important;
}

/* Your messages: right side, accent bubble, no avatar or name. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] [data-component="ConversationMessage.Content"] {
  flex-direction: row-reverse;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] :is(.mari-message-avatar, .mari-message-meta) {
  display: none !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] .mari-message-body {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] .mari-message-content {
  width: fit-content;
  max-width: var(--mdos-bubble-max);
  padding: 7px 13px;
  border-radius: var(--mdos-cv-radius, 8px);
  background: var(--mdos-cv-bubble-me);
  color: var(--mdos-cv-bubble-me-fg) !important;
  font-size: var(--mdos-cv-size, 15px) !important;
  line-height: 1.4 !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] .mari-message-content * {
  color: inherit !important;
}

/* Their messages: small avatar at the bottom, one bubble per paragraph. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-avatar {
  width: 30px !important;
  align-self: flex-end;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-avatar > button {
  width: 30px !important;
  height: 30px !important;
  border-radius: 50% !important;
}
html.mdos[data-mdos-convo="messages"][data-mdos-cv-avatar="rounded"] [data-chat-mode="conversation"] .mari-message-avatar > button {
  border-radius: 8px !important;
}
html.mdos[data-mdos-convo="messages"][data-mdos-cv-avatar="hidden"] [data-chat-mode="conversation"] .mari-message-avatar {
  display: none !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-meta {
  margin: 0 0 3px 12px !important;
}
html.mdos.mdos-cv-no-names[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message-meta {
  display: none !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message-name {
  font-size: 11px !important;
  font-weight: 600 !important;
  color: var(--mdos-fg-2) !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message-timestamp {
  display: none !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content > .space-y-1\.5 > *,
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content > :not(.space-y-1\.5) {
  width: fit-content;
  max-width: var(--mdos-bubble-max);
  padding: 7px 13px;
  border-radius: var(--mdos-cv-radius, 8px);
  background: var(--mdos-cv-bubble-them);
  color: var(--mdos-cv-bubble-them-fg);
  font-size: var(--mdos-cv-size, 15px) !important;
  line-height: 1.4 !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content > .space-y-1\.5 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content > .space-y-1\.5 > * {
  margin: 0 !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message-content img {
  display: block;
  border-radius: 8px;
}
/* Quiet message tools: they appear when you hover a message. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role]:not(:hover, :focus-within) .mari-message-actions {
  opacity: 0;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] .mari-message-actions {
  justify-content: flex-end !important;
}
/* Date dividers: centred grey text, no rules. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .relative.my-4 > .border-t {
  visibility: hidden;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-conversation-transcript-chrome-text {
  font-size: 11px !important;
  font-weight: 600 !important;
  color: var(--mdos-fg-3) !important;
}
/* Header: translucent bar with the contact in the middle. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-messages-scroll > .sticky.top-0 {
  justify-content: center !important;
  background: color-mix(in srgb, var(--mdos-win-bg) 86%, transparent);
  box-shadow: inset 0 -0.5px 0 var(--mdos-sep);
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-conversation-header-identity] button {
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  font-weight: 600 !important;
}

/* "Show wallpaper" chat background: the chat window turns clear. */
html.mdos-in-convo[data-mdos-cv-bg="wallpaper"] :is([data-mdos-win="main"], [data-mdos-win="main"] .mari-app-background-paint, [data-mdos-win="main"] [data-component="TopBar"], [data-chat-mode="conversation"]) {
  background: transparent !important;
}
html.mdos-in-convo[data-mdos-cv-bg="wallpaper"] [data-mdos-win="main"] {
  background: color-mix(in srgb, var(--mdos-win-bg) 18%, transparent) !important;
}
html.mdos-in-convo[data-mdos-cv-bg="wallpaper"] [data-chat-mode="conversation"] :is(.mari-message-name, .mari-conversation-transcript-chrome-text) {
  color: #fff !important;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
}

/* ── Roleplay: reading view ──────────────────────────────────── */

html.mdos[data-mdos-rp="book"] {
  --mdos-paper: var(--mdos-rp-paper, #f4ecd8);
  --mdos-ink: var(--mdos-rp-ink, #5c4b37);
}
html.mdos[data-mdos-rp="night"] {
  --mdos-paper: var(--mdos-rp-paper, #1c1b19);
  --mdos-ink: var(--mdos-rp-ink, #d8d0c2);
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) {
  --mdos-paper-2: color-mix(in srgb, var(--mdos-ink) 6%, var(--mdos-paper));
  --mdos-ink-2: color-mix(in srgb, var(--mdos-ink) 62%, var(--mdos-paper));
  --mdos-ink-3: color-mix(in srgb, var(--mdos-ink) 42%, var(--mdos-paper));
  --mdos-mark: color-mix(in srgb, var(--mdos-ink) 6%, transparent);
  --mdos-serif: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "AppleMyungjo", "Nanum Myeongjo", "Noto Serif KR",
    "Noto Serif CJK KR", Batang, "바탕", serif;
  --mdos-rp-sans: Pretendard, "Pretendard Variable", "Pretendard JP", "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR",
    system-ui, sans-serif;
  --mdos-rp-text: var(--mdos-rp-font, var(--mdos-rp-sans));
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area {
  background: var(--mdos-paper) !important;
  color: var(--mdos-ink);
}
/* Weather effects (Chat design → Reading view, on by default). Marinara's
   particles are white for dark scenes, so on a light page they get a thin
   ink outline to show. Darkening the canvas instead turned the sun into a
   black smudge. The night page keeps them as they are. */
html.mdos[data-mdos-rp-weather="off"]:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area > canvas {
  display: none !important;
}
html.mdos[data-mdos-rp="book"]:not([data-mdos-rp-weather="off"]) .rpg-chat-area > canvas {
  filter: drop-shadow(0 0 1px color-mix(in srgb, var(--mdos-ink) 90%, transparent));
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] {
  --mari-roleplay-message-column-width: min(var(--mdos-rp-width, 640px), 100cqw - 48px) !important;
}
/* A reading column sits in the middle of the window, whatever Marinara's
   chat position (left / right) is set to. */
@media (min-width: 768px) {
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"][data-chat-position] [data-chat-scroll] > *,
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"][data-chat-position] .mari-roleplay-input-column {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
/* The window's title strip is part of the page, not a separate bar. */
html.mdos.mdos-in-rp:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-mdos-win="main"] [data-component="TopBar"] {
  background: var(--mdos-paper) !important;
  border-color: transparent !important;
  box-shadow: none !important;
  color: var(--mdos-ink-2) !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-rp-bubble {
  /* Ink for everything in the bubble, not only the passage: Marinara's bubble
     text is white, so extension lines under the text vanished on paper. */
  color: var(--mdos-ink) !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-rp-bubble > div {
  padding: 2px 0 !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-message-content {
  font-family: var(--mdos-rp-text) !important;
  font-size: var(--mdos-rp-size, 16px) !important;
  line-height: var(--mdos-rp-line, 1.8) !important;
  letter-spacing: -0.003em;
  color: var(--mdos-ink) !important;
  text-wrap: pretty;
  word-break: normal;
  overflow-wrap: anywhere;
}
/* Optional (Chat design → "Break lines between words only"): Korean words
   stay whole, but Japanese and Chinese then break only at punctuation, so
   dialogue lines end at full stops. Off by default. */
html.mdos[data-mdos-rp-wrap="words"]:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-message-content {
  word-break: keep-all;
}
html.mdos[data-mdos-rp-justify="on"]:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-message-content {
  text-align: justify;
}
html.mdos[data-mdos-rp-act-italic="off"] [data-chat-mode="roleplay"] .mari-message-content em {
  font-style: normal;
}
/* The name is a quiet label above the passage; time and model fade back. */
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row .mari-message-name {
  font-family: var(--mdos-rp-sans) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  letter-spacing: 0;
  text-transform: none;
  color: var(--mdos-ink) !important;
  text-shadow: none !important;
}
/* Only the name row: a grouped message has no name row, so its bubble is
   the first child and must keep the passage size (2.22.7). */
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-body > div:first-child[data-mh-name] span:not(.mari-message-name) {
  font-size: 11px !important;
  color: var(--mdos-ink-3) !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row {
  margin-bottom: 30px !important;
}
/* Your turns: a soft card in the column. */
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row.mari-message-user .mari-rp-bubble {
  background: var(--mdos-mark) !important;
  border-radius: 8px !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row.mari-message-user .mari-rp-bubble > div {
  padding: 12px 16px !important;
}
/* Message buttons: small and quiet; on desktop they wait for the pointer. */
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mari-chat-message-action {
  width: 30px !important;
  height: 30px !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  color: var(--mdos-ink-3) !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mari-chat-message-action:hover {
  color: var(--mdos-ink) !important;
  background: var(--mdos-mark) !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mari-chat-message-action svg {
  width: 15px;
  height: 15px;
}
@media (hover: hover) {
  html.mdos[data-mdos-rp-actions="hover"]:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row .mari-message-actions {
    opacity: 0;
    transition: opacity 140ms ease;
  }
  html.mdos[data-mdos-rp-actions="hover"]:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row:is(:hover, :focus-within) .mari-message-actions,
  html.mdos[data-mdos-rp-actions="hover"]:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row:last-child .mari-message-actions {
    opacity: 1;
  }
}
/* Composer: a rounded card on the page, with the text fading out above it. */
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mari-roleplay-input-column {
  background: linear-gradient(to bottom, transparent, var(--mdos-paper) 28px);
  padding-top: 22px;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .marinara-chat-input-shell {
  background: var(--mdos-paper-2) !important;
  border: 1px solid color-mix(in srgb, var(--mdos-ink) 10%, transparent) !important;
  border-radius: 8px !important;
  box-shadow: 0 6px 22px -14px color-mix(in srgb, var(--mdos-ink) 45%, transparent) !important;
  backdrop-filter: none !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mari-chat-input-textarea {
  font-family: var(--mdos-rp-text) !important;
  font-size: 15px !important;
  color: var(--mdos-ink) !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mari-chat-input-textarea::placeholder {
  color: var(--mdos-ink-3) !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .marinara-chat-input-shell :is(button, svg) {
  color: var(--mdos-ink-2);
}
/* Narrow windows and phones: the column spans the pane minus the side
   margin set in Chat design (--mdos-rp-gutter, default 14 px). Marinara's
   own row gutters, transcript padding and avatar track are dropped so that
   margin is the only one. */
@container (max-width: 640px) {
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] {
    --mari-roleplay-row-gutter: 0px !important;
    --mari-roleplay-message-column-width: calc(100cqw - 2 * var(--mdos-rp-gutter, 14px)) !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-messages-scroll {
    padding-inline: 0 !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-message-row {
    --mari-roleplay-avatar-slot: 0rem !important;
    --mari-roleplay-avatar-gap: 0rem !important;
    --mari-roleplay-avatar-space: 0rem !important;
    /* The margin is row padding, not a column width: some themes force the
       message body to width: 100%. */
    padding-inline: var(--mdos-rp-gutter, 14px) !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-message-row > :is(.mari-message-avatar, .mari-roleplay-avatar-spacer) {
    display: none !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-message-body {
    max-width: 100% !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-message-row:not(.mari-message-user) .mari-rp-bubble,
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-message-row:not(.mari-message-user) .mari-rp-bubble > div {
    padding-inline: 0 !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-message-content {
    /* Slightly smaller defaults on narrow screens; a size or line height set
       in Chat design always wins. */
    font-size: var(--mdos-rp-size, 15.5px) !important;
    line-height: var(--mdos-rp-line, 1.75) !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row {
    margin-bottom: 22px !important;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-body > div:first-child[data-mh-name] span:not(.mari-message-name, :nth-child(2)) {
    display: none;
  }
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .marinara-chat-input-shell {
    border-radius: 8px !important;
  }
}
/* Wide windows: the column stays a reading width, centred. */
@container (min-width: 1100px) {
  html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .mari-roleplay-message-row {
    margin-bottom: 36px !important;
  }
}

/* ── Live preview in Customize → Chat design ─────────────────── */

.mdos-cv-preview {
  margin-top: 12px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 0.5px var(--mdos-sep);
  display: grid;
  gap: 8px;
}
.mdos-cv-preview--convo {
  --pv-me: var(--mdos-cv-me, var(--mdos-accent, #0078d4));
  --pv-me-fg: var(--mdos-cv-me-fg, #fff);
  --pv-them: var(--mdos-cv-them, var(--mdos-bubble-other));
  --pv-them-fg: var(--mdos-cv-them-fg, var(--mdos-bubble-other-fg));
  background: var(--mdos-cv-bg, var(--mdos-win-bg));
  font-family: var(--mdos-cv-font, inherit);
}
html[data-mdos-cv-bg="wallpaper"] .mdos-cv-preview--convo {
  background: var(--mdos-wallpaper);
}
.mdos-pv-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.mdos-pv-me {
  justify-content: flex-end;
}
.mdos-pv-col {
  display: grid;
  gap: 3px;
  justify-items: start;
}
.mdos-pv-avatar {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(160deg, #ffb35c, #f06a1d);
}
html[data-mdos-cv-avatar="rounded"] .mdos-pv-avatar {
  border-radius: 8px;
}
html[data-mdos-cv-avatar="hidden"] .mdos-pv-avatar {
  display: none;
}
.mdos-pv-name {
  font-size: 11px;
  font-weight: 600;
  color: var(--mdos-fg-2);
  margin-left: 4px;
}
html.mdos-cv-no-names .mdos-cv-preview--convo .mdos-pv-name {
  display: none;
}
.mdos-pv-bubble {
  margin: 0;
  max-width: 78%;
  padding: 7px 13px;
  border-radius: var(--mdos-cv-radius, 8px);
  font-size: var(--mdos-cv-size, 15px);
  line-height: 1.4;
  background: var(--pv-them);
  color: var(--pv-them-fg);
}
.mdos-pv-me .mdos-pv-bubble {
  background: var(--pv-me);
  color: var(--pv-me-fg);
}
.mdos-cv-preview--rp {
  --pv-paper: var(--mdos-rp-paper, #f4ecd8);
  --pv-ink: var(--mdos-rp-ink, #5c4b37);
  background: var(--pv-paper);
  color: var(--pv-ink);
  padding: 22px 26px;
}
html[data-mdos-rp="night"] .mdos-cv-preview--rp {
  --pv-paper: var(--mdos-rp-paper, #1c1b19);
  --pv-ink: var(--mdos-rp-ink, #d8d0c2);
}
.mdos-cv-preview--rp .mdos-pv-name {
  margin: 0;
  font-size: 13px;
  color: var(--pv-ink);
}
.mdos-pv-rp {
  margin: 0;
  font-family: var(--mdos-rp-font, Pretendard, "Pretendard Variable", "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif);
  font-size: var(--mdos-rp-size, 16px);
  line-height: var(--mdos-rp-line, 1.8);
}
html[data-mdos-rp-justify="on"] .mdos-pv-rp {
  text-align: justify;
}
html[data-mdos-rp-act-italic="off"] .mdos-pv-rp em {
  font-style: normal;
}

/* ── Roleplay text tones ─────────────────────────────────────── */
/* Dialogue in quotes is darkest, narration a step lighter and *actions*
   (rendered as <em>) lighter still — same weight, colour only. Dialogue is
   painted with the CSS Custom Highlight API ("mdos-dlg", desktop.js). */

html.mdos[data-mdos-rp-tone="on"] {
  --mdos-rp-base: var(--mdos-fg);
  --mdos-rp-bgc: var(--mdos-win-bg);
}
html.mdos[data-mdos-rp-tone="on"]:is([data-mdos-rp="book"], [data-mdos-rp="night"]) {
  --mdos-rp-base: var(--mdos-ink);
  --mdos-rp-bgc: var(--mdos-paper);
}
html.mdos[data-mdos-rp-tone="on"] {
  --mdos-rp-dlg-c: var(--mdos-rp-dlg, var(--mdos-rp-base));
  --mdos-rp-nar-c: var(--mdos-rp-nar, color-mix(in srgb, var(--mdos-rp-base) 74%, var(--mdos-rp-bgc)));
  --mdos-rp-act-c: var(--mdos-rp-act, color-mix(in srgb, var(--mdos-rp-base) 52%, var(--mdos-rp-bgc)));
}
html.mdos[data-mdos-rp-tone="on"] [data-chat-mode="roleplay"] .mari-message-content,
html.mdos[data-mdos-rp-tone="on"] [data-chat-mode="roleplay"] .mari-message-content :is(p, li, blockquote) {
  color: var(--mdos-rp-nar-c) !important;
}
html.mdos[data-mdos-rp-tone="on"] [data-chat-mode="roleplay"] .mari-message-content :is(em, i) {
  color: var(--mdos-rp-act-c) !important;
}
::highlight(mdos-dlg) {
  color: var(--mdos-rp-dlg-c);
}

/* Preview in Customize → Chat design */
html[data-mdos-rp-tone="on"] .mdos-cv-preview--rp .mdos-pv-rp {
  color: var(--mdos-rp-nar, color-mix(in srgb, var(--pv-ink) 74%, var(--pv-paper)));
}
html[data-mdos-rp-tone="on"] .mdos-cv-preview--rp .mdos-pv-rp em {
  color: var(--mdos-rp-act, color-mix(in srgb, var(--pv-ink) 52%, var(--pv-paper)));
}
html[data-mdos-rp-tone="on"] .mdos-cv-preview--rp .mdos-pv-dlg {
  color: var(--mdos-rp-dlg, var(--pv-ink));
}

/* ── Phone: full-width composer ──────────────────────────────── */
/* On phones the roleplay composer runs edge to edge, like a phone app's
   message bar: no side margins, rounded only at the top, flush with the
   bottom of the screen with room left for the home indicator. */
html.mdos-touch:not(.mdos-tablet):is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-input-column {
  width: 100% !important;
  max-width: none !important;
  margin-inline: 0 !important;
  padding-inline: 0 !important;
}
html.mdos-touch:not(.mdos-tablet):is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-input-column > .mari-chat-input {
  padding: 0 !important;
}
html.mdos-touch:not(.mdos-tablet):is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .marinara-chat-input-shell {
  border-radius: 8px 8px 0 0 !important;
  border-width: 1px 0 0 !important;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 20px) !important;
  box-shadow: 0 -6px 20px -14px color-mix(in srgb, var(--mdos-ink) 45%, transparent) !important;
}

/* ── Chat tools (desktop.js: scene bar on top, quick palette) ── */

/* Alert: the macOS dialog — app icon, bold title, message, two buttons. */
.mdos-alert-overlay {
  position: fixed;
  inset: 0;
  z-index: 9100;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.32);
  animation: mdos-fade 120ms ease;
}
.mdos-alert {
  width: min(280px, 100%);
  padding: 20px 18px 16px;
  border-radius: 8px;
  text-align: center;
  color: var(--mdos-menu-fg, #fff);
  font: 13px/1.45 var(--mdos-font);
  background: rgba(40, 40, 48, 0.9);
  backdrop-filter: var(--mdos-blur);
  -webkit-backdrop-filter: var(--mdos-blur);
  box-shadow:
    0 26px 70px -12px rgba(0, 0, 0, 0.6),
    0 0 0 0.5px rgba(255, 255, 255, 0.18) inset;
  animation: mdos-pop 140ms var(--mdos-ease);
}
.mdos-alert-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 10px;
}
.mdos-alert-icon svg {
  width: 100%;
  height: 100%;
}
.mdos-alert h3 {
  margin: 0 0 4px;
  font: 700 14px/1.3 var(--mdos-font);
}
.mdos-alert p {
  margin: 0 0 16px;
  font-size: 12px;
  opacity: 0.75;
}
.mdos-alert-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.mdos-alert-actions .mdos-btn--danger {
  background: #c42b1c;
  color: #fff;
}

/* Scene bar: a small toolbar pill at the top of the chat. */
[data-mdos-scenebar] {
  display: none !important;
}
.mdos-scenebar {
  position: absolute;
  top: 10px;
  left: 50%;
  z-index: 40;
  translate: -50% 0;
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--mdos-win-bg, #fff) 82%, transparent);
  backdrop-filter: blur(16px) saturate(170%);
  -webkit-backdrop-filter: blur(16px) saturate(170%);
  box-shadow:
    0 4px 16px -4px rgba(0, 0, 0, 0.25),
    0 0 0 0.5px color-mix(in srgb, var(--mdos-fg, #000) 18%, transparent);
}
.mdos-scenebar-btn {
  all: unset;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  color: var(--mdos-fg, currentColor);
  opacity: 0.75;
  cursor: var(--mdos-cur-ptr, pointer);
}
.mdos-scenebar-btn:hover,
.mdos-scenebar-btn:focus-visible {
  opacity: 1;
  background: color-mix(in srgb, var(--mdos-fg, #000) 10%, transparent);
}
.mdos-scenebar-btn.is-danger:hover {
  color: #c42b1c;
}
.mdos-scenebar-btn:disabled {
  opacity: 0.3;
  background: transparent;
}
.mdos-scenebar-btn svg {
  width: 15px;
  height: 15px;
}

/* Quick palette: the + takes the attach button's place, in the composer's colours. */
[data-mdos-qp] input[type="file"] + button {
  display: none !important;
}
.mdos-qp-plus {
  all: unset;
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  color: var(--marinara-chat-chrome-button-text, currentColor);
  cursor: var(--mdos-cur-ptr, pointer);
  transition: background 120ms ease;
}
.mdos-qp-plus:hover,
.mdos-qp-plus.is-open {
  background: var(--marinara-chat-message-action-bg-hover, rgba(127, 127, 127, 0.14));
}
.mdos-qp-plus svg {
  width: 17px;
  height: 17px;
  transition: rotate 160ms var(--mdos-ease);
}
.mdos-qp-plus.is-open svg {
  rotate: 45deg;
}
.mdos-qp-menu .mdos-menu-item:disabled {
  opacity: 0.55;
  font-size: 11px;
}
/* Pinned buttons: a row of small round buttons above the composer. */
.mdos-qp-chips {
  position: absolute;
  left: 12px;
  bottom: calc(100% + 6px);
  z-index: 5;
  display: flex;
  gap: 6px;
}
.mdos-qp-chip {
  all: unset;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  color: var(--marinara-chat-chrome-button-text, var(--mdos-fg, currentColor));
  background: color-mix(in srgb, var(--mdos-win-bg, #fff) 78%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 0 0 0.5px color-mix(in srgb, var(--mdos-fg, #000) 20%, transparent), 0 2px 8px -3px rgba(0, 0, 0, 0.25);
  cursor: var(--mdos-cur-ptr, pointer);
}
.mdos-qp-chip:hover {
  background: var(--mdos-accent, #0078d4);
  color: #fff;
}
.mdos-qp-ico {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
}
.mdos-qp-ico svg {
  width: 16px;
  height: 16px;
}
.mdos-qp-glyph {
  font: 700 14px/1 var(--mdos-font);
}

/* Snippet library (popover). */
.mdos-snip {
  display: grid;
  gap: 10px;
}
.mdos-snip-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}
.mdos-snip-editor {
  display: grid;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}
.mdos-snip-text {
  height: 120px !important;
  padding: 8px 10px !important;
  white-space: pre-wrap;
}
.mdos-snip-editor-acts {
  justify-content: flex-end;
}
.mdos-snip-list {
  display: grid;
  gap: 6px;
  max-height: min(420px, 55vh);
  overflow-y: auto;
}
.mdos-snip-empty {
  padding: 18px 8px;
  text-align: center;
  opacity: 0.6;
}
.mdos-snip-row {
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}
.mdos-snip-row.is-pinned {
  box-shadow: inset 3px 0 0 var(--mdos-accent, #0078d4);
}
.mdos-snip-head {
  all: unset;
  box-sizing: border-box;
  display: grid;
  gap: 2px;
  width: 100%;
  padding: 9px 12px 4px;
  cursor: var(--mdos-cur-ptr, pointer);
}
.mdos-snip-head b {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
}
.mdos-snip-head span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 11.5px;
  opacity: 0.6;
}
.mdos-snip-body {
  margin: 4px 12px;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.22);
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 12.5px;
  max-height: 200px;
  overflow-y: auto;
}
.mdos-snip-acts {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px 8px 12px;
}
.mdos-snip-insert {
  min-height: 26px !important;
  margin-right: auto;
}
.mdos-snip-act {
  all: unset;
  min-width: 26px;
  height: 26px;
  padding: 0 4px;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  border-radius: 4px;
  font-size: 13px;
  opacity: 0.7;
  cursor: var(--mdos-cur-ptr, pointer);
}
.mdos-snip-act:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.12);
}
.mdos-snip-act.is-danger:hover,
.mdos-snip-act.is-confirm {
  color: #ff6961;
  opacity: 1;
}
.mdos-snip-act.is-confirm {
  font-size: 11px;
  background: rgba(255, 69, 58, 0.16);
}
@keyframes mdos-fade {
  from {
    opacity: 0;
  }
}

/* ── Extension locker (desktop.js lockerTick) ────────────────── */
.mdos-mb-locker[hidden] {
  display: none !important;
}
.mdos-lk {
  display: grid;
  gap: 10px;
}
.mdos-lk-list {
  background: none !important;
  color: inherit !important;
  box-shadow: none !important;
  display: grid;
  gap: 2px;
  max-height: min(420px, 60vh);
  overflow-y: auto;
}
.mdos-lk-row {
  all: unset;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 36px;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: var(--mdos-cur-ptr, pointer);
}
.mdos-lk-row:hover,
.mdos-lk-row:focus-visible {
  background: var(--mdos-accent, #0078d4);
  color: #fff;
}
.mdos-lk-ico {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
  font-size: 14px;
}
.mdos-lk-ico :is(svg, img) {
  width: 16px;
  height: 16px;
  object-fit: contain;
}
.mdos-lk-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mdos-lk-row small {
  font-size: 11px;
  opacity: 0.65;
}
.mdos-lk-empty,
.mdos-lk-note {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.75;
}
.mdos-lk-note {
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(255, 159, 10, 0.16);
  opacity: 1;
}
.mdos-lk-foot {
  justify-content: flex-end;
}
.mdos-lk-edit,
.mdos-lk-removed {
  display: grid;
  gap: 6px;
  max-height: min(360px, 50vh);
  overflow-y: auto;
}
.mdos-lk-removed h4 {
  margin: 4px 0 0;
  font-size: 11px;
  font-weight: 600;
  opacity: 0.6;
}
.mdos-lk-erow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto auto;
  align-items: center;
  gap: 4px;
}
.mdos-lk-removed .mdos-lk-erow {
  grid-template-columns: minmax(0, 1fr) auto;
}
.mdos-lk-erow.is-gone {
  opacity: 0.55;
}
.mdos-lk-keep {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  white-space: nowrap;
}
.mdos-lk-banner {
  position: fixed;
  left: 50%;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
  z-index: 9050;
  translate: -50% 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px 8px 16px;
  border-radius: 999px;
  background: rgba(40, 40, 48, 0.9);
  color: #fff;
  font: 600 13px var(--mdos-font);
  box-shadow: 0 12px 34px -8px rgba(0, 0, 0, 0.55);
}

/* Phones and tablets: the locker as a bottom sheet with an icon grid. */
.mdos-pop.mdos-pop--sheet {
  left: 50% !important;
  right: auto !important;
  top: auto !important;
  bottom: 0 !important;
  translate: -50% 0 !important;
  transform: none !important;
  box-sizing: border-box;
  width: min(560px, 100vw) !important;
  max-height: 78vh;
  padding: 18px 16px calc(env(safe-area-inset-bottom, 0px) + 18px);
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -10px 40px -10px rgba(0, 0, 0, 0.5) !important;
  animation: mdos-sheet-up 220ms var(--mdos-ease);
}
.mdos-pop.mdos-pop--sheet::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 50%;
  width: 36px;
  height: 5px;
  margin-left: -18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.3);
}
@keyframes mdos-sheet-up {
  from {
    translate: -50% 100%;
  }
}
.mdos-lk-list.is-grid {
  grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
  gap: 14px 6px;
  max-height: none;
}
.mdos-lk-list.is-grid .mdos-lk-row {
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 6px;
  padding: 6px 2px;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
}
.mdos-lk-list.is-grid .mdos-lk-row:hover {
  background: transparent;
  color: inherit;
}
.mdos-lk-list.is-grid .mdos-lk-row:active .mdos-lk-ico {
  transform: scale(0.92);
  filter: brightness(0.8);
}
.mdos-lk-list.is-grid .mdos-lk-ico {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  font-size: 26px;
  background: rgba(255, 255, 255, 0.14);
  transition: transform 120ms ease;
}
.mdos-lk-list.is-grid .mdos-lk-ico :is(svg, img) {
  width: 28px;
  height: 28px;
}
.mdos-lk-list.is-grid .mdos-lk-name {
  max-width: 100%;
  font-size: 11.5px;
}
.mdos-lk-list.is-grid small {
  display: none;
}
.mdos-pop--sheet .mdos-lk-erow {
  grid-template-columns: auto auto minmax(0, 1fr) auto;
  row-gap: 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.mdos-pop--sheet .mdos-lk-keep {
  justify-self: start;
  font-size: 13px;
}
.mdos-pop--sheet .mdos-lk-erow .mdos-input {
  grid-column: 1 / -1;
  height: 36px;
}
.mdos-pop--sheet .mdos-lk-removed .mdos-lk-erow .mdos-lk-name {
  grid-column: 1 / 3;
}
.mdos-topbar-locker svg {
  width: 18px;
  height: 18px;
}

/* ── Composer: the Claude app's input bar ────────────────────── */
/* A big rounded card: the text on the first line, below it round grey
   buttons (+, tools) on the left and the round accent send on the right. */
html.mdos .marinara-chat-input-shell[data-mh-composer] {
  flex-wrap: wrap !important;
  align-items: center !important;
  column-gap: 6px !important;
  row-gap: 4px !important;
  padding: 14px 12px 10px 12px !important;
  border-radius: 8px !important;
  border: 1px solid color-mix(in srgb, var(--mdos-fg, #000) 12%, transparent) !important;
  background: var(--mdos-win-bg, #fff) !important;
  box-shadow: 0 6px 24px -10px rgba(0, 0, 0, 0.22) !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer]:focus-within {
  border-color: color-mix(in srgb, var(--mdos-fg, #000) 22%, transparent) !important;
  box-shadow: 0 8px 28px -10px rgba(0, 0, 0, 0.28) !important;
}
html.mdos .marinara-chat-input-shell > textarea[data-chat-composer] {
  order: -1;
  flex: 1 0 100% !important;
  width: 100% !important;
  min-height: 28px;
  padding: 2px 6px 8px !important;
  font-size: 16px !important;
  line-height: 1.5 !important;
}
/* Round grey buttons (+, translate, emoji…) — also inside the conversation
   composer's left/right button groups. */
html.mdos .marinara-chat-input-shell[data-mh-composer] > :is(button, div > button, .mdos-qp-plus):not(:last-child),
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:not(:last-child),
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > div > button,
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:not(:last-child) > button {
  width: 38px !important;
  height: 38px !important;
  min-width: 38px;
  border-radius: 999px !important;
  background: color-mix(in srgb, var(--mdos-fg, #000) 7%, transparent) !important;
  color: color-mix(in srgb, var(--mdos-fg, #000) 78%, transparent) !important;
  box-shadow: none !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > :last-child {
  margin-left: auto !important;
}
/* Send / stop: a solid dark round button (the text colour), with an up
   arrow in place of Marinara's paper plane — like the Claude app. */
html.mdos .marinara-chat-input-shell[data-mh-composer] > button:last-child,
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:last-child {
  width: 38px !important;
  height: 38px !important;
  border-radius: 999px !important;
  background: var(--mdos-fg, #1d1d1f) !important;
  color: var(--mdos-win-bg, #fff) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  opacity: 1 !important;
  transition: transform 120ms ease, background 150ms ease;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > button:last-child:active,
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:last-child:active {
  transform: scale(0.92);
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > button:last-child:disabled,
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:last-child:disabled {
  background: color-mix(in srgb, var(--mdos-fg, #000) 12%, transparent) !important;
  color: color-mix(in srgb, var(--mdos-fg, #000) 40%, transparent) !important;
  box-shadow: none !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > button:last-child svg,
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:last-child svg {
  width: 18px !important;
  height: 18px !important;
  color: inherit !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > button:last-child svg:is(.lucide-send, .lucide-send-horizontal, .lucide-send-horizontal-icon),
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:last-child svg:is(.lucide-send, .lucide-send-horizontal, .lucide-send-horizontal-icon) {
  display: none !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > button:last-child[data-mh-send],
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:last-child[data-mh-send] {
  display: grid !important;
  place-items: center !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > button:last-child[data-mh-send]::after,
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child > button:last-child[data-mh-send]::after {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19V5M5.5 11.5 12 5l6.5 6.5'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 19V5M5.5 11.5 12 5l6.5 6.5'/%3E%3C/svg%3E") center / contain no-repeat;
}
html.mdos .marinara-chat-input-shell .mdos-qp-plus svg {
  width: 20px;
  height: 20px;
}
/* Phones: the side margin stays; the card keeps its round corners. */
html.mdos-touch:not(.mdos-tablet):is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .marinara-chat-input-shell[data-mh-composer] {
  border-radius: 8px 8px 0 0 !important;
}

/* The + menu: the Claude app's card — grouped rows on a light surface. */
.mdos-qp-pop {
  position: fixed;
  z-index: 9000;
  width: min(330px, calc(100vw - 16px));
  max-height: min(70vh, 560px);
  overflow-y: auto;
  padding: 12px;
  border-radius: 8px;
  display: grid;
  gap: 12px;
  color: var(--mdos-fg, #1d1d1f);
  background: color-mix(in srgb, var(--mdos-win-bg, #fff) 94%, var(--mdos-fg, #000));
  box-shadow:
    0 20px 50px -12px rgba(0, 0, 0, 0.35),
    0 0 0 1px color-mix(in srgb, var(--mdos-fg, #000) 8%, transparent);
  font: 15px/1.3 var(--mdos-font);
  animation: mdos-pop 140ms var(--mdos-ease);
}
.mdos-qp-group {
  display: grid;
  border-radius: 8px;
  background: var(--mdos-win-bg, #fff);
  overflow: hidden;
}
.mdos-qp-group-title {
  padding: 12px 18px 4px;
  font-size: 12px;
  font-weight: 600;
  color: color-mix(in srgb, var(--mdos-fg, #000) 55%, transparent);
}
.mdos-qp-row {
  all: unset;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 52px;
  padding: 0 18px;
  cursor: var(--mdos-cur-ptr, pointer);
  -webkit-tap-highlight-color: transparent;
}
.mdos-qp-row + .mdos-qp-row {
  box-shadow: inset 58px 1px 0 -57px color-mix(in srgb, var(--mdos-fg, #000) 12%, transparent);
}
.mdos-qp-row:hover,
.mdos-qp-row:active {
  background: color-mix(in srgb, var(--mdos-fg, #000) 6%, transparent);
}
.mdos-qp-row .mdos-qp-ico {
  width: 24px;
  height: 24px;
  color: color-mix(in srgb, var(--mdos-fg, #000) 80%, transparent);
}
.mdos-qp-row .mdos-qp-ico svg {
  width: 22px;
  height: 22px;
}
.mdos-qp-row .mdos-qp-glyph {
  font-size: 17px;
}
.mdos-qp-switch {
  position: relative;
  width: 44px;
  height: 26px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--mdos-fg, #000) 16%, transparent);
  transition: background 150ms ease;
}
.mdos-qp-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: translate 150ms var(--mdos-ease);
}
.mdos-qp-switch.is-on {
  background: var(--w-accent, #0078d4);
}
.mdos-qp-switch.is-on::after {
  translate: 18px 0;
}

.mdos-sheet-scrim {
  position: fixed;
  inset: 0;
  z-index: 8690;
  background: rgba(0, 0, 0, 0.32);
  pointer-events: auto;
  animation: mdos-fade 160ms ease;
}

/* ── Model picker: the Claude app's ──────────────────────────── */
/* The composer's model button shows the model's name as a grey pill
   (Marinara keeps the name in the button's title) instead of a link icon. */
html.mdos .marinara-chat-input-shell[data-mh-composer] > button[aria-haspopup="dialog"][data-mh-link],
html.mdos .marinara-chat-input-shell[data-mh-composer] > div > button[aria-haspopup="dialog"][data-mh-link] {
  height: 38px !important;
  border-radius: 999px !important;
  background: color-mix(in srgb, var(--mdos-fg, #000) 7%, transparent) !important;
  width: auto !important;
  max-width: 220px;
  min-width: 0 !important;
  padding: 0 16px 0 12px !important;
  gap: 2px;
  font: 500 14px/1 var(--mdos-font);
  white-space: nowrap;
  color: color-mix(in srgb, var(--mdos-fg, #000) 82%, transparent) !important;
}
html.mdos .marinara-chat-input-shell > button[aria-haspopup="dialog"] svg.lucide-link,
html.mdos .marinara-chat-input-shell > div > button[aria-haspopup="dialog"] svg.lucide-link {
  display: none;
}
html.mdos .marinara-chat-input-shell > button[aria-haspopup="dialog"][data-mh-link] > span:first-child,
html.mdos .marinara-chat-input-shell > div > button[aria-haspopup="dialog"][data-mh-link] > span:first-child {
  width: 0 !important;
}
html.mdos .marinara-chat-input-shell > button[aria-haspopup="dialog"][data-mh-link]::after,
html.mdos .marinara-chat-input-shell > div > button[aria-haspopup="dialog"][data-mh-link]::after {
  content: attr(title);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Editor section list: the current section is a soft tint (not a solid fill)
   that fades between sections; while jumping to a picked section, only that
   one is lit. */
@container (min-width: 760px) {
  html.mdos .mari-editor-header--with-nav .mari-editor-tab {
    transition: background 180ms ease, color 180ms ease;
  }
  html.mdos .mari-editor-header--with-nav .mari-editor-tab[data-active="true"] {
    background: color-mix(in srgb, var(--mdos-accent, #0078d4) 16%, transparent) !important;
    color: var(--mdos-accent, #0078d4) !important;
    font-weight: 600;
  }
  html.mdos .mari-editor-navigation-tabs.mdos-jumping .mari-editor-tab[data-active="true"]:not([data-mdos-picked]) {
    background: transparent !important;
    color: var(--marinara-editor-muted, inherit) !important;
    font-weight: 500;
  }
  html.mdos .mari-editor-navigation-tabs.mdos-jumping .mari-editor-tab[data-mdos-picked] {
    background: color-mix(in srgb, var(--mdos-accent, #0078d4) 16%, transparent) !important;
    color: var(--mdos-accent, #0078d4) !important;
    font-weight: 600;
  }
}

/* Chat list (Messages): hairlines between chats, starting after the
   picture; bigger rows and names on phones and tablets. */
html.mdos .mari-chat-sidebar [data-drag-kind="chat"] {
  position: relative;
}
html.mdos .mari-chat-sidebar [data-drag-kind="chat"]::after {
  content: "";
  position: absolute;
  left: 62px;
  right: 10px;
  bottom: 0;
  height: 1px;
  background: color-mix(in srgb, var(--mdos-fg, #000) 9%, transparent);
  pointer-events: none;
}
html.mdos .mari-chat-sidebar [data-drag-kind="chat"][data-mh-current]::after {
  display: none;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"] {
  min-height: 70px;
  padding: 10px 12px !important;
  gap: 12px !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"] > .min-w-0.flex-1 > span:first-child {
  font-size: 16px !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"] > .min-w-0.flex-1 > span:not(:first-child) {
  font-size: 13px !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"] > .relative.flex-shrink-0,
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"] > .relative.flex-shrink-0 > :is(span.rounded-lg, .mari-chat-mode-avatar) {
  width: 48px !important;
  height: 48px !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"]::after {
  left: 72px;
}

html.mdos .marinara-chat-input-shell[data-mh-composer] > div:last-child {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > div:not(:last-child) {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
}

/* ── Chat list per app (desktop.js refreshChatList) ──────────── */
/* Conversation = a messenger: round 50px picture, bold name with the time on
   the right, the last message in two grey lines under it. */
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] {
  min-height: 74px;
  align-items: center !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] > .relative.flex-shrink-0,
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > :is(span.rounded-lg, .mari-chat-mode-avatar) {
  width: 50px !important;
  height: 50px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] > .min-w-0.flex-1 {
  align-self: center;
}
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] > .min-w-0.flex-1 > span:first-child {
  font-size: 15px !important;
  font-weight: 650 !important;
}
.mdos-preview {
  display: -webkit-box;
  margin-top: 2px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  line-height: 1.35;
  /* Marinara's own muted text colour: it follows the list's theme. */
  color: var(--muted-foreground, color-mix(in srgb, currentColor 60%, transparent));
  white-space: normal;
  word-break: break-all;
}
html.mdos .mari-chat-sidebar [data-drag-kind="chat"][data-mh-current] .mdos-preview {
  color: rgba(255, 255, 255, 0.8);
}
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"]::after {
  left: 72px;
}

/* Roleplay = a bookshelf: the picture as a book cover (tall, square corners
   with a spine shadow), the title in a serif face. */
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] {
  min-height: 82px;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 {
  width: 46px !important;
  height: 64px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > :is(span.rounded-lg, .mari-chat-mode-avatar) {
  width: 46px !important;
  height: 64px !important;
  border-radius: 3px 4px 4px 3px !important;
  box-shadow:
    inset 3px 0 0 rgba(0, 0, 0, 0.18),
    0 3px 8px -3px rgba(0, 0, 0, 0.35);
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > span.rounded-lg > img {
  border-radius: 3px 4px 4px 3px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .min-w-0.flex-1 > span:first-child {
  font-family: "Iowan Old Style", "Noto Serif KR", "Nanum Myeongjo", Georgia, serif !important;
  font-size: 15px !important;
  font-weight: 600 !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"]::after {
  left: 68px;
}

/* Game = a game library: an app-icon picture, the row as a card. */
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] {
  min-height: 76px;
  margin: 4px 6px !important;
  border-radius: 8px !important;
  background: color-mix(in srgb, var(--mdos-fg, #000) 4%, transparent);
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"]::after {
  display: none;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .relative.flex-shrink-0,
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > :is(span.rounded-lg, .mari-chat-mode-avatar) {
  width: 54px !important;
  height: 54px !important;
  border-radius: 8px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > :is(span.rounded-lg, .mari-chat-mode-avatar) {
  box-shadow: 0 3px 10px -4px rgba(0, 0, 0, 0.4);
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > span.rounded-lg > img {
  border-radius: 8px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .min-w-0.flex-1 > span:first-child {
  font-size: 15px !important;
  font-weight: 700 !important;
}

/* ══ Phones (touch, narrower than a tablet) ═════════════════════ */

/* + menu as a bottom sheet, like the Claude iPhone app. */
.mdos-qp-pop.is-sheet {
  left: 0 !important;
  right: 0;
  bottom: 0 !important;
  width: 100% !important;
  max-height: 82vh;
  box-sizing: border-box;
  padding: 26px 12px calc(env(safe-area-inset-bottom, 0px) + 14px);
  border-radius: 8px 8px 0 0;
  animation: mdos-qp-up 220ms var(--mdos-ease);
}
.mdos-qp-pop.is-sheet::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 50%;
  width: 36px;
  height: 5px;
  margin-left: -18px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--mdos-fg, #000) 22%, transparent);
}
@keyframes mdos-qp-up {
  from {
    translate: 0 100%;
  }
}
.mdos-qp-scrim {
  z-index: 8990;
}

/* Model picker: a bottom sheet over the full width. */
html.mdos-touch:not(.mdos-tablet) [data-quick-connection-menu] {
  left: 0 !important;
  right: 0 !important;
  top: auto !important;
  bottom: 0 !important;
  width: 100vw !important;
  max-width: none !important;
  height: min(82vh, 640px) !important;
  border-radius: 8px 8px 0 0 !important;
  padding-bottom: env(safe-area-inset-bottom, 0px) !important;
  transform: none !important;
}

/* Editors on narrow screens: the sections as a row of chips that scrolls
   sideways (Marinara shows a drop-down there), under the name. */
@container (max-width: 759px) {
  html.mdos .mari-editor-header--with-nav .mari-editor-navigation-compact {
    display: none !important;
  }
  html.mdos .mari-editor-header--with-nav .mari-editor-navigation {
    flex: 1 0 100% !important;
    order: 3;
    min-width: 0;
    margin: 2px -4px 0;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  html.mdos .mari-editor-header--with-nav .mari-editor-navigation::-webkit-scrollbar {
    display: none;
  }
  html.mdos .mari-editor-header--with-nav .mari-editor-navigation-tabs {
    display: flex !important;
    flex-wrap: nowrap;
    gap: 6px;
    padding: 2px 4px 4px;
    width: max-content;
  }
  html.mdos .mari-editor-header--with-nav .mari-editor-tab {
    flex: none;
    height: 32px !important;
    min-height: 32px !important;
    padding: 0 14px !important;
    border: 0 !important;
    border-radius: 999px !important;
    box-shadow: none !important;
    font-size: 13px !important;
    background: color-mix(in srgb, var(--marinara-editor-text, currentColor) 7%, transparent);
  }
  html.mdos .mari-editor-header--with-nav .mari-editor-tab-label {
    display: inline !important;
  }
  html.mdos .mari-editor-header--with-nav .mari-editor-tab[data-active="true"] {
    background: var(--mdos-accent, #0078d4) !important;
    color: #fff !important;
  }
  html.mdos .mari-editor-header--with-nav {
    height: auto !important;
    flex-wrap: wrap !important;
    row-gap: 8px !important;
  }
  html.mdos .mari-editor-shell .mari-editor-content {
    padding: 16px 14px 40px !important;
  }
}

/* Phone composer: a little tighter so the bottom row fits; the row scrolls
   sideways if a chat has many tools. */
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] {
  padding: 12px 10px 8px !important;
  column-gap: 4px !important;
}
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] > :is(button, div > button, .mdos-qp-plus):not(:last-child),
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] > div > button {
  width: 36px !important;
  height: 36px !important;
  min-width: 36px;
}
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] > button[aria-haspopup="dialog"][data-mh-link],
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] > div > button[aria-haspopup="dialog"][data-mh-link] {
  width: auto !important;
  max-width: 30vw;
  padding: 0 12px !important;
}
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] > div {
  gap: 4px !important;
}


/* ══ Chat list panel, redesigned (phones and tablets) ═════════ */
/* A clean messenger list: the app's name as a big title with small round
   actions beside it, an iOS segmented control for the mode, one rounded
   search field, compact sort and "new folder", flat rows. */
html.mdos-touch aside[data-component="ChatSidebarPanel"],
html.mdos-touch .mari-chat-sidebar {
  background-color: var(--mdos-win-bg, var(--background)) !important;
}
html.mdos-touch .mari-chat-sidebar {
  position: relative;
}
/* Title row */
html.mdos-touch .mari-chat-sidebar .mari-sidebar-header {
  height: auto !important;
  min-height: 58px;
  padding: 12px 16px 4px !important;
  align-items: center !important;
  background: transparent !important;
  border: 0 !important;
}
html.mdos-touch .mari-chat-sidebar .mari-sidebar-header {
  height: 58px !important;
  min-height: 0 !important;
  box-sizing: border-box;
}
html.mdos-touch .mari-chat-sidebar .mari-sidebar-header h2 {
  margin: 0 !important;
  line-height: 1 !important;
  display: flex;
  align-items: center;
}
html.mdos-touch .mari-chat-sidebar .mari-sidebar-header h2[data-mdos-title]:not([data-mdos-title=""]) {
  font-size: 0 !important;
}
html.mdos-touch .mari-chat-sidebar .mari-sidebar-header h2[data-mdos-title]:not([data-mdos-title=""])::before {
  content: attr(data-mdos-title);
  font: 800 30px/1.1 var(--mdos-font);
  letter-spacing: -0.025em;
  color: var(--foreground, var(--mdos-fg));
}
html.mdos-touch .mari-chat-sidebar .mari-sidebar-header button:not([data-mh-x]) {
  display: none !important;
}
html.mdos-touch .mari-chat-sidebar .mari-sidebar-header button[data-mh-x] {
  width: 34px !important;
  height: 34px !important;
  min-height: 34px !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 999px !important;
  background: color-mix(in srgb, var(--foreground, #000) 7%, transparent) !important;
  box-shadow: none !important;
}
/* New / import / select: small round buttons in the title row. */
html.mdos-touch .mari-chat-sidebar > div[data-mh-actions] {
  position: absolute !important;
  z-index: 5;
  /* Level with the header's ✕: header 58px tall from a 12px top padding,
     both 34px tall and centred → 16px. */
  top: 16px;
  right: 60px;
  display: flex !important;
  gap: 6px !important;
  padding: 0 !important;
  margin: 0 !important;
}
html.mdos-touch .mari-chat-sidebar > div[data-mh-actions] > button {
  flex: none !important;
  width: 34px !important;
  height: 34px !important;
  min-height: 34px !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 999px !important;
  background: color-mix(in srgb, var(--foreground, #000) 7%, transparent) !important;
  box-shadow: none !important;
  color: var(--foreground, var(--mdos-fg)) !important;
}
html.mdos-touch .mari-chat-sidebar > div[data-mh-actions] > .mari-chat-mode-action {
  background: var(--mdos-accent, #0078d4) !important;
  color: #fff !important;
  order: 9;
}
html.mdos-touch .mari-chat-sidebar > div[data-mh-actions] > button svg {
  width: 17px !important;
  height: 17px !important;
  color: currentColor !important;
}
/* Mode switcher: an iOS segmented control. */
html.mdos-touch .mari-chat-sidebar .mari-chrome-segmented[data-mh-tabs] {
  margin: 6px 16px 8px !important;
  padding: 2px !important;
  height: 34px;
  border: 0 !important;
  border-radius: 8px !important;
  background: color-mix(in srgb, var(--foreground, #000) 8%, transparent) !important;
  box-shadow: none !important;
}
html.mdos-touch .mari-chat-sidebar [data-chat-mode-tab] {
  height: 30px !important;
  min-height: 30px !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 8px !important;
  background: transparent !important;
  box-shadow: none !important;
}
html.mdos-touch .mari-chat-sidebar [data-chat-mode-tab][aria-pressed="true"] {
  background: var(--mdos-win-bg, #fff) !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.14), 0 0 0 0.5px rgba(0, 0, 0, 0.06) !important;
}
html.mdos-touch .mari-chat-sidebar [data-chat-mode-tab] svg {
  width: 17px !important;
  height: 17px !important;
}
/* Search: one rounded grey field; sort a small pill; the global search a round button. */
html.mdos-touch .mari-chat-sidebar input.mari-chrome-field {
  height: 38px !important;
  border: 0 !important;
  border-radius: 8px !important;
  background: color-mix(in srgb, var(--foreground, #000) 7%, transparent) !important;
  box-shadow: none !important;
  font-size: 15px !important;
}
html.mdos-touch .mari-chat-sidebar select.mari-chrome-sort-field {
  height: 38px !important;
  border: 0 !important;
  border-radius: 8px !important;
  background-color: color-mix(in srgb, var(--foreground, #000) 7%, transparent) !important;
  box-shadow: none !important;
  font-size: 13px !important;
}
html.mdos-touch .mari-chat-sidebar :is(input.mari-chrome-field, select.mari-chrome-sort-field) ~ button.mari-chrome-control--small,
html.mdos-touch .mari-chat-sidebar div[data-mh-field] ~ button.mari-chrome-control--small {
  width: 38px !important;
  height: 38px !important;
  min-height: 38px !important;
  border: 0 !important;
  border-radius: 8px !important;
  background: color-mix(in srgb, var(--foreground, #000) 7%, transparent) !important;
  box-shadow: none !important;
}
/* "New folder": a small text button instead of a full-width bar. */
html.mdos-touch .mari-chat-sidebar button.mari-chrome-control--small[data-mh-folderplus] {
  width: auto !important;
  height: 28px !important;
  min-height: 28px !important;
  margin: 2px 0 2px auto !important;
  padding: 0 10px !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: var(--mdos-accent, #0078d4) !important;
  font-size: 13px !important;
}
/* Rows: flat, the open chat a soft tint (not a solid block). */
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"] {
  margin-inline: 8px !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"][data-mh-current] {
  background: color-mix(in srgb, var(--mdos-accent, #0078d4) 14%, transparent) !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"][data-mh-current] :is(span, svg, button) {
  color: inherit !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"][data-mh-current] > .min-w-0.flex-1 > span:first-child {
  color: var(--mdos-accent, #0078d4) !important;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"][data-mh-current] .mdos-preview {
  color: var(--muted-foreground, inherit) !important;
}

/* ── Chat pictures: Marinara draws them in a 28px box (one more wrapper
   inside the slot); the whole box is scaled up so single pictures, groups
   and mode icons all grow evenly, then shaped per app. ── */
html.mdos .mari-chat-sidebar [data-drag-kind="chat"] {
  --avs: 1.5;
}
html.mdos-touch .mari-chat-sidebar [data-drag-kind="chat"] {
  --avs: 1.7;
}
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] {
  --avs: 1.8;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] {
  --avs: 1.9;
}
html.mdos .mari-chat-sidebar [data-drag-kind="chat"] > .relative.flex-shrink-0 {
  width: calc(28px * var(--avs)) !important;
  height: calc(28px * var(--avs)) !important;
  display: grid !important;
  place-items: center;
}
html.mdos .mari-chat-sidebar [data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child {
  width: 28px !important;
  height: 28px !important;
  transform: scale(var(--avs));
  transform-origin: center;
}
html.mdos .mari-chat-sidebar [data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child > span.rounded-lg {
  width: 100% !important;
  height: 100% !important;
}
html.mdos .mari-chat-sidebar [data-drag-kind="chat"] > .relative.flex-shrink-0 img {
  transform: none;
}
/* Conversation: round. */
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] > .relative.flex-shrink-0 :is(span.rounded-lg, .mari-chat-mode-avatar, div.rounded-lg),
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] > .relative.flex-shrink-0 img {
  border-radius: 50% !important;
}
/* Game: app icons. */
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .relative.flex-shrink-0 :is(span.rounded-lg, .mari-chat-mode-avatar, div.rounded-lg) {
  border-radius: 4px !important;
}
/* Roleplay: book covers — taller than wide, a spine shadow. */
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] {
  --avs: 1.65;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 {
  height: calc(39px * var(--avs)) !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child {
  height: 39px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 :is(span.rounded-lg, .mari-chat-mode-avatar, div.rounded-lg) {
  height: 100% !important;
  border-radius: 1.5px 4px 4px 1.5px !important;
  box-shadow:
    inset 2px 0 0 rgba(0, 0, 0, 0.2),
    0 2px 5px -2px rgba(0, 0, 0, 0.4) !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list] [data-drag-kind="chat"] > .relative.flex-shrink-0 > .mari-chat-mode-avatar {
  width: 28px !important;
  height: 28px !important;
}

/* ── Composer switchers: one model pill + persona everywhere ─── */
/* Phones got Marinara's combined quick switcher (^) as well as the model pill
   (shown by this theme): the quick switcher goes, the model pill and the
   persona button show on every screen size, in conversation and roleplay. */
html.mdos .marinara-chat-input-shell[data-mh-composer] > div[class~="sm:hidden"] {
  display: none !important;
}
html.mdos .marinara-chat-input-shell[data-mh-composer] > [class~="sm:flex"] {
  display: flex !important;
}

/* ══ Chat apps: Messages · Books · Games (2.19) ═══════════════════
   Conversation, Roleplay and Game are separate apps, each after a Mac app.
   The list keeps the theme's surface and decorations (pattern, images);
   each app only tints its colour, shapes its rows and names itself. */

/* Theme decorations live on the list itself, not twice on phones. */
html.mdos-touch aside[data-component="ChatSidebarPanel"] {
  background-image: none !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list] {
  --app-ink: var(--foreground, var(--mdos-fg));
  --app-muted: var(--muted-foreground, var(--mdos-fg-2));
  --app-accent: var(--marinara-app-accent-solid, var(--primary, var(--mdos-accent)));
  --app-line: color-mix(in srgb, var(--app-ink) 10%, transparent);
  --app-serif: Georgia, Cambria, "Noto Serif KR", "Nanum Myeongjo", "Noto Serif KR", Georgia, serif;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] {
  background-color: color-mix(in srgb, var(--card, #fffdf7) 55%, var(--background, #f4f0e7)) !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] {
  background-color: color-mix(in srgb, var(--marinara-app-accent-solid, var(--primary, #7aa7c7)) 9%, var(--card, var(--background, #fff))) !important;
}

/* ── Desktop: window chrome per app ── */
/* The header's small "Chats" goes; Books and Games get a big title of their
   own under the lights (Messages has none, like the Mac app). */
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list] .mari-sidebar-header h2 {
  visibility: hidden;
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list] .mari-sidebar-header button.cursor-help {
  display: none !important;
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar:is([data-mdos-list="roleplay"], [data-mdos-list="game"]) > :not(.mari-sidebar-header) {
  order: 2;
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar:is([data-mdos-list="roleplay"], [data-mdos-list="game"])::before {
  order: 1;
  content: attr(data-mdos-big);
  display: block;
  padding: 0 18px 2px;
  color: var(--app-ink);
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list="roleplay"]::before {
  font: 700 23px/1.25 var(--app-serif);
  letter-spacing: -0.01em;
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list="game"]::before {
  font: 800 23px/1.25 var(--mdos-font);
  letter-spacing: -0.025em;
}
/* Messages: "new" is a compose glyph like the Mac app (drawn with a mask on
   the button: themes may switch its pseudo-elements off); Books and Games
   keep the small filled accent "+". */
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list="conversation"] > div[data-mh-actions] > .mari-chat-mode-action {
  background: var(--app-muted) !important;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271.9%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6%27/%3E%3Cpath d=%27M17.6 3.4a2 2 0 0 1 2.9 2.9L12 14.8l-3.6.8.8-3.6z%27/%3E%3C/svg%3E") center / 17px no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%271.9%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6%27/%3E%3Cpath d=%27M17.6 3.4a2 2 0 0 1 2.9 2.9L12 14.8l-3.6.8.8-3.6z%27/%3E%3C/svg%3E") center / 17px no-repeat;
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list="conversation"] > div[data-mh-actions] > .mari-chat-mode-action:hover {
  background: var(--app-ink) !important;
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list="conversation"] > div[data-mh-actions] > .mari-chat-mode-action > * {
  opacity: 0;
}
/* Search: one rounded field, sort as quiet text. */
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list] input.mari-chrome-field {
  border-radius: 8px !important;
  border: 0 !important;
  background-color: color-mix(in srgb, var(--app-ink) 7%, transparent) !important;
  box-shadow: none !important;
}
html.mdos-desktop [data-mdos-win="chats"] .mari-chat-sidebar[data-mdos-list] select.mari-chrome-field {
  border: 0 !important;
  background-color: transparent !important;
  box-shadow: none !important;
  color: var(--app-muted) !important;
}
/* The presence bar ("Active / what are you doing?") belongs to Messages. */
html.mdos .mari-chat-sidebar:is([data-mdos-list="roleplay"], [data-mdos-list="game"]) > div.border-t:last-child {
  display: none !important;
}
/* Chat window title: Messages already shows Marinara's header (people and
   call button), so no second name over it. Books set the name in serif. */
html[data-mdos-chatapp="conversation"] .mdos-chat-title {
  display: none !important;
}
html[data-mdos-chatapp="roleplay"] .mdos-chat-title {
  font: 600 14px/1 Georgia, Cambria, "Noto Serif KR", "Nanum Myeongjo", "Noto Serif KR", Georgia, serif;
  letter-spacing: 0;
}
html[data-mdos-chatapp="game"] .mdos-chat-title {
  font-weight: 750;
}

/* ── Rows (every screen) ── */
.mdos-sub {
  display: block;
  margin-top: 3px;
  font-size: 11.5px;
  line-height: 1.3;
  color: var(--app-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* Messages: round pictures, name + time, two grey preview lines; the open
   chat is the filled accent row. */
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] {
  --avs: 1.6;
  min-height: 66px;
  padding: 8px 10px !important;
  gap: 11px !important;
  margin: 0 4px !important;
  border-radius: 8px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"] > .min-w-0.flex-1 > span:first-child {
  font-size: 14px !important;
  font-weight: 650 !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"]::after {
  left: 66px;
  background: var(--app-line);
}
/* (Phones keep their light accent tint for the open chat.) */
html.mdos-desktop .mari-chat-sidebar[data-mdos-list="conversation"] [data-drag-kind="chat"][data-mh-current] {
  background: var(--app-accent) !important;
}

/* Groups: Marinara overlaps small square pictures; in Messages and Games
   they are round (no circle cut out of a rounded square), the status dot too. */
html.mdos .mari-chat-sidebar[data-mdos-list] [data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child[data-mh-duo] {
  border-radius: 0 !important;
  overflow: visible !important;
}
html.mdos .mari-chat-sidebar:is([data-mdos-list="conversation"], [data-mdos-list="game"]) [data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child[data-mh-duo] > *,
html.mdos .mari-chat-sidebar:is([data-mdos-list="conversation"], [data-mdos-list="game"]) [data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child[data-mh-duo] > * > img {
  border-radius: 50% !important;
}

/* Books: covers (2:3, a spine shadow), serif titles, "read 2 weeks ago";
   the open book is marked with a ribbon, not a filled row. */
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] {
  --avs: 1.45;
  min-height: 76px;
  padding: 8px 12px !important;
  gap: 13px !important;
  margin: 0 6px !important;
  border-radius: 8px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 {
  width: 41px !important;
  height: 58px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 > :first-child {
  width: 28px !important;
  height: 40px !important;
}
/* Marinara's crop is worked out for a square box; on a cover it stretches
   the picture, so covers fill and crop themselves. */
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 img {
  position: absolute !important;
  inset: 0 !important;
  left: 0 !important;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: 50% 22% !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .relative.flex-shrink-0 :is(span.rounded-lg, .mari-chat-mode-avatar, div.rounded-lg) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 1.5px 3.5px 3.5px 1.5px !important;
  box-shadow:
    inset 2px 0 0 rgba(0, 0, 0, 0.22),
    inset 3px 0 0 rgba(255, 255, 255, 0.18),
    0 3px 6px -2px rgba(0, 0, 0, 0.35) !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"] > .min-w-0.flex-1 > span:first-child {
  font-family: var(--app-serif) !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  letter-spacing: 0;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"]::after {
  left: 66px;
  right: 14px;
  background: var(--app-line);
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"][data-mh-current] {
  background: color-mix(in srgb, var(--app-accent) 15%, transparent) !important;
}
html.mdos .mari-chat-sidebar:is([data-mdos-list="roleplay"], [data-mdos-list="game"]) [data-drag-kind="chat"][data-mh-current] :is(span, svg, button) {
  color: var(--app-ink) !important;
}
html.mdos .mari-chat-sidebar:is([data-mdos-list="roleplay"], [data-mdos-list="game"]) [data-drag-kind="chat"][data-mh-current] .mdos-sub {
  color: var(--app-muted) !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="roleplay"] [data-drag-kind="chat"][data-mh-current]::before {
  content: "";
  position: absolute;
  top: 0;
  right: 16px;
  width: 9px;
  height: 18px;
  background: var(--app-accent);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%);
  pointer-events: none;
}

/* The open chat's background art behind the row would grey out the ribbon
   and the ring; Books and Games mark the open chat their own way. */
html.mdos .mari-chat-sidebar:is([data-mdos-list="roleplay"], [data-mdos-list="game"]) [data-drag-kind="chat"] > span.pointer-events-none.absolute[data-mh-img] {
  display: none !important;
}

/* Games: each game a card with an app-icon picture; the open game gets an
   accent ring. */
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] {
  --avs: 1.72;
  min-height: 70px;
  margin: 5px 8px !important;
  padding: 10px 12px !important;
  gap: 12px !important;
  border-radius: 8px !important;
  background: color-mix(in srgb, var(--card, #fff) 82%, transparent) !important;
  border: 1px solid var(--app-line) !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 6px 14px -10px rgba(0, 0, 0, 0.3) !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"]::after {
  display: none;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .relative.flex-shrink-0 :is(span.rounded-lg, .mari-chat-mode-avatar, div.rounded-lg) {
  border-radius: 7.5px !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"] > .min-w-0.flex-1 > span:first-child {
  font-size: 14.5px !important;
  font-weight: 750 !important;
}
html.mdos .mari-chat-sidebar[data-mdos-list="game"] [data-drag-kind="chat"][data-mh-current] {
  background: color-mix(in srgb, var(--card, #fff) 92%, var(--app-accent)) !important;
  border-color: var(--app-accent) !important;
  box-shadow: 0 0 0 1.5px var(--app-accent), 0 8px 18px -12px var(--app-accent) !important;
}

/* ── Desktop: one window, the list slides out from behind the chat ── */
/* The list sits under the chat (tucked behind its left edge while closed),
   so opening slides it out from there; the chat's shadow is clipped at the
   seam so the two read as one window. */
html.mdos-pane-ready [data-mdos-win="chats"] {
  z-index: calc(var(--mdos-main-z, 11) - 1) !important;
}
html.mdos-pane-ready [data-mdos-win="chats"][aria-hidden="true"] {
  transform: none !important;
}
html.mdos-pane [data-mdos-win="main"] {
  clip-path: inset(-120px -120px -120px 0);
}

/* ── Composer: no square box around the text ── */
/* Some themes give every textarea a border colour; the composer's field sits
   inside the rounded bar, so it gets no border, ring or outline. */
html.mdos .marinara-chat-input-shell > textarea,
html.mdos .mari-chat-input-box > textarea {
  border: 0 !important;
  box-shadow: none !important;
  outline: none !important;
}

/* ── Phones: the folded composer keeps the composer's shape ── */
/* Scrolling back, Marinara folds the composer into a "show the message box"
   button. It used to turn into a tall white box: it now keeps the open
   composer's place, colour, top corners and height (desktop.js measures the
   open one into --mdos-composer-h), with the placeholder where the text goes. */
html.mdos-touch:not(.mdos-tablet) :is(.mari-chat-input, .chat-input-container)[data-mh-folded] {
  padding: 0 !important;
}
html.mdos-touch:not(.mdos-tablet) button.marinara-chat-input-shell {
  margin: 0 !important;
  width: 100% !important;
  min-height: var(--mdos-composer-h, calc(env(safe-area-inset-bottom, 0px) + 112px)) !important;
  box-sizing: border-box !important;
  display: flex !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  padding: 16px 18px calc(env(safe-area-inset-bottom, 0px) + 20px) !important;
  border-radius: 8px 8px 0 0 !important;
  border: 0 !important;
  border-top: 1px solid color-mix(in srgb, var(--mdos-fg, #000) 12%, transparent) !important;
  background: var(--mdos-win-bg, #fff) !important;
  box-shadow: 0 -6px 20px -14px rgba(0, 0, 0, 0.35) !important;
  font-size: 16px !important;
  line-height: 1.5 !important;
  text-align: left !important;
  color: var(--muted-foreground, var(--mdos-fg-2)) !important;
}
html.mdos-touch:not(.mdos-tablet):is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area button.marinara-chat-input-shell {
  border-top-color: color-mix(in srgb, var(--mdos-ink) 14%, transparent) !important;
}
/* The pinned buttons belong to the open composer. */
button.marinara-chat-input-shell > .mdos-qp-chips {
  display: none !important;
}

/* ── Phones: list / menu buttons as one capsule (2.22.1) ── */
/* One glass capsule holding both icons with a hairline between them, like
   iOS's grouped toolbar buttons: a single element, so the two can never
   overlap, whatever restyles a button on the page. The buttons themselves
   draw nothing (no background, ring, shadow or scale of their own). */
html.mdos-touch #mdos-tctl {
  gap: 0 !important;
  align-items: center !important;
  height: 38px;
  padding: 0 3px !important;
  box-sizing: border-box;
  border-radius: 999px;
  background: color-mix(in srgb, var(--background, #fff) 74%, transparent);
  backdrop-filter: blur(16px) saturate(170%);
  -webkit-backdrop-filter: blur(16px) saturate(170%);
  box-shadow:
    0 2px 10px -3px rgba(0, 0, 0, 0.25),
    inset 0 0 0 0.5px color-mix(in srgb, var(--foreground, #000) 16%, transparent);
}
html.mdos-touch #mdos-tctl > .mdos-tctl-btn {
  all: unset !important;
  position: relative !important;
  display: grid !important;
  place-items: center !important;
  flex: none !important;
  width: 38px !important;
  min-width: 38px !important;
  height: 32px !important;
  box-sizing: border-box !important;
  border-radius: 999px !important;
  color: var(--foreground, var(--mdos-fg)) !important;
  -webkit-tap-highlight-color: transparent !important;
  cursor: var(--mdos-cur-ptr, pointer) !important;
}
html.mdos-touch #mdos-tctl > .mdos-tctl-btn:active {
  background: color-mix(in srgb, var(--foreground, #000) 10%, transparent) !important;
}
html.mdos-touch #mdos-tctl > .mdos-tctl-btn + .mdos-tctl-btn::before {
  content: "";
  position: absolute;
  left: -0.5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: color-mix(in srgb, var(--foreground, #000) 16%, transparent);
}
html.mdos-touch #mdos-tctl > .mdos-tctl-btn svg {
  width: 19px !important;
  height: 19px !important;
}

/* Roleplay agent bar (Relationship Tracker and other agent buttons): on
   phones it is a row across the top of the chat, fixed in the layout (not a
   draggable bubble), and the capsule covered its first button. The row now
   starts to the right of the capsule. */
html.mdos-touch:not(.mdos-tablet):not(.mdos-touch-home):not(.mdos-touch-app):not(.mdos-touch-panel) [data-roleplay-agent-window] {
  padding-left: 96px !important;
}

/* ── Desktop: Marinara's chat bubbles inside the chat window ── */
/* Chat settings / tracker bubbles (and the windows they open) are fixed at
   screen coordinates, but the chat window is their containing block, so they
   landed one window-offset away (often off-screen). Shift them back. */
html.mdos-desktop [data-mdos-win="main"] :is(.mari-window-bubble, .mari-window.fixed) {
  translate: calc(-1 * var(--mdos-main-x, 0px)) calc(-1 * var(--mdos-main-y, 0px));
}

/* ══ Model picker (2.20) ══════════════════════════════════════════
   A Mac panel in the theme's colours: a quiet title bar, the current model
   as a tinted strip, one Spotlight-style search field, the sources as a Mac
   source list on the left and the models as one-line rows on the right
   (name, provider, price), the current one tinted with a check. On a
   computer it opens centred, clear of the menu bar. Phones keep the bottom
   sheet (above) with the same rows. */
html.mdos [data-quick-connection-menu] {
  --mp-ink: var(--foreground, var(--mdos-fg));
  --mp-muted: var(--muted-foreground, var(--mdos-fg-2));
  --mp-accent: var(--marinara-app-accent-solid, var(--primary, var(--mdos-accent, #0078d4)));
  --mp-bg: var(--card, var(--mdos-win-bg, #fff));
  --mp-fill: color-mix(in srgb, var(--mp-ink) 6%, transparent);
  --mp-line: color-mix(in srgb, var(--mp-ink) 10%, transparent);
  padding: 0 !important;
  border: 0 !important;
  border-radius: 8px !important;
  background: var(--mp-bg) !important;
  color: var(--mp-ink) !important;
  box-shadow:
    0 30px 80px -20px rgba(0, 0, 0, 0.45),
    0 0 0 0.5px color-mix(in srgb, var(--mp-ink) 22%, transparent) !important;
}
html.mdos:not(.mdos-touch) [data-quick-connection-menu] {
  left: 50% !important;
  top: calc(50% + 15px) !important;
  translate: -50% -50%;
  width: min(780px, calc(100vw - 48px)) !important;
  height: min(580px, calc(100dvh - 110px)) !important;
  max-height: none !important;
}
/* Title bar */
html.mdos [data-quick-connection-menu] > div:first-child {
  min-height: 44px;
  padding: 0 8px 0 18px !important;
  border-bottom: 1px solid var(--mp-line);
}
html.mdos [data-quick-connection-menu] > div:first-child h2 {
  font-size: 13.5px !important;
  font-weight: 650 !important;
  letter-spacing: -0.005em;
}
html.mdos [data-quick-connection-menu] > div:first-child > button {
  width: 30px !important;
  height: 30px !important;
  border-radius: 8px !important;
  color: var(--mp-muted) !important;
  background: transparent !important;
}
html.mdos [data-quick-connection-menu] > div:first-child > button:hover {
  background: var(--mp-fill) !important;
  color: var(--mp-ink) !important;
}
html.mdos [data-quick-connection-menu] > div:first-child > button svg {
  width: 16px !important;
  height: 16px !important;
}

/* The current model: a tinted strip. */
html.mdos [data-quick-connection-menu] [data-switcher-section="now"] {
  margin: 12px 14px 0 !important;
  padding: 2px 6px 2px 4px !important;
  border: 0 !important;
  border-radius: 8px !important;
  background: color-mix(in srgb, var(--mp-accent) 11%, transparent) !important;
  box-shadow: none !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-section="now"] .mari-connection-model-choice {
  min-height: 52px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-section="now"] [data-model-title] {
  font-size: 15px !important;
  font-weight: 700 !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-default] {
  height: 28px !important;
  min-height: 0 !important;
  padding: 0 11px !important;
  border: 0 !important;
  border-radius: 999px !important;
  background: color-mix(in srgb, var(--mp-bg) 70%, transparent) !important;
  color: var(--mp-muted) !important;
  font-size: 12px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-default]:hover {
  color: var(--mp-ink) !important;
}

/* Search: one Spotlight-style field. */
html.mdos [data-quick-connection-menu] [data-connection-switcher] > .mari-chrome-field {
  margin: 10px 14px 12px !important;
  min-height: 38px !important;
  border: 0 !important;
  border-radius: 8px !important;
  background: var(--mp-fill) !important;
  box-shadow: none !important;
}
html.mdos [data-quick-connection-menu] [data-connection-switcher] > .mari-chrome-field:focus-within {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--mp-accent) 28%, transparent) !important;
}
html.mdos [data-quick-connection-menu] [data-connection-switcher] > .mari-chrome-field label {
  min-height: 38px !important;
  padding-inline: 12px !important;
}
html.mdos [data-quick-connection-menu] input[data-switcher-search] {
  height: 38px !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  font-size: 14.5px !important;
  color: var(--mp-ink) !important;
}

/* Two panes: a source list and the models. */
html.mdos [data-quick-connection-menu] [data-switcher-panes] {
  border-top: 1px solid var(--mp-line) !important;
}
html.mdos:not(.mdos-touch) [data-quick-connection-menu] [data-switcher-accounts] {
  flex: 0 0 218px !important;
  width: 218px !important;
  background: color-mix(in srgb, var(--mp-ink) 3.5%, transparent);
  border-right: 1px solid var(--mp-line);
}
html.mdos [data-quick-connection-menu] [data-switcher-accounts] > div:last-child {
  border-top: 1px solid var(--mp-line) !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-section="accounts"] > p {
  padding: 12px 10px 4px !important;
  font-size: 11px !important;
  font-weight: 650 !important;
  letter-spacing: 0.02em;
  color: var(--mp-muted) !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane] {
  min-height: 32px !important;
  margin: 1px 0 !important;
  padding: 4px 8px !important;
  gap: 9px !important;
  border-radius: 4px !important;
  background: transparent !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  color: var(--mp-ink) !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane]::before {
  display: none !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane]:hover {
  background: var(--mp-fill) !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane][aria-pressed="true"] {
  background: color-mix(in srgb, var(--mp-accent) 16%, transparent) !important;
  color: var(--mp-accent) !important;
  font-weight: 650 !important;
}
/* Source rows: the name on one line, the detail as one small grey line. */
html.mdos [data-quick-connection-menu] [data-switcher-pane] strong {
  display: block !important;
  font-size: 13px !important;
  font-weight: inherit !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: unset !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane] strong ~ * {
  font-size: 11px !important;
  color: var(--mp-muted) !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane] .mari-provider-icon {
  width: 20px !important;
  height: 20px !important;
  border-radius: 4px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-add] {
  min-height: 30px !important;
  border-radius: 4px !important;
  font-size: 12.5px !important;
  color: var(--mp-muted) !important;
}

/* Models pane heading. */
html.mdos [data-quick-connection-menu] [data-switcher-pane-models] > div:nth-child(2) {
  padding: 12px 16px 6px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane-models] > div:nth-child(2) strong {
  font-size: 15px !important;
  font-weight: 700 !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane-models] > div:nth-child(2) span {
  font-size: 12px !important;
  color: var(--mp-muted) !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-edit-order],
html.mdos [data-quick-connection-menu] [data-switcher-search-all] {
  min-height: 26px !important;
  padding: 0 8px !important;
  border-radius: 4px !important;
  font-size: 12px !important;
  color: var(--mp-accent) !important;
}

/* Model rows: one line for the name, one small line for the provider, the
   price as quiet text, the settings button on hover, the star when set. */
html.mdos [data-quick-connection-menu] [data-switcher-section]:not([data-switcher-section="now"]) {
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border-radius: 0 !important;
}
html.mdos [data-quick-connection-menu] .mari-connection-model {
  align-items: center !important;
  margin: 1px 4px !important;
  padding-right: 4px !important;
  border-radius: 8px !important;
  background: transparent !important;
  box-shadow: none !important;
}
html.mdos [data-quick-connection-menu] .mari-connection-model::before {
  display: none !important;
}
html.mdos [data-quick-connection-menu] .mari-connection-model:hover {
  background: var(--mp-fill) !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-section]:not([data-switcher-section="now"]) .mari-connection-model[data-mh-chosen] {
  background: color-mix(in srgb, var(--mp-accent) 13%, transparent) !important;
}
html.mdos [data-quick-connection-menu] .mari-connection-model-choice {
  min-height: 46px !important;
  padding: 5px 8px !important;
  gap: 11px !important;
}
html.mdos [data-quick-connection-menu] .mari-connection-model-choice .mari-provider-icon {
  width: 28px !important;
  height: 28px !important;
  border-radius: 4px !important;
}
html.mdos [data-quick-connection-menu] [data-connection-model-copy] {
  flex: 1 1 auto !important;
  min-width: 0 !important;
}
html.mdos [data-quick-connection-menu] [data-model-title] {
  display: block !important;
  -webkit-line-clamp: unset !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  font-size: 13.5px !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;
}
html.mdos [data-quick-connection-menu] [data-connection-model-copy] > span:not([data-model-title]) {
  margin-top: 1px !important;
  flex-wrap: nowrap !important;
  overflow: hidden;
  font-size: 11.5px !important;
  line-height: 1.3 !important;
  color: var(--mp-muted) !important;
}
html.mdos [data-quick-connection-menu] [data-connection-model-copy] > span:not([data-model-title]) * {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
html.mdos [data-quick-connection-menu] .mari-connection-model-choice[aria-current="true"] [data-model-title] {
  color: var(--mp-accent) !important;
}
/* Role badges (Agents…) go, warnings (no key…) stay; the price is text. */
html.mdos [data-quick-connection-menu] [data-connection-badges] > [data-connection-role]:not([data-mh-warn]) {
  display: none !important;
}
html.mdos [data-quick-connection-menu] [data-model-cost] {
  border: 0 !important;
  padding: 2px 7px !important;
  border-radius: 4px !important;
  background: var(--mp-fill) !important;
  color: var(--mp-muted) !important;
  font-size: 11px !important;
  font-variant-numeric: tabular-nums;
}
html.mdos [data-quick-connection-menu] .mari-connection-model svg.lucide-check {
  width: 16px !important;
  height: 16px !important;
  stroke-width: 2.6;
  color: var(--mp-accent) !important;
}
html.mdos [data-quick-connection-menu] :is([data-switcher-settings], [data-switcher-star]) {
  width: 30px !important;
  height: 30px !important;
  min-width: 30px !important;
  border-radius: 8px !important;
  color: var(--mp-muted) !important;
  background: transparent !important;
}
html.mdos [data-quick-connection-menu] :is([data-switcher-settings], [data-switcher-star]):hover {
  background: var(--mp-fill) !important;
  color: var(--mp-ink) !important;
}
html.mdos [data-quick-connection-menu] :is([data-switcher-settings], [data-switcher-star]) svg {
  width: 15px !important;
  height: 15px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-star][aria-pressed="true"] {
  color: #f5b301 !important;
}
html.mdos:not(.mdos-touch) [data-quick-connection-menu] .mari-connection-model:not(:hover):not(:focus-within) :is([data-switcher-settings], [data-switcher-star]:not([aria-pressed="true"])) {
  opacity: 0;
}

/* ── Model picker: tighter (2.20.2) ── */
/* Less padding everywhere, small source icons, "Edit order" on the heading
   line instead of a row of its own, thin scrollbars. */
html.mdos [data-quick-connection-menu] [data-switcher-section="now"] {
  margin: 10px 12px 0 !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-section="now"] .mari-connection-model-choice {
  min-height: 46px !important;
}
html.mdos [data-quick-connection-menu] [data-connection-switcher] > .mari-chrome-field {
  margin: 8px 12px 10px !important;
  min-height: 34px !important;
}
html.mdos [data-quick-connection-menu] [data-connection-switcher] > .mari-chrome-field label,
html.mdos [data-quick-connection-menu] input[data-switcher-search] {
  min-height: 34px !important;
  height: 34px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-accounts] .overflow-y-auto,
html.mdos [data-quick-connection-menu] [data-connection-switcher-scroll] {
  padding: 4px 6px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane] {
  min-height: 30px !important;
  padding: 3px 8px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane] > span:first-child {
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
  margin: 0 !important;
  border-radius: 4px !important;
  background: transparent !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane] > span:first-child svg {
  width: 15px !important;
  height: 15px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane] > span:first-child[data-mh-provider] {
  width: 20px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-section="accounts"] > p {
  padding: 10px 8px 2px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane-models] {
  position: relative;
}
html.mdos [data-quick-connection-menu] [data-switcher-pane-models] > div:nth-child(2) {
  min-height: 0 !important;
  padding: 9px 96px 5px 14px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-edit-order] {
  position: absolute !important;
  top: 6px;
  right: 12px;
  z-index: 2;
  margin: 0 !important;
  min-height: 26px !important;
}
html.mdos [data-quick-connection-menu] .mari-connection-model-choice {
  min-height: 42px !important;
  padding: 4px 8px !important;
}
html.mdos [data-quick-connection-menu] .mari-connection-model {
  margin: 0 2px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-add] {
  min-height: 28px !important;
}
html.mdos [data-quick-connection-menu] [data-switcher-accounts] > div:last-child {
  padding: 3px 4px !important;
}
html.mdos [data-quick-connection-menu] * {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--mp-ink) 22%, transparent) transparent;
}
html.mdos [data-quick-connection-menu] ::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}
html.mdos [data-quick-connection-menu] ::-webkit-scrollbar-track {
  background: transparent !important;
}
html.mdos [data-quick-connection-menu] ::-webkit-scrollbar-thumb {
  border: 0 !important;
  border-radius: 3px !important;
  background: color-mix(in srgb, var(--mp-ink) 22%, transparent) !important;
}

/* ── Extensions: who gathers (built in / the 확장 보관함 extension) ── */
.mdos-lk-engine-box {
  display: grid;
  gap: 6px;
  padding-bottom: 10px;
  margin-bottom: 4px;
  border-bottom: 1px solid var(--mdos-sep, rgba(127, 127, 127, 0.2));
}
.mdos-lk-engine-box h4 {
  margin: 0;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.02em;
  opacity: 0.6;
}
.mdos-lk-engine {
  width: 100%;
  background: color-mix(in srgb, currentColor 9%, transparent);
}
.mdos-lk-engine .mdos-seg-btn {
  min-height: 26px;
}
.mdos-lk-engine .mdos-seg-btn {
  flex: 1 1 0;
}
.mdos-lk-engine .mdos-seg-btn.is-on {
  background: color-mix(in srgb, currentColor 24%, transparent);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  color: inherit;
  font-weight: 650;
}
.mdos-lk-hint {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.45;
  opacity: 0.7;
}
.mdos-lk-note .mdos-btn {
  margin-left: 6px;
  vertical-align: middle;
}
`,
  String.raw`/* ══════════════ touch.css ══════════════ */
/* ──────────────────────────────────────────────────────────────
   Marinara Desktop — phones and touch tablets.

   Marinara already shows one thing at a time on touch screens (full-
   screen sheets). We turn its Home into a phone-style home screen:
   widgets and an app grid over the wallpaper (#mdos-sb), a floating
   Dock, and a home indicator bar in every app to get back.

   html.mdos-touch       — phone or touch tablet
   html.mdos-tablet      — touch screen at least 700 px wide
   html.mdos-touch-home  — the home screen is showing (no sheet open)
   ────────────────────────────────────────────────────────────── */

html.mdos-touch {
  --mdos-sb-icon: 60px;
  --mdos-sb-cols: 4;
  --mdos-sb-wcols: 2;
}
html.mdos-tablet {
  --mdos-sb-icon: 72px;
  --mdos-sb-cols: 6;
  --mdos-sb-wcols: 4;
}

/* ── Home screen ─────────────────────────────────────────────── */

/* The wallpaper is painted on Marinara's own centre area as well as on our
   layer underneath: on iPad a theme or shell layer between them hid it, so
   picking a wallpaper seemed to do nothing. */
html.mdos-touch-home [data-component="CenterContent"] {
  background: var(--mdos-wallpaper) !important;
  border-color: transparent !important;
  box-shadow: none !important;
}
html.mdos-touch-home [data-component="CenterContent"] .mari-app-background-paint,
html.mdos-touch-home :is([data-component="HomeBrowserHub"], [data-component="HomeBrowserHub"] > div, [data-component="HomeBrowserHub.Content"], [data-component="HomeBrowserHub.HomePage"]) {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}
html.mdos-touch-home [data-component="TopBar"],
html.mdos-touch-home .mari-home-browser-starfield,
html.mdos-touch-home .mari-seasonal-home,
html.mdos-touch-home .mari-home-browser-chrome,
html.mdos-touch-home .mari-home-hero > .max-w-5xl > div:first-child {
  display: none !important;
}
html.mdos-touch-home [data-component="HomeBrowserHub.HomePage"] > div.relative {
  padding: calc(env(safe-area-inset-top, 0px) + 16px) 18px calc(var(--mdos-sb-icon) + 70px) !important;
}

#mdos-sb {
  display: grid;
  gap: 26px;
  margin-bottom: 26px;
  font-family: var(--mdos-font);
}
.mdos-sb-widgets {
  display: grid;
  grid-template-columns: repeat(var(--mdos-sb-wcols), minmax(0, 1fr));
  gap: 16px;
}
.mdos-sb-widgets:empty {
  display: none;
}
#mdos-sb .mdos-wg {
  position: relative;
  width: auto;
  height: auto;
  aspect-ratio: 1;
}
#mdos-sb .mdos-wg--m {
  grid-column: span 2;
  aspect-ratio: 2.1;
}
#mdos-sb .mdos-wg--l {
  grid-column: span 2;
  aspect-ratio: 1;
}
#mdos-sb .mdos-wg-time {
  font-size: clamp(30px, 9vw, 46px);
}
.mdos-sb-apps {
  display: grid;
  grid-template-columns: repeat(var(--mdos-sb-cols), minmax(0, 1fr));
  gap: 22px 8px;
}
.mdos-sb-apps .mdos-lp-app {
  gap: 6px;
  animation: none;
  -webkit-tap-highlight-color: transparent;
}
.mdos-sb-apps .mdos-app-icon {
  width: var(--mdos-sb-icon);
  height: var(--mdos-sb-icon);
}
.mdos-sb-apps .mdos-lp-app:active .mdos-app-icon {
  filter: brightness(0.75);
  transform: scale(0.94);
}
.mdos-sb-apps .mdos-lp-label {
  font-size: 11.5px;
  max-width: calc(var(--mdos-sb-icon) + 18px);
  color: var(--mdos-widget-ink, #fff);
}

/* The New chat launcher and the credit cards share the desktop widget design
   (home.css); on a phone they simply stack under the app grid. */
html.mdos-touch-home [data-component="HomeBrowserHub.HomePage"] > div.relative > :is(.mari-home-hero, #mac-credit-home) {
  margin-bottom: 18px !important;
}

/* ── Dock (home screen only) ─────────────────────────────────── */

html.mdos-touch #mdos-dock {
  bottom: calc(env(safe-area-inset-bottom, 0px) + 10px);
  transform: translate(-50%, calc(100% + 40px));
  transition: transform 300ms var(--mdos-ease);
}
html.mdos-touch.mdos-touch-home:not(.mdos-touch-sheet, .mdos-touch-app) #mdos-dock {
  transform: translateX(-50%);
}
html.mdos-touch #mdos-dock .mdos-dock-item:not([data-touch="1"]),
html.mdos-touch #mdos-dock .mdos-dock-sep,
html.mdos-touch #mdos-dock .mdos-dock-label,
html.mdos-touch #mdos-dock .mdos-dock-dot {
  display: none !important;
}
html.mdos-touch .mdos-dock-inner {
  gap: 18px;
  height: auto;
  padding: 12px 16px;
  border-radius: 8px;
}
html.mdos-touch .mdos-dock-item {
  width: var(--mdos-sb-icon) !important;
  height: var(--mdos-sb-icon) !important;
  -webkit-tap-highlight-color: transparent;
}

/* ── Home indicator (inside apps) ────────────────────────────── */

html.mdos-touch:is(:not(.mdos-touch-home), .mdos-touch-sheet, .mdos-touch-app) #mdos-homebar {
  all: unset;
  display: block;
  position: fixed;
  left: 50%;
  bottom: max(2px, calc(env(safe-area-inset-bottom, 0px) - 14px));
  /* Above app agents' own full-screen layers too, or it can't be tapped. */
  z-index: 2147483000;
  width: 150px;
  height: 22px;
  transform: translateX(-50%);
  cursor: var(--mdos-cur-ptr, pointer);
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
}
#mdos-homebar::after {
  content: "";
  position: absolute;
  left: 8px;
  right: 8px;
  top: 50%;
  height: 5px;
  margin-top: -2.5px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--foreground) 55%, transparent);
}
/* Leave room so the indicator never sits on the message box. */
/* The composer stays clear of the home indicator below it, so a tap on the
   composer's bottom row never lands on the indicator. */
html.mdos-touch:is(:not(.mdos-touch-home), .mdos-touch-sheet) .chat-input-container {
  padding-bottom: max(26px, calc(env(safe-area-inset-bottom, 0px) + 10px)) !important;
}

/* ── Apps as phone apps ──────────────────────────────────────── */

html.mdos-touch :is([data-component="RightPanelMobile"], aside[data-component="ChatSidebarPanel"]) {
  background: var(--mdos-win-bg) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
/* Large titles, like phone apps. */
html.mdos-touch :is(.mari-right-panel-header, .mari-sidebar-header) {
  height: 64px !important;
  align-items: flex-end !important;
  padding-bottom: 8px !important;
}
html.mdos-touch :is(.mari-right-panel-header, .mari-sidebar-header) h2 {
  font-size: 28px !important;
  font-weight: 800 !important;
  letter-spacing: -0.02em;
  color: var(--mdos-fg) !important;
}
html.mdos-touch :is(.mari-right-panel-header, .mari-sidebar-header) :is([class*="#4de5dd"], [data-component="RightPanelHeaderIcon"]) {
  display: none !important;
}
html.mdos-touch :is(.mari-right-panel-header, .mari-sidebar-header) > .absolute.bottom-0 {
  display: none !important;
}
/* Rows get the comfortable height of a phone list. */
html.mdos-touch [data-drag-kind="chat"] {
  min-height: 58px;
  border-radius: 8px !important;
}
html.mdos-touch [data-component="TopBar"] {
  background: color-mix(in srgb, var(--mdos-win-bg) 86%, transparent) !important;
  backdrop-filter: blur(18px) saturate(170%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  box-shadow: inset 0 -0.5px 0 var(--mdos-sep);
}

/* Tablet: apps open as floating sheets instead of covering the screen. */
html.mdos-tablet [data-component="RightPanelMobile"] {
  inset: 36px max(36px, calc((100vw - 720px) / 2)) 36px !important;
  width: auto !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  box-shadow: 0 30px 80px -16px rgba(0, 0, 0, 0.55) !important;
  --mari-right-panel-width: min(720px, calc(100vw - 72px)) !important;
}
html.mdos-tablet aside[data-component="ChatSidebarPanel"] {
  inset: 24px auto 24px 24px !important;
  width: min(400px, calc(100vw - 48px)) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  box-shadow: 0 30px 80px -16px rgba(0, 0, 0, 0.55) !important;
}

/* Tablet in landscape: a centred page with the widgets spread across the
   whole width (six cells a row, filling gaps), the app grid below them. */
@media (orientation: landscape) and (min-width: 1000px) {
  html.mdos-tablet {
    --mdos-sb-icon: 68px;
    --mdos-sb-cols: 8;
    --mdos-sb-wcols: 6;
  }
  html.mdos-tablet.mdos-touch-home [data-component="HomeBrowserHub.HomePage"] > div.relative {
    padding-inline: max(32px, calc((100vw - 1180px) / 2)) !important;
  }
  html.mdos-tablet #mdos-sb {
    gap: 32px;
    margin-bottom: 32px;
  }
  /* Fixed rows instead of aspect ratios, so a large widget spans two rows
     and small ones fill the cells beside it. */
  html.mdos-tablet .mdos-sb-widgets {
    grid-auto-rows: 172px;
    grid-auto-flow: row dense;
  }
  html.mdos-tablet #mdos-sb .mdos-wg {
    aspect-ratio: auto;
    height: auto;
  }
  html.mdos-tablet #mdos-sb .mdos-wg--l {
    grid-row: span 2;
  }
  html.mdos-tablet .mdos-sb-apps {
    gap: 28px 12px;
  }
  /* Panels get the width a two-column settings page needs. */
  html.mdos-tablet [data-component="RightPanelMobile"] {
    inset: 28px max(36px, calc((100vw - 900px) / 2)) 28px !important;
    --mari-right-panel-width: min(900px, calc(100vw - 72px)) !important;
  }
  html.mdos-tablet aside[data-component="ChatSidebarPanel"] {
    inset: 20px auto 20px 20px !important;
  }
}

/* Marinara's dimmed backdrop behind a sheet starts under its top bar. On our
   home screen that bar is hidden, so the backdrop covers the whole screen
   instead of leaving a sharp strip of home icons above it. */
html.mdos-touch [class*="z-[45]"][class*="bg-black/50"] {
  top: 0 !important;
}
/* Inside an app the status-bar strip above the top bar takes the bar's colour
   instead of showing a band of wallpaper. */
html.mdos-touch:not(.mdos-touch-home) body::before {
  content: "";
  position: fixed;
  inset: 0 0 auto;
  height: env(safe-area-inset-top, 0px);
  z-index: 40;
  background: var(--background, var(--mdos-win-bg));
  pointer-events: none;
}
/* Floating tablet sheets sit clear of the screen edge, so Marinara's bottom
   safe-area padding only showed as an empty band under the chat list. */
html.mdos-tablet :is([data-component="RightPanelMobile"], aside[data-component="ChatSidebarPanel"]) {
  padding-bottom: 0 !important;
}
/* iPad draws its own home indicator at the very bottom; ours sits above it
   instead of on top of it. */
html.mdos-tablet:is(:not(.mdos-touch-home), .mdos-touch-sheet, .mdos-touch-app) #mdos-homebar {
  bottom: 2px;
  height: 16px;
  width: 120px;
}

/* Phone: on the home screen Marinara's top bar is hidden, so sheets opened
   from it (settings, chat list, agents, editors) start at the very top like
   a full-screen app, instead of leaving a 3rem strip of empty home above. */
html.mdos-touch:not(.mdos-tablet) :is([data-component="RightPanelMobile"], aside[data-component="ChatSidebarPanel"], [data-component="MobileDetailSheet"]) {
  top: env(safe-area-inset-top, 0px) !important;
}

/* ── Overlays on touch screens ───────────────────────────────── */

html.mdos-touch #mdos-launchpad {
  padding: calc(env(safe-area-inset-top, 0px) + 28px) 18px 40px;
}
html.mdos-touch .mdos-lp-grid {
  margin-top: 28px;
  grid-template-columns: repeat(var(--mdos-sb-cols), minmax(0, 1fr));
  gap: 22px 8px;
}
html.mdos-touch .mdos-lp-app .mdos-app-icon {
  width: var(--mdos-sb-icon);
  height: var(--mdos-sb-icon);
}
html.mdos-touch .mdos-lp-label {
  font-size: 11.5px;
  max-width: calc(var(--mdos-sb-icon) + 18px);
}
html.mdos-touch #mdos-cc {
  top: auto;
  left: 8px;
  right: 8px;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 8px);
  width: auto;
  max-height: 82vh;
  border-radius: 8px;
  transform: translateY(20px);
}
html.mdos-tablet #mdos-cc {
  left: auto;
  width: 380px;
}
html.mdos-touch #mdos-cc.is-open {
  transform: none;
}
.mdos-cc-done {
  width: 100%;
  height: 38px !important;
  background: var(--mdos-accent, #0078d4) !important;
  font-size: 14px !important;
}
html.mdos-touch.mdos-edit #mdos-editbar {
  bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
}
html.mdos-touch .mdos-pop {
  width: min(360px, calc(100vw - 24px));
}

/* ── Small apps full-screen on touch screens ─────────────────── */

html.mdos-touch .mdos-appwin {
  left: 0 !important;
  top: 0 !important;
  width: 100vw !important;
  height: 100% !important;
  translate: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  z-index: 60 !important;
  padding-top: env(safe-area-inset-top, 0px);
  box-sizing: border-box;
}
html.mdos-tablet .mdos-appwin {
  left: max(24px, calc((100vw - 900px) / 2)) !important;
  top: 24px !important;
  width: min(900px, calc(100vw - 48px)) !important;
  height: calc(100% - 48px) !important;
  border-radius: 8px !important;
  box-shadow: 0 30px 80px -16px rgba(0, 0, 0, 0.55) !important;
  padding-top: 0;
}
html.mdos-touch .mdos-appwin .mdos-grip {
  display: none;
}
html.mdos-touch .mdos-appwin-bar {
  height: 52px;
}
html.mdos-touch .mdos-appwin-body {
  padding-bottom: 22px;
}
html.mdos-touch .mdos-light {
  width: 16px;
  height: 16px;
}
html.mdos-touch .mdos-appwin .mdos-light--zoom {
  display: none;
}

/* ── Home screen editing ─────────────────────────────────────── */

.mdos-sb-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.mdos-sb-cell .mdos-wg-badge {
  top: -6px;
  left: calc(50% - var(--mdos-sb-icon) / 2 - 8px);
}
html.mdos-edit .mdos-sb-cell .mdos-wg-badge {
  display: grid;
}
html.mdos-edit .mdos-sb-cell .mdos-app-icon {
  animation: mdos-jiggle 0.3s ease-in-out infinite alternate;
}
html.mdos-edit .mdos-sb-cell:nth-child(2n) .mdos-app-icon {
  animation-delay: -0.15s;
}
.mdos-sb-move {
  display: none;
  gap: 4px;
}
html.mdos-edit .mdos-sb-move {
  display: flex;
}
.mdos-sb-move button {
  all: unset;
  width: 26px;
  height: 22px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  font-size: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.32);
}
html.mdos-touch.mdos-edit #mdos-editbar {
  flex-wrap: wrap;
  justify-content: center;
  width: calc(100vw - 24px);
  box-sizing: border-box;
}

/* ── Tablet split view (desktop.js: mdos-split) ──────────────── */
/* A chat open with its list: the list is docked on the left, full height,
   no dimming or floating card; the chat moves over to make room. The top
   bar's chat button folds the list away (the chat then fills the screen). */
@media (min-width: 1000px) {
  html.mdos-tablet.mdos-split aside[data-component="ChatSidebarPanel"] {
    inset: 0 auto 0 0 !important;
    width: 360px !important;
    padding-top: env(safe-area-inset-top, 0px);
    border-radius: 0 !important;
    box-shadow: none !important;
    border-right: 1px solid color-mix(in srgb, var(--mdos-fg, #000) 12%, transparent) !important;
    transform: none !important;
  }
  html.mdos-split [class*="z-[45]"][class*="bg-black/50"] {
    display: none !important;
  }
  html.mdos-split [data-component="CenterContent"] {
    margin-left: 360px !important;
  }
  html.mdos-split #mdos-homebar {
    margin-left: 180px;
  }
}

/* ── No top bar on phones and tablets ────────────────────────── */
/* Marinara's top bar (home, chats, panel buttons) is hidden, like the
   desktop's; its buttons stay in the page for this extension to press.
   Sheets that started below it start at the top. */
html.mdos-touch {
  --mari-topbar-height: 0px;
}
html.mdos-touch [data-component="TopBar"] {
  display: none !important;
}
#mdos-tctl {
  display: none;
}
html.mdos-touch:not(.mdos-touch-home):not(.mdos-touch-app):not(.mdos-touch-panel) #mdos-tctl {
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) + 10px);
  left: 12px;
  z-index: 60;
  display: flex;
  gap: 8px;
  transition: left 200ms var(--mdos-ease);
}
/* A full-screen list on a phone covers the chat: no buttons over it. */
html.mdos-touch.mdos-touch-sheet:not(.mdos-split) #mdos-tctl {
  display: none !important;
}
html.mdos-split #mdos-tctl {
  left: 372px !important;
}
.mdos-tctl-btn {
  all: unset;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  color: var(--foreground, var(--mdos-fg));
  background: color-mix(in srgb, var(--background, #fff) 72%, transparent);
  backdrop-filter: blur(16px) saturate(170%);
  -webkit-backdrop-filter: blur(16px) saturate(170%);
  box-shadow:
    0 2px 10px -3px rgba(0, 0, 0, 0.25),
    inset 0 0 0 0.5px color-mix(in srgb, var(--foreground, #000) 16%, transparent);
  -webkit-tap-highlight-color: transparent;
  cursor: var(--mdos-cur-ptr, pointer);
}
.mdos-tctl-btn:active {
  transform: scale(0.92);
}
.mdos-tctl-btn svg {
  width: 19px;
  height: 19px;
}
/* The menu sheet: the panels as app icons. */
.mdos-tmenu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 18px 6px;
  padding: 4px 0 6px;
}
.mdos-tmenu .mdos-lp-app {
  --mdos-badge-icon: 58px;
  gap: 6px;
  animation: none;
}
.mdos-tmenu .mdos-app-icon {
  width: 58px !important;
  height: 58px !important;
}
.mdos-tmenu .mdos-lp-label {
  font-size: 11.5px;
  color: inherit;
}
/* Phone sheets now start right under the status bar; the chat list's own
   header no longer shares that row with a top bar. */
html.mdos-touch:not(.mdos-tablet) :is(.mari-right-panel-header, .mari-sidebar-header) {
  padding-top: 4px;
}

/* ══ Phones & tablets, round 2 ═════════════════════════════════ */
/* Chat apps are separate apps: the list doesn't switch between them (the
   menu sheet and the home screen do). */
html.mdos-touch .mari-chat-sidebar .mari-chrome-segmented[data-mh-tabs] {
  display: none !important;
}
/* The list / menu buttons stay at the top left, where they are easy to find;
   desktop.js moves them down below a button an extension floats in that
   corner (a relationship tracker…) so it stays seen (--mdos-tctl-top). */
html.mdos-touch:not(.mdos-touch-home):not(.mdos-touch-app):not(.mdos-touch-panel) #mdos-tctl {
  top: var(--mdos-tctl-top, calc(env(safe-area-inset-top, 0px) + 10px)) !important;
  transition: top 200ms var(--mdos-ease), left 200ms var(--mdos-ease);
}

/* Phone composer: the bottom row stays one line — the model pill takes only
   the room that is left (the round buttons keep their 36px). */
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] :is(> button, > div > button)[aria-haspopup="dialog"][data-mh-link] {
  flex: 1 1 56px !important;
  min-width: 0 !important;
}
html.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] > div:not(:last-child)[data-mh-dialogbtn] {
  flex: 1 1 56px !important;
  min-width: 0 !important;
}

/* Phone conversation composer: like the roleplay one — edge to edge, round
   top corners only, resting on the bottom with room for the home indicator. */
html.mdos-touch:not(.mdos-tablet) [data-chat-mode="conversation"] :is(.mari-chat-input, .chat-input-container) {
  padding: 0 !important;
}
html.mdos-touch:not(.mdos-tablet) [data-chat-mode="conversation"] .marinara-chat-input-shell[data-mh-composer] {
  margin: 0 !important;
  border-radius: 8px 8px 0 0 !important;
  border-width: 1px 0 0 !important;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 20px) !important;
  box-shadow: 0 -6px 20px -14px rgba(0, 0, 0, 0.35) !important;
}
/* ── Composer surroundings: see-through ─────────────────────── */
/* The composer card stays opaque; the fade band around the roleplay
   composer goes, so the page shows around the card. */
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mari-roleplay-input-column,
html.mdos-touch:not(.mdos-tablet):is([data-mdos-rp="book"], [data-mdos-rp="night"]) [data-chat-mode="roleplay"] .mari-roleplay-input-column {
  background: none !important;
}

/* ── Character count (charcount.js) ──────────────────────────── */
/* The token receipt's rows on one line: quiet labels, tabular figures,
   hairline rules between the three cells. */
.mcc-meter[data-mcc-owned] {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: flex-end;
  row-gap: 2px;
  max-width: 100%;
  min-width: 0;
  margin: 4px 0 0;
  padding: 0;
  color: inherit;
  font: 400 11px/1.5 -apple-system, BlinkMacSystemFont, "SF Pro Text", "Pretendard", system-ui, sans-serif;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
  text-shadow: none;
  -webkit-text-stroke: 0;
  white-space: normal;
  overflow-wrap: anywhere;
  user-select: none;
  pointer-events: none;
}
.mcc-meter[data-mcc-owned] > span {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
  padding: 0 8px;
}
.mcc-meter[data-mcc-owned] > span:last-child {
  padding-right: 2px;
}
.mcc-meter[data-mcc-owned] > span + span {
  border-left: 0.5px solid color-mix(in srgb, currentColor 28%, transparent);
}
.mcc-meter[data-mcc-owned] i {
  font-style: normal;
  opacity: 0.6;
}
.mcc-meter[data-mcc-owned] b {
  font-weight: 600;
  opacity: 0.85;
}
.mcc-meter.mcc-input[data-mcc-owned] {
  padding: 0 4px;
  color: var(--mdos-fg-2, inherit);
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .mcc-meter.mcc-input[data-mcc-owned] {
  color: var(--mdos-ink-2, inherit);
}
@media (max-width: 380px) {
  .mcc-meter[data-mcc-owned] {
    font-size: 10px;
  }
  .mcc-meter[data-mcc-owned] > span {
    padding: 0 5px;
  }
}
`,
  String.raw`/* ══════════════ tokens (Open Props scales, Radix Colors states) ══════════════ */
/* One scale for the redesigned pieces (settings, Quick Settings, sheets,
   toasts): radii, easing, durations, shadows, and status colours picked
   from Radix Colors steps that pass WCAG AA on light and dark surfaces. */
html.mdos {
  --mdos-r-1: 10px;
  --mdos-r-2: 14px;
  --mdos-r-3: 20px;
  --mdos-r-4: 24px;
  --mdos-r-pill: 999px;
  --mdos-ease-out: cubic-bezier(0, 0, 0.3, 1);
  --mdos-ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
  --mdos-ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --mdos-dur-1: 120ms;
  --mdos-dur-2: 200ms;
  --mdos-dur-3: 360ms;
  --mdos-shadow-1: 0 0 0 1px var(--mdos-sep, rgba(0, 0, 0, 0.06)), 0 1px 2px hsl(220 3% 15% / 0.05);
  --mdos-shadow-2: 0 0 0 1px var(--mdos-sep, rgba(0, 0, 0, 0.06)), 0 3px 8px -2px hsl(220 3% 15% / 0.1), 0 8px 20px -6px hsl(220 3% 15% / 0.12);
  --mdos-shadow-3: 0 0 0 1px var(--mdos-sep, rgba(0, 0, 0, 0.08)), 0 10px 30px -8px hsl(220 3% 15% / 0.25), 0 24px 60px -12px hsl(220 3% 15% / 0.2);
  --mdos-success: #18794e; /* Radix green 11 */
  --mdos-danger: #ce2c31; /* Radix red 11 */
  --mdos-warning: #ab6400; /* Radix amber 11 */
}
html.mdos:not([data-theme="light"]) {
  --mdos-success: #3dd68c; /* Radix green dark 11 */
  --mdos-danger: #ff9592; /* Radix red dark 11 */
  --mdos-warning: #ffca16; /* Radix amber dark 11 */
  --mdos-shadow-1: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 1px 2px rgba(0, 0, 0, 0.3);
  --mdos-shadow-2: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 20px -6px rgba(0, 0, 0, 0.5);
  --mdos-shadow-3: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 24px 60px -12px rgba(0, 0, 0, 0.65);
}

/* ══════════════ sheets.css ══════════════ */
/* ── Mobile panels as clean settings sheets ───────────────────
   Phone/tablet (html.mdos-touch): Marinara's chat settings sheet, the
   right panel (characters, presets, settings…), editors and modals get
   the same look: a soft grey page, white rounded cards, grouped rows,
   pill tabs and chips, and bigger switches. Marinara's own CSS variables
   are used where it offers them (--mari-window-*, --mari-drawer-*). */

html.mdos {
  --mdos-sh-page: var(--mdos-win-bg, #f2f2f6);
  --mdos-sh-card: var(--mdos-card-raised, #fff);
  --mdos-sh-fg: var(--mdos-fg, #1c1c1e);
  --mdos-sh-fg2: var(--mdos-fg-2, #6e6e73);
  --mdos-sh-sep: var(--mdos-sep, rgba(0, 0, 0, 0.08));
  --mdos-sh-fill: var(--mdos-fill, rgba(0, 0, 0, 0.05));
  --mdos-sh-acc: var(--mdos-accent, var(--primary));
}

/* ── 1. Sheet shells: grabber, round top, page background ───── */
html.mdos-touch .mari-window[data-presentation="sheet"],
html.mdos-touch:not(.mdos-tablet) aside[data-component="RightPanelMobile"],
html.mdos-touch:not(.mdos-tablet) aside[data-component="MobileDetailSheet"] {
  --mari-window-bg: var(--mdos-sh-page);
  --mari-window-radius: 22px;
  --mari-window-border: transparent;
  --mari-window-header-bg: transparent;
  --mari-window-header-padding: 18px 16px 10px;
  --mari-window-text: var(--mdos-sh-fg);
  --mari-window-backdrop-filter: none;
  background: var(--mdos-sh-page) !important;
  color: var(--mdos-sh-fg);
  border-radius: var(--mdos-r-4) var(--mdos-r-4) 0 0 !important;
  border: 0 !important;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.18) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
html.mdos-touch .mari-window[data-presentation="sheet"] {
  top: auto !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  max-height: calc(100dvh - 3.5rem - env(safe-area-inset-top, 0px)) !important;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
html.mdos-touch .mari-window[data-presentation="sheet"]::before,
html.mdos-touch:not(.mdos-tablet) aside[data-component="RightPanelMobile"]::before,
html.mdos-touch:not(.mdos-tablet) aside[data-component="MobileDetailSheet"]::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 50%;
  z-index: 3;
  width: 38px;
  height: 5px;
  margin-left: -19px;
  border-radius: 3px;
  background: var(--mdos-sh-fg2);
  opacity: 0.35;
  pointer-events: none;
}

/* ── 2. Headers: big bold title, round close button ─────────── */
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-window__header {
  border: 0 !important;
}
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-window__title,
html.mdos-touch .mari-right-panel-header h2 {
  font-size: 20px !important;
  font-weight: 800 !important;
  letter-spacing: -0.01em;
  color: var(--mdos-sh-fg) !important;
}
html.mdos-touch .mari-right-panel-header {
  height: 60px !important;
  padding-top: 8px;
  background: transparent !important;
}
html.mdos-touch .mari-right-panel-header > .absolute.inset-x-0.bottom-0 {
  display: none;
}
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-window__control,
html.mdos-touch .mari-right-panel-header button[aria-label] {
  width: 30px !important;
  height: 30px !important;
  border-radius: 50% !important;
  color: var(--mdos-sh-fg) !important;
  background: var(--mdos-sh-fill) !important;
  border: 0 !important;
  box-shadow: none !important;
}
html.mdos-touch [data-component="RightPanelHeaderIcon"] {
  border-radius: var(--mdos-r-1) !important;
}

/* Scroll bodies sit on the grey page with card gutters. */
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-window__body,
html.mdos-touch section[data-component="RightPanel"] [data-panel-key] {
  background: var(--mdos-sh-page) !important;
}

/* ── 3. Chat settings drawers = white grouped cards ─────────── */
html.mdos-touch .mari-window[data-presentation="sheet"] .marinara-chat-popover__scroll {
  padding: 4px 12px 16px !important;
}
/* No overflow:hidden here: the drawers are flex items, and clipping drops
   their minimum height to 0, so long open sections (chat summary) were
   squashed to a line. flex-shrink: 0 keeps every section its full height. */
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-drawer {
  --mari-drawer-bg: var(--mdos-sh-card);
  --mari-drawer-header-bg: var(--mdos-sh-card);
  --mari-drawer-border: transparent;
  --mari-drawer-header-padding: 11px 14px;
  --mari-drawer-title-color: var(--mdos-sh-fg);
  --mari-drawer-count-bg: var(--mdos-sh-fill);
  --mari-drawer-count-text: var(--mdos-sh-fg2);
  flex-shrink: 0 !important;
  margin: 0 0 8px;
  border: 0 !important;
  border-radius: var(--mdos-r-3);
  background: var(--mdos-sh-card) !important;
  box-shadow: var(--mdos-shadow-1);
}
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-drawer__title {
  font-size: 15px !important;
  font-weight: 700 !important;
}
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-drawer__summary {
  font-size: 12px !important;
  color: var(--mdos-sh-fg2) !important;
}
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-drawer__count {
  min-width: 22px;
  padding: 1px 8px !important;
  border-radius: var(--mdos-r-pill) !important;
  font-size: 11px !important;
  font-weight: 700;
}
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-drawer__header {
  border-radius: var(--mdos-r-3);
}
html.mdos-touch .mari-window[data-presentation="sheet"] .mari-drawer__body {
  border-top: 1px solid var(--mdos-sh-sep);
}

/* Section jump chips (desktop.js sheetJumps): a scrolling pill row. */
html.mdos .mdos-cs-jump {
  display: flex;
  flex: none;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 2px 12px 10px;
  margin: 0 0 2px;
  border-bottom: 1px solid var(--mdos-sh-sep);
}
html.mdos .mdos-cs-jump::-webkit-scrollbar {
  display: none;
}
html.mdos .mdos-cs-chip {
  all: unset;
  flex: none;
  display: grid;
  gap: 1px;
  min-width: 0;
  max-width: 110px;
  padding: 5px 10px;
  border-radius: var(--mdos-r-1);
  background: var(--mdos-sh-card);
  box-shadow: 0 0 0 1px var(--mdos-sh-sep);
  color: var(--mdos-sh-fg);
  -webkit-tap-highlight-color: transparent;
}
html.mdos .mdos-cs-chip b {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 700;
}
html.mdos .mdos-cs-chip small {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 11px;
  color: var(--mdos-sh-fg2);
}
html.mdos .mdos-cs-chip[aria-current="true"] {
  box-shadow: 0 0 0 1.5px var(--mdos-sh-fg);
}

/* ── 4. Settings panel: categories as pill tabs, sections as cards ── */
html.mdos-touch .mari-settings-panel-chrome [role="tablist"] {
  display: flex !important;
  gap: 6px !important;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px 2px 8px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
}
html.mdos-touch .mari-settings-panel-chrome [role="tablist"]::-webkit-scrollbar {
  display: none;
}
html.mdos-touch .mari-settings-panel-chrome [role="tab"] {
  flex: none !important;
  min-height: 36px !important;
  padding: 0 14px !important;
  border-radius: var(--mdos-r-pill) !important;
  border: 0 !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  color: var(--mdos-sh-fg) !important;
  background: var(--mdos-sh-card) !important;
  box-shadow: 0 0 0 1px var(--mdos-sh-sep) !important;
}
html.mdos-touch .mari-settings-panel-chrome [role="tab"][aria-selected="true"] {
  color: var(--mdos-sh-page) !important;
  background: var(--mdos-sh-fg) !important;
  box-shadow: none !important;
}
html.mdos-touch [data-panel-key] section.overflow-hidden.rounded-lg.border,
html.mdos-touch [role="tabpanel"] section.overflow-hidden.rounded-lg.border {
  border: 0 !important;
  border-radius: var(--mdos-r-3) !important;
  background: var(--mdos-sh-card) !important;
  box-shadow: var(--mdos-shadow-1);
}
html.mdos-touch [data-panel-key] section.overflow-hidden.rounded-lg.border > .flex.items-start.gap-2 .text-xs.font-semibold,
html.mdos-touch [role="tabpanel"] section.overflow-hidden.rounded-lg.border > .flex.items-start.gap-2 .text-xs.font-semibold {
  font-size: 15px !important;
  font-weight: 700 !important;
}
html.mdos-touch [role="tabpanel"] section.overflow-hidden.rounded-lg.border > .border-t,
html.mdos-touch [data-panel-key] section.overflow-hidden.rounded-lg.border > .border-t {
  border-color: var(--mdos-sh-sep) !important;
}

/* Inner cards inside chat settings and agents. */
html.mdos-touch .mari-window[data-presentation="sheet"] .space-y-2.rounded-lg.p-2\.5.ring-1 {
  border-radius: var(--mdos-r-2) !important;
  background: var(--mdos-sh-page) !important;
  --tw-ring-color: transparent !important;
}

/* ── 5. Controls: switches, segmented, chips, fields ────────── */
/* Switch: 44×26 pill, dark track when on (accent with the theme). */
html.mdos-touch label.relative.inline-flex.h-5.w-9 {
  width: 44px !important;
  height: 26px !important;
}
html.mdos-touch [data-settings-switch-track] {
  width: 44px !important;
  height: 26px !important;
  padding: 3px !important;
  background: var(--mdos-sh-fill) !important;
  box-shadow: inset 0 0 0 1px var(--mdos-sh-sep);
}
html.mdos-touch input:checked + [data-settings-switch-track] {
  background: var(--mdos-sh-acc) !important;
  box-shadow: none;
}
html.mdos-touch [data-settings-switch-thumb] {
  width: 20px !important;
  height: 20px !important;
  background: #fff !important;
  --tw-ring-color: transparent !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25) !important;
}
/* Tailwind 4 moves the thumb with the translate property; reset it so
   only our transform applies (both together pushed it off the track). */
html.mdos-touch [data-settings-switch-thumb] {
  translate: none !important;
  transform: none;
  transition: transform 180ms ease !important;
}
html.mdos-touch input:checked + [data-settings-switch-track] [data-settings-switch-thumb] {
  transform: translateX(18px) !important;
}

/* Segmented controls (aria-pressed groups) as a pill track. */
html.mdos-touch :is(.mari-window[data-presentation="sheet"], [data-panel-key], [role="tabpanel"]) .grid.gap-1.rounded-lg.border.p-1 {
  gap: 2px !important;
  padding: 3px !important;
  border: 0 !important;
  border-radius: var(--mdos-r-2) !important;
  background: var(--mdos-sh-fill) !important;
}
html.mdos-touch :is(.mari-window[data-presentation="sheet"], [data-panel-key], [role="tabpanel"]) .grid.gap-1.rounded-lg.border.p-1 > button[aria-pressed] {
  min-height: 34px !important;
  border-radius: var(--mdos-r-1) !important;
  font-weight: 600;
  background: transparent !important;
  --tw-ring-color: transparent !important;
}
html.mdos-touch :is(.mari-window[data-presentation="sheet"], [data-panel-key], [role="tabpanel"]) .grid.gap-1.rounded-lg.border.p-1 > button[aria-pressed="true"] {
  color: var(--mdos-sh-fg) !important;
  background: var(--mdos-sh-card) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) !important;
}

/* Small chrome buttons (quick access, actions) as chips. */
html.mdos-touch :is(.mari-window[data-presentation="sheet"], [data-component="RightPanel"]) .mari-chrome-control--small:not(.mari-right-panel-header *) {
  min-height: 30px;
  border-radius: var(--mdos-r-1) !important;
}

/* Fields: taller, rounder, filled. */
html.mdos-touch :is(.mari-window[data-presentation="sheet"], [data-component="RightPanel"], aside[data-component="MobileDetailSheet"]) :is(.mari-chrome-field, select, input[type="text"], input[type="number"], input[type="search"], textarea) {
  min-width: 0;
  border-radius: var(--mdos-r-2) !important;
  font-size: 16px; /* no iOS zoom on focus */
}
html.mdos-touch [data-chat-settings-search] {
  min-height: 40px;
  border-radius: var(--mdos-r-2) !important;
  background: var(--mdos-sh-fill) !important;
  border: 0 !important;
}

/* ── 6. Editor header (character, persona, preset, lorebook) ─── */
/* Row 1: back, avatar, name. Row 2: compact actions. Row 3: a full-width
   strip of section tabs that scrolls sideways (Marinara caps it at 8rem). */
html.mdos-touch:not(.mdos-tablet) .mari-editor-header--with-nav {
  gap: 8px !important;
  padding: 18px 14px 10px !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header .mari-editor-action:not(.mari-editor-tab) {
  width: 38px !important;
  min-width: 38px !important;
  height: 38px !important;
  min-height: 38px !important;
  padding: 0 !important;
  border-radius: var(--mdos-r-2) !important;
  border: 0 !important;
  box-shadow: none !important;
  background: var(--mdos-sh-fill) !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header .mari-editor-action--primary:not(.mari-editor-tab) {
  background: var(--mdos-sh-acc) !important;
  color: #fff !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header .mari-editor-action:not(.mari-editor-tab) svg {
  width: 18px;
  height: 18px;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header--with-nav .mari-editor-actions {
  gap: 6px !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header--with-nav .mari-editor-navigation {
  order: 9;
  width: 100% !important;
  max-width: none !important;
  flex: 1 0 100% !important;
  overflow: visible !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header--with-nav .mari-editor-navigation-compact {
  display: none !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header--with-nav .mari-editor-navigation-tabs {
  display: flex !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header--with-nav .mari-editor-tab-label {
  display: inline !important;
}

/* Preset sections and lorebook entries: the name gets its own full-width
   line above the row of small controls instead of a sliver between them. */
html.mdos-touch:not(.mdos-tablet) .mari-editor-panel > div.flex.min-w-0.items-center,
html.mdos-touch:not(.mdos-tablet) [data-lorebook-entry-row-id] > div.group.flex {
  flex-wrap: wrap !important;
  row-gap: 6px !important;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-panel > div.flex.min-w-0.items-center > span.min-w-0.flex-1.truncate.font-medium {
  order: -1;
  flex: 1 0 100% !important;
  padding: 0 4px;
  white-space: normal !important;
  overflow-wrap: anywhere;
  font-size: 15px !important;
  font-weight: 700 !important;
  line-height: 1.35;
}
html.mdos-touch:not(.mdos-tablet) [data-lorebook-entry-row-id] > div.group.flex > [data-mari-field$=".name"] {
  order: -1;
  flex: 1 0 100% !important;
  min-width: 0 !important;
}
html.mdos-touch:not(.mdos-tablet) [data-lorebook-entry-row-id] > div.group.flex > [data-mari-field$=".name"] input {
  height: 30px;
  padding: 0 4px !important;
  border: 0 !important;
  border-radius: var(--mdos-r-1) !important;
  box-shadow: none !important;
  background: transparent !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  text-overflow: ellipsis;
}

/* ── 7. Editor tabs as pills ──────────────────────────────────── */
html.mdos-touch:not(.mdos-tablet) .mari-editor-navigation-tabs {
  gap: 6px !important;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 1px 1px 2px;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-navigation-tabs::-webkit-scrollbar {
  display: none;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-tab {
  flex: none !important;
  gap: 6px;
  width: auto !important;
  min-width: 0 !important;
  height: 34px !important;
  min-height: 34px !important;
  padding: 0 13px !important;
  font-size: 13px !important;
  font-weight: 600;
  border-radius: var(--mdos-r-pill) !important;
  border: 0 !important;
  background: var(--mdos-sh-card) !important;
  box-shadow: 0 0 0 1px var(--mdos-sh-sep);
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-tab[data-active="true"] {
  color: var(--mdos-sh-page) !important;
  background: var(--mdos-sh-fg) !important;
  box-shadow: none;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-navigation-select {
  min-height: 40px;
  border-radius: var(--mdos-r-2) !important;
}

/* ── 8. Modals on a phone = bottom sheets ───────────────────── */
html.mdos-touch:not(.mdos-tablet) [data-component="Modal"] {
  align-items: flex-end !important;
}
html.mdos-touch:not(.mdos-tablet) [data-component="Modal"] .mari-modal-panel {
  position: relative;
  width: 100% !important;
  max-width: none !important;
  max-height: calc(100dvh - 3rem) !important;
  margin: 0 !important;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  border-radius: var(--mdos-r-4) var(--mdos-r-4) 0 0 !important;
  border: 0 !important;
  background: var(--mdos-sh-page) !important;
  color: var(--mdos-sh-fg);
  animation: mdos-sheet-up 260ms var(--mdos-ease, ease-out);
}
html.mdos-touch:not(.mdos-tablet) [data-component="Modal"] .mari-modal-panel::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 50%;
  width: 38px;
  height: 5px;
  margin-left: -19px;
  border-radius: 3px;
  background: var(--mdos-sh-fg2);
  opacity: 0.35;
}
html.mdos-touch:not(.mdos-tablet) [data-component="Modal"] .mari-modal-panel h2 {
  font-size: 19px !important;
  font-weight: 800 !important;
}
@keyframes mdos-sheet-up {
  from {
    transform: translateY(40%);
    opacity: 0;
  }
}
html.mdos-calm [data-component="Modal"] .mari-modal-panel,
html[data-marinara-reduced-effects="true"] [data-component="Modal"] .mari-modal-panel {
  animation: none;
}

/* Drag-to-close sheets (desktop.js SHEETS): translate follows the finger,
   then springs back or slides away with an iOS-like curve. */
html.mdos-touch:not(.mdos-tablet) :is(.mari-window[data-presentation="sheet"], aside[data-component="RightPanelMobile"], [data-component="Modal"] .mari-modal-panel) {
  transition: translate 360ms var(--mdos-ease-spring);
}
html.mdos-touch:not(.mdos-tablet) #mdos-cc {
  transition:
    opacity 167ms linear,
    transform 280ms var(--mdos-ease),
    translate 360ms var(--mdos-ease-spring);
}
[data-mdos-dragging] {
  transition: none !important;
  user-select: none;
  -webkit-user-select: none;
}

/* ══════════════ polish pass (audit fixes) ══════════════ */
/* Surface hierarchy: the page sits a step darker than its cards, so
   white-on-white cards still read as cards without heavy borders. */
html.mdos {
  --mdos-page: color-mix(in srgb, var(--mdos-win-bg, #fff) 95%, var(--mdos-fg, #000));
}
html.mdos .mdos-set {
  background: var(--mdos-page);
}
html.mdos {
  --mdos-sh-page: var(--mdos-page);
}
/* Touch targets: 36px chips and tabs, a 32px hit area round "?". */
html.mdos-touch .mdos-chip {
  min-height: 36px;
  padding: 0 14px;
  font-size: 13px;
}
html.mdos .mdos-help-btn {
  position: relative;
}
html.mdos .mdos-help-btn::after {
  content: "";
  position: absolute;
  inset: -8px;
}
html.mdos-touch .mdos-qs-link {
  padding: 8px 0 8px 12px;
  margin: -8px 0;
}
html.mdos-touch .mdos-set-search {
  height: 40px;
}
html.mdos-touch .mdos-set-search-input {
  font-size: 16px;
}
/* Motion: honour reduced motion for the flash and sheet slides. */
@media (prefers-reduced-motion: reduce) {
  html.mdos .mdos-set-flash {
    animation: none;
    outline: 2px solid var(--mdos-accent, #0078d4);
    outline-offset: 2px;
  }
  html.mdos-touch :is(.mari-window[data-presentation="sheet"], aside[data-component="RightPanelMobile"], [data-component="Modal"] .mari-modal-panel, #mdos-cc) {
    transition: none !important;
    animation: none !important;
  }
}
/* Disabled-looking help text stays readable (fg-2, not fg-3). */
html.mdos .mdos-set-search-input::placeholder {
  color: var(--mdos-fg-2, #6e6e73);
}
/* The selected chip shows its state with more than an outline. */
html.mdos .mdos-chip[aria-checked="true"] {
  color: var(--mdos-fg, #1d1d1f);
  background: var(--mdos-accent-soft, rgba(0, 120, 212, 0.12));
  box-shadow: inset 0 0 0 1.5px var(--mdos-accent, #0078d4);
}

/* Help bubble flipped above its "?" when there is no room below. */
html.mdos .mdos-help.is-above .mdos-help-pop {
  top: auto;
  bottom: calc(100% + 6px);
}
/* Keyboard focus: one clear ring everywhere in the redesigned pieces. */
html.mdos :is(.mdos-chip, .mdos-seg-btn, .mdos-set-nav-item, .mdos-ov-row, .mdos-set-result, .mdos-qs-stat, .mdos-qs-pill, .mdos-qs-link, .mdos-cs-chip, .mdos-help-btn, .mdos-toast-action):focus-visible {
  outline: 2px solid var(--mdos-accent, #0078d4);
  outline-offset: 2px;
}

/* ══════════════ toasts (desktop.js toast) ══════════════ */
/* A Sonner-like stack: the newest in front, older ones peeking behind,
   fanned out while hovered. Bottom right on a desktop, top centre on a
   phone (clear of the composer). Positions come from --y / --s / --h. */
#mdos-toasts {
  position: fixed;
  right: 16px;
  bottom: calc(var(--w-tb-h, 48px) + 16px);
  z-index: 9600;
  width: min(356px, calc(100vw - 32px));
  height: var(--mdos-toasts-h, 0px);
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: none;
  font: 500 13px/1.4 var(--mdos-font, system-ui);
}
#mdos-toasts[data-open] {
  pointer-events: auto;
}
html.mdos-dock-autohide #mdos-toasts {
  bottom: 16px;
}
.mdos-toast {
  --y: 0px;
  --s: 1;
  --x: 0px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 14px;
  border-radius: var(--mdos-r-2);
  color: var(--mdos-fg, #1d1d1f);
  background: var(--mdos-popover, var(--mdos-card-raised, #fff));
  box-shadow: var(--mdos-shadow-3);
  pointer-events: auto;
  opacity: 0;
  translate: var(--x) calc(-1 * var(--y) + 16px);
  scale: var(--s);
  transform-origin: 50% 0;
  transition:
    translate 400ms var(--mdos-ease-spring),
    scale 400ms var(--mdos-ease-spring),
    opacity 300ms ease,
    height 300ms ease;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
}
.mdos-toast[data-mounted] {
  opacity: 1;
  translate: var(--x) calc(-1 * var(--y));
}
.mdos-toast[data-behind] {
  height: var(--h);
  overflow: hidden;
}
.mdos-toast[data-behind] > * {
  opacity: 0;
}
.mdos-toast[data-hidden],
.mdos-toast[data-leaving] {
  opacity: 0;
  pointer-events: none;
}
.mdos-toast[data-leaving] {
  translate: var(--x) calc(-1 * var(--y) + 12px);
}
.mdos-toast[data-swiping] {
  transition: none;
}
.mdos-toast:focus-visible {
  box-shadow:
    0 0 0 2px var(--mdos-accent, #0078d4),
    0 8px 24px -6px rgba(0, 0, 0, 0.22);
}
.mdos-toast-icon {
  display: grid;
  flex: none;
  width: 18px;
  height: 18px;
}
.mdos-toast-icon svg {
  width: 100%;
  height: 100%;
}
.mdos-toast[data-type="success"] .mdos-toast-icon {
  color: var(--mdos-success);
}
.mdos-toast[data-type="error"] .mdos-toast-icon {
  color: var(--mdos-danger);
}
.mdos-toast-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
.mdos-toast-action {
  all: unset;
  flex: none;
  padding: 5px 10px;
  border-radius: var(--mdos-r-1);
  font-size: 12px;
  font-weight: 700;
  color: var(--mdos-card-raised, #fff);
  background: var(--mdos-fg, #1d1d1f);
  cursor: pointer;
}
.mdos-toast-action:focus-visible {
  outline: 2px solid var(--mdos-accent, #0078d4);
  outline-offset: 2px;
}
/* Phone: top centre, the stack grows downward. */
html.mdos-touch:not(.mdos-tablet) #mdos-toasts {
  top: calc(env(safe-area-inset-top, 0px) + 12px);
  right: 16px;
  bottom: auto;
  left: 16px;
  width: auto;
}
html.mdos-touch:not(.mdos-tablet) .mdos-toast {
  top: 0;
  bottom: auto;
  transform-origin: 50% 100%;
  translate: var(--x) calc(var(--y) - 16px);
}
html.mdos-touch:not(.mdos-tablet) .mdos-toast[data-mounted] {
  translate: var(--x) var(--y);
}
html.mdos-touch:not(.mdos-tablet) .mdos-toast[data-leaving] {
  translate: var(--x) calc(var(--y) - 12px);
}
@media (prefers-reduced-motion: reduce) {
  .mdos-toast {
    transition: opacity 150ms linear;
  }
}
html.mdos-calm .mdos-toast {
  transition: opacity 150ms linear;
}

/* ══════════════ composer: frosted card, closed bottom ══════════════ */
/* Every composer (conversation, roleplay, game) is a see-through card
   (about 70%): the chat shows softly behind it, blurred so it never
   competes with what you type. On phones the card runs to the bottom
   edge, so nothing scrolls through a gap below it. */
html.mdos {
  --mdos-composer-under: var(--mdos-win-bg, #fff);
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area {
  --mdos-composer-under: var(--mdos-paper);
}
html.mdos .marinara-chat-input-shell[data-mh-composer] {
  background: color-mix(in srgb, var(--mdos-win-bg, #fff) 72%, transparent) !important;
  backdrop-filter: blur(18px) saturate(1.3) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.3) !important;
}
html.mdos:is([data-mdos-rp="book"], [data-mdos-rp="night"]) .rpg-chat-area .marinara-chat-input-shell[data-mh-composer] {
  background: color-mix(in srgb, var(--mdos-paper-2) 70%, transparent) !important;
  backdrop-filter: blur(18px) saturate(1.15) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.15) !important;
}
html.mdos-no-blur .marinara-chat-input-shell[data-mh-composer],
html.mdos-calm .marinara-chat-input-shell[data-mh-composer] {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
/* Desktop: the space around the card stays see-through (the chat or its
   background picture shows there, as before). */
/* Buttons that float just above the roleplay card (Marinara's or another
   extension's) get a frosted chip so they stay readable over the text. */
html.mdos .mari-roleplay-input-column button:not(.marinara-chat-input-shell *, .marinara-chat-input-shell) {
  background: color-mix(in srgb, var(--mdos-paper-2, var(--mdos-win-bg, #fff)) 94%, transparent) !important;
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
  box-shadow: var(--mdos-shadow-1) !important;
  opacity: 1 !important;
}
/* Tablets keep the card floating; the gap under it is filled. */
html.mdos-tablet.mdos-touch .chat-input-container.chat-input-container {
  background: linear-gradient(to top, var(--mdos-composer-under) max(34px, calc(env(safe-area-inset-bottom, 0px) + 18px)), transparent 0) !important;
}
/* Phones: no gap under the card; the card's own bottom padding
   keeps its buttons clear of the home indicator. */
html.mdos-touch.mdos-touch:not(.mdos-tablet) :is(.chat-input-container, .mari-chat-input).chat-input-container,
html.mdos-touch.mdos-touch:not(.mdos-tablet) [data-chat-mode] .mari-roleplay-input-column > .mari-chat-input {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
html.mdos-touch.mdos-touch:not(.mdos-tablet) .marinara-chat-input-shell[data-mh-composer] {
  margin-bottom: 0 !important;
  padding-bottom: max(30px, calc(env(safe-area-inset-bottom, 0px) + 22px)) !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-bottom-width: 0 !important;
}

/* ══════════════ motion: springs (CSS linear()) ══════════════ */
/* Physics-based easing sampled into linear() (damped springs; Chrome's
   "physics based easing" guide). --mdos-spring settles without overshoot
   (sheets, panels); --mdos-spring-pop overshoots ~1% (toasts, chips).
   Browsers without linear() keep the cubic-bezier tokens. Only transforms
   use them: an overshooting opacity would flicker. */
html.mdos {
  --mdos-spring: var(--mdos-ease-spring);
  --mdos-spring-pop: var(--mdos-ease-spring);
  --mdos-spring-dur: 360ms;
}
@supports (transition-timing-function: linear(0, 1)) {
  html.mdos {
    --mdos-spring: linear(0, 0.0114, 0.0414, 0.0846, 0.1368, 0.1945, 0.2551, 0.3166, 0.3774, 0.4363, 0.4926, 0.5456, 0.5951, 0.6409, 0.6829, 0.7212, 0.7558, 0.787, 0.8149, 0.8398, 0.8619, 0.8814, 0.8985, 0.9135, 0.9266, 0.938, 0.9478, 0.9563, 0.9636, 0.9698, 0.9751, 0.9797, 0.9835, 0.9867, 0.9894, 0.9916, 0.9934, 0.995, 0.9962, 0.9972, 1);
    --mdos-spring-pop: linear(0, 0.0182, 0.0653, 0.1317, 0.2096, 0.2933, 0.3781, 0.4609, 0.5394, 0.612, 0.6779, 0.7366, 0.7882, 0.8327, 0.8707, 0.9026, 0.929, 0.9506, 0.9679, 0.9815, 0.9919, 0.9998, 1.0054, 1.0093, 1.0118, 1.0132, 1.0138, 1.0137, 1.0132, 1.0123, 1.0113, 1.0102, 1.009, 1.0078, 1.0067, 1.0057, 1.0048, 1.0039, 1.0032, 1.0025, 1);
    --mdos-spring-dur: 490ms;
  }
}
html.mdos-touch:not(.mdos-tablet) :is(.mari-window[data-presentation="sheet"], aside[data-component="RightPanelMobile"], [data-component="Modal"] .mari-modal-panel) {
  transition: translate var(--mdos-spring-dur) var(--mdos-spring);
}
html.mdos-touch:not(.mdos-tablet) #mdos-cc {
  transition:
    opacity 167ms linear,
    transform var(--mdos-spring-dur) var(--mdos-spring),
    translate var(--mdos-spring-dur) var(--mdos-spring);
}
.mdos-toast {
  transition:
    translate var(--mdos-spring-dur) var(--mdos-spring-pop),
    scale var(--mdos-spring-dur) var(--mdos-spring-pop),
    opacity 250ms ease;
}
html.mdos :is(.mdos-chip, .mdos-cs-chip, .mdos-qs-pill, .mdos-qs-stat, .mdos-ov-row) {
  transition:
    background-color 120ms ease,
    box-shadow 120ms ease,
    scale var(--mdos-spring-dur) var(--mdos-spring-pop);
}
html.mdos :is(.mdos-chip, .mdos-cs-chip, .mdos-qs-pill, .mdos-qs-stat):active {
  scale: 0.96;
  transition-duration: 120ms, 120ms, 90ms;
}
@media (prefers-reduced-motion: reduce) {
  html.mdos :is(.mdos-chip, .mdos-cs-chip, .mdos-qs-pill, .mdos-qs-stat):active {
    scale: none;
  }
  .mdos-toast {
    transition: opacity 150ms linear;
  }
}

/* ══════════════ view transitions (settings) ══════════════ */
/* desktop.js wraps section switches in document.startViewTransition: the
   pane cross-fades and slides a little; the rest of the page holds still. */
.mdos-set-pane {
  view-transition-name: mdos-set-pane;
}
::view-transition-old(mdos-set-pane) {
  animation: 140ms ease-in both mdos-vt-out;
}
::view-transition-new(mdos-set-pane) {
  animation: var(--mdos-spring-dur, 360ms) var(--mdos-spring, ease-out) both mdos-vt-in;
}
@keyframes mdos-vt-out {
  to {
    opacity: 0;
    transform: translateY(-6px);
  }
}
@keyframes mdos-vt-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(mdos-set-pane),
  ::view-transition-new(mdos-set-pane) {
    animation: none;
  }
}

/* ══════════════ Vercel Web Interface Guidelines pass ══════════════ */
/* Hit targets >= 44px on touch: grow the box where the layout allows it,
   otherwise an invisible ::after extends the hit area. */
html.mdos-touch :is(.mdos-chip, .mdos-cs-chip, .mdos-qs-pill, .mdos-set-nav-item, .mdos-seg-btn) {
  min-height: 44px;
}
html.mdos-touch .mdos-set--narrow .mdos-set-nav-item {
  min-height: 44px;
  flex-basis: 44px;
}
html.mdos-touch :is(.mdos-help-btn, .mdos-set-search-clear, .mdos-toast-action, .mdos-toast-close, .mdos-qs-link, .mari-window[data-presentation="sheet"] .mari-window__control, .mari-right-panel-header button) {
  position: relative;
}
html.mdos-touch :is(.mdos-help-btn, .mdos-set-search-clear, .mdos-toast-action, .mdos-toast-close, .mdos-qs-link, .mari-window[data-presentation="sheet"] .mari-window__control, .mari-right-panel-header button)::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: max(100%, 44px);
  height: max(100%, 44px);
  translate: -50% -50%;
}
html.mdos-touch:not(.mdos-tablet) .mari-editor-header .mari-editor-action:not(.mari-editor-tab) {
  width: 44px !important;
  min-width: 44px !important;
  height: 44px !important;
  min-height: 44px !important;
}
/* No double-tap zoom delay, no grey tap flash on our controls. */
html.mdos :is(#mdos-cc, .mdos-set, #mdos-toasts, .mdos-cs-jump) :is(button, label, input, select, [role="button"]) {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
/* Scroll stays inside panels and sheets (no page bounce behind them). */
html.mdos :is(#mdos-cc, .mdos-set-pane, .mdos-set-nav, .mdos-help-pop, .mdos-cs-jump),
html.mdos-touch :is(.mari-window[data-presentation="sheet"] .mari-window__body, section[data-component="RightPanel"] [data-panel-key], [data-component="Modal"] .mari-modal-panel) {
  overscroll-behavior: contain;
}
/* Numbers line up when they change. */
html.mdos :is(.mdos-qs-stat-val, .mdos-cs-chip small, .mdos-set-range output, .mdos-qs-link, .mari-drawer__count, .mdos-chip) {
  font-variant-numeric: tabular-nums;
}
/* Titles wrap evenly; help text avoids lone last words. */
html.mdos :is(.mdos-set-group > h3, .mdos-set-cap, .mdos-qs-title, .mari-window__title, .mari-right-panel-header h2) {
  text-wrap: balance;
}
html.mdos :is(.mdos-set-hint, .mdos-help-pop, .mdos-toast-text, .mdos-ov-desc) {
  text-wrap: pretty;
}
/* Native controls follow the theme (scrollbars, selects, checkboxes). */
html.mdos[data-theme="light"] {
  color-scheme: light;
}
html.mdos:not([data-theme="light"]) {
  color-scheme: dark;
}
html.mdos .mdos-set .mdos-cc-select {
  color: var(--mdos-fg, #1d1d1f);
  background-color: var(--mdos-field, var(--mdos-card-raised, #fff));
}
/* Hover/press raise contrast, never lower it. */
html.mdos :is(.mdos-ov-row, .mdos-set-result):active {
  background: var(--mdos-fill-2, rgba(0, 0, 0, 0.08));
}
/* Toast close (desktop.js): a tap alternative to swiping. */
.mdos-toast-close {
  all: unset;
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin: -4px -6px -4px 0;
  border-radius: 50%;
  color: var(--mdos-fg-2, #6e6e73);
  cursor: pointer;
}
.mdos-toast-close:hover {
  color: var(--mdos-fg, #1d1d1f);
  background: var(--mdos-fill, rgba(0, 0, 0, 0.05));
}
.mdos-toast-close:focus-visible {
  outline: 2px solid var(--mdos-accent, #0078d4);
  outline-offset: 1px;
}
.mdos-toast-close svg {
  width: 9px;
  height: 9px;
  stroke: currentColor;
  stroke-width: 1.4;
}

/* ══════════════ chat list patterns (messaging apps) ══════════════ */
/* Built on Marinara's own markers, no :has() (this area repaints while a
   reply streams): data-grouped on a message that continues the previous
   one, its corner classes (rounded-*-md) for the place in a group,
   .mari-typing-indicator, .rpg-streaming, .mari-send-failed and
   .mari-message-swipes. */

/* Groups: air between senders, tight inside a group. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message:not([data-grouped]) {
  padding-top: 10px !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .mari-message[data-grouped] {
  padding-top: 0 !important;
}
/* Joined corners, like Messages: the corners that face the neighbour in
   the same group shrink. User bubbles carry Marinara's group classes. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] .mari-message-content.rounded-br-md {
  border-bottom-right-radius: 4px !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] .mari-message-content.rounded-r-md {
  border-top-right-radius: 4px !important;
  border-bottom-right-radius: 4px !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="user"] .mari-message-content.rounded-tr-md {
  border-top-right-radius: 4px !important;
}
/* Their side: paragraphs of one message are a group too. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content > .space-y-1\.5 > :not(:last-child) {
  border-bottom-left-radius: 4px !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content > .space-y-1\.5 > :not(:first-child) {
  border-top-left-radius: 4px !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message[data-grouped] .mari-message-content > :first-child,
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message[data-grouped] .mari-message-content > .space-y-1\.5 > :first-child {
  border-top-left-radius: 4px !important;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content:is(.rounded-bl-md, .rounded-l-md) > :last-child,
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] [data-message-role="assistant"] .mari-message-content:is(.rounded-bl-md, .rounded-l-md) > .space-y-1\.5 > :last-child {
  border-bottom-left-radius: 4px !important;
}

/* Date dividers: a small pill that sticks to the top while you scroll
   through that day. */
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .relative.my-4.flex.items-center {
  position: sticky !important;
  top: 8px;
  z-index: 3;
  justify-content: center;
  margin-block: 14px !important;
  pointer-events: none;
}
html.mdos[data-mdos-convo="messages"] [data-chat-mode="conversation"] .relative.my-4.flex.items-center > .mari-conversation-transcript-chrome-text {
  padding: 3px 10px;
  border-radius: var(--mdos-r-pill, 999px);
  color: var(--mdos-fg-2) !important;
  background: color-mix(in srgb, var(--mdos-cv-bg, var(--mdos-win-bg)) 82%, transparent);
  box-shadow: var(--mdos-shadow-1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-variant-numeric: tabular-nums;
}

/* Typing: Marinara's "is typing" row as a grey bubble with bouncing dots. */
html.mdos [data-chat-mode="conversation"] .mari-typing-indicator {
  width: fit-content;
  margin: 6px 0 4px 46px;
  padding: 9px 14px !important;
  border-radius: 18px 18px 18px 4px;
  background: var(--mdos-cv-bubble-them, var(--mdos-bubble-other, rgba(0, 0, 0, 0.06)));
  color: var(--mdos-fg-2);
}
html.mdos .mari-typing-indicator .mari-typing-dots > * {
  animation: mdos-typing 1.2s var(--mdos-ease-in-out, ease-in-out) infinite;
}
html.mdos .mari-typing-indicator .mari-typing-dots > :nth-child(2) {
  animation-delay: 0.15s;
}
html.mdos .mari-typing-indicator .mari-typing-dots > :nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes mdos-typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  30% {
    transform: translateY(-3px);
    opacity: 1;
  }
}
/* Roleplay: the passage being written gets a soft accent edge. */
html.mdos [data-chat-mode="roleplay"] .mari-rp-bubble.rpg-streaming {
  box-shadow: inset 3px 0 0 color-mix(in srgb, var(--mdos-accent, #0078d4) 55%, transparent) !important;
}
@media (prefers-reduced-motion: reduce) {
  html.mdos .mari-typing-indicator .mari-typing-dots > * {
    animation: none;
  }
}

/* Failed reply: a red-tinted notice with a real retry button. */
html.mdos .mari-send-failed {
  display: inline-flex !important;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-top: 6px !important;
  padding: 5px 6px 5px 10px;
  border-radius: var(--mdos-r-pill, 999px);
  color: var(--mdos-danger, #ce2c31) !important;
  background: color-mix(in srgb, var(--mdos-danger, #ce2c31) 10%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--mdos-danger, #ce2c31) 25%, transparent);
  font-size: 12px !important;
  font-weight: 600;
}
html.mdos .mari-send-failed > svg {
  width: 14px;
  height: 14px;
  flex: none;
}
html.mdos .mari-send-failed .mari-send-failed__text {
  color: inherit !important;
}
html.mdos .mari-send-failed .mari-link {
  padding: 3px 10px;
  border-radius: var(--mdos-r-pill, 999px);
  color: #fff !important;
  background: var(--mdos-danger, #ce2c31);
  text-decoration: none !important;
  font-weight: 700;
}
html.mdos .mari-send-failed .mari-link:focus-visible {
  outline: 2px solid var(--mdos-danger, #ce2c31);
  outline-offset: 2px;
}
html.mdos .mari-send-failed > span[aria-hidden] {
  display: none;
}

/* Swipes ("2 / 5"): one compact pill, arrows as round buttons. */
html.mdos .mari-message-swipes {
  display: inline-flex !important;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-radius: var(--mdos-r-pill, 999px);
  background: var(--mdos-fill, rgba(0, 0, 0, 0.05));
  font-variant-numeric: tabular-nums;
  font-size: 12px;
}
html.mdos .mari-message-swipes > button {
  width: 26px;
  height: 26px;
  border-radius: 50% !important;
}
html.mdos .mari-message-swipes > button:hover {
  background: var(--mdos-fill-2, rgba(0, 0, 0, 0.08)) !important;
}
html.mdos .mari-message-swipes .mari-swipe-input input {
  width: 2.2ch;
  text-align: right;
  background: transparent !important;
  border: 0 !important;
}
html.mdos-touch .mari-message-swipes > button {
  width: 36px;
  height: 36px;
}

/* ══════════════ empty widgets ══════════════ */
/* A widget with nothing to show says why, small and centred, with one
   action — instead of one grey sentence floating in a big card. */
.mdos-wg-empty--rich {
  display: grid;
  justify-items: center;
  gap: 6px;
  max-width: 260px;
  cursor: default;
}
.mdos-wg-empty--rich .mdos-wg-empty-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 2px;
  border-radius: var(--mdos-r-2, 14px);
  color: var(--mdos-widget-ink-2, currentColor);
  background: color-mix(in srgb, var(--mdos-widget-ink, #000) 7%, transparent);
}
.mdos-wg-empty--rich[data-why="noExt"] .mdos-wg-empty-icon,
.mdos-wg-empty--rich[data-why="noRead"] .mdos-wg-empty-icon {
  color: var(--mdos-warning, #ab6400);
  background: color-mix(in srgb, var(--mdos-warning, #ab6400) 12%, transparent);
}
.mdos-wg-empty--rich .mdos-wg-empty-icon svg {
  width: 18px;
  height: 18px;
}
.mdos-wg-empty--rich b {
  font-size: 13px;
  font-weight: 700;
  color: var(--mdos-widget-ink, inherit);
  text-wrap: balance;
}
.mdos-wg-empty--rich small {
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1.45;
  color: var(--mdos-widget-ink-2, inherit);
  text-wrap: pretty;
}
.mdos-wg-empty-btn {
  all: unset;
  margin-top: 4px;
  padding: 6px 12px;
  border-radius: var(--mdos-r-pill, 999px);
  font-size: 12px;
  font-weight: 700;
  color: var(--mdos-widget-ink, inherit);
  background: color-mix(in srgb, var(--mdos-widget-ink, #000) 8%, transparent);
  cursor: var(--mdos-cur-ptr, pointer);
}
.mdos-wg-empty-btn:hover {
  background: color-mix(in srgb, var(--mdos-widget-ink, #000) 13%, transparent);
}
.mdos-wg-empty-btn:focus-visible {
  outline: 2px solid var(--mdos-accent, #0078d4);
  outline-offset: 2px;
}

/* ══════════════ desktop floating windows (chat settings etc.) ══════════════ */
/* Marinara's floating windows (chat settings, popped-out sections like the
   chat summary) get the same look as the phone sheets: a grey page, a
   quiet header, sections as white cards, the jump chips under the header.
   Through Marinara's own --mari-window-* / --mari-drawer-* variables where
   it has them. */
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) {
  --mari-window-bg: var(--mdos-sh-page);
  --mari-window-radius: var(--mdos-r-3, 20px);
  --mari-window-border: var(--mdos-sh-sep);
  --mari-window-header-bg: transparent;
  --mari-window-header-padding: 12px 12px 8px 18px;
  --mari-window-text: var(--mdos-sh-fg);
  --mari-window-backdrop-filter: none;
  background: var(--mdos-sh-page) !important;
  color: var(--mdos-sh-fg);
  border-radius: var(--mdos-r-3, 20px) !important;
  box-shadow: var(--mdos-shadow-3) !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-window__header {
  border-bottom: 0 !important;
  background: transparent !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-window__title {
  font-size: 15px !important;
  font-weight: 800 !important;
  letter-spacing: -0.01em;
  color: var(--mdos-sh-fg) !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-window__control {
  width: 30px !important;
  height: 30px !important;
  border-radius: var(--mdos-r-1, 10px) !important;
  border: 0 !important;
  box-shadow: none !important;
  color: var(--mdos-sh-fg2) !important;
  background: transparent !important;
  transition: background-color 120ms ease, color 120ms ease;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-window__control:hover {
  color: var(--mdos-sh-fg) !important;
  background: var(--mdos-sh-fill) !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-window__body {
  background: var(--mdos-sh-page) !important;
}
/* Sections: white cards with air between them (no overflow clipping:
   drawers are flex items and would collapse). */
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .marinara-chat-popover__scroll {
  padding: 6px 12px 14px !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer {
  --mari-drawer-bg: var(--mdos-sh-card);
  --mari-drawer-header-bg: var(--mdos-sh-card);
  --mari-drawer-border: transparent;
  --mari-drawer-header-padding: 12px 14px;
  --mari-drawer-title-color: var(--mdos-sh-fg);
  --mari-drawer-count-bg: var(--mdos-sh-fill);
  --mari-drawer-count-text: var(--mdos-sh-fg2);
  flex-shrink: 0 !important;
  margin: 0 0 8px;
  border: 0 !important;
  border-radius: var(--mdos-r-2, 14px);
  background: var(--mdos-sh-card) !important;
  box-shadow: var(--mdos-shadow-1);
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__header {
  border-radius: var(--mdos-r-2, 14px);
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__header:hover {
  background: color-mix(in srgb, var(--mdos-sh-fg) 3%, var(--mdos-sh-card)) !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__title {
  font-size: 14px !important;
  font-weight: 700 !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__count {
  min-width: 20px;
  padding: 1px 7px !important;
  border-radius: var(--mdos-r-pill, 999px) !important;
  font-size: 11px !important;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__body {
  border-top: 1px solid var(--mdos-sh-sep);
}
/* Help / pop-out / chevron icons stay quiet until the row is hovered. */
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__header :is(.mari-drawer__help, .mari-drawer__popout) {
  opacity: 0.45;
  transition: opacity 120ms ease;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__header:hover :is(.mari-drawer__help, .mari-drawer__popout),
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .mari-drawer__header :is(.mari-drawer__help, .mari-drawer__popout):focus-visible {
  opacity: 1;
}
/* Inner cards and segmented controls, as on the phone. */
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .space-y-2.rounded-lg.p-2\.5.ring-1 {
  border-radius: var(--mdos-r-2, 14px) !important;
  background: var(--mdos-sh-page) !important;
  --tw-ring-color: transparent !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .grid.gap-1.rounded-lg.border.p-1 {
  gap: 2px !important;
  padding: 3px !important;
  border: 0 !important;
  border-radius: var(--mdos-r-1, 10px) !important;
  background: var(--mdos-sh-fill) !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .grid.gap-1.rounded-lg.border.p-1 > button[aria-pressed] {
  border-radius: 8px !important;
  font-weight: 600;
  background: transparent !important;
  --tw-ring-color: transparent !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .grid.gap-1.rounded-lg.border.p-1 > button[aria-pressed="true"] {
  color: var(--mdos-sh-fg) !important;
  background: var(--mdos-sh-card) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) :is(select, .mari-chrome-field, input[type="text"], input[type="number"], input[type="search"]) {
  border-radius: var(--mdos-r-1, 10px) !important;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) [data-settings-switch-track] {
  background: var(--mdos-sh-fill) !important;
  box-shadow: inset 0 0 0 1px var(--mdos-sh-sep);
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) input:checked + [data-settings-switch-track] {
  background: var(--mdos-sh-acc) !important;
  box-shadow: none;
}
html.mdos:not(.mdos-touch) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) [data-settings-switch-thumb] {
  background: #fff !important;
  --tw-ring-color: transparent !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25) !important;
}
/* Dark: the chosen segment lifts above the track. */
html.mdos:not(.mdos-touch):not([data-theme="light"]) .mari-window:not([data-presentation="sheet"], .mari-window-bubble) .grid.gap-1.rounded-lg.border.p-1 > button[aria-pressed="true"] {
  background: color-mix(in srgb, var(--mdos-sh-card) 80%, #fff) !important;
}
/* Jump chips on desktop: a single scrolling row, mouse wheel friendly. */
html.mdos:not(.mdos-touch) .mdos-cs-jump {
  padding: 3px 12px 10px;
  margin: 0;
  border-bottom: 0;
}
html.mdos:not(.mdos-touch) .mdos-cs-chip:hover {
  background: color-mix(in srgb, var(--mdos-sh-fg) 4%, var(--mdos-sh-card));
}
html.mdos:not(.mdos-touch) .mdos-cs-chip {
  cursor: pointer;
}
`,
].join("\n");
