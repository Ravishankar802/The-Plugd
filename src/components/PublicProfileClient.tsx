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
  email: string;
  rank: number;
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
  
  // Realtime simulated/database values
  const [currentEarnings, setCurrentEarnings] = useState(promoter.totalEarned);

  // Load initial value from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem("plugd_leaderboard_earnings_v2");
      if (stored) {
        const storedData = JSON.parse(stored);
        const storedVal = storedData[promoter.id.toString()];
        if (storedVal) {
          setCurrentEarnings(Math.round(Math.max(storedVal, promoter.totalEarned)));
        }
      }
    } catch (err) {}
  }, [promoter.id, promoter.totalEarned]);

  const isDisplayPromoter = promoter.email?.toLowerCase().endsWith("@example.com");

  // Live update interval
  useEffect(() => {
    if (!isDisplayPromoter) return;

    // Calculate daily rate and earningRatePerSec
    const factor = Math.max(0, (50 - promoter.rank) / 48); // from 1.0 down to 0.0
    let dailyRate = 0;
    if (promoter.rank === 1) {
      dailyRate = 120000;
    } else {
      dailyRate = 30000 + 60000 * Math.pow(factor, 2.0);
    }
    const earningRatePerSec = dailyRate / 86400;

    const interval = setInterval(() => {
      setCurrentEarnings(prev => {
        const hasEarned = Math.random() > 0.3; 
        const multiplier = hasEarned ? (0.5 + Math.random() * 1.5) : 0;
        const increment = 60 * earningRatePerSec * multiplier;
        const nextEarnings = Math.round(prev + increment);
        
        // Save to localStorage
        try {
          const stored = localStorage.getItem("plugd_leaderboard_earnings_v2");
          const storedData = stored ? JSON.parse(stored) : {};
          storedData[promoter.id.toString()] = nextEarnings;
          localStorage.setItem("plugd_leaderboard_earnings_v2", JSON.stringify(storedData));
        } catch (err) {}

        return nextEarnings;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [isDisplayPromoter, promoter.rank, promoter.id]);

  // Derived stats matching conversions and clicks
  const formattedCurrentEarnings = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(currentEarnings);

  const currentConversions = Math.floor(currentEarnings / 100);

  const baseClicks = promoter.totalClicks;
  const baseEarned = promoter.totalEarned;
  const clickMultiplier = baseEarned > 0 ? (baseClicks / baseEarned) : 0.0175;
  const currentClicks = baseClicks + Math.floor((currentEarnings - baseEarned) * clickMultiplier);

  // Chart State & Logic
  const [chartData, setChartData] = useState<{ date: string; amount: number }[]>([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartRange, setChartRange] = useState<"7d" | "4w" | "3m">("7d");
  const [chartMode, setChartMode] = useState<"daily" | "cumulative">("daily");
  const [chartMounted, setChartMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

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
    if (value === 0) return "₹0";
    if (value >= 1e7) {
      return `₹${(value / 1e7).toFixed(1).replace(/\.0$/, "")}Cr`;
    }
    if (value >= 1e5) {
      return `₹${(value / 1e5).toFixed(1).replace(/\.0$/, "")}L`;
    }
    if (value >= 1e3) {
      return `₹${(value / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return `₹${value}`;
  };

  const COUNTRY_TO_ISO: Record<string, string> = {
    "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Angola": "ao", "Argentina": "ar", "Armenia": "am", "Australia": "au", "Austria": "at", "Azerbaijan": "az",
    "Bahrain": "bh", "Bangladesh": "bd", "Belarus": "by", "Belgium": "be", "Benin": "bj", "Bolivia": "bo", "Bosnia and Herzegovina": "ba", "Botswana": "bw",
    "Brazil": "br", "Bulgaria": "bg", "Burkina Faso": "bf", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Chile": "cl", "China": "cn", "Colombia": "co",
    "Costa Rica": "cr", "Croatia": "hr", "Cyprus": "cy", "Czech Republic": "cz", "Denmark": "dk", "Dominican Republic": "do", "Ecuador": "ec", "Egypt": "eg",
    "El Salvador": "sv", "Estonia": "ee", "Ethiopia": "et", "Finland": "fi", "France": "fr", "Georgia": "ge", "Germany": "de", "Ghana": "gh", "Greece": "gr",
    "Guatemala": "gt", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in", "Indonesia": "id", "Iraq": "iq", "Ireland": "ie",
    "Israel": "il", "Italy": "it", "Ivory Coast": "ci", "Jamaica": "jm", "Japan": "jp", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kosovo": "xk",
    "Kuwait": "kw", "Kyrgyzstan": "kg", "Latvia": "lv", "Lebanon": "lb", "Libya": "ly", "Lithuania": "lt", "Luxembourg": "lu", "Malaysia": "my", "Mali": "ml",
    "Malta": "mt", "Mexico": "mx", "Moldova": "md", "Mongolia": "mn", "Morocco": "ma", "Mozambique": "mz", "Myanmar": "mm", "Namibia": "na", "Nepal": "np",
    "Netherlands": "nl", "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng", "North Macedonia": "mk", "Norway": "no", "Oman": "om",
    "Pakistan": "pk", "Palestine": "ps", "Panama": "pa", "Paraguay": "py", "Peru": "pe", "Philippines": "ph", "Poland": "pl", "Portugal": "pt", "Qatar": "qa",
    "Romania": "ro", "Russia": "ru", "Rwanda": "rw", "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs", "Sierra Leone": "sl", "Singapore": "sg",
    "Slovakia": "sk", "Slovenia": "si", "South Africa": "za", "South Korea": "kr", "Spain": "es", "Sri Lanka": "lk", "Sweden": "se", "Switzerland": "ch",
    "Taiwan": "tw", "Tajikistan": "tj", "Tanzania": "tz", "Thailand": "th", "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "Uganda": "ug",
    "Ukraine": "ua", "United Arab Emirates": "ae", "United Kingdom": "gb", "United States": "us", "Uruguay": "uy", "Uzbekistan": "uz",
    "Venezuela": "ve", "Vietnam": "vn", "Yemen": "ye", "Zambia": "zm", "Zimbabwe": "zw"
  };

  const countryCode = COUNTRY_TO_ISO[promoter.country] || "us";

  return (
    <main className="min-h-screen flex flex-col items-center w-full max-w-full overflow-x-hidden">
      {/* Desktop fixed logo (off-canvas) */}
      <Link 
        href="/" 
        className="fixed top-4 left-6 hover:opacity-80 transition-opacity z-50 hidden md:block"
      >
        <Image src="/logo.png" alt="Plugd" width={80} height={80} priority />
      </Link>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-6 md:pt-10 pb-4 relative z-10">
        {/* Mobile centered logo */}
        <div className="flex justify-center md:hidden mb-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Plugd" width={60} height={60} priority />
          </Link>
        </div>

        {/* Breadcrumb Navigation styled like TrustMRR */}
        <div className="mb-4 flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-muted/80 uppercase">
          <Link href="/" className="hover:text-foreground transition-colors font-medium">
            PLUGD
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Earned</p>
            <p className="text-4xl font-extrabold text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {formattedCurrentEarnings}
            </p>
          </div>
          <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Clicks</p>
            <p className="text-4xl font-extrabold text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {currentClicks.toLocaleString()}
            </p>
          </div>
          <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Conversions</p>
            <p className="text-4xl font-extrabold text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {currentConversions.toLocaleString()}
            </p>
          </div>
          <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
            <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-3">Country</p>
            <div className="flex flex-col items-center gap-2">
              <img 
                src={`https://flagcdn.com/w40/${countryCode}.png`} 
                alt={promoter.country}
                className="w-8 h-5.5 object-cover rounded-sm shrink-0 shadow-md select-none"
              />
              <p className="text-xl font-bold text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                {promoter.country}
              </p>
            </div>
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
              <div className="flex bg-accent dark:bg-[#111] rounded-xl p-1 border border-border/40">
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
              <div className="flex bg-accent dark:bg-[#111] rounded-xl p-1 border border-border/40">
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
                  margin={{ top: 10, right: isDesktop ? 30 : 10, left: -5, bottom: 0 }}
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
                    interval={
                      (!isDesktop
                        ? (chartRange === "7d" ? 1 : "preserveEnd")
                        : (index: number) => {
                            const total = processedChartData.length;
                            const step = chartRange === "7d" ? 2 : chartRange === "4w" ? 2 : 5;
                            return (total - 1 - index) % step === 0;
                          }) as any
                    }
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
                              ₹{Number(payload[0].value).toFixed(2)}
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
