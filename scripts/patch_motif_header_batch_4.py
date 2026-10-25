batch_4_cases = '''    case "meta-skill-architect-emerald":
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
'''

with open("src/components/slide-templates/TemplateMotifHeader.tsx", "r", encoding="utf-8") as f:
    text = f.read()

target = "    default:"
assert target in text, "Target default: not found in TemplateMotifHeader.tsx"
new_text = text.replace(target, batch_4_cases + "\n" + target)

with open("src/components/slide-templates/TemplateMotifHeader.tsx", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Updated TemplateMotifHeader.tsx with Batch 4 motif cases!")
