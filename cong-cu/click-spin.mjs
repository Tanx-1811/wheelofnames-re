// Triggers one spin (Ctrl+Enter) in the already-open wheelofnames tab over CDP, while REA observes.
// Uses the playwright-core copy installed with REA; set REA_DIR if REA lives elsewhere.
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { join } from "node:path";
const reaDir = process.env.REA_DIR ?? join(homedir(), "Documents/GitHub/rea");
const require = createRequire(join(reaDir, "package.json"));
const { chromium } = require("playwright-core");
const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith("https://wheelofnames.com"));
if (!page) throw new Error("wheelofnames page not found");
await page.bringToFront();
await page.keyboard.press("Control+Enter"); // the site's own spin shortcut
console.log("spin triggered at", new Date().toISOString());
await new Promise((r) => setTimeout(r, 12000));
process.exit(0); // drop the CDP connection without closing the browser
