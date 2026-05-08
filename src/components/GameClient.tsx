"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefreshCcw, Timer, Trophy, ArrowRight, Loader2, Clock } from "lucide-react";
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

export default function GameClient() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("landing");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(7); // TrustMRR uses shorter timers, user said 0:07
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
      setTimer(7);
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
      return (
        <>
          Well, well, well... Another broke builder trying to grow on X.<br /><br />
          I&apos;ll show you two real builders. Think you can even find the winner?
        </>
      );
    }
    if (gameState === "playing" || gameState === "result") {
      return "These are two real builders. Check their profiles to see what they're building. Which one has more followers?";
    }
    if (gameState === "end") {
      if (score === 5) return "Impressive. You really know your builders.";
      if (score >= 3) return "Not bad. Keep scrolling and learning.";
      return "Better luck next time. Keep exploring Plugd!";
    }
    return "";
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground font-mono overflow-x-hidden selection:bg-[#f97316] selection:text-white">
      
      {/* Game Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 max-w-5xl mx-auto w-full">
        
        {gameState === "landing" && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-12 opacity-80">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-[3]">
                  <path d="M20 5 L20 35 M5 20 L35 20" className="opacity-40" />
                  <circle cx="20" cy="20" r="8" className="fill-[#ff6b00] stroke-none" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">Plugd</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-16 tracking-tight text-center">
              100 vs 100,000
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 w-full max-w-3xl">
              <div className="relative shrink-0">
                <img 
                  src={ELON_IMAGE} 
                  alt="Elon" 
                  className="w-[250px] md:w-[300px] h-auto grayscale-[20%] brightness-110"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              <div className="relative bg-[#1a1a1a] p-8 md:p-10 rounded-[32px] text-left max-w-md shadow-2xl">
                <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-[#1a1a1a] hidden md:block" />
                <p className="text-lg md:text-xl leading-relaxed font-bold text-white/90">
                  {renderElonReaction()}
                </p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full max-w-[800px] py-6 bg-[#e5e5e5] text-black font-black text-2xl rounded-2xl hover:bg-white transition-all shadow-xl active:scale-[0.98]"
            >
              Start Game
            </button>
          </div>
        )}

        {(gameState === "playing" || gameState === "result") && (
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between mb-10 px-4">
              <button 
                onClick={() => setGameState("landing")} 
                className="flex items-center gap-1 text-white/60 hover:text-white transition-colors text-sm font-bold"
              >
                <RefreshCcw className="w-4 h-4" /> Restart
              </button>
              
              <div className="bg-[#1a1a1a] px-8 py-2.5 rounded-full border border-white/5">
                <span className="text-xl font-black tabular-nums">{score} / 5</span>
              </div>
              
              <div className="flex items-center gap-2 text-[#f97316]">
                <Clock className="w-5 h-5 fill-[#f97316]/20" />
                <span className="text-xl font-black tabular-nums">0:{timer.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Account Cards */}
            {loading ? (
              <div className="h-[500px] flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#f97316]" />
              </div>
            ) : accounts && (
              <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 mb-12">
                {/* VS Starburst */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none scale-125 md:scale-150">
                  <div className="relative flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_0_20px_rgba(249,115,22,0.4)] fill-[#f97316]">
                      <path d="M50 2 L55 22 L75 15 L68 35 L95 35 L75 50 L90 75 L65 65 L50 98 L35 65 L10 75 L25 50 L5 35 L32 35 L25 15 L45 22 Z" />
                    </svg>
                    <span className="absolute text-white font-black text-2xl italic tracking-tighter drop-shadow-md pb-1">VS</span>
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
            <div className="flex items-center gap-6 mt-4 self-start md:ml-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <img 
                src={ELON_IMAGE} 
                alt="Elon" 
                className="w-24 h-24 object-contain brightness-110" 
                style={{ mixBlendMode: "multiply" }}
              />
              <div className="bg-[#1a1a1a] p-5 rounded-[24px] shadow-xl max-w-md relative">
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-[#1a1a1a]" />
                <p className="text-sm font-bold leading-tight text-white/80">{renderElonReaction()}</p>
              </div>
            </div>
          </div>
        )}

        {gameState === "end" && (
          <div className="flex flex-col items-center text-center animate-in zoom-in duration-500 w-full">
            <Trophy className="w-20 h-20 text-[#f97316] mb-8" />
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">Game Over</h2>
            <p className="text-3xl mb-12 font-bold">You got {score} / 5 correct!</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 w-full max-w-3xl">
              <img 
                src={ELON_IMAGE} 
                alt="Elon" 
                className="w-[200px] h-auto object-contain brightness-110"
                style={{ mixBlendMode: "multiply" }}
              />
              <div className="bg-[#1a1a1a] p-10 rounded-[32px] shadow-2xl text-left max-w-md">
                <p className="text-2xl font-bold text-white/90 leading-tight italic">
                  &quot;{renderElonReaction()}&quot;
                </p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full max-w-[800px] py-6 bg-[#e5e5e5] text-black font-black text-2xl rounded-2xl hover:bg-white transition-all shadow-xl active:scale-[0.98]"
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
  let cardClass = "bg-[#f5f5f5] text-black";
  let borderClass = "border-transparent";
  
  if (showResult) {
    if (isWinner) borderClass = "border-green-500 ring-8 ring-green-500/20";
    else if (isSelected) borderClass = "border-red-500 ring-8 ring-red-500/20";
  }

  return (
    <div className={`${cardClass} border-4 ${borderClass} rounded-[32px] overflow-hidden transition-all duration-300 flex flex-col shadow-2xl min-h-[580px] group relative`}>
      <div className="p-8 md:p-10 flex-1 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8 shrink-0">
          <img src={account.avatarUrl} alt="" className="w-full h-full rounded-[32px] border border-black/5 object-cover shadow-lg" />
        </div>
        
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-black mb-1 leading-none">{account.name}</h3>
          <p className="text-black/40 text-lg font-bold">@{account.xHandle.replace(/^@+/, '')}</p>
        </div>
        
        <p className="text-lg md:text-xl mb-8 text-black/70 font-medium leading-relaxed line-clamp-4">
          {account.bio}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          {account.niche.slice(0, 3).map(n => (
            <span key={n} className="px-4 py-1.5 rounded-full bg-black/5 border border-black/5 text-[0.8rem] font-bold text-black/50 uppercase tracking-widest">
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="px-8 pb-8 mt-auto">
        {showResult ? (
          <div className="flex flex-col items-center py-8 bg-black/5 rounded-[24px] animate-in zoom-in-95 duration-300">
            <span className="text-xs uppercase text-black/30 font-black tracking-[0.2em] mb-2">Followers</span>
            <span className={`text-4xl font-black ${isWinner ? "text-green-600" : "text-black/20"}`}>
              {account.followersRange}
            </span>
          </div>
        ) : (
          <button 
            onClick={onSelect}
            className="w-full py-6 bg-black/10 text-black font-black text-lg rounded-[24px] hover:bg-black/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            This builder has more followers →
          </button>
        )}
      </div>
    </div>
  );
}
