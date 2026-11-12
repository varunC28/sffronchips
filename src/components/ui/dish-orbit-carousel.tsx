import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * Dish Orbit Carousel: a smart-kitchen-display menu. The plated dish sits on
 * the left; changing dish swings it out over the top on a wide orbit while the
 * next plate swings in from the other side.
 */

export type Dish = {
  /** The thin first title line, e.g. "Sffron". */
  title: string;
  /** The heavy second title line, e.g. "Masala Ring". */
  subtitle: string;
  /** Plate/pack photo, square. */
  image: string;
  alt?: string;
  /** Small line above the title. Defaults to "#n Most loved snack". */
  eyebrow?: string;
  /** Two-line label under the thumbnail. Defaults to title + subtitle. */
  label?: string;
  rating: number;
  chef: string;
  /** Kitchen, unit or city, under the chef/brand name. */
  kitchen?: string;
  description: string;
  likes: number;
  /** Snack key badges (NO ingredients or nutrition tables) */
  highlights?: string[];
  /** Badge and band colour: hex or rgb(), so the band can morph between dishes. */
  accent: string;
  price?: string;
  weight?: string;
  tagline?: string;
};

export type DishOrbitCarouselProps = {
  dishes: Dish[];
  /** Root height. A definite length: percentages collapse on a host page. */
  height?: string;
  /** Optional photo behind the display. */
  backdrop?: string;
  /** Scroll on forever: past the last dish comes the first again. */
  loop?: boolean;
  /** Embedded display face. Pass null to use the host's font. */
  fontSrc?: string | null;
  onPlay?: (dish: Dish, index: number) => void;
  onOrder?: (dish: Dish, index: number) => void;
  onChange?: (index: number) => void;
  activeIndex?: number;
  className?: string;
};

function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((Math.round(i) % n) + n) % n;
}

function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1;
  const fwd = (((to - from) % n) + n) % n;
  return fwd <= n - fwd ? 1 : -1;
}

function scrollSteps(n: number, loop: boolean): number {
  return Math.max(0, loop ? n : n - 1);
}

function segmentFor(i: number, current: number, n: number, loop: boolean): number {
  return loop && i === 0 && current > n / 2 ? n : i;
}

function stripStart(index: number, n: number, visible: number): number {
  if (n <= visible) return 0;
  return Math.max(0, Math.min(index - 1, n - visible));
}

function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em));
}

function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45);
    const c = Math.cos(a);
    const s = Math.sin(a);
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1));
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1));
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z";
}

const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]];
function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length];
}

const ARC_SWEEP = [38, 146];

const ORBIT_X = 299;
const ORBIT_Y = -470;
const ORBIT_R = 650;
const SCROLL_PER_DISH = 0.5;
const SWING = 50;
const ITEM = 104;
const VISIBLE = 4;
const FONT = "dsh-face";

