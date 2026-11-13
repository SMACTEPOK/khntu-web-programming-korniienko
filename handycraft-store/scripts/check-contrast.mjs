import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");

const colors = {
  ...Object.fromEntries(
    [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\s*/g)].map((m) => [m[1], m[2]])
  ),
};

const channel = (value) => {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const CHECKS = [
  ["white", "background", 4.5, "Button primary: текст на темному"],
  ["text", "background", 4.5, "Основний текст на тлі сторінки"],
  ["muted", "background", 4.5, "Input: підказка"],
  ["danger", "background", 4.5, "Input: текст помилки"],
  ["white", "surface", 4.5, "CardTitle: текст на картці"],
  ["text", "surface", 4.5, "Card: звичайний текст"],
  ["accent", "background", 3, "Контур фокуса на тлі сторінки"],
  ["accent", "surface", 3, "Контур фокуса на поверхні"],
  ["border", "background", 3, "Input: межа (нетекстовий контраст)"],
];

let failed = 0;
for (const [fg, bg, min, label] of CHECKS) {
  const value = ratio(colors[fg], colors[bg]);
  const ok = value >= min;
  if (!ok) failed += 1;
  console.log(`${ok ? "OK  " : "FAIL"} ${value.toFixed(2).padStart(5)}  (мін. ${min})  ${label}`);
}
process.exit(failed === 0 ? 0 : 1);
