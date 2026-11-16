// SPDX-FileCopyrightText: 2026 NALIDE
// SPDX-License-Identifier: MIT

import {useRef, useState, type FormEvent} from 'react';
import {brand, reserve} from '../content';
import {useReveals} from '../hooks/useReveals';

type Status = 'idle' | 'invalid' | 'sent';

/**
 * 联系区。品牌叙事在左，留资表单在右；
 * 表单把一封写好的邮件草稿交给访客自己的邮件应用发给 contact@。
 */
export function Reserve() {
  const ref = useReveals<HTMLElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const text = `联系 NALIDE\n称呼：${String(data.get('name') ?? '')}\n邮箱：${String(data.get('email') ?? '')}\n意向方向：${String(data.get('mission') ?? '')}\n（请发送至 ${brand.email}）`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus('invalid');
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`联系 NALIDE：${String(data.get('mission'))}`);
    const body = encodeURIComponent(`称呼：${String(data.get('name'))}\n邮箱：${String(data.get('email'))}\n意向方向：${String(data.get('mission'))}`);
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  const field =
    'w-full rounded-[4px] bg-white/[0.04] px-4 py-3.5 text-body text-white ring-1 ring-white/15 outline-none placeholder:text-regolith/60 focus:ring-earth user-invalid:ring-red-400/70';

  return (
    <section ref={ref} id="reserve" aria-labelledby="reserve-title" className="relative overflow-hidden bg-void px-4 pb-28 sm:px-6 md:px-[6vw] md:pb-40">
      {/* A sliver of the Earth rising at the bottom edge — the hero, bookended. */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[62vw] left-1/2 size-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(111,182,255,0.35),rgba(111,182,255,0.05)_55%,transparent_70%)]" />

      <div className="relative grid gap-12 border-t border-white/10 pt-20 md:grid-cols-2 md:gap-16 md:pt-28">
        <div data-reveal>
          <p className="font-mono text-label text-earth uppercase">{reserve.eyebrow}</p>
          <h2 id="reserve-title" className="mt-4 font-display text-display text-white">
            {reserve.heading}
          </h2>
          <p className="mt-5 max-w-[28rem] text-body text-regolith/70">{reserve.body}</p>
          <p className="mt-10 font-mono text-label text-regolith/60 uppercase">
            直接写信 · <span className="text-white">{brand.email}</span>
          </p>
        </div>

        <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="reserve-status" className="space-y-3" data-reveal>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">怎么称呼</span>
            <input name="name" required autoComplete="name" placeholder="你的名字或公司" className={field} onInput={() => setStatus('idle')} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">邮箱</span>
            <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} onInput={() => setStatus('idle')} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-regolith/60 uppercase">意向方向</span>
            <select name="mission" defaultValue={reserve.options[0]} className={`${field} appearance-none`}>
              {reserve.options.map((o) => (
                <option key={o} value={o} className="bg-void">
                  {o}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="mt-2 w-full rounded-[4px] bg-white px-5 py-4 font-mono text-label font-medium text-void uppercase transition-colors hover:bg-earth">
            提交联系方式
          </button>
          <button type="button" onClick={onCopy} className="w-full rounded-[4px] px-5 py-3 font-mono text-label text-regolith/70 uppercase ring-1 ring-white/15 transition-colors hover:text-white hover:ring-white/35">
            {copied ? '已复制，去粘贴发送' : '复制联系信息'}
          </button>
          <p id="reserve-status" role="status" className="min-h-[1.25rem] text-[0.8125rem] text-regolith/70">
            {status === 'invalid' && '称呼和有效邮箱填一下，方便我们回你。'}
            {status === 'sent' && `你的邮件应用应该已经打开并写好草稿；如果没有，直接写给 ${brand.email}。`}
          </p>
        </form>
      </div>
    </section>
  );
}
