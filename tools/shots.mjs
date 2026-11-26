// Screenshot review board (Storybook-style) for the redesigned screens.
//
//   node tools/shots.mjs            # all stories, all variants
//   node tools/shots.mjs toasts     # stories whose name contains "toasts"
//
// Renders every [data-story] in tools/gallery/stories.html with the real
// stylesheets (dist/marinara-desktop.min.css + the CSS inside styles.js),
// in light and dark, on a desktop and a phone, and writes PNGs plus a
// contact sheet to tools/gallery/shots/ (open index.html there).
// The toast story runs the real toast() from desktop.js.
// Rebuild the CSS first (python3 tools/build-css.py) after editing it.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "tools/gallery/shots");
const filter = process.argv[2] || "";

const css = fs.readFileSync(path.join(ROOT, "dist/marinara-desktop.min.css"), "utf8");
const lateCss = new Function(`${fs.readFileSync(path.join(ROOT, "styles.js"), "utf8")}\nreturn MDOS_LATE_CSS;`)();
const desktopJs = fs.readFileSync(path.join(ROOT, "desktop.js"), "utf8");
const stories = fs.readFileSync(path.join(ROOT, "tools/gallery/stories.html"), "utf8");

// Pieces of desktop.js the toast story needs: h(), raf and the toast block.
const cut = (from, to) => {
  const a = desktopJs.indexOf(from);
  const b = desktopJs.indexOf(to, a);
  if (a < 0 || b < 0) throw new Error(`shots.mjs: cannot find "${from}" in desktop.js`);
  return desktopJs.slice(a, b + to.length);
};
const toastJs = [
  cut("function h(tag", "\nconst raf").replace(/\nconst raf$/, ""),
  "const raf = (fn) => requestAnimationFrame(fn);",
  cut("// Toasts, stacked like Sonner", "  return () => dismissToast(t);\n}"),
].join("\n");

// BASE: the page around a story, plus a few of Marinara's own rules the
// mocks need (header/drawer padding from its CSS variables, Tailwind's
// button reset, the primary colour) since its stylesheet is not loaded.
// Icon drawings for the icon story: ICONS, FLUENT and their two helpers.
const iconJs = [cut("const ICONS = {", "\n};"), cut("const FLUENT = {", "\n};"), cut("const fluentSvg", "\nconst LOGO").replace(/\nconst LOGO$/, "")].join("\n");
const ICON_STYLES = ["fluent", "gradient", "glass", "pastel", "tinted", "dark", "line", "duotone", "outline", "mono"];
const ICON_APPS = [
  ["chat", "#6ef08d", "#17a84d"], ["roleplay", "#ffd36b", "#ff8a3d"], ["game", "#c49bff", "#7a3ff2"], ["characters", "#7ad7ff", "#2f7cf2"],
  ["lorebooks", "#ff9d7a", "#e5533d"], ["presets", "#9aa6bb", "#4f5a70"], ["settings", "#c9ced8", "#868d9b"], ["notes", "#ffe680", "#f2b705"],
];
const BASE = `
  html.mdos.mdos body { margin: 0; padding: 16px; background: var(--mdos-page, #eee) !important; color: var(--mdos-fg); font: 14px/1.4 system-ui, sans-serif; }
  html { --primary: #0a84ff; --border: var(--mdos-sep); --background: var(--mdos-win-bg); --foreground: var(--mdos-fg); }
  .mari-window button, [data-lorebook-entry-row-id] button, .mari-editor-panel button { border: 0; background: none; padding: 4px; }
  .mari-window__header { padding: var(--mari-window-header-padding, 8px 12px); background: var(--mari-window-header-bg); }
  .mari-drawer__header { padding: var(--mari-drawer-header-padding, 12px 16px); background: var(--mari-drawer-header-bg); }
  .mari-drawer__count { background: var(--mari-drawer-count-bg); color: var(--mari-drawer-count-text); }
  .mari-window { background: var(--mari-window-bg); color: var(--mari-window-text); }
  [data-lorebook-entry-row-id] input { border: 1px solid var(--mdos-sep); background: none; color: inherit; }
  .story-win { display: flex; height: 560px; border-radius: 10px; overflow: hidden; background: var(--mdos-win-bg); box-shadow: var(--mdos-shadow-3); }
  .story-static { position: relative !important; inset: auto !important; transform: none !important; translate: none !important; opacity: 1 !important; max-height: none !important; }
  html:not(.mdos-touch) .phone-only { display: none; }
  button { font: inherit; color: inherit; }
`;

const VARIANTS = [
  { id: "desktop-light", theme: "light", phone: false },
  { id: "desktop-dark", theme: "dark", phone: false },
  { id: "phone-light", theme: "light", phone: true },
  { id: "phone-dark", theme: "dark", phone: true },
];

const storyList = [...stories.matchAll(/<template data-story="([^"]+)"([^>]*)>([\s\S]*?)<\/template>/g)].map((m) => ({
  name: m[1],
  attrs: m[2],
  body: m[3],
  width: Number(/data-width="(\d+)"/.exec(m[2])?.[1] || 760),
  phoneWidth: Number(/data-phone-width="(\d+)"/.exec(m[2])?.[1] || 390),
  phoneOnly: /data-phone-only/.test(m[2]),
  desktopOnly: /data-desktop-only/.test(m[2]),
  run: /data-run="([^"]+)"/.exec(m[2])?.[1],
}));

