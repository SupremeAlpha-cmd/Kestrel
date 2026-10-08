import Link from "next/link";
import type { CSSProperties } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const views = [
  {
    name: "Today",
    num: "01",
    tag: "the graduation calendar",
    desc: "Every bonding curve on pump.fun, ranked by how close it is to the 85 SOL graduation line — and how fast it's moving.",
    accent: "amber" as const,
  },
  {
    name: "Flow",
    num: "02",
    tag: "the live tape",
    desc: "Every buy and sell on the chain as it happens, on a 30-second tape. No noise, just flow.",
    accent: "emerald" as const,
  },
  {
    name: "Wallets",
    num: "03",
    tag: "the money in motion",
    desc: "The most active wallets on Solana, ranked by size. Watch where the money moves first.",
    accent: "violet" as const,
  },
  {
    name: "Alerts",
    num: "04",
    tag: "the tap on the shoulder",
    desc: "Graduation crossings, whale trades, new launches — your rules, checked every minute while the tab is open.",
    accent: "rose" as const,
  },
];

const accentStyles = {
  amber: {
    edge: "border-l-teal-400",
    num: "text-teal-400",
    sc: "#2dd4bf",
    hover: "hover:border-teal-400",
  },
  emerald: {
    edge: "border-l-emerald-500",
    num: "text-emerald-500",
    sc: "#10b981",
    hover: "hover:border-emerald-500",
  },
  violet: {
    edge: "border-l-violet-500",
    num: "text-violet-500",
    sc: "#8b5cf6",
    hover: "hover:border-violet-500",
  },
  rose: {
    edge: "border-l-rose-500",
    num: "text-rose-500",
    sc: "#f43f5e",
    hover: "hover:border-rose-500",
  },
} as const;