const CSS =
  ".dsh-trk{position:relative;width:100%}" +
  ".dsh-root{position:sticky;top:0;overflow:hidden;width:100%;background:transparent;color:#ffffff;" +
  "font-family:" + FONT + ",ui-sans-serif,system-ui,sans-serif;container-type:inline-size;-webkit-tap-highlight-color:transparent}" +
  ".dsh-root *{box-sizing:border-box}" +
  ".dsh-bd{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;pointer-events:none}" +
  ".dsh-wash{position:absolute;inset:0;background:rgba(5,5,8,0.38);pointer-events:none}" +
  ".dsh-dim{position:absolute;inset:0;background:#050508;mix-blend-mode:multiply;opacity:.72;pointer-events:none}" +
  ".dsh-root:focus-visible{outline:2px solid #E5232A;outline-offset:-4px}" +
  ".dsh-canvas{position:absolute;left:50%;top:calc(50% - 10px);width:1040px;height:360px;transform:translate(-50%,-50%) scale(var(--dsh-s,1));transform-origin:50% 50%}" +
  ".dsh-arc{position:absolute;left:0;top:0;width:1040px;height:360px;overflow:visible;pointer-events:none}" +
  ".dsh-btn{appearance:none;border:0;background:none;color:inherit;font:inherit;padding:0;margin:0;cursor:pointer}" +
  ".dsh-btn:focus-visible{outline:2px solid #E5232A;outline-offset:3px;border-radius:10px}" +
  ".dsh-ico{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}" +
  ".dsh-top{position:absolute;left:820px;top:42px;display:flex;align-items:center;gap:12px;z-index:10}" +
  ".dsh-brand-badge{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:99px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(8px);font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#fff}" +
  ".dsh-pager{position:absolute;left:48px;top:70px;display:flex;flex-direction:column;align-items:center;gap:4px;z-index:5;max-height:260px;overflow-y:auto;scrollbar-width:none}" +
  ".dsh-pager::-webkit-scrollbar{display:none}" +
  ".dsh-dot{width:14px;height:8px;display:grid;place-items:center}" +
  ".dsh-dot i{display:block;width:4px;height:4px;border-radius:4px;background:#ffffff;opacity:.35;transition:height .45s cubic-bezier(.3,.7,.2,1),opacity .3s}" +
  ".dsh-dot[aria-current] i{height:18px;opacity:1;background:#E5232A;box-shadow:0 0 10px rgba(229,35,42,0.85)}" +
  ".dsh-dot[aria-current]{height:22px}" +
  ".dsh-dot{transition:height .45s cubic-bezier(.3,.7,.2,1)}" +
  ".dsh-plates{position:absolute;left:80px;top:30px;width:300px;height:300px;touch-action:pan-y}" +
  ".dsh-orbit{position:absolute;inset:0;transform-origin:69% -217%;visibility:hidden;will-change:transform}" +
  ".dsh-orbit>img{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:block;width:360px;height:420px;max-width:none;object-fit:contain;user-select:none;-webkit-user-drag:none;" +
  "filter:drop-shadow(0 24px 40px rgba(0,0,0,.75)) drop-shadow(0 8px 18px rgba(0,0,0,.5))}" +
  ".dsh-head{position:absolute;left:445px;top:30px;width:575px;height:auto}" +
  ".dsh-hd{position:absolute;inset:0;visibility:hidden;display:flex;flex-direction:column;align-items:flex-start}" +
  ".dsh-eye{font-size:12px;font-weight:700;letter-spacing:.08em;margin:0 0 6px 2px;text-transform:uppercase;color:#FDB813}" +
  ".dsh-t1,.dsh-t2{display:block;white-space:nowrap;line-height:1.02;text-transform:uppercase;margin:0}" +
  ".dsh-t1{font-weight:300;letter-spacing:-.015em;margin-top:4px;color:#e2e8f0}" +
  ".dsh-t2{font-weight:900;letter-spacing:-.025em;margin-top:4px;color:#ffffff;text-shadow:0 3px 14px rgba(0,0,0,0.5)}" +
  ".dsh-tagline{font-size:15px;line-height:1.55;color:rgba(255,255,255,0.82);margin:14px 0 0 2px;max-width:520px;font-weight:400;letter-spacing:-.01em}" +
  ".dsh-meta{display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-top:20px;font-size:13px;font-weight:600}" +
  ".dsh-price{display:inline-flex;align-items:center;padding:7px 16px;border-radius:999px;" +
  "background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.35),rgba(255,255,255,0) 60%),rgba(229,35,42,.24);" +
  "-webkit-backdrop-filter:blur(16px) saturate(1.3);backdrop-filter:blur(16px) saturate(1.3);" +
  "border:1px solid rgba(255,255,255,.32);box-shadow:inset 0 1px 2px rgba(255,255,255,.7),inset 0 -1px 3px rgba(0,0,0,.3),0 8px 24px -4px rgba(229,35,42,.45);" +
  "color:#ffffff;font-weight:800;letter-spacing:.02em}" +
  ".dsh-weight{display:inline-flex;align-items:center;padding:7px 16px;border-radius:999px;" +
  "background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.25),rgba(255,255,255,0) 60%),rgba(255,255,255,.08);" +
  "-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);" +
  "border:1px solid rgba(255,255,255,.22);box-shadow:inset 0 1px 1.5px rgba(255,255,255,.5),0 6px 20px -4px rgba(0,0,0,.35);" +
  "color:rgba(255,255,255,.9);font-weight:600}" +
  ".dsh-order-btn{position:relative;display:inline-flex;align-items:center;gap:8px;padding:7px 20px;border-radius:999px;" +
  "background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.4),rgba(255,255,255,0) 60%),rgba(37,211,102,.28);" +
  "-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);" +
  "border:1px solid rgba(255,255,255,.45);box-shadow:inset 0 1px 2px rgba(255,255,255,.8),inset 0 -1px 3px rgba(0,0,0,.3),0 10px 28px -4px rgba(37,211,102,.45);" +
  "color:#ffffff;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .3s cubic-bezier(.3,.7,.2,1)}" +
  ".dsh-order-btn:hover{background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.55),rgba(255,255,255,0) 60%),rgba(37,211,102,.42);border-color:rgba(255,255,255,.7);box-shadow:inset 0 1px 2px rgba(255,255,255,.95),0 12px 32px -4px rgba(37,211,102,.65);transform:translateY(-1.5px) scale(1.02)}" +
  ".dsh-order-btn:active{transform:scale(0.97)}" +
  ".dsh-order-btn .dsh-ico{width:16px;height:16px}" +
  ".dsh-order-btn .dsh-fill{fill:currentColor;stroke:none}" +
  ".dsh-strip{position:absolute;left:50%;transform:translateX(-50%);bottom:24px;width:560px;height:116px;display:flex;align-items:center;z-index:30}" +
  ".dsh-arrow{width:38px;height:38px;display:grid;place-items:center;flex:none;color:rgba(255,255,255,0.85);border-radius:999px;" +
  "background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.25),rgba(255,255,255,0) 60%),rgba(255,255,255,.06);" +
  "-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);" +
  "border:1px solid rgba(255,255,255,.18);box-shadow:inset 0 1px 1px rgba(255,255,255,.45),0 4px 14px rgba(0,0,0,.3);transition:all .25s ease}" +
  ".dsh-arrow:hover{background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.4),rgba(255,255,255,0) 60%),rgba(255,255,255,.14);border-color:rgba(255,255,255,.45);color:#fff;transform:scale(1.06)}" +
  ".dsh-arrow svg{width:12px;height:16px;fill:currentColor}" +
  ".dsh-win{position:relative;width:" + ITEM * VISIBLE + "px;height:116px;overflow:hidden;flex:none;margin:0 8px;" +
  "-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}" +
  ".dsh-track{position:absolute;left:0;top:0;display:flex;transition:transform .6s cubic-bezier(.65,0,.35,1)}" +
  ".dsh-th{width:" + ITEM + "px;height:116px;display:flex;justify-content:center;padding-top:2px}" +
  ".dsh-th .dsh-btn{width:92px;height:108px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:6px;" +
  "background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.18),rgba(255,255,255,0) 60%),rgba(255,255,255,.05);" +
  "-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);" +
  "border:1px solid rgba(255,255,255,.16);box-shadow:inset 0 1px 1.5px rgba(255,255,255,.35),0 6px 18px rgba(0,0,0,.3);transition:all .3s cubic-bezier(.3,.7,.2,1)}" +
  ".dsh-th .dsh-btn:hover{background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.3),rgba(255,255,255,0) 60%),rgba(255,255,255,.1);border-color:rgba(255,255,255,.35);transform:translateY(-2px);box-shadow:inset 0 1px 1.5px rgba(255,255,255,.6),0 8px 24px rgba(0,0,0,.45)}" +
  ".dsh-th .dsh-btn[aria-current]{background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.35),rgba(255,255,255,0) 65%),rgba(229,35,42,.22);border-color:rgba(255,255,255,.45);box-shadow:inset 0 1px 2px rgba(255,255,255,.7),0 8px 24px rgba(229,35,42,.4)}" +
  ".dsh-th img{width:56px;height:56px;max-width:none;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,0,0,.5));transition:transform .45s}" +
  ".dsh-th .dsh-btn[aria-current] img{transform:scale(1.08)}" +
  ".dsh-th span{font-size:10px;line-height:1.15;text-align:center;font-weight:600;color:rgba(255,255,255,0.9);max-width:84px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".dsh-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
  "@media (prefers-reduced-motion:reduce){.dsh-track,.dsh-dot,.dsh-dot i,.dsh-th .dsh-btn,.dsh-th img,.dsh-like{transition:none}}";

