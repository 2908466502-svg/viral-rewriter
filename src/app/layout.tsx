import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "爆款改写工坊 · Viral Content Rewriter",
  description: "保留爆款骨架，替换行业内容。跨行业改写+降重，一条爆款生成10个行业版本",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark h-full">
      <body className="h-full bg-zinc-950 text-zinc-200 antialiased">{children}</body>
    </html>
  )
}