export default function Landing() {
  return (
    <div className="min-h-screen bg-(--kestrel-paper) text-(--kestrel-ink)">
      {/* Nav */}
      <nav className="border-b-2 border-(--kestrel-ink)">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Kestrel"
              className="h-9 w-9 rounded-xl"
            />
            <span className="text-xl font-black tracking-tight">KESTREL</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/terminal"
              className="rounded-lg bg-(--kestrel-ink) px-5 py-2.5 text-sm font-black text-(--kestrel-paper) transition-all hover:opacity-90 active:scale-[0.97]"
            >
              OPEN TERMINAL
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — dawn watch */}
      <header className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-teal-100/70 via-rose-200/50 to-violet-200/70 dark:from-teal-400/25 dark:via-rose-500/15 dark:to-violet-500/25"
        />
        <div
          aria-hidden="true"
          className="dot-grid absolute inset-0 opacity-60"
        />
        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-12 text-center md:pt-20">
          <div className="relative mx-auto h-36 w-36 md:h-44 md:w-44">
            <div
              aria-hidden="true"
              className="kestrel-sweep absolute -inset-4 rounded-full"
            />
            <div className="absolute inset-0 rounded-[2rem] bg-[#0b0d12] p-1 shadow-[0_12px_32px_rgba(var(--kestrel-shadow),0.35)]">
              <img
                src="/logo.png"
                alt="Kestrel eye"
                className="h-full w-full rounded-[1.7rem]"
              />
            </div>
          </div>
          <p className="mt-8 font-mono text-[12px] font-black uppercase tracking-widest text-(--kestrel-muted)">
            <span aria-hidden="true" className="mr-1.5 text-teal-600 dark:text-teal-300">
              ▸
            </span>
            Solana // live terminal
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-tighter md:text-7xl">
            The tab that{" "}
            <span className="underline decoration-teal-300 decoration-[6px] underline-offset-[10px]">
              never closes.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-(--kestrel-muted) md:text-lg">
            Kestrel keeps watch over Solana — graduations, live trade
            flow, and wallet signals, all on one screen.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/terminal"
              className="w-full rounded-lg bg-(--kestrel-ink) px-8 py-4 text-[15px] font-black text-(--kestrel-paper) shadow-[4px_4px_0_rgba(var(--kestrel-shadow),0.25)] transition-all hover:opacity-90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:w-auto"
            >
              OPEN THE TERMINAL →
            </Link>
          </div>
          <p className="mt-6 font-mono text-[11px] font-bold text-(--kestrel-muted)">
            no wallet · no signup · reads straight from public RPC
          </p>
        </div>
      </header>

      {/* Views — watch stations */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <p className="font-mono text-[12px] font-black uppercase tracking-widest text-(--kestrel-muted)">
          <span aria-hidden="true" className="mr-1.5 text-teal-600 dark:text-teal-300">
            ▸
          </span>
          four watch stations
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {views.map((v) => {
            const a = accentStyles[v.accent];
            return (
              <Link
                key={v.name}
                href="/terminal"
                className={`scope-corners group border-2 border-(--kestrel-ink) border-l-8 bg-(--kestrel-card) p-6 shadow-[4px_4px_0_rgba(var(--kestrel-shadow),0.12)] transition-all hover:-translate-y-1 ${a.edge} ${a.hover}`}
                style={{ ["--sc" as string]: a.sc } as CSSProperties}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`font-mono text-4xl font-black ${a.num}`}
                  >
                    {v.num}
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-(--kestrel-faint)">
                    {v.tag}
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-tight">
                  {v.name}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-(--kestrel-muted)">
                  {v.desc}
                </p>
                <p className="mt-5 font-mono text-[13px] font-black text-(--kestrel-ink) transition-transform group-hover:translate-x-1">
                  ENTER →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Field manual */}
      <section className="dot-grid border-y-2 border-(--kestrel-ink) bg-(--kestrel-card)/60">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <p className="text-center font-mono text-[12px] font-black uppercase tracking-widest text-(--kestrel-muted)">
            <span aria-hidden="true" className="mr-1.5 text-emerald-600 dark:text-emerald-400">
              ▸
            </span>
            field manual
          </p>
          <h2 className="mt-4 text-center text-3xl font-black tracking-tighter md:text-4xl">
            Straight from the chain.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "INDEX",
                d: "Kestrel reads pump.fun curve events directly from Solana's public RPC. No middlemen, no stale APIs.",
                c: "bg-teal-400",
              },
              {
                n: "02",
                t: "VERIFY",
                d: "Graduation progress is read straight from the on-chain bonding-curve account — the same state the program uses. Nothing guessed.",
                c: "bg-emerald-500",
              },
              {
                n: "03",
                t: "WATCH",
                d: "The tape polls every 30 seconds. Keep the tab open and the chain comes to you.",
                c: "bg-violet-500",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="border-2 border-(--kestrel-ink) bg-(--kestrel-card) p-6 shadow-[4px_4px_0_rgba(var(--kestrel-shadow),0.12)]"
              >
                <span
                  className={`inline-block rounded-md ${s.c} px-2.5 py-1 font-mono text-[13px] font-black text-white`}
                >
                  {s.n}
                </span>
                <h3 className="mt-3 text-xl font-black tracking-tight">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--kestrel-muted)">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Night watch CTA */}
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl border-2 border-(--kestrel-ink) bg-[#141210] px-7 py-12 text-center shadow-[6px_6px_0_rgba(var(--kestrel-shadow),0.2)] sm:px-12">
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="mx-auto h-20 w-20 rounded-2xl"
          />
          <p className="mt-6 font-mono text-[12px] font-black uppercase tracking-widest text-teal-300">
            <span aria-hidden="true" className="mr-1.5">
              ▸
            </span>
            the night watch
          </p>
          <h2 className="mx-auto mt-3 max-w-md text-3xl font-black tracking-tighter text-white sm:text-4xl">
            Keep the tab{" "}
            <span className="underline decoration-teal-300 decoration-4 underline-offset-8">
              open.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-stone-400">
            Graduations, flow, wallets, and your alerts — one terminal,
            always watching.
          </p>
          <Link
            href="/terminal"
            className="mt-8 inline-block rounded-lg bg-teal-300 px-8 py-4 text-[15px] font-black text-[#1c1917] shadow-[4px_4px_0_rgba(251,191,36,0.3)] transition-all hover:bg-teal-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            OPEN THE TERMINAL →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-(--kestrel-ink)">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Kestrel"
              className="h-7 w-7 rounded-lg"
            />
            <span className="text-base font-black tracking-tight">KESTREL</span>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <p className="font-mono text-[11px] font-bold text-(--kestrel-muted)">
              built on Solana · data from public RPC
            </p>
            <a
              href="https://github.com/SupremeAlpha-cmd/Kestrel"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] font-black uppercase tracking-widest text-(--kestrel-muted) underline decoration-teal-300 decoration-2 underline-offset-4 transition-colors hover:text-(--kestrel-ink)"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
