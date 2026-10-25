with open("src/components/SlideViewer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Module selector button label
old_m_btn = '<span className={`font-bold shrink-0 ${isModule1 ? "text-[#2563eb]" : "text-[#2563eb]"}`}>\n                MODULE {String(module.number).padStart(2, "0")}\n              </span>'
new_m_btn = '<span className="font-bold shrink-0" style={{ color: template.colorPalette.accent }}>\n                MODULE {String(module.number).padStart(2, "0")}\n              </span>'
assert old_m_btn in content, "Failed to match old_m_btn"
content = content.replace(old_m_btn, new_m_btn, 1)

# 2. Module dropdown header
old_m_head = '<span\n                    className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#2563eb]"\n                  >\n                    CURRICULUM · {course.modules.length} MODULES\n                  </span>'
new_m_head = '<span\n                    className="text-[11px] font-mono font-bold tracking-wider uppercase"\n                    style={{ color: template.colorPalette.accent }}\n                  >\n                    CURRICULUM · {course.modules.length} MODULES\n                  </span>'
assert old_m_head in content, "Failed to match old_m_head"
content = content.replace(old_m_head, new_m_head, 1)

# 3. Module dropdown item active style
old_m_item = 'className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${\n                          isActive\n                            ? "bg-[#2563eb]/15 text-[#2563eb] font-bold"\n                            : isModule1\n                            ? "text-[#44403c] hover:bg-[#f5f3ef] hover:text-[#1c1917]"\n                            : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"\n                        }`}'
new_m_item = 'className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${\n                          isActive\n                            ? "font-bold"\n                            : isModule1\n                            ? "text-[#44403c] hover:bg-[#f5f3ef] hover:text-[#1c1917]"\n                            : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"\n                        }`}\n                        style={\n                          isActive\n                            ? {\n                                backgroundColor: `${template.colorPalette.accent}20`,\n                                color: template.colorPalette.accent,\n                              }\n                            : undefined\n                        }'
assert old_m_item in content, "Failed to match old_m_item"
content = content.replace(old_m_item, new_m_item, 1)

# 4. Lesson dropdown header
old_l_head = '<span\n                    className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#2563eb]"\n                  >\n                    MODULE {String(module.number).padStart(2, "0")} · LESSONS\n                  </span>'
new_l_head = '<span\n                    className="text-[11px] font-mono font-bold tracking-wider uppercase"\n                    style={{ color: template.colorPalette.accent }}\n                  >\n                    MODULE {String(module.number).padStart(2, "0")} · LESSONS\n                  </span>'
assert old_l_head in content, "Failed to match old_l_head"
content = content.replace(old_l_head, new_l_head, 1)

# 5. Lesson dropdown item active style
old_l_item = 'className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${\n                          isActive\n                            ? "bg-[#2563eb]/15 text-[#2563eb] font-bold"\n                            : isModule1\n                            ? "text-[#44403c] hover:bg-[#f5f3ef] hover:text-[#1c1917]"\n                            : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"\n                        }`}'
new_l_item = 'className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${\n                          isActive\n                            ? "font-bold"\n                            : isModule1\n                            ? "text-[#44403c] hover:bg-[#f5f3ef] hover:text-[#1c1917]"\n                            : "text-neutral-300 hover:bg-neutral-800/80 hover:text-white"\n                        }`}\n                        style={\n                          isActive\n                            ? {\n                                backgroundColor: `${template.colorPalette.accent}20`,\n                                color: template.colorPalette.accent,\n                              }\n                            : undefined\n                        }'
assert old_l_item in content, "Failed to match old_l_item"
content = content.replace(old_l_item, new_l_item, 1)

# 6. Main stage card & TemplateMotifHeader & Eyebrow
old_stage = '''      {/* Main Slide Presentation Stage */}
      <main className="relative flex flex-1 items-center justify-center p-4 sm:p-8 lg:p-14 overflow-hidden">
        <div
          key={`${lesson.id}-${currentIndex}`}
          className={`relative w-full max-w-5xl rounded-3xl p-6 sm:p-12 lg:p-16 transition-all ${
            isModule1
              ? "border border-[#e7e5e4] bg-white shadow-xs text-[#1c1917]"
              : "border border-neutral-800/80 bg-gradient-to-b from-[#141418] via-[#101014] to-[#0D0D10] shadow-2xl text-white"
          } ${slideDirection === "next" ? "animate-slide-right" : "animate-slide-left"}`}
        >
          {/* Slide Top Eyebrow Tag */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase font-bold ${
                isModule1
                  ? "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]"
                  : "border-neutral-800 bg-neutral-900/90 text-neutral-400"
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#2563eb]"
              />
              {currentSlide?.eyebrow || `MODULE ${module.number} · LESSON ${lesson.number}`}
            </div>'''

new_stage = '''      {/* Main Slide Presentation Stage */}
      <main className="relative flex flex-1 items-center justify-center p-4 sm:p-8 lg:p-14 overflow-hidden">
        <div
          key={`${lesson.id}-${currentIndex}`}
          style={{
            backgroundColor: isModule1 ? "#ffffff" : undefined,
            background: isModule1 ? undefined : template.colorPalette.stageBg,
            borderColor: template.colorPalette.border,
            boxShadow: isModule1
              ? "0 4px 20px rgba(0,0,0,0.04)"
              : `0 20px 50px -10px ${template.colorPalette.accent}20, 0 0 1px ${template.colorPalette.border}`,
          }}
          className={`relative w-full max-w-5xl rounded-3xl p-6 sm:p-12 lg:p-16 transition-all border ${
            isModule1 ? "text-[#1c1917]" : "text-white"
          } ${slideDirection === "next" ? "animate-slide-right" : "animate-slide-left"}`}
        >
          {/* Distinct Template Visual Motif Header */}
          <TemplateMotifHeader
            templateId={template.templateId}
            templateName={template.name}
            accentColor={template.colorPalette.accent}
            isModule1={isModule1}
          />

          {/* Slide Top Eyebrow Tag */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div
              style={{
                borderColor: `${template.colorPalette.highlightPillText}40`,
                backgroundColor: template.colorPalette.highlightPillBg,
                color: template.colorPalette.highlightPillText,
              }}
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase font-bold"
            >
              <span
                style={{ backgroundColor: template.colorPalette.accent }}
                className="h-1.5 w-1.5 rounded-full"
              />
              {currentSlide?.eyebrow || `MODULE ${module.number} · LESSON ${lesson.number}`}
            </div>'''

assert old_stage in content, "Failed to match old_stage"
content = content.replace(old_stage, new_stage, 1)

# 7. Big Statement
old_bs = '<p\n                  className="text-base sm:text-xl font-medium leading-relaxed text-[#2563eb] font-mono"\n                >\n                  {currentSlide.subheadline}\n                </p>'
new_bs = '<p\n                  style={{ color: template.colorPalette.accent }}\n                  className="text-base sm:text-xl font-medium leading-relaxed font-mono"\n                >\n                  {currentSlide.subheadline}\n                </p>'
assert old_bs in content, "Failed to match old_bs"
content = content.replace(old_bs, new_bs, 1)

# 8. Quote
old_quote = '<div\n                className="text-5xl sm:text-6xl font-serif mb-2 text-[#2563eb]"\n              >\n                “\n              </div>'
new_quote = '<div\n                style={{ color: template.colorPalette.accent }}\n                className="text-5xl sm:text-6xl font-serif mb-2"\n              >\n                “\n              </div>'
assert old_quote in content, "Failed to match old_quote"
content = content.replace(old_quote, new_quote, 1)

# 9. List item numbers
old_list_num = '<div className="text-xs font-mono font-bold mb-1 text-[#2563eb]">\n                        {item.number}\n                      </div>'
new_list_num = '<div className="text-xs font-mono font-bold mb-1" style={{ color: template.colorPalette.accent }}>\n                        {item.number}\n                      </div>'
assert old_list_num in content, "Failed to match old_list_num"
content = content.replace(old_list_num, new_list_num, 1)

# 10. Bullet points numbers
old_bp_num = '<div className="text-xs font-mono font-bold mb-1 text-[#2563eb]">\n                            0{idx + 1}\n                          </div>'
new_bp_num = '<div className="text-xs font-mono font-bold mb-1" style={{ color: template.colorPalette.accent }}>\n                            0{idx + 1}\n                          </div>'
assert old_bp_num in content, "Failed to match old_bp_num"
content = content.replace(old_bp_num, new_bp_num, 1)

# 11. Metrics KPI val
old_kpi = '<div className="text-xl sm:text-2xl font-bold text-[#2563eb] tracking-tight">\n                    {mg.val}\n                  </div>'
new_kpi = '<div className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: template.colorPalette.accent }}>\n                    {mg.val}\n                  </div>'
assert old_kpi in content, "Failed to match old_kpi"
content = content.replace(old_kpi, new_kpi, 1)

# 12. Diagram header
old_diag_head = '<span className="h-2 w-2 rounded-full bg-[#2563eb]" />\n                  <span>SYSTEM ARCHITECTURE: {currentSlide.diagram.title}</span>'
new_diag_head = '<span className="h-2 w-2 rounded-full" style={{ backgroundColor: template.colorPalette.accent }} />\n                  <span style={{ color: template.colorPalette.accent }}>SYSTEM ARCHITECTURE: {currentSlide.diagram.title}</span>'
assert old_diag_head in content, "Failed to match old_diag_head"
content = content.replace(old_diag_head, new_diag_head, 1)

# 13. Diagram step pill
old_diag_step = '<span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#2563eb] text-white">'
new_diag_step = '<span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: template.colorPalette.accent }}>'
assert old_diag_step in content, "Failed to match old_diag_step"
content = content.replace(old_diag_step, new_diag_step, 1)

# 14. Chart header
old_chart_head = '<span className="h-2 w-2 rounded-full bg-[#2563eb]" />\n                  <span>DATA MATRIX: {currentSlide.chart.title}</span>'
new_chart_head = '<span className="h-2 w-2 rounded-full" style={{ backgroundColor: template.colorPalette.accent }} />\n                  <span style={{ color: template.colorPalette.accent }}>DATA MATRIX: {currentSlide.chart.title}</span>'
assert old_chart_head in content, "Failed to match old_chart_head"
content = content.replace(old_chart_head, new_chart_head, 1)

# 15. Chart value text
old_chart_val = '<span className="font-mono font-bold text-xs text-[#2563eb]">\n                        {cd.value}\n                      </span>'
new_chart_val = '<span className="font-mono font-bold text-xs" style={{ color: template.colorPalette.accent }}>\n                        {cd.value}\n                      </span>'
assert old_chart_val in content, "Failed to match old_chart_val"
content = content.replace(old_chart_val, new_chart_val, 1)

# 16. Key Operational Takeaway
old_takeaway = '''          {/* DYNAMIC KEY OPERATIONAL TAKEAWAY BANNER */}
          {currentSlide?.takeaway && (
            <div
              className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 sm:p-5 shadow-xs transition-all ${
                isModule1
                  ? "border-[#bfdbfe] bg-[#eff6ff] text-[#1c1917]"
                  : "border-[#2563eb]/40 bg-[#2563eb]/10 text-white"
              }`}
            >
              <div className="rounded-lg p-1.5 shrink-0 bg-[#2563eb] text-white shadow-xs">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563eb] mb-0.5">
                  KEY OPERATIONAL TAKEAWAY
                </div>'''

new_takeaway = '''          {/* DYNAMIC KEY OPERATIONAL TAKEAWAY BANNER */}
          {currentSlide?.takeaway && (
            <div
              style={{
                borderColor: `${template.colorPalette.accent}40`,
                backgroundColor: isModule1 ? "#eff6ff" : `${template.colorPalette.accent}15`,
              }}
              className="mt-6 flex items-start gap-3 rounded-2xl border p-4 sm:p-5 shadow-xs transition-all text-white"
            >
              <div
                style={{ backgroundColor: template.colorPalette.accent }}
                className="rounded-lg p-1.5 shrink-0 text-white shadow-xs"
              >
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  style={{ color: template.colorPalette.accent }}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5"
                >
                  KEY OPERATIONAL TAKEAWAY
                </div>'''

assert old_takeaway in content, "Failed to match old_takeaway"
content = content.replace(old_takeaway, new_takeaway, 1)

# 17. Footer active dot
old_active_dot = 'className={`rounded-full transition-all cursor-pointer ${\n                  isActive\n                    ? "h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#2563eb] ring-2 ring-[#2563eb]/40 shadow-xs scale-110"\n                    : isModule1\n                    ? "h-2 w-2 bg-[#d6d3d1] hover:bg-[#a8a29e]"\n                    : "h-2 w-2 bg-neutral-800 hover:bg-neutral-700"\n                }`}'
new_active_dot = 'className={`rounded-full transition-all cursor-pointer ${\n                  isActive\n                    ? "h-2.5 w-2.5 sm:h-3 sm:w-3 scale-110"\n                    : isModule1\n                    ? "h-2 w-2 bg-[#d6d3d1] hover:bg-[#a8a29e]"\n                    : "h-2 w-2 bg-neutral-800 hover:bg-neutral-700"\n                }`}\n                style={\n                  isActive\n                    ? {\n                        backgroundColor: template.colorPalette.accent,\n                        boxShadow: `0 0 10px ${template.colorPalette.accent}80`,\n                      }\n                    : undefined\n                }'
assert old_active_dot in content, "Failed to match old_active_dot"
content = content.replace(old_active_dot, new_active_dot, 1)

# 18. Footer Next button active color
old_next_btn = 'className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed ${\n            currentIndex === totalSlides - 1 && !nextLesson\n              ? isModule1\n                ? "border border-[#e7e5e4] bg-[#f5f5f4] text-[#a8a29e]"\n                : "border border-neutral-800 bg-neutral-900 text-neutral-500"\n              : isModule1\n              ? "bg-[#1c1917] text-white hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"\n              : "bg-white text-[#0E0E10] hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"\n          }`}'
new_next_btn = 'className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed ${\n            currentIndex === totalSlides - 1 && !nextLesson\n              ? isModule1\n                ? "border border-[#e7e5e4] bg-[#f5f5f4] text-[#a8a29e]"\n                : "border border-neutral-800 bg-neutral-900 text-neutral-500"\n              : isModule1\n              ? "bg-[#1c1917] text-white hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"\n              : "text-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"\n          }`}\n          style={\n            currentIndex === totalSlides - 1 && !nextLesson\n              ? undefined\n              : isModule1\n              ? undefined\n              : { backgroundColor: template.colorPalette.accent }\n          }'
assert old_next_btn in content, "Failed to match old_next_btn"
content = content.replace(old_next_btn, new_next_btn, 1)

with open("src/components/SlideViewer.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("SlideViewer.tsx patched successfully with unique template design rendering!")
