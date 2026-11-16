// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

import {useEffect, useState, type MouseEvent} from 'react';
import {aboutLinks, brand, colophon, friends, greenHosting, internetnl, nav, policies, securityHeaders, securityLinks, statusPage} from '../content';
import {onFrame, scrollToHash} from '../lib/scroll';

function go(e: MouseEvent<HTMLAnchorElement>, then?: () => void) {
  const hash = e.currentTarget.getAttribute('href');
  if (!hash?.startsWith('#')) return;
  e.preventDefault();
  then?.();
  scrollToHash(hash);
}

/** A crescent: the mark. */
function Crescent({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M15.5 3.2A9 9 0 1 0 20.8 16 7.2 7.2 0 0 1 15.5 3.2Z" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(
    () =>
      onFrame(() => {
        const y = window.scrollY > 60;
        setCompact((prev) => (prev === y ? prev : y));
      }),
    [],
  );
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white [padding-top:env(safe-area-inset-top)]">
      <div
        className={`chrome-in flex items-center justify-between px-4 transition-all duration-500 sm:px-6 md:px-[3vw] ${
          compact ? 'bg-void/75 pt-3 pb-3 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:pt-3 sm:pb-3' : 'pt-4 pb-4 sm:pt-5 sm:pb-5'
        }`}
      >
        <a href="#top" onClick={(e) => go(e)} className="flex items-center gap-2.5" aria-label={`${brand.name} — back to top`}>
          <Crescent className="size-5" />
          <span className="font-display text-[0.9375rem] tracking-[0.36em]">{brand.wordmark}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => go(e)} className="font-mono text-label text-white/75 uppercase transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
          <a href="#reserve" onClick={(e) => go(e)} className="rounded-[4px] bg-white px-4 py-2.5 font-mono text-label font-medium text-void uppercase transition-colors hover:bg-earth">
            联系我们
          </a>
        </nav>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" className="font-mono text-label font-medium uppercase md:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="menu" inert={!open} className={`fixed inset-0 -z-10 flex flex-col justify-center gap-6 bg-void/95 px-6 backdrop-blur-xl transition-opacity md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        {nav.map((item, i) => (
          <a key={item.href} href={item.href} onClick={(e) => go(e, () => setOpen(false))} className="flex items-baseline gap-4 font-display text-[1.75rem] tracking-[0.14em] uppercase">
            <span className="font-mono text-label text-earth">0{i + 1}</span>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void px-4 pt-10 [padding-bottom:max(2rem,env(safe-area-inset-bottom))] sm:px-6 md:px-[6vw]">
      <div className="flex items-center gap-2.5 pb-8 font-mono text-label text-white/70 uppercase">
        <Crescent className="size-4 text-white/85" />
        <span className="font-display text-[0.8125rem] tracking-[0.36em] text-white">{brand.wordmark}</span>
        <span>· 品牌官网</span>
        <a href={statusPage.href} target="_blank" rel="noopener" className="ml-auto flex items-center gap-2 normal-case hover:text-white">
          <span className="size-1.5 rounded-full bg-[#5ea2ff]" />
          {statusPage.label}
        </a>
      </div>
      <div className="grid gap-x-12 gap-y-3.5 font-mono text-label text-regolith/60 uppercase sm:grid-cols-2">
        
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-5">
          <span className="text-regolith/60">政策</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
            {policies.map((p) => (
              <a key={p.href} href={p.href} className="hover:text-white">
                {p.label}
              </a>
            ))}
          </span>
        </div>
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-5">
          <span className="text-regolith/60">安全</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
            {securityLinks.map((s) => (
              <a key={s.href} href={s.href} className={s.label.includes('.') ? 'lowercase hover:text-white' : 'hover:text-white'}>
                {s.label}
              </a>
            ))}
          </span>
        </div>
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-5">
          <span className="text-regolith/60">邮箱</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
            <a href={`mailto:${brand.email}`} className="lowercase hover:text-white">
              {brand.email}
            </a>
          </span>
        </div>
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-5">
          <span className="text-regolith/60">关于</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
            {aboutLinks.map((a) => (
              <a key={a.href} href={a.href} className="hover:text-white">
                {a.label}
              </a>
            ))}
          </span>
        </div>
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-5">
          <span className="text-regolith/60">友情链接</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1.5">
            {friends.map((f) => (
              <a key={f.href} href={f.href} target="_blank" rel="noopener" className="lowercase hover:text-white">
                {f.label}
              </a>
            ))}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 pt-7 font-mono text-label normal-case text-regolith/60">
        <span>{colophon.typefaces}</span>
        <a href="/sitemap.xml" className="hover:text-white">
          站点地图
        </a>
        <span>更新于 {colophon.updated}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-3.5 font-mono text-label text-regolith/60 uppercase">
        <span>© {new Date().getFullYear()} NALIDE · 版权所有</span>
        <a href="#top" onClick={(e) => go(e)} className="hover:text-white">
          回到顶部 ↑
        </a>
      </div>
      <div className="pt-2 font-mono text-label text-regolith/60 normal-case">
        <span>运营公司：HongKongShine Electronic Co., Limited</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
        <a href={greenHosting.href} target="_blank" rel="noopener" className="inline-block opacity-90 transition-opacity hover:opacity-100">
          <img src={greenHosting.src} alt={greenHosting.alt} width={200} height={95} loading="lazy" className="h-10 w-auto" />
        </a>
        <a href={internetnl.href} target="_blank" rel="noopener" className="inline-block opacity-90 transition-opacity hover:opacity-100">
          <img src={internetnl.src} alt={internetnl.alt} width={204} height={38} loading="lazy" className="h-10 w-auto" />
        </a>
        <a href={securityHeaders.href} target="_blank" rel="noopener" className="inline-block opacity-90 transition-opacity hover:opacity-100">
          <img src={securityHeaders.src} alt={securityHeaders.alt} width={248} height={48} loading="lazy" className="h-10 w-auto" />
        </a>
      </div>
    </footer>
  );
}
