(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,52683,e=>{"use strict";var t=e.i(43476),s=e.i(71645);e.i(47167);let r=`你是一位爆款内容改写专家。你的任务是把一条爆款内容"翻译"到另一个行业，做深度降重改写。

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
- CTA 位置和语气`;async function a(e){let t={model:"deepseek-chat",temperature:.9,max_tokens:8192,messages:[{role:"system",content:r},{role:"user",content:`请将以下【${e.sourceIndustry}】行业的爆款内容，改写为【${e.targetIndustry}】行业${e.targetProduct?`（产品：${e.targetProduct}）`:""}的内容。

## 原始爆款内容（${e.sourceIndustry}）
\`\`\`
${e.sourceContent}
\`\`\`

## 改写要求
1. 生成 ${e.count} 个不同角度的改写版本
2. 每个版本保留原文的爆款骨架（结构/情绪/节奏），只替换行业内容
3. 不同版本之间要有差异化（换场景、换人群、换钩子角度）
4. 改写后内容读起来必须是真实的${e.targetIndustry}内容

## 输出格式（严格 JSON）
[
  {
    "version": 1,
    "content": "改写后的完整内容（用\\n换行）",
    "preserved": ["保留的元素1", "保留的元素2"],
    "adapted": ["改写的内容1", "改写的内容2"]
  }
]

只输出 JSON 数组，不要其他文字。`}]},s=await fetch(`${"https://api.deepseek.com/v1".replace(/\/$/,"")}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer sk-792caa588133485da628fd673e340cb7"},body:JSON.stringify(t)});if(!s.ok){let e=await s.text();throw Error(`API 错误 (${s.status}): ${e.slice(0,200)}`)}let a=(await s.json()).choices[0].message.content.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim();try{return JSON.parse(a)}catch{let e=a.match(/\[[\s\S]*\]/);if(e)return JSON.parse(e[0]);throw Error("无法解析 AI 返回结果")}}let n=(...e)=>e.filter((e,t,s)=>!!e&&""!==e.trim()&&s.indexOf(e)===t).join(" ").trim(),l=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let c=(0,s.createContext)({}),o=(0,s.forwardRef)(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:a,className:l="",children:o,iconNode:d,...x},m)=>{let{size:h=24,strokeWidth:p=2,absoluteStrokeWidth:u=!1,color:b="currentColor",className:g=""}=(0,s.useContext)(c)??{},j=a??u?24*Number(r??p)/Number(t??h):r??p;return(0,s.createElement)("svg",{ref:m,...i,width:t??h??i.width,height:t??h??i.height,stroke:e??b,strokeWidth:j,className:n("lucide",g,l),...!o&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(x)&&{"aria-hidden":"true"},...x},[...d.map(([e,t])=>(0,s.createElement)(e,t)),...Array.isArray(o)?o:[o]])}),d=(e,t)=>{let r=(0,s.forwardRef)(({className:r,...a},i)=>(0,s.createElement)(o,{ref:i,iconNode:t,className:n(`lucide-${l(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,r),...a}));return r.displayName=l(e),r},x=d("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),m=d("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),h=d("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),p=d("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]),u=d("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),b=d("rotate-ccw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]),g=d("shuffle",[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]]),j=["美妆护肤","3C数码","服饰穿搭","母婴亲子","美食探店","家居好物","健身运动","教育培训","职场成长","情感关系","旅行攻略","宠物","汽车","金融理财"],f=`油皮的姐妹听我说！这款散粉真的绝了！！

本人油皮10年，试过的散粉不下20款。每次出门2小时就油光满面，直到遇到这个散粉...

用了3天，真的3天！出油量少了一半你敢信？？

粉质细到像空气一样，上脸完全看不出粉感。而且控油的同时完全不拔干，这一点真的很多大牌都做不到。

最重要的是！才49块！！某大牌同款效果的1/5价格。

学生党闭眼冲！！链接放评论区了👇`;e.s(["default",0,function(){let[e,r]=(0,s.useState)(f),[n,l]=(0,s.useState)("美妆护肤"),[i,c]=(0,s.useState)("3C数码"),[o,d]=(0,s.useState)("倍思充电宝"),[v,N]=(0,s.useState)(5),[y,w]=(0,s.useState)(!1),[z,k]=(0,s.useState)([]),[C,$]=(0,s.useState)(""),[S,M]=(0,s.useState)(null),A=async()=>{if(!e.trim())return void $("请先粘贴要改写的内容");w(!0),$("");try{let t=await a({sourceContent:e,sourceIndustry:n,targetIndustry:i,targetProduct:o||void 0,count:v});k(t)}catch(e){$(e instanceof Error?e.message:"改写失败，请重试")}w(!1)},O=async(e,t)=>{await navigator.clipboard.writeText(e),M(t),setTimeout(()=>M(null),2e3)},T=()=>{let e=`# 爆款改写结果

> 来源：${n} → 目标：${i}${o?`（${o}）`:""}

---

`;z.forEach(t=>{e+=`## 版本 ${t.version}

${t.content}

> 保留：${t.preserved.join("、")}
> 改写：${t.adapted.join("、")}

---

`});let t=new Blob([e],{type:"text/markdown"}),s=document.createElement("a");s.href=URL.createObjectURL(t),s.download="爆款改写结果.md",s.click()};return(0,t.jsxs)("div",{className:"min-h-screen bg-zinc-950 text-zinc-200",children:[(0,t.jsx)("header",{className:"border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-10",children:(0,t.jsxs)("div",{className:"max-w-6xl mx-auto px-4 py-3 flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center",children:(0,t.jsx)(g,{className:"w-4 h-4 text-white"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"font-bold text-sm text-zinc-100",children:"爆款改写工坊"}),(0,t.jsx)("p",{className:"text-[10px] text-zinc-500",children:"保留骨架 · 替换血肉 · 跨行业降重"})]})]}),z.length>0&&(0,t.jsxs)("button",{onClick:T,className:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 transition-colors",children:[(0,t.jsx)(p,{className:"w-3.5 h-3.5"})," 导出 Markdown"]})]})}),(0,t.jsxs)("main",{className:"max-w-6xl mx-auto px-4 py-6",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-3",children:[(0,t.jsx)("span",{className:"text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20",children:"原始爆款"}),(0,t.jsx)("select",{value:n,onChange:e=>l(e.target.value),className:"bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-amber-500/30",children:j.map(e=>(0,t.jsx)("option",{children:e},e))})]}),(0,t.jsx)("textarea",{value:e,onChange:e=>r(e.target.value),placeholder:"粘贴你找到的爆款内容...",rows:14,className:"w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/30 transition-colors resize-none font-mono leading-relaxed"})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[10px] text-zinc-500 mb-1.5 block",children:"改写目标行业"}),(0,t.jsx)("select",{value:i,onChange:e=>c(e.target.value),className:"w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/30",children:j.map(e=>(0,t.jsx)("option",{children:e},e))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-[10px] text-zinc-500 mb-1.5 block",children:"目标产品（可选）"}),(0,t.jsx)("input",{value:o,onChange:e=>d(e.target.value),placeholder:"如：倍思充电宝",className:"w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("label",{className:"text-[10px] text-zinc-500 mb-1.5 block",children:["生成数量：",v," 个版本"]}),(0,t.jsx)("input",{type:"range",min:3,max:10,value:v,onChange:e=>N(Number(e.target.value)),className:"w-full accent-violet-500"}),(0,t.jsxs)("div",{className:"flex justify-between text-[10px] text-zinc-600 mt-1",children:[(0,t.jsx)("span",{children:"3"}),(0,t.jsx)("span",{children:"10"})]})]}),(0,t.jsx)("button",{onClick:A,disabled:y,className:"w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20",children:y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(x,{className:"w-4 h-4 animate-spin"})," 改写中..."]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(g,{className:"w-4 h-4"})," ",n," → ",i," 跨行业改写"]})}),C&&(0,t.jsx)("p",{className:"text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-lg p-3",children:C}),(0,t.jsx)("div",{className:"flex-1 flex items-center justify-center",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)(u,{className:"w-10 h-10 text-zinc-600 mx-auto mb-2"}),(0,t.jsxs)("p",{className:"text-xs text-zinc-600",children:["粘贴爆款原文 → AI 分析骨架 → 生成 ",v," 个行业改写版本"]})]})})]})]}),y&&(0,t.jsxs)("div",{className:"text-center py-12",children:[(0,t.jsx)(x,{className:"w-8 h-8 animate-spin text-violet-400 mx-auto mb-3"}),(0,t.jsxs)("p",{className:"text-zinc-500 text-sm",children:["正在分析爆款骨架，改写到 ",i," 行业..."]})]}),z.length>0&&(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,t.jsx)("h2",{className:"text-sm font-medium text-zinc-300",children:"改写结果"}),(0,t.jsxs)("span",{className:"text-[10px] text-zinc-600",children:[n," → ",i," · ",z.length," 个版本"]})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:z.map((e,s)=>(0,t.jsxs)("div",{className:"group p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all duration-200",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsxs)("span",{className:"text-xs font-bold text-violet-400",children:["版本 ",e.version]}),(0,t.jsx)("div",{className:"flex gap-1",children:(0,t.jsxs)("button",{onClick:()=>O(e.content,s),className:"flex items-center gap-1 px-2 py-1 rounded text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors",children:[S===s?(0,t.jsx)(h,{className:"w-3 h-3 text-emerald-400"}):(0,t.jsx)(m,{className:"w-3 h-3"}),S===s?"已复制":"复制"]})})]}),(0,t.jsx)("div",{className:"text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed mb-3",children:e.content}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-1.5",children:[e.preserved.map((e,s)=>(0,t.jsxs)("span",{className:"px-2 py-0.5 rounded-md bg-amber-500/5 text-amber-400 text-[10px] border border-amber-500/10",children:["保留：",e]},s)),e.adapted.map((e,s)=>(0,t.jsxs)("span",{className:"px-2 py-0.5 rounded-md bg-violet-500/5 text-violet-400 text-[10px] border border-violet-500/10",children:["改写：",e]},s))]})]},s))}),(0,t.jsxs)("div",{className:"flex gap-3 mt-6 justify-center",children:[(0,t.jsxs)("button",{onClick:A,disabled:y,className:"flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 transition-colors",children:[(0,t.jsx)(b,{className:"w-4 h-4"})," 重新改写"]}),(0,t.jsxs)("button",{onClick:T,className:"flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm text-white transition-colors",children:[(0,t.jsx)(p,{className:"w-4 h-4"})," 导出全部 Markdown"]})]})]})]})]})}],52683)}]);