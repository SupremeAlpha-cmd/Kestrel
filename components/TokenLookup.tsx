"use client";

import { useState } from "react";
import type { LookupResult } from "@/lib/lookup";
import { Meter, SignalTag } from "./kestrel-ui";

const EXPLORER = "https://solscan.io";

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toFixed(0);
}

/** Heat color for graduation progress: cool early, hot near the line. */
function heat(pct: number): { filled: string; text: string } {
  if (pct >= 90) return { filled: "bg-rose-500", text: "text-rose-600 dark:text-rose-400" };
  if (pct >= 70) return { filled: "bg-orange-500", text: "text-orange-600" };
  if (pct >= 50) return { filled: "bg-teal-400", text: "text-teal-700" };
  return { filled: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" };
}

function short(addr: string): string {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function TokenLookup() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "scanning" }
    | { kind: "error"; message: string }
    | { kind: "done"; result: LookupResult }
  >({ kind: "idle" });

  const scan = async () => {
    const address = input.trim();
    if (!address) return;
    setState({ kind: "scanning" });
    try {
      const res = await fetch(`/api/lookup?address=${encodeURIComponent(address)}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `lookup ${res.status}`);
      setState({ kind: "done", result: json as LookupResult });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "lookup failed",
      });
    }
  };

  return (
    <div className="px-4 pb-1 pt-4">
      <SignalTag tone="amber">target lock // paste a token address</SignalTag>
      <div className="mt-2.5 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && scan()}
          placeholder="paste a Solana mint address"
          spellCheck={false}
          aria-label="token address to look up"
          className="scope-corners min-w-0 flex-1 border-2 border-(--kestrel-ink) bg-(--kestrel-card) px-3 py-2 font-mono text-[13px] font-bold text-(--kestrel-ink) placeholder:text-(--kestrel-faint) outline-none focus:border-teal-400"
        />
        <button
          onClick={scan}
          disabled={state.kind === "scanning"}
          className="scope-corners shrink-0 border-2 border-(--kestrel-ink) bg-teal-400 px-4 py-2 font-mono text-[13px] font-black uppercase tracking-wider text-white shadow-[3px_3px_0_rgba(var(--kestrel-shadow),0.2)] transition-all hover:bg-teal-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
        >
          {state.kind === "scanning" ? "···" : "scan"}
        </button>
      </div>

      {state.kind === "scanning" && (
        <p className="kestrel-blink mt-3 font-mono text-[12px] font-bold uppercase tracking-widest text-(--kestrel-muted)">
          ▸ sweeping the curve…
        </p>
      )}

      {state.kind === "error" && (
        <p className="mt-3 border-2 border-dashed border-rose-500/60 px-3 py-2.5 font-mono text-[12px] font-bold text-rose-600 dark:text-rose-400">
          SCOPE DOWN — {state.message}
        </p>
      )}

      {state.kind === "done" && !state.result.found && (
        <p className="mt-3 border-2 border-dashed border-(--kestrel-line) px-3 py-2.5 font-mono text-[12px] font-bold text-(--kestrel-muted)">
          nothing on the scope — not a pump.fun bonding-curve launch
        </p>
      )}

      {state.kind === "done" && state.result.found && state.result.graduated && (
        <div className="scope-corners mt-3 border-2 border-(--kestrel-ink) bg-(--kestrel-card) p-4 shadow-[4px_4px_0_rgba(var(--kestrel-shadow),0.12)]">
          <div className="flex items-center justify-between gap-2">
            <a
              href={`${EXPLORER}/token/${state.result.token}`}
              target="_blank"
              rel="noreferrer"
              className="truncate font-mono text-xl font-black tracking-tight text-(--kestrel-ink) hover:underline"
            >
              ${state.result.symbol}
            </a>
            <span className="shrink-0 rounded-md bg-emerald-500 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white">
              ✓ graduated
            </span>
          </div>
          <p className="mt-1.5 font-mono text-[11px] text-(--kestrel-muted)">
            phase: <span className="font-bold text-(--kestrel-ink)">{state.result.phaseLabel}</span>
            {" · "}
            <span className="text-(--kestrel-faint)">{short(state.result.token)}</span>
          </p>
        </div>
      )}

      {state.kind === "done" &&
        state.result.found &&
        !state.result.graduated && <LookupCard t={state.result} />}
    </div>
  );
}

/** The scanned token — its curve progress, Kestrel crosshair style. */
function LookupCard({ t }: { t: Extract<LookupResult, { graduated: false }> }) {
  const pct = Math.min(100, t.progress * 100);
  const h = heat(pct);
  return (
    <div className="scope-corners mt-3 border-2 border-(--kestrel-ink) bg-(--kestrel-card) p-4 shadow-[4px_4px_0_rgba(var(--kestrel-shadow),0.12)]">
      <div className="flex items-baseline justify-between gap-2">
        <a
          href={`${EXPLORER}/token/${t.token}`}
          target="_blank"
          rel="noreferrer"
          className="truncate font-mono text-xl font-black tracking-tight text-(--kestrel-ink) hover:underline"
        >
          ${t.symbol}
        </a>
        <span className={`shrink-0 font-mono text-2xl font-black ${h.text}`}>
          {pct.toFixed(1)}
          <span className="text-sm">%</span>
        </span>
      </div>
      <Meter
        pct={pct}
        segments={28}
        filled={h.filled}
        className="mt-3 h-4"
        label={`${t.symbol} graduation progress ${pct.toFixed(1)} percent`}
      />
      <div className="mt-2.5 flex justify-between font-mono text-[11px] font-bold text-(--kestrel-muted)">
        <span>
          {fmt(t.raised)} / {fmt(t.threshold)} SOL
        </span>
        <span>
          24h <span className="text-(--kestrel-ink)">+{fmt(t.velocity24h)}</span> velocity
        </span>
      </div>
      <p className="mt-1.5 font-mono text-[10px] text-(--kestrel-faint)">
        curve{" "}
        <a
          href={`${EXPLORER}/account/${t.curve}`}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-(--kestrel-muted)"
        >
          {short(t.curve)}
        </a>
      </p>
    </div>
  );
}
