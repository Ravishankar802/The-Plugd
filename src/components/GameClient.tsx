"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefreshCcw, Timer, Trophy, ArrowRight, Loader2, X } from "lucide-react";
import Footer from "@/components/Footer";
import { FOLLOWERS_RANGES } from "@/lib/constants";

type GameState = "landing" | "playing" | "result" | "end";

interface Account {
  id: number;
  name: string;
  xHandle: string;
  avatarUrl: string;
  bio: string;
  niche: string[];
  followersRange: string;
}

const ELON_IMAGE = "/elon.jpg";
const ELON_PLACEHOLDER = "https://api.dicebear.com/7.x/avataaars/svg?seed=Elon&backgroundColor=b6e3f4";

export default function GameClient() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("landing");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [accounts, setAccounts] = useState<{ acc1: Account; acc2: Account } | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRoundAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/game/accounts");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAccounts(data);
      setTimer(15);
    } catch (err) {
      console.error("Failed to fetch game accounts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const startGame = () => {
    setGameState("playing");
    setRound(1);
    setScore(0);
    fetchRoundAccounts();
  };

  const nextRound = () => {
    if (round < 5) {
      setRound(prev => prev + 1);
      setGameState("playing");
      setSelectedId(null);
      fetchRoundAccounts();
    } else {
      setGameState("end");
    }
  };

  const handleSelect = (id: number) => {
    if (gameState !== "playing" || !accounts) return;
    
    setSelectedId(id);
    setGameState("result");
    if (timerRef.current) clearInterval(timerRef.current);

    const range1 = FOLLOWERS_RANGES.indexOf(accounts.acc1.followersRange);
    const range2 = FOLLOWERS_RANGES.indexOf(accounts.acc2.followersRange);
    
    const winnerId = range1 > range2 ? accounts.acc1.id : accounts.acc2.id;
    if (id === winnerId) {
      setScore(prev => prev + 1);
    }

    setTimeout(nextRound, 2000);
  };

  // Timer logic
  useEffect(() => {
    if (gameState === "playing" && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && gameState === "playing") {
      // Auto-select random if timer runs out
      const randomAcc = Math.random() > 0.5 ? accounts?.acc1 : accounts?.acc2;
      if (randomAcc) handleSelect(randomAcc.id);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timer, accounts]);

  const getWinnerId = () => {
    if (!accounts) return null;
    const range1 = FOLLOWERS_RANGES.indexOf(accounts.acc1.followersRange);
    const range2 = FOLLOWERS_RANGES.indexOf(accounts.acc2.followersRange);
    return range1 > range2 ? accounts.acc1.id : accounts.acc2.id;
  };

  const renderElonReaction = () => {
    if (gameState === "landing") {
      return "Well, well, well... Another broke builder trying to grow on X. I'll show you two real builders. Think you can even find the winner?";
    }
    if (gameState === "playing" || gameState === "result") {
      return "These are two real builders. Check their profiles to see what they're building. Which one has more followers?";
    }
    if (gameState === "end") {
      if (score === 5) return "Not bad. Maybe you do know what you're doing.";
      if (score >= 3) return "Decent. But you're no genius.";
      return "Embarrassing. Stick to scrolling.";
    }
    return "";
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground font-mono-custom overflow-x-hidden">
      
      {/* Game Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 max-w-5xl mx-auto w-full">
        
        {gameState === "landing" && (
          <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-[2]">
                  <line x1="20" y1="20" x2="8" y2="8" className="opacity-60" />
                  <line x1="20" y1="20" x2="32" y2="8" className="opacity-60" />
                  <line x1="20" y1="20" x2="37" y2="25" className="opacity-60" />
                  <line x1="20" y1="20" x2="25" y2="37" className="opacity-60" />
                  <line x1="20" y1="20" x2="3" y2="28" className="opacity-60" />
                  <circle cx="20" cy="20" r="5" className="fill-[#ff6b00] stroke-none" />
                </svg>
              </div>
              <span className="text-xl font-[800]">Plugd</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-12 tracking-tight uppercase leading-none">
              100 vs 100,000
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 w-full max-w-4xl">
              <img 
                src={ELON_IMAGE} 
                alt="Elon" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ELON_PLACEHOLDER;
                }}
              />
              <div className="relative bg-card border border-border p-6 md:p-8 rounded-3xl shadow-2xl text-left max-w-md">
                <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-card hidden md:block" />
                <p className="text-xl md:text-2xl leading-tight font-bold">{renderElonReaction()}</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full max-w-md py-6 bg-foreground text-background font-black text-3xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_8px_0_0_#333] hover:shadow-[0_4px_0_0_#333] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px]"
            >
              Start Game
            </button>
          </div>
        )}

        {(gameState === "playing" || gameState === "result") && (
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between mb-8 bg-card/50 px-6 py-4 rounded-2xl border border-border">
              <button onClick={() => setGameState("landing")} className="flex items-center gap-2 text-muted hover:text-foreground transition-colors font-bold uppercase text-xs tracking-widest">
                <RefreshCcw className="w-4 h-4" /> Restart
              </button>
              <div className="flex flex-col items-center">
                <span className="text-muted text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-0.5">Score</span>
                <span className="text-2xl font-black leading-none">{score} / 5</span>
              </div>
              <div className="flex items-center gap-3 text-[#f97316]">
                <Timer className="w-5 h-5" />
                <span className="text-2xl font-black tabular-nums">0:{timer.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Account Cards */}
            {loading ? (
              <div className="h-[400px] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-selected" />
              </div>
            ) : accounts && (
              <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {/* VS Starburst */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none scale-110 md:scale-150">
                  <div className="relative flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_0_20px_rgba(249,115,22,0.4)] fill-[#f97316]">
                      <path d="M50 5 L58 25 L78 20 L72 38 L95 42 L75 55 L88 78 L62 68 L50 95 L38 68 L12 78 L25 55 L5 42 L28 38 L22 20 L42 25 Z" />
                    </svg>
                    <span className="absolute text-white font-black text-2xl italic tracking-tighter drop-shadow-md">VS</span>
                  </div>
                </div>

                <GameAccountCard 
                  account={accounts.acc1} 
                  isSelected={selectedId === accounts.acc1.id}
                  isWinner={getWinnerId() === accounts.acc1.id}
                  showResult={gameState === "result"}
                  onSelect={() => handleSelect(accounts.acc1.id)}
                />
                <GameAccountCard 
                  account={accounts.acc2} 
                  isSelected={selectedId === accounts.acc2.id}
                  isWinner={getWinnerId() === accounts.acc2.id}
                  showResult={gameState === "result"}
                  onSelect={() => handleSelect(accounts.acc2.id)}
                />
              </div>
            )}

            {/* Bottom Elon */}
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <img 
                src={ELON_IMAGE} 
                alt="Elon" 
                className="w-20 h-20 object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ELON_PLACEHOLDER;
                }}
              />
              <div className="bg-card border border-border p-4 rounded-2xl shadow-xl max-w-sm">
                <p className="text-sm font-bold leading-tight">{renderElonReaction()}</p>
              </div>
            </div>
          </div>
        )}

        {gameState === "end" && (
          <div className="flex flex-col items-center text-center animate-in zoom-in duration-500 w-full">
            <Trophy className="w-16 h-16 text-[#f97316] mb-6" />
            <h2 className="text-6xl font-black mb-4 uppercase leading-none">Game Over</h2>
            <p className="text-2xl mb-10 font-bold">You got {score} / 5 correct!</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 w-full max-w-3xl">
              <img 
                src={ELON_IMAGE} 
                alt="Elon" 
                className="w-48 h-48 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ELON_PLACEHOLDER;
                }}
              />
              <div className="relative bg-card border border-border p-8 rounded-3xl shadow-2xl text-left">
                <p className="text-2xl italic font-bold">&quot;{renderElonReaction()}&quot;</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full max-w-md py-6 bg-selected text-selected-foreground font-black text-3xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_8px_0_0_#999] active:shadow-none active:translate-y-[8px]"
            >
              Play Again
            </button>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}

