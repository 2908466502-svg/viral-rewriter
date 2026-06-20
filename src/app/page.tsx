"use client"

import { useState } from "react"
import { rewrite, type RewriteResult } from "@/lib/rewriter"
import { Sparkles, Loader2, Copy, Check, Download, Shuffle, RotateCcw, TrendingUp, Zap, ArrowRight, FileText } from "lucide-react"

const INDUSTRIES = ["美妆护肤", "3C数码", "服饰穿搭", "母婴亲子", "美食探店", "家居好物", "健身运动", "教育培训", "职场成长", "情感关系", "旅行攻略", "宠物", "汽车", "金融理财"]

const DEMO_SOURCE = `油皮的姐妹听我说！这款散粉真的绝了！！

本人油皮10年，试过的散粉不下20款。每次出门2小时就油光满面，直到遇到这个散粉...

用了3天，真的3天！出油量少了一半你敢信？？

粉质细到像空气一样，上脸完全看不出粉感。而且控油的同时完全不拔干，这一点真的很多大牌都做不到。

最重要的是！才49块！！某大牌同款效果的1/5价格。

学生党闭眼冲！！链接放评论区了👇`

/* ── 渐变背景色板 ── */
const GRADIENTS = [
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-blue-600",
]

const CARD_GRADIENTS = [
  "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200",
  "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200",
  "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
  "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200",
  "bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200",
]

