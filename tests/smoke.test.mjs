// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const home = readFileSync(join(dist, 'index.html'), 'utf8');

test('homepage is prerendered with real content, not an empty shell', () => {
  assert.ok(home.length > 20000, `prerendered HTML too small: ${home.length}`);
  for (const marker of ['NALIDE', '生态', '联系', '服务状态', '友情链接']) {
    assert.ok(home.includes(marker), `missing marker in prerendered HTML: ${marker}`);
  }
});

test('all local assets referenced by the homepage exist in dist', () => {
  const refs = [...home.matchAll(/(?:src|href)="(\/(?:assets|fonts|media|layers)\/[^"]+)"/g)]
    .map((m) => m[1].split('?')[0]);
  assert.ok(refs.length > 0, 'no asset references found');
  for (const ref of refs) {
    assert.ok(existsSync(join(dist, ref)), `referenced asset missing: ${ref}`);
  }
});

test('every sitemap URL has a built page', () => {
  const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>https:\/\/nalide\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
  assert.ok(urls.length >= 4, `expected at least 4 sitemap URLs, got ${urls.length}`);
  for ( const path of urls) {
    const file = path === '/' || path === '' ? join(dist, 'index.html') : join(dist, path, 'index.html');
    assert.ok(existsSync(file), `sitemap URL has no built page: ${path}`);
  }
});

test('security.txt is complete and not expired', () => {
  const txt = readFileSync(join(dist, '.well-known', 'security.txt'), 'utf8');
  for (const field of ['Contact:', 'Policy:', 'Expires:']) {
    assert.ok(txt.includes(field), `security.txt missing ${field}`);
  }
  const expires = txt.match(/Expires:\s*(\S+)/)[1];
  assert.ok(new Date(expires) > new Date(), `security.txt expired at ${expires}`);
});

test('font license files ship with the fonts', () => {
  for (const name of ['OFL-manrope.txt', 'OFL-michroma.txt', 'OFL-ibmplexmono.txt']) {
    assert.ok(existsSync(join(dist, 'fonts', name)), `missing font license: ${name}`);
  }
});
