/**
 * 爆款改写引擎
 * 核心能力：保留爆款骨架，替换行业内容
 */

const AI_URL = process.env.NEXT_PUBLIC_AI_API_URL || "https://api.deepseek.com/v1"
const AI_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || ""
const AI_MODEL = process.env.NEXT_PUBLIC_AI_MODEL || "deepseek-chat"

export interface RewriteInput {
  sourceContent: string   // 原始爆款内容
  sourceIndustry: string  // 原始行业
  targetIndustry: string  // 目标行业
  targetProduct?: string  // 目标产品（可选）
  count: number           // 生成数量
}

export interface RewriteResult {
  version: number
  content: string
  preserved: string[]     // 保留的爆款元素
  adapted: string[]       // 改写的部分
}

const SYSTEM_PROMPT = `你是一位爆款内容改写专家。你的任务是把一条爆款内容"翻译"到另一个行业，做深度降重改写。

## 核心原则
1. **保留骨架**：标题节奏、段落结构、情绪曲线、钩子模式——这些是爆款的核心，不能变
2. **替换血肉**：行业术语、产品名称、场景细节——全部替换为目标行业的内容
3. **保持网感**：改写后的内容读起来要像原生创作，不能有翻译腔
4. **不能瞎编**：涉及产品功能、价格、数据的地方，用合理的内容填充，不做虚假宣传

## 改写技巧
- 原文用"烂脸" → 改写用"手机没电"
- 原文用"护肤品成分" → 改写用"充电协议"
- 原文用"皮肤状态" → 改写用"电量焦虑"
- 情绪节奏完全对应：原文第3句制造焦虑，改写第3句也要制造焦虑
- 数字格式对应：原文写"3天见效"，改写写"30分钟充满"

## 你需要分析并保留的爆款元素
- 钩子类型（痛点/反常识/数字/悬念/情感）
- 段落节奏（短句→长句→短句）
- 情绪曲线（焦虑→希望→惊喜）
- CTA 位置和语气`

function buildUserPrompt(input: RewriteInput): string {
  return `请将以下【${input.sourceIndustry}】行业的爆款内容，改写为【${input.targetIndustry}】行业${input.targetProduct ? `（产品：${input.targetProduct}）` : ""}的内容。

## 原始爆款内容（${input.sourceIndustry}）
\`\`\`
${input.sourceContent}
\`\`\`

## 改写要求
1. 生成 ${input.count} 个不同角度的改写版本
2. 每个版本保留原文的爆款骨架（结构/情绪/节奏），只替换行业内容
3. 不同版本之间要有差异化（换场景、换人群、换钩子角度）
4. 改写后内容读起来必须是真实的${input.targetIndustry}内容

## 输出格式（严格 JSON）
[
  {
    "version": 1,
    "content": "改写后的完整内容（用\\n换行）",
    "preserved": ["保留的元素1", "保留的元素2"],
    "adapted": ["改写的内容1", "改写的内容2"]
  }
]

只输出 JSON 数组，不要其他文字。`
}

export async function rewrite(input: RewriteInput): Promise<RewriteResult[]> {
  const body = {
    model: AI_MODEL,
    temperature: 0.9,
    max_tokens: 8192,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(input) },
    ],
  }

  const res = await fetch(`${AI_URL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${AI_KEY}` },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`API 错误 (${res.status}): ${errText.slice(0, 200)}`)
  }

  const data = await res.json()
  const raw = data.choices[0].message.content
  const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    // 如果 JSON 解析失败，尝试提取数组
    const match = cleaned.match(/\[[\s\S]*\]/)
    if (match) return JSON.parse(match[0])
    throw new Error("无法解析 AI 返回结果")
  }
}