fs.mkdirSync(OUT, { recursive: true });
if (!filter) for (const f of fs.readdirSync(OUT)) if (f.endsWith(".png")) fs.unlinkSync(path.join(OUT, f));
const browser = await chromium.launch();
const made = [];
const errors = [];
for (const story of storyList.filter((s) => s.name.includes(filter))) {
  for (const v of VARIANTS) {
    if (story.phoneOnly && !v.phone) continue;
    if (story.desktopOnly && v.phone) continue;
    const width = (v.phone ? story.phoneWidth : story.width) + 32;
    const page = await browser.newPage({ viewport: { width, height: 760 }, deviceScaleFactor: 2, hasTouch: v.phone });
    page.on("pageerror", (e) => errors.push(`${story.name}/${v.id}: ${e.message}`));
    const cls = ["mdos", v.phone ? "mdos-touch" : "mdos-desktop"].join(" ");
    await page.setContent(`<!doctype html><html class="${cls}" data-theme="${v.theme}" lang="ko"><head><meta charset="utf-8">
      </head><body>${story.body}</body></html>`);
    await page.addStyleTag({ content: css });
    await page.addStyleTag({ content: lateCss });
    await page.addStyleTag({ content: BASE });
    if (v.phone) await page.evaluate(() => document.querySelectorAll("[data-narrow-on-phone]").forEach((el) => el.classList.add("mdos-set--narrow")));
    if (story.run === "toasts") {
      await page.addScriptTag({
        content: `const doc = document, html = document.documentElement, KO = true, marinara = { setTimeout: setTimeout.bind(window), clearTimeout: clearTimeout.bind(window) };
          const state = { reduceMotion: true }, ui = document.body, svg = () => "";
          let disposed = false;
          ${toastJs}
          toast("저장했어요", { type: "success" });
          toast("확장 저장 공간이 거의 찼어요. 배경화면이나 사진을 몇 개 지워 주세요.", { type: "error" });
          toast("북마크에 넣었어요", { action: { label: "되돌리기", run() {} } });`,
      });
      await page.waitForTimeout(500);
      await page.setViewportSize({ width, height: 260 });
    }
    if (story.run === "icons") {
      // One row per icon style, each in its own frame so the html-level
      // data-mdos-icon-style can differ per row.
      await page.addScriptTag({ content: `${iconJs}\nwindow.__icon = (n) => fluentSvg(n) + svg(n);` });
      await page.evaluate(({ styles, apps, theme, css }) => {
        const icons = apps.map(([n, g1, g2]) => `<span class="mdos-app-icon has-fluent" style="--g1:${g1};--g2:${g2};width:44px;height:44px;display:inline-grid;place-items:center;border-radius:var(--mdos-shape, 22%);overflow:hidden">${window.__icon(n)}</span>`).join("");
        document.body.innerHTML = styles
          .map((st) => `<div style="display:flex;align-items:center;gap:12px;margin:6px 0"><code style="width:70px;font-size:12px">${st}</code><iframe data-st="${st}" style="border:0;width:440px;height:56px;background:transparent"></iframe></div>`)
          .join("");
        for (const f of document.querySelectorAll("iframe")) {
          f.srcdoc = `<html class="mdos mdos-desktop" data-theme="${theme}" data-mdos-icon-style="${f.dataset.st}"><head><style>${css}</style><style>html,body{margin:0;background:transparent!important}body{display:flex;gap:10px;padding:6px}</style></head><body>${icons}</body></html>`;
        }
      }, { styles: ICON_STYLES, apps: ICON_APPS, theme: v.theme, css: css + "\n" + lateCss });
      await page.waitForTimeout(400);
    }
    await page.waitForTimeout(150);
    const file = `${story.name}--${v.id}.png`;
    const target = story.run === "toasts" ? page : story.run === "icons" ? page.locator("body") : page.locator("body > *").first();
    await target.screenshot({ path: path.join(OUT, file) });
    made.push({ story: story.name, variant: v.id, file });
    await page.close();
  }
}
await browser.close();

const rows = [...new Set(made.map((m) => m.story))]
  .map((s) => `<h2>${s}</h2><div class="row">${made.filter((m) => m.story === s).map((m) => `<figure><img src="${m.file}"><figcaption>${m.variant}</figcaption></figure>`).join("")}</div>`)
  .join("\n");
fs.writeFileSync(
  path.join(OUT, "index.html"),
  `<!doctype html><meta charset="utf-8"><title>Marinara Desktop shots</title><style>body{font:14px system-ui;margin:24px;background:#f4f4f5}.row{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start}figure{margin:0;background:#fff;padding:8px;border-radius:8px}img{display:block;max-width:420px}figcaption{font-size:12px;color:#666;margin-top:4px}</style>${rows}`,
);
console.log(`${made.length} shots in ${path.relative(ROOT, OUT)}/`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}
