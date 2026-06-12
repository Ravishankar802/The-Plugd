"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from "recharts";
import { 
  Loader2, 
  Check,
  Copy,
  ChevronLeft,
  Wallet,
  TrendingUp,
  User
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

interface PromoterData {
  id: number;
  name: string;
  username: string;
  referralCode: string;
  avatarUrl: string | null;
  country: string;
  flag: string;
  totalEarned: number;
  totalClicks: number;
  totalConversions: number;
  createdAt: string;
}

interface PublicProfileClientProps {
  promoter: PromoterData;
}

export default function PublicProfileClient({ promoter }: PublicProfileClientProps) {
  const [copied, setCopied] = useState<string | null>(null);
  
  // Chart State & Logic
  const [chartData, setChartData] = useState<{ date: string; amount: number }[]>([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartRange, setChartRange] = useState<"7d" | "4w" | "3m">("7d");
  const [chartMode, setChartMode] = useState<"daily" | "cumulative">("daily");
  const [chartMounted, setChartMounted] = useState(false);

  const link = `https://theplugd.com?ref=${promoter.username || promoter.referralCode}`;

  useEffect(() => {
    setChartMounted(true);
  }, []);

  useEffect(() => {
    async function fetchChartData() {
      setLoadingChart(true);
      try {
        const res = await fetch(`/api/promoters/${promoter.username}/earnings-chart?range=${chartRange}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setChartData(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch public earnings chart data:", err);
      } finally {
        setLoadingChart(false);
      }
    }
    fetchChartData();
  }, [chartRange, promoter.username]);

  const processedChartData = (() => {
    let runningTotal = 0;
    return chartData.map(item => {
      runningTotal += item.amount;
      return {
        ...item,
        displayAmount: chartMode === "cumulative" ? runningTotal : item.amount,
        cumulativeAmount: runningTotal
      };
    });
  })();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const formattedTotalEarned = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(promoter.totalEarned);

  // Initials for avatar fallback
  const initials = promoter.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Gradient for avatar fallback based on promoter ID
  const GRADIENTS = [
    "from-emerald-500 to-green-300",
    "from-purple-500 to-pink-300",
    "from-blue-500 to-cyan-300",
    "from-amber-500 to-yellow-300",
    "from-red-500 to-orange-300",
    "from-violet-600 to-indigo-400",
    "from-fuchsia-500 to-purple-300",
    "from-rose-500 to-red-300",
    "from-teal-500 to-emerald-300",
    "from-sky-500 to-blue-300"
  ];
  const gradient = GRADIENTS[promoter.id % GRADIENTS.length];

  const formatYAxis = (value: number) => {
    if (value === 0) return "$0";
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return `$${value}`;
  };

  return (
    <main className="min-h-screen flex flex-col items-center w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-6 pb-4 relative z-10">
        {/* Logo at the top left */}
        <div className="flex justify-center md:inline-block mb-6 md:mb-8 md:h-10">
          <Link 
            href="/" 
            className="relative md:fixed top-0 md:top-4 left-0 md:left-6 flex justify-center md:inline-block mx-auto md:mx-0 hover:opacity-80 transition-opacity group z-50"
          >
            <Image src="/logo.png" alt="Plugd" width={80} height={80} priority />
          </Link>
        </div>

        {/* Breadcrumb Navigation styled like TrustMRR */}
        <div className="mb-6 flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-muted/80 uppercase">
          <span className="text-[#5c6bc0] text-xs leading-none">★</span>
          <Link href="/" className="hover:text-foreground transition-colors font-medium">
            Plugd
          </Link>
          <span className="text-muted/40 font-normal">&gt;</span>
          <span className="font-bold text-foreground">
            {promoter.name.toUpperCase()}
          </span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-pill border border-border rounded-[24px] p-6 sm:p-8 md:p-10 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              {promoter.avatarUrl ? (
                <img 
                  src={promoter.avatarUrl} 
                  alt={promoter.name}
                  className="w-16 h-16 md:w-20 h-20 rounded-full object-cover shadow-lg border border-border/40 shrink-0"
                />
              ) : (
                <div className={`w-16 h-16 md:w-20 h-20 rounded-full bg-gradient-to-tr ${gradient} text-white font-bold text-2xl flex items-center justify-center shadow-lg shrink-0`}>
                  {initials}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    {promoter.name}
                  </h1>
                  <span className="text-lg" title={promoter.country}>{promoter.flag}</span>
                </div>
                <span className="text-muted text-sm md:text-base leading-snug">@{promoter.username}</span>
              </div>
            </div>

            {/* Referral Link Copy Block */}
            <div className="w-full md:max-w-md bg-background border border-border rounded-2xl p-4 flex flex-col gap-2">
              <label className="text-[10px] font-bold text-muted/60 tracking-widest uppercase">REFERRAL LINK</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-accent border border-border/50 rounded-xl px-4 py-2.5 text-foreground text-xs font-semibold flex items-center overflow-x-auto whitespace-nowrap no-scrollbar">
                  theplugd.com?ref={promoter.username}
                </div>
                <button 
                  type="button"
                  onClick={() => copyToClipboard(link, 'link')}
                  className="bg-[#16a34a] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center justify-center gap-1.5 shadow-md shrink-0 active:scale-[0.98]"
                >
                  {copied === 'link' ? <Check className="w-4 h-4" /> : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Earned</p>
            <p className="text-4xl font-extrabold text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {formattedTotalEarned}
            </p>
          </div>
          <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Clicks</p>
            <p className="text-4xl font-extrabold text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {promoter.totalClicks.toLocaleString()}
            </p>
          </div>
          <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Conversions</p>
            <p className="text-4xl font-extrabold text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {promoter.totalConversions.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Earnings Chart Section */}
        <div className="bg-pill border border-border rounded-[24px] p-6 md:p-8 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-bold text-foreground">Earnings Over Time</h3>
              <p className="text-xs text-muted mt-1 font-medium">Track conversion velocity and growth.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Range Toggle */}
              <div className="flex bg-[#111] rounded-xl p-1 border border-border/40">
                {(["7d", "4w", "3m"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setChartRange(r)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      chartRange === r
                        ? "bg-selected text-selected-foreground shadow-md"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Mode Toggle */}
              <div className="flex bg-[#111] rounded-xl p-1 border border-border/40">
                {(["daily", "cumulative"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setChartMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      chartMode === m
                        ? "bg-[#22c55e] text-white shadow-md"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-72">
            {loadingChart ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin" />
              </div>
            ) : chartMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={processedChartData}
                  margin={{ top: 10, right: 10, left: 15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    stroke="var(--muted)" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="var(--muted)" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatYAxis}
                    dx={-10}
                  />
                  <Tooltip
                    cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-pill border border-border px-3 py-2 rounded-xl shadow-xl font-[Georgia,_serif]">
                            <p className="text-[10px] text-muted font-medium mb-0.5">{data.date}</p>
                            <p className="text-xs font-bold text-[#22c55e]">
                              ${Number(payload[0].value).toFixed(2)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="displayAmount"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorEarning)"
                    dot={false}
                    activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: 'var(--background)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>
      </div>
      
      <div className="w-full mt-auto">
        <Footer showBorder={false} minimal={true} />
      </div>
    </main>
  );
}
