"use client"

import { useState } from "react"
import { rewrite, type RewriteResult } from "@/lib/rewriter"
import { Sparkles, Loader2, Copy, Check, Download, ArrowRight, RotateCcw, Shuffle } from "lucide-react"

const INDUSTRIES = ["美妆护肤", "3C数码", "服饰穿搭", "母婴亲子", "美食探店", "家居好物", "健身运动", "教育培训", "职场成长", "情感关系", "旅行攻略", "宠物", "汽车", "金融理财"]

const DEMO_SOURCE = `油皮的姐妹听我说！这款散粉真的绝了！！

本人油皮10年，试过的散粉不下20款。每次出门2小时就油光满面，直到遇到这个散粉...

用了3天，真的3天！出油量少了一半你敢信？？

粉质细到像空气一样，上脸完全看不出粉感。而且控油的同时完全不拔干，这一点真的很多大牌都做不到。

最重要的是！才49块！！某大牌同款效果的1/5价格。

学生党闭眼冲！！链接放评论区了👇`

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
    let md = `# 爆款改写结果\n\n> 来源：${sourceIndustry} → 目标：${targetIndustry}${targetProduct ? `（${targetProduct}）` : ""}\n\n---\n\n`
    results.forEach((r) => { md += `## 版本 ${r.version}\n\n${r.content}\n\n> 保留：${r.preserved.join("、")}\n> 改写：${r.adapted.join("、")}\n\n---\n\n` })
    const blob = new Blob([md], { type: "text/markdown" })
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "爆款改写结果.md"; a.click()
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Shuffle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-zinc-100">爆款改写工坊</h1>
              <p className="text-[10px] text-zinc-500">保留骨架 · 替换血肉 · 跨行业降重</p>
            </div>
          </div>
          {results.length > 0 && (
            <button onClick={handleExportMd} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
              <Download className="w-3.5 h-3.5" /> 导出 Markdown
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Input Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Source */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">原始爆款</span>
              <select value={sourceIndustry} onChange={(e) => setSourceIndustry(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-amber-500/30">
                {INDUSTRIES.map((s) => (<option key={s}>{s}</option>))}
              </select>
            </div>
            <textarea value={sourceContent} onChange={(e) => setSourceContent(e.target.value)}
              placeholder="粘贴你找到的爆款内容..."
              rows={14}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/30 transition-colors resize-none font-mono leading-relaxed" />
          </div>

          {/* Right: Target Config */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] text-zinc-500 mb-1.5 block">改写目标行业</label>
              <select value={targetIndustry} onChange={(e) => setTargetIndustry(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/30">
                {INDUSTRIES.map((s) => (<option key={s}>{s}</option>))}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 mb-1.5 block">目标产品（可选）</label>
              <input value={targetProduct} onChange={(e) => setTargetProduct(e.target.value)}
                placeholder="如：倍思充电宝"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30" />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 mb-1.5 block">生成数量：{count} 个版本</label>
              <input type="range" min={3} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-violet-500" />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1"><span>3</span><span>10</span></div>
            </div>

            <button onClick={handleRewrite} disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> 改写中...</> :
                <><Shuffle className="w-4 h-4" /> {sourceIndustry} → {targetIndustry} 跨行业改写</>}
            </button>

            {error && <p className="text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg p-3">{error}</p>}

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ArrowRight className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-600">粘贴爆款原文 → AI 分析骨架 → 生成 {count} 个行业改写版本</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-violet-400 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">正在分析爆款骨架，改写到 {targetIndustry} 行业...</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-sm font-medium text-zinc-300">改写结果</h2>
              <span className="text-[10px] text-zinc-600">{sourceIndustry} → {targetIndustry} · {results.length} 个版本</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((r, i) => (
                <div key={i} className="group p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-violet-400">版本 {r.version}</span>
                    <div className="flex gap-1">
                      <button onClick={() => handleCopy(r.content, i)}
                        className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors">
                        {copiedIdx === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedIdx === i ? "已复制" : "复制"}
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed mb-3">{r.content}</div>

                  <div className="flex flex-wrap gap-1.5">
                    {r.preserved.map((p, j) => (
                      <span key={j} className="px-2 py-0.5 rounded-md bg-amber-500/5 text-amber-400 text-[10px] border border-amber-500/10">保留：{p}</span>
                    ))}
                    {r.adapted.map((a, j) => (
                      <span key={j} className="px-2 py-0.5 rounded-md bg-violet-500/5 text-violet-400 text-[10px] border border-violet-500/10">改写：{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="flex gap-3 mt-6 justify-center">
              <button onClick={handleRewrite} disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                <RotateCcw className="w-4 h-4" /> 重新改写
              </button>
              <button onClick={handleExportMd}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm text-white transition-colors">
                <Download className="w-4 h-4" /> 导出全部 Markdown
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
