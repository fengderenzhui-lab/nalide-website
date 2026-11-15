// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

import {useEffect, useRef} from 'react';

/**
 * Watches every `[data-reveal]` element inside the returned ref's element and
 * adds `.is-in` the first time each one is seen.
 *
 * Each section owns its own observer (rather than one page-level query at
 * mount) so elements that mount later — or re-mount on hot reload — are
 * never left stuck in their hidden state.
 */
export function useReveals<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Siblings in the same block surface in sequence, not all at once.
          const siblings = el.parentElement ? [...el.parentElement.querySelectorAll(':scope > [data-reveal]')] : [];
          const idx = Math.max(0, siblings.indexOf(el));
          el.style.setProperty('--reveal-delay', `${Math.min(idx, 4) * 90}ms`);
          el.classList.add('is-in');
          io.unobserve(el);
        });
      },
      {rootMargin: '0px 0px -10% 0px'},
    );

    const watch = () =>
      root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch();

    // Pick up anything React adds later.
    const mo = new MutationObserver(watch);
    mo.observe(root, {childList: true, subtree: true});

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return ref;
}
