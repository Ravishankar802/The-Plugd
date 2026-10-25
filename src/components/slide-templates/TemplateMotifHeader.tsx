"use client";

import React from "react";
import {
  Terminal,
  Radio,
  Compass,
  ShieldCheck,
  Layers,
  Activity,
  Cpu,
  Coins,
  Flame,
  Target,
  FileText,
  Sliders,
  Award,
  Video,
  Clock,
  Briefcase,
  Zap,
  Boxes,
  Lock,
} from "lucide-react";

interface TemplateMotifHeaderProps {
  templateId: string;
  templateName: string;
  accentColor: string;
  isModule1: boolean;
}

export default function TemplateMotifHeader({
  templateId,
  templateName,
  accentColor,
  isModule1,
}: TemplateMotifHeaderProps) {
  // Render distinct visual motif header based on templateId
  switch (templateId) {
    case "blueprint-light-canvas":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-blue-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
            <Layers className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
            <span>ARCHITECTURAL BLUEPRINT // SPEC_v4.2</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400 text-[9px] hidden sm:flex">
            <span>GRID: 0.125mm</span>
            <span>•</span>
            <span>SYSTEM: DETERMINISTIC</span>
          </div>
        </div>
      );

    case "dark-editorial-relationship":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-neutral-800 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-rose-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            <span>EDITORIAL DOSSIER // INTERPERSONAL MATRIX</span>
          </div>
          <div className="text-neutral-500 text-[9px] hidden sm:block">
            ARCHIVAL DISCOURSE • CALIBRATED
          </div>
        </div>
      );

    case "organic-acquisition-dossier":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-amber-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Target className="h-3.5 w-3.5 text-amber-500" />
            <span>CLASSIFIED FIELD DOSSIER // ZERO-AD CLIENT ACQUISITION</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-500/70 text-[9px] hidden sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>CONFIDENTIAL STRATEGY</span>
          </div>
        </div>
      );

    case "anthropic-claude-architect":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-amber-600/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-bold">
            <Cpu className="h-3.5 w-3.5 text-amber-500" />
            <span>ANTHROPIC CLAUDE SYSTEMS ARCHITECT // 200K TOKENS</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9px] text-amber-600/80 hidden sm:flex">
            <span>⟨claude_3.5_sonnet : system_prompt⟩</span>
          </div>
        </div>
      );

    case "openai-gpt-synthesizer":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-emerald-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span>OPENAI GPT SYNTHESIZER // REASONING CORE ACTIVE</span>
          </div>
          <div className="text-emerald-500/70 text-[9px] hidden sm:block">
            CHAIN-OF-THOUGHT: VERIFIED
          </div>
        </div>
      );

    case "monetization-playbook-canvas":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-blue-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-bold">
            <Coins className="h-3.5 w-3.5 text-blue-500" />
            <span>MONETIZATION PLAYBOOK CANVAS // CASH FLOW ENGINE</span>
          </div>
          <div className="text-neutral-400 text-[9px] hidden sm:block">
            REVENUE VELOCITY: HIGH
          </div>
        </div>
      );

    case "future-sidehustle-terminal":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-cyan-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>2026 SIDE HUSTLE TERMINAL // NODE ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-500/70 text-[9px] hidden sm:flex">
            <span className="inline-block w-2 h-3 bg-cyan-400 animate-pulse" />
            <span>PORT: 8080 // READY</span>
          </div>
        </div>
      );

    case "copy-paste-13k-framework":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-yellow-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-yellow-400 font-bold">
            <Boxes className="h-3.5 w-3.5 text-yellow-400" />
            <span>SHADOW OPERATOR OS // $13,000/MO REPLICATION ENGINE</span>
          </div>
          <div className="text-yellow-500/70 text-[9px] hidden sm:block">
            STATUS: 100% REPRODUCIBLE
          </div>
        </div>
      );

    case "solopreneur-zero-to-ten":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-red-600/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold">
            <Flame className="h-3.5 w-3.5 text-red-500" />
            <span>SOLOPRENEUR COCKPIT // $0 TO $10K TRAJECTORY</span>
          </div>
          <div className="text-neutral-400 text-[9px] hidden sm:block">
            ELEVATION VECTOR: MAXIMUM LEVERAGE
          </div>
        </div>
      );

    case "minimalist-cinema-dark":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-neutral-800 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Video className="h-3.5 w-3.5 text-red-500 animate-pulse" />
            <span>REC ● 24FPS // MIDNIGHT CINEMA $500/DAY</span>
          </div>
          <div className="text-neutral-500 text-[9px] font-mono hidden sm:block">
            TIMECODE: 00:24:19:12
          </div>
        </div>
      );

    case "sovereign-vault-gold":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-yellow-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-yellow-400 font-bold">
            <Lock className="h-3.5 w-3.5 text-yellow-500" />
            <span>SOVEREIGN TREASURY VAULT // $1,000,000 BLUEPRINT</span>
          </div>
          <div className="flex items-center gap-1.5 text-yellow-500/80 text-[9px] hidden sm:flex">
            <span>24K IMPERIAL PROTOCOL</span>
          </div>
        </div>
      );

    case "kinetic-velocity-neon":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-emerald-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>ESCAPE VELOCITY DECK // 1.0M TACHOMETER</span>
          </div>
          <div className="text-emerald-500/70 text-[9px] hidden sm:block">
            ACCELERATION: HYPER-SPEED
          </div>
        </div>
      );

    case "monastic-editorial-parchment":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-rose-900/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-serif font-bold">
            <FileText className="h-3.5 w-3.5 text-rose-700" />
            <span>STOIC ARCHIVAL MONEY CODEX // DECADE COMPOUNDING</span>
          </div>
          <div className="text-neutral-400 text-[9px] hidden sm:block">
            PHILOSOPHICAL RIGOR • TIMELESS
          </div>
        </div>
      );

    case "industrial-concrete-slate":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-yellow-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-yellow-400 font-bold">
            <Sliders className="h-3.5 w-3.5 text-yellow-500" />
            <span>BRUTALIST INDUSTRIAL ENGINE // MECHANICAL WEALTH</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-yellow-500/60 hidden sm:flex">
            <span>[WARNING: ZERO SPECULATION]</span>
          </div>
        </div>
      );

    case "solitary-monk-mode":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-orange-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-orange-400 font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
            <span>MONK MODE $350K CRUCIBLE // DEEP FOCUS ENCLAVE</span>
          </div>
          <div className="text-neutral-500 text-[9px] hidden sm:block">
            DISTRACTIONS: 0% • RUN-RATE: ESCALATING
          </div>
        </div>
      );

    case "matrix-dimension-indigo":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-purple-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>QUANTUM MATRIX // 4-LEVEL WEALTH EVOLUTION</span>
          </div>
          <div className="flex items-center gap-1.5 text-purple-400/80 text-[9px] hidden sm:flex">
            <span>[L1 → L2 → L3 → L4]</span>
          </div>
        </div>
      );

    case "neural-frontier-matrix":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-teal-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-teal-400 font-bold">
            <Cpu className="h-3.5 w-3.5 text-teal-400" />
            <span>NEURAL FRONTIER MATRIX // 8 EXPONENTIAL VECTORS</span>
          </div>
          <div className="text-teal-500/70 text-[9px] hidden sm:block">
            AI MULTIPLIER: 100X
          </div>
        </div>
      );

    case "thrift-to-fortune-ticker":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-emerald-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Coins className="h-3.5 w-3.5 text-emerald-400" />
            <span>MARKET TICKER // $300 TO $100,000 COMPOUNDING LEDGER</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-500/80 text-[9px] hidden sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>RETURNS: +33,233%</span>
          </div>
        </div>
      );

    case "viral-creator-studio-neon":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-rose-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <Radio className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
            <span>VIRAL STUDIO // ● LIVE ATTENTION DISTRIBUTION ENGINE</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400 text-[9px] hidden sm:flex">
            <span>VIRALITY SCORE: 98.4</span>
          </div>
        </div>
      );

    case "boardroom-executive-slate":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-700 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <Briefcase className="h-3.5 w-3.5 text-blue-400" />
            <span>BOARDROOM EXECUTIVE // HIGH-TICKET SERVICE RETAINER OS</span>
          </div>
          <div className="text-slate-400 text-[9px] hidden sm:block">
            ENTERPRISE CONTRACT VALUATION
          </div>
        </div>
      );

    case "synthetic-media-timeline":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-purple-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <Clock className="h-3.5 w-3.5 text-purple-400" />
            <span>SYNTHETIC MEDIA TIMELINE // GENERATIVE CONTENT PIPELINE</span>
          </div>
          <div className="text-pink-400 text-[9px] hidden sm:block">
            10X THROUGHPUT ENGINE
          </div>
        </div>
      );

    case "rationalist-logic-blueprint":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-sky-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Compass className="h-3.5 w-3.5 text-sky-400" />
            <span>FORMAL LOGIC BLUEPRINT // FIRST-PRINCIPLES ASYMMETRIC BETS</span>
          </div>
          <div className="text-sky-500/70 text-[9px] font-mono hidden sm:block">
            ∀ x ∈ Life: Leverage(x) &gt; Friction(x)
          </div>
        </div>
      );

    case "monopoly-pentagon-bronze":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-amber-600/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-amber-500 font-bold">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>PERFECT BUSINESS ARCHITECTURE // 5 ECONOMIC MOATS</span>
          </div>
          <div className="text-amber-500/70 text-[9px] hidden sm:block">
            FORTRESS DEFENSE: UNASSAILABLE
          </div>
        </div>
      );

    case "cyber-enterprise-os-2026":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-sky-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Cpu className="h-3.5 w-3.5 text-sky-400" />
            <span>2026 ENTERPRISE OS // AUTONOMOUS AGENT ORCHESTRATION</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-400 text-[9px] hidden sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AGENTS ONLINE: 100% (0.04ms)</span>
          </div>
        </div>
      );

    case "polymath-atelier-sepia":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-amber-700/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
            <Compass className="h-3.5 w-3.5 text-amber-600" />
            <span>POLYMATH ATELIER // MULTI-DISCIPLINARY MONOPOLY STUDIO</span>
          </div>
          <div className="text-amber-600/70 text-[9px] hidden sm:block">
            RENAISSANCE SYNTHESIS PROTOCOL
          </div>
        </div>
      );

    case "meta-skill-architect-emerald":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-emerald-500/20 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span>META-SKILL ARCHITECT // HIGH-AGENCY SYNTHESIS MATRIX</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400/80 text-[9px] hidden sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>EVOLUTION VECTOR: 2026-2028</span>
          </div>
        </div>
      );

    case "solo-million-speedrun":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-sky-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Flame className="h-3.5 w-3.5 text-sky-400" />
            <span>ONE-PERSON $1M VELOCITY ENGINE // ZERO OVERHEAD</span>
          </div>
          <div className="flex items-center gap-1 text-sky-400/80 text-[9px] hidden sm:flex">
            <span>RUN-RATE: $83,333/MO ACCELERATION</span>
          </div>
        </div>
      );

    case "hyper-dimensional-strategy":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-purple-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-purple-400 font-bold">
            <Compass className="h-3.5 w-3.5 text-purple-400" />
            <span>5-DIMENSIONAL STRATEGY PRISM // 4-QUADRANT INTEGRAL CODES</span>
          </div>
          <div className="text-purple-400/80 text-[9px] hidden sm:block">
            COGNITIVE ELEVATION: COMPLETE
          </div>
        </div>
      );

    case "top-one-percent-ai-operator":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-cyan-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>TOP 1% AI SYNTHESIZER STUDIO // CONTEXT STEERING ENGINE</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400/80 text-[9px] hidden sm:flex">
            <span>⟨system_prompt: cognitive_amplifier⟩</span>
          </div>
        </div>
      );

    case "matrix-escape-velocity-matrix":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-green-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-green-400 font-bold font-mono">
            <Terminal className="h-3.5 w-3.5 text-green-400" />
            <span>MATRIX EXTRACTION TERMINAL // CYBERNETIC AUTONOMY OS</span>
          </div>
          <div className="flex items-center gap-1.5 text-green-400 text-[9px] hidden sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-ping" />
            <span>SCRIPTS OVERRIDDEN: SOVEREIGN</span>
          </div>
        </div>
      );

    case "five-year-window-countdown":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-orange-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-orange-400 font-bold">
            <Clock className="h-3.5 w-3.5 text-orange-400" />
            <span>5-YEAR HORIZON COUNTDOWN // CAPITAL MOAT ARCHITECTURE</span>
          </div>
          <div className="flex items-center gap-1 text-orange-400 text-[9px] hidden sm:flex">
            <span>WINDOW EXPIRATION: 2031 // ACT NOW</span>
          </div>
        </div>
      );

    case "twenty-five-min-wealth-primer":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-teal-500/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-teal-400 font-bold">
            <Coins className="h-3.5 w-3.5 text-teal-400" />
            <span>25-MINUTE WEALTH PRIMER // 40-YEAR COMPOUNDING CODEX</span>
          </div>
          <div className="flex items-center gap-1 text-teal-400/80 text-[9px] hidden sm:flex">
            <span>DURATION: 25 MIN CONDENSED</span>
          </div>
        </div>
      );

    case "passive-ai-flow-station":
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-purple-400/30 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 text-purple-300 font-bold">
            <Boxes className="h-3.5 w-3.5 text-purple-300" />
            <span>ZERO-FRICTION AI PASSIVE FLOW // AUTOMATED CASH ENCLAVE</span>
          </div>
          <div className="text-purple-300/80 text-[9px] hidden sm:block">
            INVENTORY: 0 // MARGIN: 95%+
          </div>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-neutral-800 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2 font-bold" style={{ color: accentColor }}>
            <Layers className="h-3.5 w-3.5" />
            <span>{templateName.toUpperCase()}</span>
          </div>
          <div className="text-neutral-500 text-[9px] hidden sm:block">
            PLAYBOOK STUDIO
          </div>
        </div>
      );
  }
}
