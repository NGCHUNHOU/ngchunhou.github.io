import Home from "./index";
import topBarItems from "@/data/headerItems";
import Layout from "./components/Layout";
import { useState } from "react";

export type TabKey = "Inventory" | "Skills" | "Social" | "Crafting" | "Map";

function Personal_infos() {
  const TABS: TabKey[] = ["Inventory", "Skills", "Social", "Crafting", "Map"];
  const [active, setActive] = useState<TabKey>("Inventory");
  return (
    <Layout pageName={topBarItems[0].pageTitle}>
      <div className="w-11/12 mx-auto my-5">
        <div className="rounded-2xl bg-stone-900/90 text-stone-100 shadow-2xl ring-1 ring-stone-800">
          {/* Header Tabs */}
          <div className="flex items-center gap-2 border-b border-stone-800 p-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={[
                  "px-3 py-1.5 text-sm rounded-xl border transition",
                  active === tab
                    ? "bg-stone-700 border-stone-600 shadow-inner"
                    : "bg-stone-800 hover:bg-stone-700 border-stone-700",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-3 pr-2 text-xs text-stone-300">
              <GoldDisplay amount={1245} />
              <ClockDisplay day={"Mon 8"} time={"6:20 am"} season="Spring" />
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-12 gap-4 p-4">
            {/* Left: Character & Stats */}
            <div className="col-span-12 md:col-span-4">
              <Panel title="Farmer">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-stone-800 p-3 ring-1 ring-stone-700">
                    <CharacterSVG className="h-20 w-20" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold">Chun Hou</div>
                    <div className="text-stone-300">Maple Farm</div>
                    <div className="text-stone-400 text-sm">Year 1</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <StatBar
                    label="Health"
                    value={78}
                    max={100}
                    icon={<HeartSVG className="h-4 w-4" />}
                  />
                  <StatBar
                    label="Energy"
                    value={55}
                    max={100}
                    icon={<BoltSVG className="h-4 w-4" />}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-stone-300">
                  <div className="flex items-center gap-2">
                    <PickaxeSVG className="h-4 w-4" />
                    Mining 2
                  </div>
                  <div className="flex items-center gap-2">
                    <HoeSVG className="h-4 w-4" />
                    Farming 3
                  </div>
                  <div className="flex items-center gap-2">
                    <AxeSVG className="h-4 w-4" />
                    Foraging 1
                  </div>
                  <div className="flex items-center gap-2">
                    <FishSVG className="h-4 w-4" />
                    Fishing 0
                  </div>
                </div>
              </Panel>

              {/* Quick slots / tools */}
              <Panel title="Toolbar" className="mt-4">
                <div className="flex gap-2">
                  <Slot icon={<PickaxeSVG />} qty={1} selected />
                  <Slot icon={<AxeSVG />} qty={1} />
                  <Slot icon={<HoeSVG />} qty={1} />
                  <Slot icon={<WateringCanSVG />} qty={1} />
                  <Slot icon={<ScytheSVG />} qty={1} />
                </div>
              </Panel>
            </div>

            {/* Right: Tab Content */}
            <div className="col-span-12 md:col-span-8">
              {active === "Inventory" && <InventoryPanel />}
              {active === "Skills" && <SkillsPanel />}
              {active === "Social" && <SocialPanel />}
              {active === "Crafting" && <CraftingPanel />}
              {active === "Map" && <MapPanel />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Personal_infos;

/* ----------------------- Shared UI ----------------------- */
function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-stone-900/60 p-4 ring-1 ring-stone-800 ${className}`}
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-200">
        <div className="rounded-lg bg-stone-800 px-2 py-1 ring-1 ring-stone-700">
          {title}
        </div>
      </div>
      {children}
    </div>
  );
}

function GoldDisplay({ amount }: { amount: number }) {
  return (
    <div className="flex items-center gap-1">
      <CoinSVG className="h-4 w-4" />
      <span className="tabular-nums font-semibold">{amount}g</span>
    </div>
  );
}

function ClockDisplay({
  day,
  time,
  season,
}: {
  day: string;
  time: string;
  season: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <CalendarSVG className="h-4 w-4" />
      <span className="tabular-nums">
        {season} {day}
      </span>
      <ClockSVG className="h-4 w-4" />
      <span className="tabular-nums">{time}</span>
    </div>
  );
}

function StatBar({
  label,
  value,
  max,
  icon,
}: {
  label: string;
  value: number;
  max: number;
  icon?: React.ReactNode;
}) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-stone-300">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className="tabular-nums">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-stone-800 ring-1 ring-stone-700">
        <div
          className="h-full rounded-full bg-stone-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Slot({
  icon,
  qty,
  selected,
}: {
  icon?: React.ReactNode;
  qty?: number;
  selected?: boolean;
}) {
  return (
    <div
      className={[
        "relative flex size-14 items-center justify-center rounded-xl border",
        selected
          ? "border-amber-400 bg-stone-800 shadow-[0_0_0_2px_rgba(251,191,36,0.4)_inset]"
          : "border-stone-700 bg-stone-900 hover:bg-stone-800",
      ].join(" ")}
    >
      <div className="h-6 w-6 opacity-90">{icon ?? <CubeSVG />}</div>
      {qty != null && (
        <div className="absolute bottom-1 right-1 rounded-md bg-stone-800 px-1 text-[10px] tabular-nums ring-1 ring-stone-700">
          {qty}
        </div>
      )}
    </div>
  );
}

/* ----------------------- Panels ----------------------- */
function InventoryPanel() {
  const items = Array.from({ length: 36 }).map((_, i) => ({
    id: i,
    qty: i === 0 ? 12 : undefined,
  }));
  return (
    <Panel title="Inventory">
      <div className="grid grid-cols-12 gap-2">
        {items.map((it, i) => (
          <Slot key={it.id} qty={it.qty} selected={i === 0} />
        ))}
      </div>
      <div className="mt-4 text-xs text-stone-300">
        36 slots • Expand with backpack upgrades
      </div>
    </Panel>
  );
}

function SkillsPanel() {
  const skills = [
    { name: "Farming", level: 3, icon: <HoeSVG className="h-4 w-4" /> },
    { name: "Mining", level: 2, icon: <PickaxeSVG className="h-4 w-4" /> },
    { name: "Foraging", level: 1, icon: <AxeSVG className="h-4 w-4" /> },
    { name: "Fishing", level: 0, icon: <FishSVG className="h-4 w-4" /> },
    { name: "Combat", level: 1, icon: <SwordSVG className="h-4 w-4" /> },
  ];
  return (
    <Panel title="Skills">
      <div className="space-y-3">
        {skills.map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <div className="text-stone-300">{s.icon}</div>
            <div className="min-w-24 text-sm">{s.name}</div>
            <div className="flex-1">
              <StatBar label="Level" value={s.level} max={10} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SocialPanel() {
  const npcs = [
    { name: "Abigail", hearts: 4 },
    { name: "Sebastian", hearts: 2 },
    { name: "Leah", hearts: 3 },
    { name: "Linus", hearts: 5 },
  ];
  return (
    <Panel title="Social">
      <div className="divide-y divide-stone-800">
        {npcs.map((n) => (
          <div key={n.name} className="flex items-center justify-between py-2">
            <div className="text-sm">{n.name}</div>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <HeartSVG
                  key={i}
                  className={`h-4 w-4 ${
                    i < n.hearts ? "opacity-100" : "opacity-20"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CraftingPanel() {
  const recipes = [
    { name: "Chest", req: "50 Wood", icon: <CubeSVG /> },
    { name: "Torch", req: "1 Wood, 2 Sap", icon: <FlameSVG /> },
    {
      name: "Field Snack",
      req: "1 Acorn, 1 Maple, 1 Pine",
      icon: <SnackSVG />,
    },
  ];
  return (
    <Panel title="Crafting">
      <div className="grid grid-cols-2 gap-3">
        {recipes.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-3 rounded-xl border border-stone-800 bg-stone-900 p-3"
          >
            <div className="h-8 w-8">{r.icon}</div>
            <div>
              <div className="text-sm font-medium">{r.name}</div>
              <div className="text-xs text-stone-400">{r.req}</div>
            </div>
            <button className="ml-auto rounded-lg border border-stone-700 bg-stone-800 px-3 py-1 text-xs hover:bg-stone-700">
              Craft
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function MapPanel() {
  return (
    <Panel title="Map">
      <div className="grid place-items-center rounded-xl border border-stone-800 bg-stone-900 p-10 text-stone-400">
        <MapSVG className="h-24 w-24" />
        <div className="mt-2 text-sm">(Placeholder) World Map</div>
      </div>
    </Panel>
  );
}

function CharacterSVG({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <circle cx="32" cy="20" r="12" className="fill-stone-300" />
      <rect
        x="18"
        y="32"
        width="28"
        height="22"
        rx="6"
        className="fill-stone-400"
      />
      <rect
        x="24"
        y="40"
        width="16"
        height="14"
        rx="4"
        className="fill-stone-500"
      />
    </svg>
  );
}

function HeartSVG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 21s-7-4.6-9.5-8A5.5 5.5 0 1 1 12 6a5.5 5.5 0 1 1 9.5 7c-2.5 3.4-9.5 8-9.5 8z"
        className="fill-rose-400"
      />
    </svg>
  );
}

function BoltSVG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M13 2 3 14h7l-1 8 11-13h-7l0-7z" className="fill-amber-400" />
    </svg>
  );
}

function CoinSVG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <ellipse cx="12" cy="12" rx="9" ry="9" className="fill-yellow-400/90" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="9"
        className="fill-none stroke-yellow-900"
      />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        className="fill-yellow-900 text-[10px] font-bold"
      >
        G
      </text>
    </svg>
  );
}

function ClockSVG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" className="fill-stone-200" />
      <path
        d="M12 6v6l4 2"
        className="stroke-stone-900"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarSVG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        className="fill-stone-200"
      />
      <path d="M3 8h18" className="stroke-stone-900" strokeWidth="2" />
      <rect x="6" y="11" width="3" height="3" className="fill-stone-900" />
      <rect x="11" y="11" width="3" height="3" className="fill-stone-900" />
      <rect x="16" y="11" width="3" height="3" className="fill-stone-900" />
    </svg>
  );
}

function PickaxeSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M3 7c6-5 12-2 18 0"
        className="stroke-stone-300"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="10.5"
        y="8"
        width="3"
        height="12"
        rx="1.2"
        className="fill-stone-400"
      />
    </svg>
  );
}

function AxeSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M5 6c3-2 7-2 10 0l-1.5 2C10 7 7 7 5.5 8.2L5 6z"
        className="fill-stone-300"
      />
      <rect
        x="11"
        y="9"
        width="3"
        height="10"
        rx="1.2"
        className="fill-stone-400"
      />
    </svg>
  );
}

function HoeSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M6 7 17 4l1 3-9 3z" className="fill-stone-300" />
      <rect
        x="11"
        y="10"
        width="3"
        height="10"
        rx="1.2"
        className="fill-stone-400"
      />
    </svg>
  );
}

function FishSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M3 12c4-4 10-6 15-4 1 4-1 8-5 10-3 1-7-1-10-6z"
        className="fill-sky-300"
      />
      <circle cx="15" cy="10" r="1" className="fill-stone-900" />
    </svg>
  );
}

function SwordSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M4 20l5-5 7-10 3 3-10 7-5 5z" className="fill-stone-300" />
    </svg>
  );
}

function WateringCanSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M6 12c0-2 1-3 3-3h3l3-2 2 2-2 1v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-4z"
        className="fill-sky-400"
      />
      <circle cx="17.5" cy="9.5" r="1.2" className="fill-stone-300" />
    </svg>
  );
}

function ScytheSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M4 6c6-3 14-1 16 3-6-1-12 1-14 3V6z"
        className="fill-stone-300"
      />
      <rect
        x="11"
        y="10"
        width="2"
        height="10"
        rx="1"
        className="fill-stone-500"
      />
    </svg>
  );
}

function FlameSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 2c3 4 1 6-1 8 4 0 7 3 7 6a6 6 0 1 1-12 0c0-3 3-6 6-6-1-1-1-2 0-3s1-3 0-5z"
        className="fill-amber-400"
      />
    </svg>
  );
}

function SnackSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="2"
        className="fill-amber-300"
      />
      <path d="M8 10h8M8 14h8" className="stroke-amber-700" strokeWidth="2" />
    </svg>
  );
}

function CubeSVG({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M12 2l9 5-9 5-9-5 9-5zm0 10l9-5v10l-9 5-9-5V7l9 5z"
        className="fill-stone-300"
      />
    </svg>
  );
}

function MapSVG({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path
        d="M10 12l14-6 16 6 14-6v42l-14 6-16-6-14 6z"
        className="fill-stone-300"
      />
      <path
        d="M24 6v42M40 12v42"
        className="stroke-stone-700"
        strokeWidth="2"
      />
      <circle cx="32" cy="26" r="5" className="fill-emerald-400" />
    </svg>
  );
}
