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
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 max-w-5xl mx-auto w-full">
        
        {gameState === "landing" && (
          <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-[1.5]">
                  <line x1="20" y1="20" x2="8" y2="8" className="opacity-60" />
                  <line x1="20" y1="20" x2="32" y2="8" className="opacity-60" />
                  <line x1="20" y1="20" x2="37" y2="25" className="opacity-60" />
                  <line x1="20" y1="20" x2="25" y2="37" className="opacity-60" />
                  <line x1="20" y1="20" x2="3" y2="28" className="opacity-60" />
                  <circle cx="20" cy="20" r="5" className="fill-[#ff6b00] stroke-none" />
                </svg>
              </div>
              <span className="text-2xl font-[800]">Plugd</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tight uppercase">
              100 vs 100,000
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 max-w-3xl">
              <img src={ELON_PLACEHOLDER} alt="Elon" className="w-48 h-48 rounded-full border-4 border-border shadow-2xl" />
              <div className="relative bg-card border border-border p-6 rounded-2xl shadow-xl text-left">
                <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-right-[10px] border-right-border hidden md:block" />
                <p className="text-lg leading-relaxed">{renderElonReaction()}</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="px-12 py-5 bg-foreground text-background font-black text-2xl rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_8px_0_0_#333] hover:shadow-[0_4px_0_0_#333] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px]"
            >
              Start Game
            </button>
          </div>
        )}

        {(gameState === "playing" || gameState === "result") && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between mb-12 bg-card/50 p-4 rounded-xl border border-border">
              <button onClick={() => setGameState("landing")} className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                <RefreshCcw className="w-4 h-4" /> Restart
              </button>
              <div className="flex flex-col items-center">
                <span className="text-muted text-xs font-bold uppercase tracking-widest mb-1">Score</span>
                <span className="text-xl font-black">{score} / 5</span>
              </div>
              <div className="flex items-center gap-3 text-orange-500">
                <Timer className="w-5 h-5" />
                <span className="text-xl font-black">0:{timer.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Account Cards */}
            {loading ? (
              <div className="h-[400px] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-selected" />
              </div>
            ) : accounts && (
              <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                {/* VS Starburst */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none scale-75 md:scale-100">
                  <div className="relative flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-2xl fill-[#f97316]">
                      <polygon points="50,5 60,35 95,35 65,55 75,90 50,70 25,90 35,55 5,35 40,35" />
                    </svg>
                    <span className="absolute text-white font-black text-2xl italic tracking-tighter">VS</span>
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
            <div className="flex items-center gap-6 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <img src={ELON_PLACEHOLDER} alt="Elon" className="w-20 h-20 rounded-full border-2 border-border" />
              <div className="bg-card border border-border p-4 rounded-xl shadow-lg max-w-md">
                <p className="text-sm leading-tight">{renderElonReaction()}</p>
              </div>
            </div>
          </div>
        )}

        {gameState === "end" && (
          <div className="flex flex-col items-center text-center animate-in zoom-in duration-500">
            <Trophy className="w-20 h-20 text-orange-500 mb-6" />
            <h2 className="text-5xl font-black mb-4 uppercase">Game Over</h2>
            <p className="text-2xl mb-8 font-bold">You got {score} / 5 correct!</p>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 max-w-3xl">
              <img src={ELON_PLACEHOLDER} alt="Elon" className="w-32 h-32 rounded-full border-2 border-border" />
              <div className="bg-card border border-border p-6 rounded-2xl shadow-xl text-left">
                <p className="text-lg italic">&quot;{renderElonReaction()}&quot;</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="px-12 py-5 bg-selected text-selected-foreground font-black text-2xl rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_8px_0_0_#999] active:shadow-none active:translate-y-[8px]"
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
    if (isWinner) borderColor = "border-green-500 ring-4 ring-green-500/20";
    else if (isSelected) borderColor = "border-red-500 ring-4 ring-red-500/20";
  }

  return (
    <div className={`bg-card border-2 ${borderColor} rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-2xl h-full`}>
      <div className="p-6 flex-1">
        <div className="flex items-center gap-4 mb-6">
          <img src={account.avatarUrl} alt="" className="w-16 h-16 rounded-xl border border-border object-cover" />
          <div className="min-w-0">
            <h3 className="text-xl font-black truncate">{account.name}</h3>
            <p className="text-muted text-sm">@{account.xHandle.replace(/^@+/, '')}</p>
          </div>
        </div>
        
        <p className="text-sm line-clamp-3 mb-6 text-muted italic leading-relaxed">
          &quot;{account.bio}&quot;
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {account.niche.slice(0, 3).map(n => (
            <span key={n} className="px-3 py-1 rounded-full bg-accent border border-border text-[0.7rem] font-bold uppercase tracking-wider">
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        {showResult ? (
          <div className="flex flex-col items-center py-4 bg-pill rounded-xl border border-border animate-in zoom-in-95 duration-300">
            <span className="text-xs uppercase text-muted font-bold tracking-widest mb-1">Followers</span>
            <span className={`text-2xl font-black ${isWinner ? "text-green-500" : "text-foreground"}`}>
              {account.followersRange}
            </span>
          </div>
        ) : (
          <button 
            onClick={onSelect}
            className="w-full py-4 bg-selected text-selected-foreground font-black text-sm rounded-xl hover:bg-selected/90 transition-all flex items-center justify-center gap-2 group"
          >
            This builder has more followers 💰
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