export default function Home() {
  const [sourceContent, setSourceContent] = useState(DEMO_SOURCE)
  const [sourceIndustry, setSourceIndustry] = useState("美妆护肤")
  const [targetIndustry, setTargetIndustry] = useState("3C数码")
  const [targetProduct, setTargetProduct] = useState("倍思充电宝")
  const [count, setCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<RewriteResult[]>([])
  const [error, setError] = useState("")
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const handleRewrite = async () => {
    if (!sourceContent.trim()) { setError("请先粘贴要改写的内容"); return }
    setLoading(true); setError("")
    try {
      const data = await rewrite({ sourceContent, sourceIndustry, targetIndustry, targetProduct: targetProduct || undefined, count })
      setResults(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "改写失败，请重试")
    }
    setLoading(false)
  }

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIdx(idx); setTimeout(() => setCopiedIdx(null), 2000)
  }

  const handleExportMd = () => {
    let md = `# 爆款改写结果\n\n> 来源：${sourceIndustry} → 目标：${targetIndustry}${targetProduct ? "（" + targetProduct + "）" : ""}\n\n---\n\n`
    results.forEach((r) => { md += `## 版本 ${r.version}\n\n${r.content}\n\n> 保留：${r.preserved.join("、")}\n> 改写：${r.adapted.join("、")}\n\n---\n\n` })
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([md], { type: "text/markdown" })); a.download = "爆款改写结果.md"; a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* ═══════ Header ═══════ */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-lg shadow-gray-900/20">
              <Shuffle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-gray-900 tracking-tight">爆款改写工坊</h1>
              <p className="text-xs text-gray-500">保留骨架 · 替换血肉 · 跨行业降重</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {results.length > 0 && (
              <button onClick={handleExportMd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10">
                <Download className="w-4 h-4" /> 导出 MD
              </button>
            )}
            <a href="https://github.com/2908466502-svg/viral-rewriter" target="_blank" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">GitHub ↗</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ═══════ Step Indicator ═══════ */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { icon: FileText, label: "粘贴爆款", active: true },
            { icon: Zap, label: "AI 分析骨架", active: loading },
            { icon: TrendingUp, label: "生成改写", active: results.length > 0 },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                step.active ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" : "bg-white text-gray-400 border border-gray-200"
              }`}>
                <step.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < 2 && <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />}
            </div>
          ))}
        </div>

        {/* ═══════ 使用说明 ═══════ */}
        <div className="mb-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-amber-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">找到爆款</h3>
                <p className="text-gray-500 text-xs leading-relaxed">在小红书/抖音/公众号上找到一篇任意行业的爆款内容，复制全文粘贴到左侧输入框</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-violet-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">选择目标</h3>
                <p className="text-gray-500 text-xs leading-relaxed">设置你要改写到的目标行业和产品，AI 会自动识别爆款骨架并适配到你的行业</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-emerald-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">挑选使用</h3>
                <p className="text-gray-500 text-xs leading-relaxed">生成 3-10 个改写版本，每个版本保留爆款的情绪节奏，替换为你的行业内容，挑最合适的用</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-400">
            <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">💡 核心价值</span>
            不凭空生成选题，而是把你发现的好内容"翻译"到你的行业——你负责发现爆款骨架，AI 负责降重改写
          </div>
        </div>

        {/* ═══════ Main Panel ═══════ */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* Left: Source Input — 3 cols */}
            <div className="lg:col-span-3 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-gray-900">原始爆款内容</h2>
                    <p className="text-[11px] text-gray-500">粘贴你找到的任意行业爆款</p>
                  </div>
                </div>
                <select value={sourceIndustry} onChange={(e) => setSourceIndustry(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all cursor-pointer hover:border-gray-300">
                  {INDUSTRIES.map((s) => (<option key={s}>{s}</option>))}
                </select>
              </div>
              <textarea value={sourceContent} onChange={(e) => setSourceContent(e.target.value)}
                rows={15}
                placeholder="粘贴爆款内容..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all resize-none leading-relaxed" />
            </div>

            {/* Right: Config + Action — 2 cols */}
            <div className="lg:col-span-2 p-6 flex flex-col gap-5 bg-gray-50/50">
              <h2 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-500" /> 改写配置
              </h2>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">目标行业</label>
                <select value={targetIndustry} onChange={(e) => setTargetIndustry(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all cursor-pointer hover:border-gray-300">
                  {INDUSTRIES.map((s) => (<option key={s}>{s}</option>))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">目标产品（可选）</label>
                <input value={targetProduct} onChange={(e) => setTargetProduct(e.target.value)}
                  placeholder="如：倍思充电宝"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">生成数量</label>
                  <span className="text-sm font-bold text-violet-600">{count} 个版本</span>
                </div>
                <input type="range" min={3} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-violet-600 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md" />
                <div className="flex justify-between text-[10px] text-gray-400"><span>3</span><span>5</span><span>7</span><span>10</span></div>
              </div>

              <button onClick={handleRewrite} disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/20 hover:-translate-y-0.5 active:translate-y-0">
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> <span>正在分析改写...</span></>
                ) : (
                  <><Sparkles className="w-5 h-5" /> <span>{sourceIndustry} → {targetIndustry} &nbsp;跨行业改写 {count} 版</span></>
                )}
              </button>

              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════ Results ═══════ */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">AI 正在改写中...</h3>
            <p className="text-sm text-gray-500">分析爆款骨架 → 保留情绪节奏 → 替换行业内容</p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">改写结果</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  从 <span className="font-semibold text-amber-600">{sourceIndustry}</span> 改写为 <span className="font-semibold text-violet-600">{targetIndustry}</span> · {results.length} 个版本
                </p>
              </div>
              <button onClick={handleExportMd}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <Download className="w-4 h-4" /> 导出全部 MD
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {results.map((r, i) => {
                const g = GRADIENTS[i % GRADIENTS.length]
                const cg = CARD_GRADIENTS[i % CARD_GRADIENTS.length]
                return (
                  <div key={i} className={`group rounded-2xl border ${cg} p-6 hover:shadow-lg transition-all duration-300`}>
                    {/* Card header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${g} flex items-center justify-center shadow-md`}>
                          <span className="text-white text-xs font-bold">{r.version}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">版本 {r.version}</span>
                        {r.version === 1 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">最佳匹配</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleCopy(r.content, i)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all">
                          {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedIdx === i ? "已复制" : "复制"}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-5">{r.content}</div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/60">
                      {r.preserved.map((p, j) => (
                        <span key={j} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-medium border border-amber-200/50">
                          <span className="w-1 h-1 rounded-full bg-amber-400" /> {p}
                        </span>
                      ))}
                      {r.adapted.map((a, j) => (
                        <span key={j} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 text-[11px] font-medium border border-violet-200/50">
                          <span className="w-1 h-1 rounded-full bg-violet-400" /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom bar */}
            <div className="flex justify-center gap-4 mt-8 pb-8">
              <button onClick={handleRewrite} disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <RotateCcw className="w-4 h-4" /> 重新改写
              </button>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                ↑ 回到顶部
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100">
        Built for content creators who find viral posts and want to adapt them to their niche.
      </footer>
    </div>
  )
}