function GameAccountCard({ 
  account, 
  isSelected, 
  isWinner, 
  showResult, 
  onSelect 
}: { 
  account: Account; 
  isSelected: boolean; 
  isWinner: boolean; 
  showResult: boolean; 
  onSelect: () => void 
}) {
  let borderColor = "border-border";
  if (showResult) {
    if (isWinner) borderColor = "border-green-500 ring-8 ring-green-500/10";
    else if (isSelected) borderColor = "border-red-500 ring-8 ring-red-500/10";
  }

  return (
    <div className={`bg-[#111] border-2 ${borderColor} rounded-3xl overflow-hidden transition-all duration-300 flex flex-col shadow-2xl h-full group`}>
      <div className="p-6 md:p-8 flex-1">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 shrink-0">
            <img src={account.avatarUrl} alt="" className="w-full h-full rounded-2xl border border-white/10 object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-black truncate leading-tight">{account.name}</h3>
            <p className="text-muted text-sm font-bold opacity-60">@{account.xHandle.replace(/^@+/, '')}</p>
          </div>
        </div>
        
        <p className="text-[0.95rem] line-clamp-4 mb-8 text-muted italic leading-relaxed font-medium">
          {account.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {account.niche.slice(0, 3).map(n => (
            <span key={n} className="px-3 py-1 rounded-lg bg-[#1a1a1a] border border-white/5 text-[0.75rem] font-bold text-muted transition-colors group-hover:border-white/10">
              {n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 mt-auto">
        {showResult ? (
          <div className="flex flex-col items-center py-6 bg-pill/50 rounded-2xl border border-white/5 animate-in zoom-in-95 duration-300">
            <span className="text-[0.65rem] uppercase text-muted font-black tracking-[0.2em] mb-2">Followers</span>
            <span className={`text-4xl font-black ${isWinner ? "text-green-500" : "text-muted opacity-50"}`}>
              {account.followersRange}
            </span>
          </div>
        ) : (
          <button 
            onClick={onSelect}
            className="w-full py-5 bg-selected text-selected-foreground font-black text-sm rounded-2xl hover:bg-selected/90 transition-all flex items-center justify-center gap-2 group-active:scale-[0.98]"
          >
            This builder has more followers →
          </button>
        )}
      </div>
    </div>
  );
}
