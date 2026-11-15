// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

/**
 * 预渲染：构建产物先在本地起服务，用无头 Chrome 打开首页，
 * 等首帧渲染稳定后把完整 DOM 序列化回 dist/index.html。
 * 效果：HTML 里直接带全文（AI 抓取器/搜索引擎不跑 JS 也能读），
 * 真人浏览器打开时 React 照常接管、动画不变。
 * 用法：npm run build 后，node scripts/prerender.mjs（puppeteer 为项目 devDependency）。
 */
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {setTimeout as sleep} from 'node:timers/promises';

const require = createRequire(import.meta.url);
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch {
  // 本地回退：沙箱里的共享 shottools 副本
  puppeteer = createRequire('/home/hatch/workspace/shottools/anchor.js')('puppeteer');
}

const PORT = 3009;
const DIST_INDEX = new URL('../dist/index.html', import.meta.url).pathname;

const server = spawn('npx', ['vite', 'preview', `--port=${PORT}`], {
  cwd: new URL('..', import.meta.url).pathname,
  stdio: 'ignore',
});

try {
  // 等服务起来
  for (let i = 0; i < 30; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/`);
      if (r.ok) break;
    } catch {}
    await sleep(500);
  }
  const browser = await puppeteer.launch({headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage']});
  const page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
  await page.goto(`http://localhost:${PORT}/`, {waitUntil: 'networkidle2', timeout: 60000});
  await sleep(3000); // 等字体与首帧动画落定
  const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);
  await browser.close();
  if (!html.includes('先把一件事做对') || !html.includes('友情链接')) {
    throw new Error('snapshot missing body copy — refusing to write');
  }
  writeFileSync(DIST_INDEX, html);
  console.log('prerendered:', DIST_INDEX, (html.length / 1024).toFixed(1), 'KB');
} finally {
  server.kill();
}
