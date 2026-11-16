// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

import {aboutTeaser, announcements, newsSection} from '../content';
import {useReveals} from '../hooks/useReveals';

/** Latest announcements (top 3) plus a short brand intro teaser.
 *  Full list lives on /announcements/, the story on /about/. */
export function Announcements() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} id="news" aria-labelledby="news-title" className="relative bg-void px-4 py-28 sm:px-6 md:px-[6vw] md:py-40">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <p className="font-mono text-label text-earth uppercase">{newsSection.eyebrow}</p>
          <h2 id="news-title" className="mt-4 font-display text-display text-white">
            {newsSection.heading}
          </h2>
        </div>
        <p className="font-mono text-label text-regolith/50 uppercase">{newsSection.note}</p>
      </div>

      <ol className="mt-14 border-y border-white/10 md:mt-20">
        {announcements.map((a, i) => (
          <li
            key={`${a.date}-${a.title}`}
            data-reveal
            style={{transitionDelay: `${i * 110}ms`}}
            className="grid gap-1.5 border-b border-white/10 py-6 last:border-b-0 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8 md:py-7"
          >
            <time dateTime={a.date} className="font-mono text-label text-regolith/50">
              {a.date}
            </time>
            <div>
              <h3 className="text-[1.0625rem] font-semibold text-white">{a.title}</h3>
              <p className="mt-1 text-regolith/75">{a.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div data-reveal className="mt-8">
        <a href="/announcements/" className="font-mono text-label text-earth uppercase transition-colors hover:text-white">
          {newsSection.allLabel} →
        </a>
      </div>

      <div data-reveal className="mt-24 grid items-end gap-6 md:mt-32 md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <p className="font-mono text-label text-earth uppercase">{aboutTeaser.eyebrow}</p>
          <p className="mt-4 max-w-2xl text-[1.125rem] leading-relaxed text-regolith/85">{aboutTeaser.body}</p>
        </div>
        <a
          href="/about/"
          className="inline-block rounded-[4px] bg-white px-5 py-3 text-center font-mono text-label font-medium text-void uppercase transition-colors hover:bg-earth"
        >
          {aboutTeaser.cta}
        </a>
      </div>
    </section>
  );
}