const HIDE_1 = "inset(0% 0% 0% 100%)";
const HIDE_2 = "inset(0% 100% 0% 0%)";
const SHOW = "inset(0% 0% 0% 0%)";

const Icon = {
  whatsapp: (
    <svg className="dsh-ico dsh-fill" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  ),
  info: (
    <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  up: (
    <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10v10H3.5V10zM7 10l4-7c1.6 0 2.6 1.2 2.2 2.8L12.6 9H19a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 17.7 20H7" />
    </svg>
  ),
  down: (
    <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 14V4h3.5v10zM17 14l-4 7c-1.6 0-2.6-1.2-2.2-2.8l.6-3.2H5a2 2 0 0 1-2-2.3l1.3-7A2 2 0 0 1 6.3 4H17" />
    </svg>
  ),
};

export function DishOrbitCarousel({
  dishes,
  height = "100svh",
  backdrop,
  loop = false,
  fontSrc = null,
  onPlay,
  onOrder,
  onChange,
  activeIndex,
  className,
}: DishOrbitCarouselProps) {
  const n = dishes.length;
  const [index, setIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const segRef = useRef(0);
  const indexRef = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const orbits = useRef<(HTMLDivElement | null)[]>([]);
  const heads = useRef<(HTMLDivElement | null)[]>([]);
  const arcRef = useRef<SVGPathElement | null>(null);
  const arc = useRef({ a0: 0, a1: 0 });
  const shown = useRef(-1);
  const dirRef = useRef<1 | -1>(1);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reducedRef = useRef(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Maintain natural 1.0x scale on desktop (no zooming in) while scaling smoothly on smaller screens
      const availableH = Math.max(300, h - 218);
      const availableW = Math.max(320, w - 40);
      el.style.setProperty("--dsh-s", String(Math.min(availableW / 1040, availableH / 470, 1.0)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => (reducedRef.current = mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useLayoutEffect(() => {
    const from = shown.current;
    const to = index;
    const parts = (i: number) => {
      const head = heads.current[i];
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector(".dsh-eye"),
        t1: head && head.querySelector(".dsh-t1"),
        t2: head && head.querySelector(".dsh-t2"),
        tagline: head && head.querySelector(".dsh-tagline"),
        meta: head && head.querySelector(".dsh-meta"),
      };
    };

    const drawArc = () =>
      arcRef.current?.setAttribute(
        "d",
        arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 118)
      );
    const rest = arcRest(to);
    const tint = dishes[to] ? dishes[to].accent : "transparent";

    if (tlRef.current) tlRef.current.progress(1).kill();
    const b = parts(to);

    if (from === -1 || from === to || reducedRef.current) {
      for (let i = 0; i < n; i++) {
        if (i !== to) {
          const p = parts(i);
          gsap.set([p.orbit, p.head].filter(Boolean), { autoAlpha: 0 });
        }
      }
      gsap.set([b.orbit, b.head, b.eye, b.tagline, b.meta].filter(Boolean), { autoAlpha: 1, rotation: 0, y: 0 });
      gsap.set(b.t1, { clipPath: SHOW });
      gsap.set(b.t2, { clipPath: SHOW });
      arc.current.a0 = rest[0];
      arc.current.a1 = rest[1];
      drawArc();
      if (arcRef.current) gsap.set(arcRef.current, { fill: tint });
      shown.current = to;
      return;
    }

    const a = parts(from);
    const d = dirRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        tlRef.current = null;
      },
    });
    tlRef.current = tl;

    tl.to(a.orbit, { rotation: SWING * d, duration: 0.62, ease: "power2.in" }, 0)
      .set(a.orbit, { autoAlpha: 0, rotation: 0 }, 0.62)
      .fromTo(b.orbit, { autoAlpha: 1, rotation: -SWING * d }, { rotation: 0, duration: 0.95, ease: "power3.out" }, 0.3);

    tl.to(a.t1, { clipPath: HIDE_1, duration: 0.42, ease: "power2.in" }, 0)
      .to(a.t2, { clipPath: HIDE_2, duration: 0.42, ease: "power2.in" }, 0.06)
      .to([a.eye, a.tagline, a.meta].filter(Boolean), { autoAlpha: 0, duration: 0.25 }, 0)
      .set(a.head, { autoAlpha: 0 }, 0.5)
      .set(b.head, { autoAlpha: 1 }, 0.5)
      .fromTo(b.eye, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55)
      .fromTo(b.t1, { clipPath: HIDE_1 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.55)
      .fromTo(b.t2, { clipPath: HIDE_2 }, { clipPath: SHOW, duration: 0.7, ease: "power3.out" }, 0.62)
      .fromTo(b.tagline, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.64)
      .fromTo(b.meta, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.68);

    tl.to(
      arc.current,
      { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.6, ease: "power2.inOut", onUpdate: drawArc },
      0
    ).to(arc.current, { a0: rest[0], a1: rest[1], duration: 0.85, ease: "power3.out", onUpdate: drawArc }, 0.6);

    if (arcRef.current) tl.to(arcRef.current, { fill: tint, duration: 1.1, ease: "power1.inOut" }, 0.1);
    shown.current = to;
  }, [index, n, dishes]);

  useEffect(() => () => { tlRef.current?.kill(); }, []);

  const select = (next: number, dir: 1 | -1) => {
    if (next === indexRef.current) return;
    dirRef.current = dir;
    indexRef.current = next;
    setIndex(next);
    onChangeRef.current?.(next);
  };

  const steps = scrollSteps(n, loop);
  useEffect(() => {
    const track = trackRef.current;
    if (!track || steps < 1) return;
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      snap: loop ? { snapTo: 1 / steps, duration: { min: 0.3, max: 0.8 }, delay: 0.08, ease: "power2.inOut" } : undefined,
      onUpdate: (self) => {
        if (loop && self.progress >= 1 && self.direction > 0) {
          segRef.current = 0;
          self.scroll(self.start + 1);
          select(0, 1);
          return;
        }
        const seg = Math.round(self.progress * steps);
        if (seg === segRef.current) return;
        const dir = seg > segRef.current ? 1 : -1;
        segRef.current = seg;
        select(wrapIndex(seg, n), dir);
      },
    });

    let raf = 0;
    const onWheel = (e: WheelEvent) => {
      const y = trigger.scroll();
      if (!loop || e.deltaY >= 0 || y < trigger.start - 1 || y > trigger.start + 1) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        segRef.current = n - 1;
        trigger.scroll(trigger.start + ((trigger.end - trigger.start) * (n - 1)) / steps);
        select(n - 1, -1);
      });
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    stRef.current = trigger;
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      trigger.kill();
      stRef.current = null;
    };
  }, [steps, loop, n]);

  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return;
    const next = wrapIndex(to, n);
    if (next === index) return;
    const st = stRef.current;
    const y = st ? st.scroll() : 0;
    if (st && y >= st.start - 1 && y <= st.end + 1) {
      const seg = segmentFor(next, segRef.current, n, loop);
      segRef.current = seg;
      st.scroll(st.start + ((st.end - st.start) * seg) / steps);
    }
    select(next, dir ?? stepDirection(index, next, n));
  };
  const step = (d: 1 | -1) => go(index + d, d);

  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== indexRef.current) {
      go(activeIndex);
    }
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const start = stripStart(index, n, VISIBLE);
  const dish = dishes[index];

  return (
    <div
      ref={trackRef}
      className={"dsh-trk" + (className ? " " + className : "")}
      style={{ height: "calc(" + height + " * " + (1 + steps * SCROLL_PER_DISH) + ")" }}
    >
      <div
        ref={rootRef}
        className="dsh-root"
        style={{ height }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Sffron Snacks Menu"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <style>
          {(fontSrc ? "@font-face{font-family:" + FONT + ";src:url(" + fontSrc + ") format('woff2');font-weight:100 900;font-display:swap}" : "") + CSS}
        </style>
        {backdrop ? <img className="dsh-bd" src={backdrop} alt="" width={1200} height={900} /> : null}
        {backdrop ? <div className="dsh-dim" /> : null}
        {backdrop ? <div className="dsh-wash" /> : null}

        <div className="dsh-canvas">
          <svg className="dsh-arc" viewBox="0 0 1040 360" aria-hidden="true">
            <path ref={arcRef} style={{ opacity: 0.35 }} />
          </svg>

          {/* Side Indicator Pager */}
          <div className="dsh-pager" role="tablist" aria-label="Choose snack variety">
            {dishes.map((d, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className="dsh-btn dsh-dot"
                aria-selected={i === index}
                aria-current={i === index ? "true" : undefined}
                aria-label={d.title + " " + d.subtitle}
                onClick={() => go(i)}
              >
                <i />
              </button>
            ))}
          </div>

          {/* Plate / Snack Orbit */}
          <div
            className="dsh-plates"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            {dishes.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  orbits.current[i] = el;
                }}
                className="dsh-orbit"
                aria-hidden={i !== index}
              >
                <img src={d.image} alt={d.alt ?? d.title + " " + d.subtitle} width={360} height={420} draggable={false} />
              </div>
            ))}
          </div>

          {/* Animated Titles */}
          <div className="dsh-head" aria-live="polite">
            {dishes.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  heads.current[i] = el;
                }}
                className="dsh-hd"
                aria-hidden={i !== index}
              >
                <div className="flex items-center gap-3 mb-1">
                  <p className="dsh-eye" style={{ margin: 0 }}>
                    {d.eyebrow ?? "#" + (i + 1) + " Most loved snack"}
                  </p>
                  <a
                    href="#assortment-basket"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/25 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all pointer-events-auto cursor-pointer"
                  >
                    <span>Taste All 19 Flavors Basket ↓</span>
                  </a>
                </div>
                <h2 style={{ margin: 0, font: "inherit" }}>
                  <span className="dsh-t1" style={{ fontSize: fitSize(d.title.length, 52, 330, 0.56) + "px" }}>
                    {d.title}
                  </span>
                  <span className="dsh-t2" style={{ fontSize: fitSize(d.subtitle.length, 58, 320, 0.64) + "px" }}>
                    {d.subtitle}
                  </span>
                </h2>
                <p className="dsh-tagline">{d.tagline ?? d.description}</p>
                <div className="dsh-meta">
                  <span className="dsh-price">{d.price ?? "MRP ₹10"}</span>
                  <span className="dsh-weight">{d.weight ?? "28g Pack"}</span>
                  <button
                    type="button"
                    className="dsh-btn dsh-order-btn"
                    onClick={() => onOrder?.(d, i)}
                    aria-label="Order on WhatsApp"
                  >
                    {Icon.whatsapp}
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Thumbnails Strip (On the exact same bottom level as WhatsApp button) */}
        <div className="dsh-strip">
          <button
            type="button"
            className="dsh-btn dsh-arrow"
            aria-label="Previous snack"
            onClick={() => step(-1)}
          >
            <svg viewBox="0 0 12 16" aria-hidden="true">
              <path d="M11 0v16L0 8z" />
            </svg>
          </button>
          <div className="dsh-win">
            <div className="dsh-track" style={{ transform: "translateX(" + -start * ITEM + "px)" }}>
              {dishes.map((d, i) => (
                <div key={i} className="dsh-th">
                  <button
                    type="button"
                    className="dsh-btn"
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => go(i)}
                  >
                    <img src={d.image} alt="" width={60} height={60} draggable={false} />
                    <span>{d.label ?? d.title + " " + d.subtitle}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="dsh-btn dsh-arrow"
            aria-label="Next snack"
            onClick={() => step(1)}
          >
            <svg viewBox="0 0 12 16" aria-hidden="true">
              <path d="M1 0v16l11-8z" />
            </svg>
          </button>
        </div>
        <p className="dsh-sr" aria-live="polite">
          {dish ? "Snack " + (index + 1) + " of " + n + ": " + dish.title + " " + dish.subtitle : ""}
        </p>
      </div>
    </div>
  );
}

export default DishOrbitCarousel;
