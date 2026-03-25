export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  platforms: string[];  // ChatGPT, Claude, Kimi, etc.
  difficulty: "新手" | "进阶" | "专家";
  prompt: string;
  variables?: { key: string; label: string; placeholder: string }[];
  tips?: string;
  example?: { input: string; output: string };
  hot?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const categories: Category[] = [
  { id: "writing", name: "写作", icon: "✍️", description: "公众号、小红书、广告文案", color: "#6366f1" },
  { id: "coding", name: "编程", icon: "💻", description: "代码生成、Debug、架构设计", color: "#10b981" },
  { id: "translate", name: "翻译", icon: "🌐", description: "中英互译、学术翻译", color: "#3b82f6" },
  { id: "marketing", name: "营销", icon: "📢", description: "产品描述、卖点提炼、竞品分析", color: "#f59e0b" },
  { id: "study", name: "学习", icon: "📚", description: "知识解释、学习计划、论文", color: "#8b5cf6" },
  { id: "office", name: "办公", icon: "💼", description: "周报、邮件、会议纪要、PPT", color: "#ef4444" },
  { id: "roleplay", name: "角色扮演", icon: "🎭", description: "面试官、老师、心理咨询师", color: "#ec4899" },
  { id: "tools", name: "实用工具", icon: "🔧", description: "取名、决策分析、思维导图", color: "#14b8a6" },
];

export const prompts: Prompt[] = [
  // ===== 写作 =====
  {
    id: "wx-article",
    title: "公众号爆款文章",
    description: "生成吸引人的公众号文章，包含标题、开头、正文结构",
    category: "writing",
    tags: ["公众号", "自媒体", "爆款"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `你是一位资深的微信公众号运营专家。请帮我写一篇关于「{{topic}}」的公众号文章。

要求：
1. 给出 5 个吸引眼球的标题备选
2. 开头要有代入感，用故事/问题/数据引入
3. 正文分 3-5 个小节，每节有小标题
4. 结尾有金句总结和引导互动
5. 风格：{{style}}
6. 字数：{{wordCount}} 字左右`,
    variables: [
      { key: "topic", label: "文章主题", placeholder: "例：AI 如何改变普通人的工作方式" },
      { key: "style", label: "写作风格", placeholder: "例：轻松幽默 / 专业严谨 / 故事化" },
      { key: "wordCount", label: "目标字数", placeholder: "例：2000" },
    ],
    tips: "可以先让 AI 给出大纲，确认后再写全文，效果更好",
    example: { input: "主题：远程办公的利与弊", output: "标题：《告别通勤后，我才发现远程办公最大的坑不是效率》..." },
    hot: true,
  },
  {
    id: "xhs-copy",
    title: "小红书爆款文案",
    description: "生成小红书风格的种草/分享文案，带 emoji 和标签",
    category: "writing",
    tags: ["小红书", "种草", "文案"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `你是小红书头部博主，擅长写种草文案。请为「{{product}}」写一篇小红书帖子。

要求：
1. 标题带 emoji，有吸引力（给 3 个备选）
2. 正文用口语化表达，像朋友聊天
3. 分点描述产品亮点，每点一个 emoji 开头
4. 加入真实使用感受和场景
5. 结尾 5-8 个相关标签（#开头）
6. 整体字数 300-500 字`,
    variables: [
      { key: "product", label: "产品/主题", placeholder: "例：某品牌防晒霜 / 居家好物分享" },
    ],
    hot: true,
  },
  {
    id: "copywriting",
    title: "广告文案生成",
    description: "生成不同风格的广告文案和 slogan",
    category: "writing",
    tags: ["广告", "slogan", "文案"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `你是一位获奖无数的广告创意总监。请为以下产品/品牌撰写广告文案：

产品：{{product}}
目标受众：{{audience}}
核心卖点：{{sellingPoint}}
文案类型：{{type}}

请输出：
1. 3 条 Slogan（简短有力）
2. 1 段朋友圈广告文案（100字内）
3. 1 段详情页开头文案（200字）
4. 3 个传播标题`,
    variables: [
      { key: "product", label: "产品/品牌", placeholder: "例：智能台灯" },
      { key: "audience", label: "目标受众", placeholder: "例：25-35岁职场白领" },
      { key: "sellingPoint", label: "核心卖点", placeholder: "例：护眼、智能调光、极简设计" },
      { key: "type", label: "文案风格", placeholder: "例：温暖走心 / 科技感 / 幽默" },
    ],
  },
  {
    id: "story-writer",
    title: "短篇故事创作",
    description: "根据设定生成完整的短篇故事",
    category: "writing",
    tags: ["故事", "创作", "小说"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请创作一个短篇故事。

设定：
- 类型：{{genre}}
- 主角：{{character}}
- 背景：{{setting}}
- 核心冲突：{{conflict}}

要求：
1. 字数 {{wordCount}} 字左右
2. 有清晰的起承转合
3. 对话自然，人物性格鲜明
4. 结尾有反转或余韵`,
    variables: [
      { key: "genre", label: "故事类型", placeholder: "例：科幻 / 悬疑 / 温情 / 奇幻" },
      { key: "character", label: "主角设定", placeholder: "例：一个失去记忆的外卖员" },
      { key: "setting", label: "故事背景", placeholder: "例：2050年的上海" },
      { key: "conflict", label: "核心冲突", placeholder: "例：发现自己是AI" },
      { key: "wordCount", label: "字数", placeholder: "例：1500" },
    ],
  },

  // ===== 编程 =====
  {
    id: "code-gen",
    title: "代码生成器",
    description: "描述需求自动生成代码，支持多语言",
    category: "coding",
    tags: ["代码生成", "开发", "效率"],
    platforms: ["ChatGPT", "Claude", "Cursor"],
    difficulty: "新手",
    prompt: `请用 {{language}} 实现以下功能：

需求描述：{{requirement}}

要求：
1. 代码要有完整的注释
2. 包含错误处理
3. 遵循 {{language}} 最佳实践
4. 如果需要第三方库，说明安装方式
5. 提供使用示例`,
    variables: [
      { key: "language", label: "编程语言", placeholder: "例：Python / JavaScript / Go" },
      { key: "requirement", label: "功能描述", placeholder: "例：一个解析 CSV 文件并生成统计报告的工具" },
    ],
    hot: true,
  },
  {
    id: "code-review",
    title: "代码审查专家",
    description: "让 AI 审查你的代码，找出问题和优化建议",
    category: "coding",
    tags: ["代码审查", "优化", "Bug"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `你是一位有 15 年经验的高级软件工程师。请审查以下代码：

\`\`\`{{language}}
{{code}}
\`\`\`

请从以下角度进行审查：
1. 🐛 Bug 和潜在问题
2. ⚡ 性能优化建议
3. 🔒 安全隐患
4. 📖 可读性和代码风格
5. 🏗️ 架构设计改进
6. ✅ 给出修改后的完整代码`,
    variables: [
      { key: "language", label: "编程语言", placeholder: "例：Python" },
      { key: "code", label: "待审查代码", placeholder: "粘贴你的代码..." },
    ],
  },
  {
    id: "debug-helper",
    title: "Debug 助手",
    description: "描述错误信息，AI 帮你定位和修复 Bug",
    category: "coding",
    tags: ["Debug", "Bug修复", "错误排查"],
    platforms: ["ChatGPT", "Claude", "Cursor"],
    difficulty: "新手",
    prompt: `我遇到了一个编程错误，请帮我分析和修复。

编程语言：{{language}}
错误信息：{{error}}
相关代码：
\`\`\`
{{code}}
\`\`\`

请：
1. 解释错误原因（用通俗易懂的语言）
2. 给出修复方案
3. 说明如何避免类似问题
4. 提供修复后的完整代码`,
    variables: [
      { key: "language", label: "编程语言", placeholder: "例：JavaScript" },
      { key: "error", label: "错误信息", placeholder: "粘贴报错内容..." },
      { key: "code", label: "相关代码", placeholder: "粘贴出错的代码..." },
    ],
  },
  {
    id: "regex-gen",
    title: "正则表达式生成",
    description: "用自然语言描述需求，自动生成正则表达式",
    category: "coding",
    tags: ["正则", "匹配", "工具"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请根据我的需求生成正则表达式。

需求：{{requirement}}
编程语言：{{language}}

请提供：
1. 正则表达式
2. 逐段解释每个部分的含义
3. 5 个匹配成功的测试用例
4. 3 个不匹配的测试用例
5. 在 {{language}} 中的使用代码示例`,
    variables: [
      { key: "requirement", label: "匹配需求", placeholder: "例：匹配中国手机号码" },
      { key: "language", label: "编程语言", placeholder: "例：Python / JavaScript" },
    ],
  },

  // ===== 翻译 =====
  {
    id: "pro-translate",
    title: "专业级翻译",
    description: "超越机翻的高质量翻译，保留原文风格",
    category: "translate",
    tags: ["翻译", "中英互译", "高质量"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你是一位精通中英双语的专业翻译，擅长{{domain}}领域翻译。

请将以下内容翻译为{{targetLang}}：

{{content}}

翻译要求：
1. 准确传达原文含义
2. 表达地道自然，不要翻译腔
3. 专业术语要准确
4. 保留原文的语气和风格
5. 如有文化差异需要适当本地化
6. 对于不确定的翻译，给出备选方案`,
    variables: [
      { key: "domain", label: "专业领域", placeholder: "例：科技 / 医学 / 法律 / 文学 / 技术文档" },
      { key: "targetLang", label: "目标语言", placeholder: "例：中文 / English" },
      { key: "content", label: "待翻译内容", placeholder: "粘贴需要翻译的文本..." },
    ],
    hot: true,
  },
  {
    id: "casual-translate",
    title: "口语化翻译",
    description: "把正式翻译改成口语化表达",
    category: "translate",
    tags: ["口语", "地道表达", "翻译"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请将以下内容翻译为地道的{{targetLang}}口语表达：

{{content}}

要求：
1. 使用日常口语而非书面语
2. 加入常见的口头禅和语气词
3. 如果是英译中，要像中国年轻人日常聊天的感觉
4. 如果是中译英，要像美国人日常对话的感觉
5. 给出 2 个不同风格的翻译版本`,
    variables: [
      { key: "targetLang", label: "目标语言", placeholder: "例：中文 / English" },
      { key: "content", label: "待翻译内容", placeholder: "粘贴需要翻译的文本..." },
    ],
  },

  // ===== 营销 =====
  {
    id: "product-desc",
    title: "产品描述生成",
    description: "生成有吸引力的电商产品描述",
    category: "marketing",
    tags: ["电商", "产品", "描述"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你是一位电商文案专家。请为以下产品撰写描述：

产品名：{{productName}}
产品特点：{{features}}
目标客户：{{audience}}
价格区间：{{price}}

请输出：
1. 一句话卖点（20字内）
2. 产品标题（含关键词，适合搜索）
3. 5 个核心卖点（每个配 emoji + 一句话描述）
4. 详情页文案（300字，痛点→方案→效果结构）
5. 3 条买家好评模板`,
    variables: [
      { key: "productName", label: "产品名称", placeholder: "例：便携式筋膜枪" },
      { key: "features", label: "产品特点", placeholder: "例：轻便、静音、4档调节、Type-C充电" },
      { key: "audience", label: "目标客户", placeholder: "例：健身爱好者、上班族" },
      { key: "price", label: "价格区间", placeholder: "例：199-299元" },
    ],
  },
  {
    id: "competitor-analysis",
    title: "竞品分析框架",
    description: "系统化分析竞争对手的优劣势",
    category: "marketing",
    tags: ["竞品分析", "市场", "策略"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请帮我做一份「{{product}}」的竞品分析报告。

我的产品/品牌：{{myProduct}}
主要竞品：{{competitors}}
分析维度：

1. 产品功能对比（表格形式）
2. 定价策略分析
3. 目标用户差异
4. 营销渠道和方式
5. 用户评价中的高频关键词
6. 竞品的优势和短板
7. 我们的差异化机会
8. 具体的行动建议（3-5条）`,
    variables: [
      { key: "product", label: "产品领域", placeholder: "例：在线教育平台" },
      { key: "myProduct", label: "我的产品", placeholder: "例：XX 学习 App" },
      { key: "competitors", label: "主要竞品", placeholder: "例：得到、知乎、网易公开课" },
    ],
  },

  // ===== 学习 =====
  {
    id: "explain-concept",
    title: "费曼学习法讲解",
    description: "用最简单的语言解释复杂概念",
    category: "study",
    tags: ["费曼", "解释", "学习"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请用费曼学习法，向一个{{audience}}解释「{{concept}}」。

要求：
1. 不使用任何专业术语
2. 用生活中的比喻来类比
3. 举 2-3 个具体例子
4. 分步骤从简单到复杂
5. 结尾给出一个思考题，验证理解程度
6. 如果有常见误解，也要指出`,
    variables: [
      { key: "concept", label: "要解释的概念", placeholder: "例：量子纠缠 / 区块链 / 期权" },
      { key: "audience", label: "听众", placeholder: "例：10岁小孩 / 完全没有技术背景的人" },
    ],
    hot: true,
  },
  {
    id: "study-plan",
    title: "学习计划生成",
    description: "根据目标和时间制定详细的学习计划",
    category: "study",
    tags: ["计划", "学习", "规划"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请帮我制定一份学习计划。

学习目标：{{goal}}
当前水平：{{level}}
可用时间：每天 {{hours}} 小时，共 {{weeks}} 周
学习偏好：{{preference}}

请输出：
1. 总体路线图（阶段划分）
2. 每周详细计划（具体学什么）
3. 推荐的学习资源（书籍/课程/网站）
4. 每个阶段的验收标准
5. 容易踩的坑和建议`,
    variables: [
      { key: "goal", label: "学习目标", placeholder: "例：从零学会 Python 数据分析" },
      { key: "level", label: "当前水平", placeholder: "例：零基础 / 有一点编程经验" },
      { key: "hours", label: "每日学习时间", placeholder: "例：2" },
      { key: "weeks", label: "总计周数", placeholder: "例：8" },
      { key: "preference", label: "学习偏好", placeholder: "例：喜欢看视频 / 喜欢动手实践" },
    ],
  },

  // ===== 办公 =====
  {
    id: "weekly-report",
    title: "周报生成器",
    description: "快速生成结构化的工作周报",
    category: "office",
    tags: ["周报", "汇报", "职场"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我整理工作周报。

本周工作内容：
{{workItems}}

请按以下格式输出周报：
1. 📋 本周工作总结（概述，3-5句话）
2. ✅ 已完成事项（分点列出，量化成果）
3. 🔄 进行中事项（进度百分比）
4. ❗ 遇到的问题和解决方案
5. 📅 下周计划
6. 💡 思考与建议

要求：用词专业但不啰嗦，突出成果和价值`,
    variables: [
      { key: "workItems", label: "本周做了什么", placeholder: "简单罗列即可，例：\n- 完成了用户登录模块开发\n- 修了3个bug\n- 开了产品需求评审会\n- 写了API文档" },
    ],
    hot: true,
  },
  {
    id: "email-writer",
    title: "商务邮件撰写",
    description: "生成专业得体的商务邮件",
    category: "office",
    tags: ["邮件", "商务", "沟通"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请帮我撰写一封商务邮件。

场景：{{scenario}}
收件人：{{recipient}}
核心诉求：{{purpose}}
语气：{{tone}}

要求：
1. 主题行简洁明确
2. 称呼得体
3. 正文逻辑清晰，段落分明
4. 语气{{tone}}
5. 有明确的行动号召
6. 结尾礼貌得体`,
    variables: [
      { key: "scenario", label: "邮件场景", placeholder: "例：跟进合作事宜 / 催促付款 / 感谢客户" },
      { key: "recipient", label: "收件人身份", placeholder: "例：合作方负责人 / 上级领导 / 客户" },
      { key: "purpose", label: "核心诉求", placeholder: "例：确认下周的会议时间" },
      { key: "tone", label: "语气风格", placeholder: "例：正式专业 / 友好亲切 / 温和但坚定" },
    ],
  },

  // ===== 角色扮演 =====
  {
    id: "interviewer",
    title: "模拟面试官",
    description: "AI 模拟面试官进行面试训练",
    category: "roleplay",
    tags: ["面试", "求职", "练习"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你现在是一位{{company}}的{{position}}面试官，有 10 年面试经验。

请对我进行模拟面试：
- 岗位：{{jobTitle}}
- 面试轮次：{{round}}

规则：
1. 每次只问一个问题
2. 等我回答后给出评分（1-10分）和改进建议
3. 然后问下一个问题
4. 问题从简单到难
5. 包含专业技能和行为面试题
6. 面试结束后给出总体评价和通过概率

请开始第一个问题。`,
    variables: [
      { key: "company", label: "目标公司类型", placeholder: "例：大厂 / 外企 / 创业公司" },
      { key: "position", label: "面试官角色", placeholder: "例：技术总监 / HR" },
      { key: "jobTitle", label: "应聘岗位", placeholder: "例：前端开发工程师" },
      { key: "round", label: "面试轮次", placeholder: "例：技术一面 / HR面" },
    ],
    hot: true,
  },
  {
    id: "teacher",
    title: "AI 私教老师",
    description: "让 AI 扮演各学科老师一对一辅导",
    category: "roleplay",
    tags: ["老师", "辅导", "教育"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `你是一位经验丰富的{{subject}}老师，教学风格：耐心、善于用比喻、鼓励式教学。

学生信息：
- 水平：{{level}}
- 学习目标：{{goal}}

教学规则：
1. 先了解我的薄弱点
2. 用通俗易懂的方式讲解
3. 每讲一个知识点就出一道练习题
4. 我答对了给予鼓励
5. 答错了耐心引导，不要直接给答案
6. 定期总结回顾

请开始上课。`,
    variables: [
      { key: "subject", label: "学科", placeholder: "例：数学 / 英语 / 物理" },
      { key: "level", label: "当前水平", placeholder: "例：高中一年级 / 考研备考" },
      { key: "goal", label: "学习目标", placeholder: "例：搞懂微积分 / 提高英语口语" },
    ],
  },

  // ===== 实用工具 =====
  {
    id: "naming",
    title: "品牌取名大师",
    description: "为产品、品牌、项目取一个好名字",
    category: "tools",
    tags: ["取名", "品牌", "创意"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请帮我取名字。

类型：{{type}}
领域/行业：{{industry}}
风格偏好：{{style}}
关键词/元素：{{keywords}}
语言要求：{{language}}

请给出 15 个名字方案，每个包含：
1. 名字
2. 含义解释
3. 域名可用性建议（.com/.cn）
4. 适合的 slogan（一句话）

分三组呈现：稳重专业组 / 创意活泼组 / 简约国际组`,
    variables: [
      { key: "type", label: "取名类型", placeholder: "例：品牌名 / App名 / 公众号名" },
      { key: "industry", label: "所属领域", placeholder: "例：AI 教育 / 健身 / 宠物" },
      { key: "style", label: "风格偏好", placeholder: "例：简洁 / 有科技感 / 可爱 / 文艺" },
      { key: "keywords", label: "关键词", placeholder: "例：智能、学习、成长" },
      { key: "language", label: "语言", placeholder: "例：中文 / 英文 / 中英结合" },
    ],
  },
  {
    id: "decision-maker",
    title: "决策分析助手",
    description: "帮你系统分析利弊，做出更好的决策",
    category: "tools",
    tags: ["决策", "分析", "利弊"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `我正在面临一个决策，请帮我系统分析。

决策问题：{{decision}}
选项：{{options}}
我在意的因素：{{factors}}

请进行以下分析：
1. 每个选项的利弊清单（表格形式）
2. 短期和长期影响
3. 最坏情况和最好情况
4. 风险评估（1-10分）
5. 机会成本分析
6. 综合推荐和理由
7. 如果选了某个方案，接下来的行动计划`,
    variables: [
      { key: "decision", label: "决策问题", placeholder: "例：是否跳槽去新公司" },
      { key: "options", label: "可选方案", placeholder: "例：A-留在现公司 B-去大厂 C-创业" },
      { key: "factors", label: "重要因素", placeholder: "例：薪资、成长空间、工作强度、家庭" },
    ],
  },
  {
    id: "mindmap",
    title: "思维导图生成",
    description: "输入主题自动生成思维导图结构",
    category: "tools",
    tags: ["思维导图", "大纲", "结构化"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请为「{{topic}}」生成一份思维导图结构。

深度要求：{{depth}}
偏重方向：{{focus}}

输出格式用 Markdown 缩进列表，方便直接导入思维导图工具：

- 中心主题
  - 分支1
    - 子分支1.1
    - 子分支1.2
  - 分支2
    - 子分支2.1

要求：
1. 逻辑清晰，层次分明
2. 覆盖全面但不冗余
3. 每个分支 2-5 个子节点
4. 关键节点用 ⭐ 标注`,
    variables: [
      { key: "topic", label: "主题", placeholder: "例：如何做好项目管理" },
      { key: "depth", label: "展开深度", placeholder: "例：3层 / 4层" },
      { key: "focus", label: "侧重方向", placeholder: "例：实操方法 / 理论框架 / 工具推荐" },
    ],
  },

  // ====== 新增模板 ======

  // ===== 写作（补充） =====
  {
    id: "rewrite-tone",
    title: "文风改写大师",
    description: "将同一段内容改写成不同风格",
    category: "writing",
    tags: ["改写", "风格", "润色"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请将以下内容改写为{{style}}风格：

原文：
{{content}}

要求：
1. 保留核心信息不变
2. 完全改变语气和表达方式
3. 适当调整句式结构
4. 改写后的内容自然流畅，不像机翻`,
    variables: [
      { key: "style", label: "目标风格", placeholder: "例：幽默搞笑 / 文艺感性 / 学术严谨 / 毒舌犀利" },
      { key: "content", label: "原文内容", placeholder: "粘贴需要改写的内容..." },
    ],
  },
  {
    id: "video-script",
    title: "短视频脚本",
    description: "生成抖音/B站短视频拍摄脚本",
    category: "writing",
    tags: ["短视频", "抖音", "脚本"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "进阶",
    prompt: `你是一位百万粉丝的短视频创作者。请为以下主题写一个短视频脚本：

主题：{{topic}}
平台：{{platform}}
时长：{{duration}}

脚本格式：
1. 🎬 开头钩子（前3秒抓住注意力）
2. 📝 分镜脚本（画面描述 + 台词/字幕）
3. 🎵 BGM 建议
4. ✂️ 转场建议
5. 📌 结尾引导（关注/点赞/评论话术）

要求口播台词口语化，节奏紧凑不拖沓`,
    variables: [
      { key: "topic", label: "视频主题", placeholder: "例：5个被低估的效率工具" },
      { key: "platform", label: "发布平台", placeholder: "例：抖音 / B站 / 视频号" },
      { key: "duration", label: "视频时长", placeholder: "例：60秒 / 3分钟" },
    ],
    hot: true,
  },
  {
    id: "data-report",
    title: "数据分析报告",
    description: "输入原始数据，生成专业的分析报告和洞察",
    category: "tools",
    tags: ["数据", "分析", "报告"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请帮我分析以下数据并生成报告：

数据内容：
{{data}}

分析目的：{{purpose}}

请输出：
1. 📊 数据概览（关键指标汇总）
2. 📈 趋势分析（上升/下降/波动）
3. 🔍 异常点发现
4. 💡 核心洞察（3-5条，每条用数据支撑）
5. 📋 对比分析（如适用）
6. 🎯 行动建议（基于数据的具体建议）
7. 📝 一句话总结

用图表描述（文字描述图表内容，方便后续制图）`,
    variables: [
      { key: "data", label: "原始数据", placeholder: "粘贴数据（表格、数字、CSV等都可以）..." },
      { key: "purpose", label: "分析目的", placeholder: "例：找出销售下降原因 / 用户增长趋势 / 投放效果评估" },
    ],
  },
  {
    id: "book-review",
    title: "书评/读后感",
    description: "读完一本书后生成深度书评",
    category: "writing",
    tags: ["书评", "读书", "笔记"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请帮我写一篇「{{bookName}}」的书评。

我读完后的主要感受：{{feeling}}
我希望书评的风格：{{style}}

书评结构：
1. 📖 一句话推荐语
2. 📝 内容概要（不剧透，200字）
3. 💡 核心观点提炼（3-5个）
4. 🤔 我的思考和共鸣
5. 📌 金句摘录（5句）
6. ⭐ 推荐指数（1-5星）+ 适合谁读`,
    variables: [
      { key: "bookName", label: "书名", placeholder: "例：《纳瓦尔宝典》" },
      { key: "feeling", label: "你的感受", placeholder: "例：对投资和人生选择有了新的理解" },
      { key: "style", label: "书评风格", placeholder: "例：轻松分享型 / 深度分析型 / 简洁推荐型" },
    ],
  },

  // ===== 编程（补充） =====
  {
    id: "api-design",
    title: "API 接口设计",
    description: "根据需求自动设计 RESTful API 接口",
    category: "coding",
    tags: ["API", "接口设计", "后端"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请为以下业务需求设计 RESTful API 接口：

业务场景：{{scenario}}
技术栈：{{stack}}

请输出：
1. 接口列表（表格：方法 | 路径 | 说明 | 请求参数 | 响应格式）
2. 数据库表设计（字段、类型、说明）
3. 核心接口的请求/响应示例（JSON）
4. 认证方案建议
5. 错误码定义
6. 接口版本管理建议`,
    variables: [
      { key: "scenario", label: "业务场景", placeholder: "例：一个博客系统，支持文章发布、评论、点赞、用户管理" },
      { key: "stack", label: "技术栈", placeholder: "例：Node.js + Express + MySQL" },
    ],
  },
  {
    id: "sql-gen",
    title: "SQL 语句生成",
    description: "用自然语言描述需求，自动生成 SQL",
    category: "coding",
    tags: ["SQL", "数据库", "查询"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请根据以下描述生成 SQL 语句：

数据库类型：{{dbType}}
表结构描述：{{schema}}
查询需求：{{requirement}}

请提供：
1. SQL 语句
2. 逐行解释
3. 性能优化建议（索引等）
4. 如果是复杂查询，给出分步思路`,
    variables: [
      { key: "dbType", label: "数据库", placeholder: "例：MySQL / PostgreSQL / SQLite" },
      { key: "schema", label: "表结构", placeholder: "例：users表(id, name, age, city)，orders表(id, user_id, amount, created_at)" },
      { key: "requirement", label: "查询需求", placeholder: "例：查询每个城市消费金额前10的用户" },
    ],
  },
  {
    id: "git-commit",
    title: "Git Commit 信息生成",
    description: "根据代码变更生成规范的 commit message",
    category: "coding",
    tags: ["Git", "Commit", "规范"],
    platforms: ["ChatGPT", "Claude", "Cursor"],
    difficulty: "新手",
    prompt: `请根据以下代码变更生成规范的 Git commit message：

变更内容：
{{changes}}

要求：
1. 遵循 Conventional Commits 规范
2. 格式：type(scope): description
3. type 类型：feat/fix/docs/style/refactor/perf/test/chore
4. 给出 3 个版本：简洁版 / 标准版 / 详细版（带 body）
5. 全部用英文`,
    variables: [
      { key: "changes", label: "代码变更描述", placeholder: "例：修复了用户登录时密码验证的bug，增加了密码长度校验" },
    ],
  },
  {
    id: "readme-gen",
    title: "README 文档生成",
    description: "为开源项目生成专业的 README",
    category: "coding",
    tags: ["README", "文档", "开源"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请为以下项目生成一份专业的 GitHub README.md：

项目名：{{projectName}}
项目描述：{{description}}
技术栈：{{techStack}}
主要功能：{{features}}

README 结构：
1. 项目标题 + 一句话描述 + 徽章（build/license/version）
2. ✨ 功能特性（带 emoji 列表）
3. 📸 截图/演示（占位符）
4. 🚀 快速开始（安装 + 运行）
5. 📖 使用文档
6. 🗺️ 路线图（TODO）
7. 🤝 贡献指南
8. 📄 License`,
    variables: [
      { key: "projectName", label: "项目名", placeholder: "例：PromptBox" },
      { key: "description", label: "项目描述", placeholder: "例：AI 提示词百宝箱" },
      { key: "techStack", label: "技术栈", placeholder: "例：Next.js + TypeScript + Tailwind CSS" },
      { key: "features", label: "主要功能", placeholder: "例：提示词模板库、一键复制、收藏管理" },
    ],
  },

  // ===== 翻译（补充） =====
  {
    id: "english-tutor",
    title: "英语写作纠错",
    description: "AI 纠正英语语法、用词和表达，给出修改建议",
    category: "roleplay",
    tags: ["英语", "纠错", "语法"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你是一位专业的英语写作老师，母语为英语，同时精通中文。

请帮我检查和修改以下英文内容：

{{content}}

修改要求：
1. 用 ~~删除线~~ 标出错误，**加粗**标出修改后的内容
2. 每处修改说明错误类型（语法/用词/句式/拼写）
3. 给出修改理由（用中文解释）
4. 评估整体写作水平（初级/中级/高级）
5. 给出 3 条提高建议
6. 最后给出完整的修改后版本

写作目的：{{purpose}}`,
    variables: [
      { key: "content", label: "英文内容", placeholder: "粘贴你的英文写作..." },
      { key: "purpose", label: "写作目的", placeholder: "例：商务邮件 / 学术论文 / 日常交流 / 雅思作文" },
    ],
  },
  {
    id: "multi-translate",
    title: "多语言翻译",
    description: "一次性翻译成多种语言",
    category: "translate",
    tags: ["多语言", "国际化", "批量"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请将以下内容翻译成以下语言：{{languages}}

原文：
{{content}}

要求：
1. 每种语言单独列出
2. 翻译要地道自然
3. 如果是 App/网站的 UI 文案，注意控制长度
4. 标注可能需要注意的文化差异`,
    variables: [
      { key: "languages", label: "目标语言", placeholder: "例：英语、日语、韩语、法语" },
      { key: "content", label: "原文内容", placeholder: "粘贴需要翻译的文本..." },
    ],
  },

  // ===== 营销（补充） =====
  {
    id: "user-persona",
    title: "用户画像生成",
    description: "根据产品特征生成详细的目标用户画像",
    category: "marketing",
    tags: ["用户画像", "市场", "分析"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请为「{{product}}」生成 3 个典型用户画像。

每个画像包含：
1. 👤 基本信息（姓名/年龄/职业/城市/收入）
2. 🎯 核心需求和痛点
3. 📱 常用 App 和信息渠道
4. 🛍️ 消费习惯和决策因素
5. 💬 可能说的一句话（代表性的吐槽或需求）
6. 🔗 触达渠道建议（在哪里投广告能找到TA）

3个画像要有差异：核心用户 / 潜在用户 / 边缘用户`,
    variables: [
      { key: "product", label: "产品/服务", placeholder: "例：一款AI写作助手App" },
    ],
  },
  {
    id: "social-calendar",
    title: "社媒内容日历",
    description: "生成一周/一月的社交媒体发帖计划",
    category: "marketing",
    tags: ["社交媒体", "内容计划", "运营"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请为「{{account}}」制定一份 {{period}} 的社交媒体内容日历。

平台：{{platform}}
目标：{{goal}}
品牌调性：{{tone}}

每天的内容包含：
1. 📅 日期和发布时间
2. 📝 内容主题和类型（图文/视频/互动/转发）
3. ✍️ 文案大纲（50字概要）
4. 🏷️ 推荐标签
5. 📊 预期互动形式

要求内容类型多样化，节假日/热点穿插安排`,
    variables: [
      { key: "account", label: "账号/品牌", placeholder: "例：一个编程教育账号" },
      { key: "period", label: "时间范围", placeholder: "例：1周 / 1个月" },
      { key: "platform", label: "平台", placeholder: "例：小红书 / 抖音 / 微博" },
      { key: "goal", label: "运营目标", placeholder: "例：涨粉500、提高互动率" },
      { key: "tone", label: "账号调性", placeholder: "例：专业但接地气" },
    ],
  },
  {
    id: "launch-plan",
    title: "产品发布文案包",
    description: "一键生成产品发布所需的全套文案",
    category: "marketing",
    tags: ["产品发布", "文案", "全套"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `我的产品「{{product}}」即将发布，请帮我生成一套完整的发布文案：

产品介绍：{{description}}
核心卖点：{{highlights}}
目标用户：{{audience}}

请输出：
1. 📢 Product Hunt 英文介绍（tagline + description）
2. 🐦 Twitter/X 发布推文（3条不同版本）
3. 📱 朋友圈文案
4. 💬 微信群推广话术
5. 📧 邮件通知模板
6. 📝 公众号发布文章大纲
7. 🏷️ 各平台推荐标签/关键词`,
    variables: [
      { key: "product", label: "产品名", placeholder: "例：PromptBox" },
      { key: "description", label: "产品介绍", placeholder: "例：免费的AI提示词模板库" },
      { key: "highlights", label: "核心卖点", placeholder: "例：20+分类、一键复制、变量填空" },
      { key: "audience", label: "目标用户", placeholder: "例：AI用户、自媒体创作者" },
    ],
    hot: true,
  },

  // ===== 学习（补充） =====
  {
    id: "paper-summary",
    title: "论文速读助手",
    description: "快速理解和总结学术论文",
    category: "study",
    tags: ["论文", "学术", "总结"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请帮我分析以下论文内容：

论文标题/摘要：
{{content}}

请输出：
1. 📋 一句话总结（30字内）
2. 🎯 研究问题是什么
3. 💡 核心方法/创新点
4. 📊 主要实验结果
5. 🤔 优势和局限性
6. 🔗 和哪些已有工作相关
7. ✅ 这篇论文值得深读吗？（给出理由）

用通俗易懂的语言，避免过多术语`,
    variables: [
      { key: "content", label: "论文标题或摘要", placeholder: "粘贴论文标题和摘要..." },
    ],
  },
  {
    id: "flashcard",
    title: "记忆卡片生成",
    description: "将知识点转化为问答形式的记忆卡片",
    category: "study",
    tags: ["记忆", "复习", "卡片"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请将以下知识点转化为记忆卡片（Q&A 格式）：

学科/领域：{{subject}}
知识内容：
{{content}}

要求：
1. 生成 {{count}} 张记忆卡片
2. 每张卡片：正面是问题，背面是简洁答案
3. 问题类型多样化（定义、对比、应用、判断）
4. 从易到难排列
5. 答案简洁精准，便于快速记忆`,
    variables: [
      { key: "subject", label: "学科", placeholder: "例：JavaScript 基础 / 高中生物" },
      { key: "content", label: "知识内容", placeholder: "粘贴需要记忆的知识点..." },
      { key: "count", label: "卡片数量", placeholder: "例：15" },
    ],
  },

  // ===== 办公（补充） =====
  {
    id: "meeting-minutes",
    title: "会议纪要生成",
    description: "根据会议记录生成结构化纪要",
    category: "office",
    tags: ["会议", "纪要", "记录"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请将以下会议记录整理成结构化的会议纪要：

原始记录：
{{notes}}

纪要格式：
1. 📅 会议信息（日期/参会人/时长）
2. 📋 会议议题
3. 💬 讨论要点（分议题整理）
4. ✅ 达成的决议
5. 📌 行动项（责任人 + 截止时间 + 任务描述）
6. ❓ 待定事项
7. 📅 下次会议安排

语言简洁专业，重点突出行动项`,
    variables: [
      { key: "notes", label: "会议记录", placeholder: "粘贴你的会议笔记或语音转文字内容..." },
    ],
  },
  {
    id: "ppt-outline",
    title: "PPT 大纲生成",
    description: "根据主题生成完整的演示文稿大纲",
    category: "office",
    tags: ["PPT", "演示", "大纲"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请为以下主题生成一份 PPT 大纲：

主题：{{topic}}
演讲场景：{{scenario}}
时长：{{duration}}
听众：{{audience}}

要求：
1. 封面页（标题 + 副标题）
2. 目录页
3. 每页 PPT 内容：标题 + 要点（3-5点）+ 建议的视觉元素
4. 过渡页（章节之间）
5. 总结页
6. 致谢/Q&A 页

总共 {{slides}} 页左右，控制信息密度`,
    variables: [
      { key: "topic", label: "PPT 主题", placeholder: "例：2024年度产品规划" },
      { key: "scenario", label: "场景", placeholder: "例：部门汇报 / 客户提案 / 技术分享" },
      { key: "duration", label: "演讲时长", placeholder: "例：15分钟" },
      { key: "audience", label: "听众", placeholder: "例：公司高管 / 技术团队 / 客户" },
      { key: "slides", label: "页数", placeholder: "例：20" },
    ],
  },
  {
    id: "okr-gen",
    title: "OKR 制定助手",
    description: "帮你制定科学的目标与关键成果",
    category: "office",
    tags: ["OKR", "目标", "绩效"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请帮我制定本{{period}}的 OKR。

我的角色：{{role}}
团队/业务方向：{{direction}}
上级目标：{{upperGoal}}

要求：
1. 制定 2-3 个 Objective（定性目标，鼓舞人心）
2. 每个 O 下面 3-4 个 Key Results（可量化、有截止时间）
3. 每个 KR 标注信心指数（1-10分）
4. 给出实现每个 KR 的具体行动计划
5. 标注风险和依赖项`,
    variables: [
      { key: "period", label: "时间周期", placeholder: "例：季度 / 半年" },
      { key: "role", label: "你的角色", placeholder: "例：前端技术负责人" },
      { key: "direction", label: "业务方向", placeholder: "例：用户增长和产品体验优化" },
      { key: "upperGoal", label: "上级目标", placeholder: "例：Q2 活跃用户增长30%" },
    ],
  },

  // ===== 角色扮演（补充） =====
  {
    id: "psychologist",
    title: "心理咨询师",
    description: "AI 扮演心理咨询师进行情绪疏导",
    category: "roleplay",
    tags: ["心理", "情绪", "咨询"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你是一位有 20 年经验的心理咨询师，擅长认知行为疗法。

咨询规则：
1. 先倾听和共情，不要急于给建议
2. 用温暖但专业的语气
3. 适时提出引导性问题，帮助来访者自我觉察
4. 避免评判和说教
5. 如果涉及严重心理问题，建议寻求专业线下帮助

我现在的困扰：{{concern}}

请开始我们的对话。`,
    variables: [
      { key: "concern", label: "你的困扰", placeholder: "例：最近工作压力很大，经常焦虑失眠" },
    ],
  },
  {
    id: "debate-partner",
    title: "辩论陪练",
    description: "AI 扮演对方辩手训练辩论能力",
    category: "roleplay",
    tags: ["辩论", "思维", "训练"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `你是一位经验丰富的辩手，现在请站在「{{side}}」的立场和我辩论。

辩题：{{topic}}
我的立场：{{mySide}}

辩论规则：
1. 每次发言控制在 200 字内
2. 论点要有逻辑和证据支撑
3. 主动攻击我论点的薄弱环节
4. 使用反问、类比、数据等辩论技巧
5. 辩论结束后（5轮），给我的表现打分并指出改进点

请开始你的立论。`,
    variables: [
      { key: "topic", label: "辩题", placeholder: "例：人工智能是否会取代大部分人类工作" },
      { key: "side", label: "对方立场", placeholder: "例：反方 — AI不会取代人类" },
      { key: "mySide", label: "我的立场", placeholder: "例：正方 — AI会取代大部分工作" },
    ],
  },
  {
    id: "product-manager",
    title: "产品经理模拟",
    description: "AI扮演产品经理帮你梳理需求",
    category: "roleplay",
    tags: ["产品", "需求", "PRD"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `你是一位有 10 年经验的产品经理。我有一个产品想法，请帮我梳理需求：

产品想法：{{idea}}

请按以下步骤引导我：
1. 先问我 5 个关键问题（目标用户、痛点、场景等）
2. 根据我的回答，输出：
   - 产品定位（一句话）
   - 用户故事（3-5个 As a... I want... So that...）
   - 核心功能列表（MVP 版本）
   - 功能优先级排序（P0/P1/P2）
   - 简易竞品分析
   - 第一版迭代计划

请开始提问。`,
    variables: [
      { key: "idea", label: "产品想法", placeholder: "例：一个帮助自由职业者管理项目和客户的工具" },
    ],
  },

  // ===== 实用工具（补充） =====
  {
    id: "daily-plan",
    title: "每日计划生成",
    description: "根据任务清单生成高效的日程安排",
    category: "tools",
    tags: ["日程", "时间管理", "计划"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我安排今天的日程。

今天要做的事：
{{tasks}}

约束条件：
- 可用时间：{{timeRange}}
- 精力高峰期：{{peakTime}}
- 必须固定的时间：{{fixedTime}}

安排要求：
1. 按番茄工作法（25分钟工作+5分钟休息）
2. 高难度任务放在精力高峰期
3. 相似任务集中处理
4. 午饭后安排轻松任务
5. 每个任务标注预计时长和优先级
6. 表格格式输出（时间 | 任务 | 时长 | 优先级）`,
    variables: [
      { key: "tasks", label: "任务清单", placeholder: "例：\n- 写周报\n- 开产品评审会\n- 修2个bug\n- 回复邮件\n- 学习React" },
      { key: "timeRange", label: "可用时间", placeholder: "例：9:00-18:00" },
      { key: "peakTime", label: "精力最好的时段", placeholder: "例：上午10-12点" },
      { key: "fixedTime", label: "固定安排", placeholder: "例：14:00有个会议" },
    ],
  },
  {
    id: "contract-review",
    title: "合同条款审查",
    description: "帮你审查合同中的风险条款",
    category: "tools",
    tags: ["合同", "法律", "审查"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "专家",
    prompt: `请帮我审查以下合同条款，找出潜在风险：

合同类型：{{contractType}}
我的身份：{{myRole}}
合同内容：
{{content}}

请分析：
1. ⚠️ 高风险条款标注（逐条说明风险点）
2. 📌 缺失的保护性条款
3. 🔍 模糊/歧义表达
4. 💡 修改建议（给出替代措辞）
5. ✅ 合理的条款确认

⚠️ 声明：AI 分析仅供参考，重要合同请咨询专业律师`,
    variables: [
      { key: "contractType", label: "合同类型", placeholder: "例：劳动合同 / 租房合同 / 合作协议" },
      { key: "myRole", label: "你的身份", placeholder: "例：员工 / 租客 / 甲方" },
      { key: "content", label: "合同内容", placeholder: "粘贴需要审查的合同条款..." },
    ],
  },
  {
    id: "travel-plan",
    title: "旅行计划助手",
    description: "根据偏好生成详细的旅行攻略",
    category: "tools",
    tags: ["旅行", "攻略", "计划"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我制定一份旅行计划。

目的地：{{destination}}
出行时间：{{dates}}
天数：{{days}} 天
人数：{{people}}
预算：{{budget}}
偏好：{{preference}}

请输出：
1. 📅 每日行程安排（景点+交通+餐饮）
2. 🏨 住宿区域推荐
3. 🍜 必吃美食清单
4. 💰 预算分配建议
5. ⚠️ 注意事项和Tips
6. 📦 行李清单`,
    variables: [
      { key: "destination", label: "目的地", placeholder: "例：日本东京+京都" },
      { key: "dates", label: "出行时间", placeholder: "例：4月中旬" },
      { key: "days", label: "天数", placeholder: "例：7" },
      { key: "people", label: "人数和关系", placeholder: "例：2人，情侣" },
      { key: "budget", label: "预算", placeholder: "例：人均1万元" },
      { key: "preference", label: "偏好", placeholder: "例：喜欢美食和文化体验，不喜欢赶行程" },
    ],
    hot: true,
  },

  // ====== 第三批新增 — 高频实用模板 ======

  // ===== 写作 =====
  {
    id: "zhihu-answer",
    title: "知乎高赞回答",
    description: "写出有深度、能获得高赞的知乎回答",
    category: "writing",
    tags: ["知乎", "回答", "深度"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "进阶",
    prompt: `你是知乎上一位拥有 50 万粉丝的优质答主，擅长{{domain}}领域。

请回答以下知乎问题：
「{{question}}」

写作要求：
1. 开头用一句话抓住注意力（金句/反常识/亲身经历）
2. 正文结构清晰，用「一、二、三」或粗体分段
3. 有理有据，适当引用数据或案例
4. 语气{{tone}}，不要像 AI 生成的
5. 穿插个人观点和独到见解
6. 结尾有总结或金句收尾
7. 字数控制在 {{length}}

不要写成百度百科，要有个人温度`,
    variables: [
      { key: "question", label: "知乎问题", placeholder: "例：为什么很多程序员不愿意用 AI 辅助编程？" },
      { key: "domain", label: "擅长领域", placeholder: "例：科技/职场/心理学/金融" },
      { key: "tone", label: "语气风格", placeholder: "例：理性克制 / 轻松幽默 / 犀利毒舌" },
      { key: "length", label: "目标字数", placeholder: "例：1500字" },
    ],
    hot: true,
  },
  {
    id: "speech-writing",
    title: "演讲稿撰写",
    description: "写出有感染力的演讲稿或发言稿",
    category: "writing",
    tags: ["演讲", "发言", "演说"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请为以下场景撰写一篇演讲稿：

场景：{{occasion}}
主题：{{topic}}
时长：约 {{duration}}
听众：{{audience}}
风格：{{style}}

要求：
1. 开头有力（故事/提问/惊人数据，三选一）
2. 主体分 3 个核心论点，每个论点配一个故事或案例
3. 语言口语化，适合朗读（短句为主，有节奏感）
4. 适当使用修辞（排比、反问、对比）
5. 结尾有号召力，让听众记住一句话
6. 标注 [停顿] [强调] [环顾观众] 等表演提示`,
    variables: [
      { key: "occasion", label: "场景", placeholder: "例：公司年会 / 毕业典礼 / TED演讲 / 婚礼" },
      { key: "topic", label: "主题", placeholder: "例：拥抱变化，从今天开始" },
      { key: "duration", label: "时长", placeholder: "例：5分钟 / 10分钟" },
      { key: "audience", label: "听众", placeholder: "例：全体员工 / 大学毕业生" },
      { key: "style", label: "风格", placeholder: "例：激昂励志 / 温情感人 / 幽默轻松" },
    ],
  },
  {
    id: "seo-article",
    title: "SEO 优化文章",
    description: "写出搜索引擎喜欢的高排名文章",
    category: "writing",
    tags: ["SEO", "搜索引擎", "长文"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请围绕关键词「{{keyword}}」撰写一篇 SEO 优化文章。

目标搜索引擎：{{engine}}
文章类型：{{type}}
字数：{{length}}

SEO 写作要求：
1. 标题包含核心关键词，控制在 30 字内
2. 前 100 字自然出现关键词
3. 使用 H2/H3 小标题结构（每个小标题含相关长尾词）
4. 全文关键词密度约 2-3%，自然分布
5. 段落短小（3-5 句），适合移动端阅读
6. 包含 FAQ 部分（3-5 个常见问题，适配精选摘要）
7. 结尾有明确的行动引导（CTA）
8. 语言自然，不要堆砌关键词`,
    variables: [
      { key: "keyword", label: "核心关键词", placeholder: "例：AI提示词怎么写" },
      { key: "engine", label: "目标引擎", placeholder: "例：百度 / Google / 两者兼顾" },
      { key: "type", label: "文章类型", placeholder: "例：教程 / 评测 / 清单 / 深度分析" },
      { key: "length", label: "目标字数", placeholder: "例：2000字" },
    ],
  },
  {
    id: "wechat-moment",
    title: "朋友圈文案",
    description: "不同场景的朋友圈精致文案",
    category: "writing",
    tags: ["朋友圈", "社交", "文案"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我写 5 条朋友圈文案：

场景：{{scene}}
配图描述：{{photo}}
风格：{{style}}

要求：
1. 每条文案 1-3 句话，简短精致
2. 不要太鸡汤也不要太矫情
3. 5 条风格各异（文艺/幽默/感悟/简约/走心）
4. 适合配图发布
5. 可以带 1-2 个 emoji，但不要过多`,
    variables: [
      { key: "scene", label: "场景", placeholder: "例：旅行打卡 / 美食探店 / 加班日常 / 周末休闲" },
      { key: "photo", label: "配图描述", placeholder: "例：海边日落照片 / 咖啡厅角落" },
      { key: "style", label: "整体风格", placeholder: "例：文艺清新 / 搞笑接地气 / 低调高级" },
    ],
  },

  // ===== 编程 =====
  {
    id: "unit-test",
    title: "单元测试生成",
    description: "根据代码自动生成完整的单元测试",
    category: "coding",
    tags: ["测试", "单元测试", "TDD"],
    platforms: ["ChatGPT", "Claude", "Cursor"],
    difficulty: "进阶",
    prompt: `请为以下代码编写完整的单元测试：

代码语言：{{language}}
测试框架：{{framework}}

代码：
\`\`\`
{{code}}
\`\`\`

要求：
1. 覆盖所有公开方法
2. 包含正常路径和边界情况
3. 包含异常/错误处理测试
4. 每个测试用例有清晰的描述
5. 使用 AAA 模式（Arrange-Act-Assert）
6. Mock 外部依赖
7. 测试用例命名格式：should_期望结果_when_条件`,
    variables: [
      { key: "language", label: "编程语言", placeholder: "例：TypeScript / Python / Java" },
      { key: "framework", label: "测试框架", placeholder: "例：Jest / pytest / JUnit" },
      { key: "code", label: "待测试代码", placeholder: "粘贴你的代码..." },
    ],
  },
  {
    id: "shell-script",
    title: "Shell 脚本生成",
    description: "用自然语言描述需求，生成可执行的 Shell 脚本",
    category: "coding",
    tags: ["Shell", "Linux", "命令行"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请根据以下需求生成一个 Shell 脚本：

操作系统：{{os}}
需求描述：{{requirement}}

要求：
1. 脚本开头加 #!/bin/bash
2. 关键步骤添加注释
3. 包含参数校验和错误处理
4. 使用 set -e 确保出错即停
5. 涉及危险操作要有确认提示
6. 输出执行日志
7. 给出使用方法说明（chmod +x 和运行示例）`,
    variables: [
      { key: "os", label: "操作系统", placeholder: "例：Ubuntu / macOS / CentOS" },
      { key: "requirement", label: "需求描述", placeholder: "例：批量压缩当前目录下所有jpg图片到80%质量" },
    ],
  },
  {
    id: "refactor",
    title: "代码重构建议",
    description: "分析代码质量并给出重构方案",
    category: "coding",
    tags: ["重构", "代码质量", "优化"],
    platforms: ["ChatGPT", "Claude", "Cursor"],
    difficulty: "进阶",
    prompt: `请分析以下代码并给出重构建议：

语言：{{language}}
代码：
\`\`\`
{{code}}
\`\`\`

请从以下维度分析：
1. 🔍 代码异味（Code Smells）识别
2. 📐 设计模式建议（适合用什么模式）
3. 🔄 重复代码消除
4. 📝 命名规范改进
5. ⚡ 性能优化点
6. 🛡️ 安全性问题
7. ✅ 重构后的完整代码

每个问题标注严重程度：🔴高 🟡中 🟢低`,
    variables: [
      { key: "language", label: "编程语言", placeholder: "例：JavaScript / Python / Go" },
      { key: "code", label: "待重构代码", placeholder: "粘贴你的代码..." },
    ],
  },

  // ===== 翻译 =====
  {
    id: "subtitle-translate",
    title: "字幕翻译",
    description: "翻译视频字幕，保持时间轴和口语化",
    category: "translate",
    tags: ["字幕", "视频", "影视"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请翻译以下字幕为{{targetLang}}：

字幕内容：
{{content}}

翻译要求：
1. 保持口语化和自然语感
2. 每行字幕控制在 {{maxChars}} 个字符以内
3. 保持原文的语气和情感
4. 俚语/梗要意译而非直译，必要时加注释
5. 如有时间轴标记（00:01:23），保持不变
6. 人名保留原文，首次出现时括号标注翻译`,
    variables: [
      { key: "targetLang", label: "目标语言", placeholder: "例：简体中文 / English" },
      { key: "content", label: "字幕内容", placeholder: "粘贴字幕文本..." },
      { key: "maxChars", label: "每行最大字符数", placeholder: "例：20（中文） / 42（英文）" },
    ],
  },

  // ===== 营销 =====
  {
    id: "survey-design",
    title: "调研问卷设计",
    description: "设计专业的用户调研或市场调查问卷",
    category: "marketing",
    tags: ["问卷", "调研", "用户研究"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请帮我设计一份调研问卷：

调研目的：{{purpose}}
目标人群：{{audience}}
问卷时长：约 {{duration}} 分钟

要求：
1. 问卷结构：开场语 → 筛选题 → 核心题 → 背景题 → 结束语
2. 题目数量 {{count}} 题左右
3. 题型多样化（单选/多选/量表/开放题）
4. 避免引导性提问
5. 选项互斥且穷尽（MECE）
6. 敏感问题放后面
7. 关键题目标注必填
8. 给出每道题的设计意图`,
    variables: [
      { key: "purpose", label: "调研目的", placeholder: "例：了解用户对AI写作工具的需求和付费意愿" },
      { key: "audience", label: "目标人群", placeholder: "例：25-40岁的内容创作者" },
      { key: "duration", label: "问卷时长", placeholder: "例：5" },
      { key: "count", label: "题目数量", placeholder: "例：15" },
    ],
  },
  {
    id: "seo-keywords",
    title: "SEO 关键词分析",
    description: "挖掘关键词并制定 SEO 内容策略",
    category: "marketing",
    tags: ["SEO", "关键词", "流量"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请围绕「{{topic}}」进行关键词分析和内容策略规划。

行业/领域：{{industry}}
目标市场：{{market}}

请输出：
1. 📊 核心关键词（5个，预估搜索量高→低）
2. 🔗 长尾关键词（15个，按用户意图分组：信息型/导航型/交易型）
3. ❓ 用户常问问题（10个，适合做 FAQ 页面）
4. 📝 内容选题建议（10篇文章标题，每篇标注目标关键词）
5. 🏗️ 网站结构建议（关键词如何分布到不同页面）
6. 🔍 竞争分析（这些关键词的竞争难度评估）`,
    variables: [
      { key: "topic", label: "核心主题", placeholder: "例：AI提示词工具" },
      { key: "industry", label: "行业", placeholder: "例：AI/SaaS/教育" },
      { key: "market", label: "目标市场", placeholder: "例：中国 / 全球 / 北美" },
    ],
  },

  // ===== 学习 =====
  {
    id: "exam-questions",
    title: "模拟试题生成",
    description: "根据知识点自动生成考试题目",
    category: "study",
    tags: ["考试", "试题", "备考"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请根据以下内容生成模拟试题：

科目/领域：{{subject}}
知识范围：{{scope}}

试题要求：
1. 单选题 {{single}} 道
2. 多选题 {{multi}} 道
3. 判断题 {{judge}} 道
4. 简答题 {{short}} 道
5. 难度分布：简单40% / 中等40% / 困难20%
6. 每题标注答案和解析
7. 题目覆盖知识范围要均匀

格式清晰，答案和解析放在所有题目之后`,
    variables: [
      { key: "subject", label: "科目", placeholder: "例：JavaScript / 高中物理 / PMP项目管理" },
      { key: "scope", label: "知识范围", placeholder: "例：ES6新特性、Promise、async/await" },
      { key: "single", label: "单选题数量", placeholder: "例：10" },
      { key: "multi", label: "多选题数量", placeholder: "例：5" },
      { key: "judge", label: "判断题数量", placeholder: "例：5" },
      { key: "short", label: "简答题数量", placeholder: "例：3" },
    ],
  },
  {
    id: "oral-english",
    title: "英语口语练习",
    description: "模拟真实场景进行英语口语对话练习",
    category: "study",
    tags: ["英语", "口语", "对话"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你是一位友善的英语口语陪练老师。

练习场景：{{scene}}
我的英语水平：{{level}}

对话规则：
1. 你先用英文发起对话
2. 我用英文回复，你继续对话
3. 每轮对话后，给出我的表达改进建议（用中文）
4. 纠正语法错误，并给出更地道的表达
5. 根据我的水平调整词汇难度
6. 每 5 轮给一次整体评价和学习建议
7. 如果我不知道怎么说，我会用中文，你帮我翻译

请开始对话。`,
    variables: [
      { key: "scene", label: "练习场景", placeholder: "例：咖啡厅点单 / 求职面试 / 机场问路 / 商务会议" },
      { key: "level", label: "英语水平", placeholder: "例：初级 / CET-4 / 雅思6分 / 流利" },
    ],
  },

  // ===== 办公 =====
  {
    id: "annual-summary",
    title: "年终总结",
    description: "写出有亮点的个人年终工作总结",
    category: "office",
    tags: ["年终", "总结", "复盘"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "进阶",
    prompt: `请帮我写一份年终工作总结。

我的岗位：{{role}}
今年主要工作内容：
{{achievements}}

总结要求：
1. 结构：年度概览 → 核心成果 → 项目复盘 → 成长反思 → 明年规划
2. 用数据量化成果（转化率、效率提升、营收增长等）
3. 语气专业自信但不浮夸
4. 每个项目/成果用 STAR 法（情境-任务-行动-结果）
5. 反思部分要真诚，有具体改进计划
6. 明年规划与公司/团队目标对齐
7. 字数约 {{length}}`,
    variables: [
      { key: "role", label: "你的岗位", placeholder: "例：前端开发工程师 / 产品经理 / 运营主管" },
      { key: "achievements", label: "今年主要工作", placeholder: "例：\n- 主导了官网重构项目\n- 带了2个实习生\n- 优化了首页加载速度50%" },
      { key: "length", label: "目标字数", placeholder: "例：2000字" },
    ],
  },
  {
    id: "resume-polish",
    title: "简历优化",
    description: "优化简历内容，突出亮点和竞争力",
    category: "office",
    tags: ["简历", "求职", "HR"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请帮我优化以下简历内容：

目标岗位：{{position}}
我的简历内容：
{{resume}}

优化要求：
1. 用 "动词 + 量化结果" 重写每条工作经历
2. 突出与目标岗位匹配的技能和经验
3. 删除无关或冗余信息
4. 每段经历控制在 3-5 条 bullet point
5. 技能标签按相关度排序
6. 自我评价改为具体能力描述（不要"认真负责、吃苦耐劳"）
7. 输出优化后的完整简历内容
8. 附上修改说明（改了什么、为什么改）`,
    variables: [
      { key: "position", label: "目标岗位", placeholder: "例：高级前端工程师 / 产品经理 / 数据分析师" },
      { key: "resume", label: "简历内容", placeholder: "粘贴你的简历文字内容..." },
    ],
    hot: true,
  },
  {
    id: "project-proposal",
    title: "项目立项书",
    description: "写一份专业的项目立项/提案文档",
    category: "office",
    tags: ["项目", "立项", "提案"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请为以下项目撰写一份立项提案书：

项目名称：{{projectName}}
项目背景：{{background}}
预计周期：{{timeline}}

提案结构：
1. 📋 项目概述（一段话说清楚做什么、为什么做）
2. 🎯 项目目标（SMART 原则，3-5个可量化目标）
3. 📊 现状分析与痛点
4. 💡 解决方案概述
5. 🗺️ 里程碑计划（阶段、交付物、时间）
6. 👥 团队与资源需求
7. 💰 预算估算
8. ⚠️ 风险评估与应对
9. 📈 预期收益/ROI`,
    variables: [
      { key: "projectName", label: "项目名称", placeholder: "例：客户管理系统升级" },
      { key: "background", label: "项目背景", placeholder: "例：现有CRM系统老旧，客户投诉响应慢，数据分析能力不足" },
      { key: "timeline", label: "预计周期", placeholder: "例：3个月" },
    ],
  },

  // ===== 角色扮演 =====
  {
    id: "fitness-coach",
    title: "健身教练",
    description: "AI 扮演私人健身教练制定训练和饮食计划",
    category: "roleplay",
    tags: ["健身", "训练", "饮食"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你是一位有 10 年经验的认证私人健身教练和营养师。

我的情况：
- 性别：{{gender}}
- 年龄：{{age}} 岁
- 身高体重：{{body}}
- 健身目标：{{goal}}
- 每周可运动时间：{{frequency}}
- 运动经验：{{experience}}
- 可用器械：{{equipment}}

请制定：
1. 🏋️ 每周训练计划（具体动作、组数、次数、休息时间）
2. 🍽️ 每日饮食建议（三餐 + 加餐，标注大致热量）
3. ⚠️ 注意事项（避免受伤、循序渐进）
4. 📊 预期多久能看到效果

后续我会汇报训练情况，请持续调整计划。`,
    variables: [
      { key: "gender", label: "性别", placeholder: "例：女" },
      { key: "age", label: "年龄", placeholder: "例：28" },
      { key: "body", label: "身高体重", placeholder: "例：165cm / 60kg" },
      { key: "goal", label: "健身目标", placeholder: "例：减脂塑形 / 增肌 / 提升体能" },
      { key: "frequency", label: "每周运动时间", placeholder: "例：4次，每次1小时" },
      { key: "experience", label: "运动经验", placeholder: "例：零基础 / 有氧为主 / 练过1年" },
      { key: "equipment", label: "可用器械", placeholder: "例：家里只有瑜伽垫和哑铃 / 健身房" },
    ],
  },
  {
    id: "financial-advisor",
    title: "理财顾问",
    description: "AI 扮演理财顾问帮你规划个人财务",
    category: "roleplay",
    tags: ["理财", "投资", "财务"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `你是一位持有 CFA 和 CFP 认证的资深理财顾问。

我的基本情况：
- 月收入：{{income}}
- 月支出：{{expense}}
- 现有存款/资产：{{assets}}
- 负债：{{debt}}
- 理财目标：{{goal}}
- 风险偏好：{{risk}}

请帮我：
1. 💰 分析当前财务健康状况
2. 📊 制定资产配置方案（比例 + 具体产品类型）
3. 🎯 实现目标的路径规划（时间表）
4. 💡 省钱和增收建议
5. ⚠️ 风险提示

⚠️ 声明：AI 建议仅供参考，重大投资决策请咨询持牌专业人士`,
    variables: [
      { key: "income", label: "月收入", placeholder: "例：税后 15000 元" },
      { key: "expense", label: "月支出", placeholder: "例：房租3500 + 生活费3000 + 其他2000" },
      { key: "assets", label: "现有资产", placeholder: "例：存款10万，基金5万" },
      { key: "debt", label: "负债", placeholder: "例：无 / 房贷剩余80万" },
      { key: "goal", label: "理财目标", placeholder: "例：3年内攒够首付30万" },
      { key: "risk", label: "风险偏好", placeholder: "例：保守 / 稳健 / 激进" },
    ],
  },
  {
    id: "career-mentor",
    title: "职业导师",
    description: "AI 扮演资深职业导师给出职业发展建议",
    category: "roleplay",
    tags: ["职业", "发展", "规划"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `你是一位有 20 年经验的职业发展导师，曾在多家 500 强企业担任 HR VP。

我的情况：
- 当前岗位：{{current}}
- 工作年限：{{years}} 年
- 困惑/需求：{{question}}

请从以下维度给我建议：
1. 📍 当前处于职业发展什么阶段
2. 🛤️ 可能的发展路径（2-3条，各自优劣）
3. 🎯 短期（1年）和中期（3年）行动计划
4. 📚 需要补充的技能和学习资源
5. 💡 行业趋势和机会分析
6. ⚠️ 需要避开的坑

对话式回答，像真正的导师在和我聊天`,
    variables: [
      { key: "current", label: "当前岗位", placeholder: "例：3年经验前端开发，在一家中型互联网公司" },
      { key: "years", label: "工作年限", placeholder: "例：3" },
      { key: "question", label: "你的困惑", placeholder: "例：不知道该继续做技术还是转产品经理" },
    ],
  },

  // ===== 实用工具 =====
  {
    id: "self-intro",
    title: "自我介绍生成",
    description: "不同场景下的精彩自我介绍",
    category: "tools",
    tags: ["自我介绍", "社交", "场景"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我写 3 个版本的自我介绍：

场景：{{occasion}}
我的基本信息：{{info}}
想要突出的特点：{{highlights}}

3 个版本：
1. ⚡ 电梯版（30秒，约100字）— 快速留下印象
2. 📝 标准版（1-2分钟，约300字）— 正式场合
3. 🎯 深度版（3分钟，约500字）— 面试/演讲

要求：
- 开头不要"大家好我是xxx"这种套路
- 每个版本有不同的切入角度
- 自然不做作，有记忆点
- 结尾有互动引导`,
    variables: [
      { key: "occasion", label: "使用场景", placeholder: "例：面试 / 社交活动 / 新团队入职 / 相亲" },
      { key: "info", label: "基本信息", placeholder: "例：28岁，前端工程师，3年经验，在杭州" },
      { key: "highlights", label: "想突出的特点", placeholder: "例：开源项目经历、自学能力强、有副业" },
    ],
  },
  {
    id: "recipe-gen",
    title: "食谱生成",
    description: "根据食材或需求生成详细食谱",
    category: "tools",
    tags: ["食谱", "做饭", "美食"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请根据以下条件推荐食谱并给出详细做法：

可用食材：{{ingredients}}
做饭时间：{{time}}
人数：{{people}}
口味偏好：{{taste}}
限制：{{restrictions}}

请推荐 {{count}} 道菜，每道菜包括：
1. 🍽️ 菜名 + 难度（简单/中等/困难）
2. 📝 食材清单和用量
3. 👨‍🍳 详细步骤（分步骤，标注火候和时间）
4. 💡 小贴士（避坑技巧/替代食材）
5. 📸 摆盘建议`,
    variables: [
      { key: "ingredients", label: "可用食材", placeholder: "例：鸡胸肉、西兰花、大蒜、酱油" },
      { key: "time", label: "做饭时间", placeholder: "例：30分钟内" },
      { key: "people", label: "人数", placeholder: "例：2人份" },
      { key: "taste", label: "口味偏好", placeholder: "例：清淡 / 重口味 / 酸辣" },
      { key: "restrictions", label: "饮食限制", placeholder: "例：无 / 减脂期 / 不吃辣 / 素食" },
      { key: "count", label: "推荐几道", placeholder: "例：3" },
    ],
  },
  {
    id: "gift-advisor",
    title: "送礼推荐",
    description: "根据对象和场景推荐合适的礼物",
    category: "tools",
    tags: ["送礼", "推荐", "节日"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我推荐合适的礼物：

送给谁：{{recipient}}
什么场合：{{occasion}}
对方的特点/爱好：{{interests}}
预算：{{budget}}

请推荐 5 个礼物方案：
1. 每个方案包含：礼物名称 + 价格范围 + 推荐理由
2. 从实用到创意排列
3. 标注在哪里买（京东/淘宝/线下等）
4. 如果是定制类礼物，说明定制周期
5. 附赠一个"低成本但高情感价值"的额外建议（如手写卡片内容）`,
    variables: [
      { key: "recipient", label: "送给谁", placeholder: "例：女朋友 / 妈妈 / 领导 / 同事" },
      { key: "occasion", label: "什么场合", placeholder: "例：生日 / 情人节 / 乔迁 / 升职" },
      { key: "interests", label: "对方特点", placeholder: "例：喜欢护肤、爱看书、养猫" },
      { key: "budget", label: "预算", placeholder: "例：200-500元" },
    ],
  },
  {
    id: "cover-letter",
    title: "求职信撰写",
    description: "针对目标岗位写一封打动HR的求职信",
    category: "tools",
    tags: ["求职信", "求职", "Cover Letter"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "新手",
    prompt: `请帮我写一封求职信（Cover Letter）：

目标公司：{{company}}
目标岗位：{{position}}
我的背景：{{background}}
我最想强调的优势：{{strengths}}

求职信要求：
1. 控制在 {{length}} 字
2. 开头说明如何得知该岗位（如果知道的话）
3. 第一段就抓住 HR 注意力（不要"尊敬的HR，您好"开头）
4. 用 1-2 个具体项目/案例证明能力
5. 体现对该公司/产品的了解和热情
6. 结尾表达面试意愿但不卑不亢
7. 语气：{{tone}}`,
    variables: [
      { key: "company", label: "目标公司", placeholder: "例：字节跳动" },
      { key: "position", label: "目标岗位", placeholder: "例：高级前端工程师" },
      { key: "background", label: "你的背景", placeholder: "例：3年前端经验，参与过日活百万的项目" },
      { key: "strengths", label: "核心优势", placeholder: "例：React性能优化经验、开源项目贡献" },
      { key: "length", label: "目标字数", placeholder: "例：500字" },
      { key: "tone", label: "语气", placeholder: "例：专业自信 / 热情积极 / 沉稳内敛" },
    ],
  },
  {
    id: "product-compare",
    title: "产品对比分析",
    description: "多款产品的全面对比和购买建议",
    category: "tools",
    tags: ["对比", "测评", "购买"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我对比以下产品，给出购买建议：

对比产品：{{products}}
使用场景：{{usage}}
预算范围：{{budget}}
我最看重：{{priority}}

请输出：
1. 📊 对比表格（功能/价格/优劣势）
2. 🏆 各维度冠军（性价比之王/功能最强/颜值最高）
3. 🎯 针对你的需求推荐哪一款（给出理由）
4. ⚠️ 每款产品的槽点和坑
5. 💡 什么时候买最划算（促销节点）`,
    variables: [
      { key: "products", label: "对比产品", placeholder: "例：iPhone 16 vs 三星S25 vs 小米15" },
      { key: "usage", label: "使用场景", placeholder: "例：日常使用+拍照+轻度游戏" },
      { key: "budget", label: "预算", placeholder: "例：5000-7000元" },
      { key: "priority", label: "最看重什么", placeholder: "例：拍照效果 / 续航 / 性价比" },
    ],
  },
  {
    id: "error-explain",
    title: "报错信息解读",
    description: "看不懂的报错信息，AI帮你翻译和解决",
    category: "coding",
    tags: ["报错", "错误", "排查"],
    platforms: ["ChatGPT", "Claude", "Cursor"],
    difficulty: "新手",
    prompt: `我遇到了以下报错，请帮我解读和解决：

开发环境：{{env}}
报错信息：
\`\`\`
{{error}}
\`\`\`

我正在做什么时出的错：{{context}}

请给出：
1. 🔍 这个报错是什么意思（用大白话解释）
2. 🎯 最可能的原因
3. ✅ 解决方案（从最可能到最不可能排列）
4. 📝 修复代码示例
5. 🛡️ 如何避免以后再遇到这个问题`,
    variables: [
      { key: "env", label: "开发环境", placeholder: "例：Node.js + React / Python 3.11 / Java 17" },
      { key: "error", label: "报错信息", placeholder: "粘贴完整的报错信息..." },
      { key: "context", label: "操作背景", placeholder: "例：安装依赖时 / 运行项目时 / 部署时" },
    ],
    hot: true,
  },
  {
    id: "douyin-copy",
    title: "抖音文案",
    description: "写出完播率高的抖音视频文案和话题标签",
    category: "writing",
    tags: ["抖音", "短视频", "文案"],
    platforms: ["ChatGPT", "Claude", "Kimi"],
    difficulty: "新手",
    prompt: `请帮我写一条抖音视频文案：

视频内容：{{content}}
目标受众：{{audience}}
视频风格：{{style}}

请输出：
1. 📝 3 个标题文案（适合抖音搜索的关键词标题）
2. 🎬 视频脚本（口播/旁白文字，控制在 {{duration}}）
3. 🏷️ 推荐话题标签（10个，热门+精准）
4. 💬 引导互动的结尾话术（引导评论）
5. 📌 发布时间建议

要求文案接地气、有节奏感、适合朗读`,
    variables: [
      { key: "content", label: "视频内容", placeholder: "例：分享3个免费AI工具" },
      { key: "audience", label: "目标受众", placeholder: "例：大学生 / 职场新人 / 宝妈" },
      { key: "style", label: "视频风格", placeholder: "例：干货分享 / 搞笑 / 走心故事" },
      { key: "duration", label: "视频时长", placeholder: "例：60秒" },
    ],
  },
  {
    id: "notion-template",
    title: "Notion 模板设计",
    description: "设计结构化的 Notion 页面和数据库模板",
    category: "tools",
    tags: ["Notion", "模板", "效率"],
    platforms: ["ChatGPT", "Claude"],
    difficulty: "进阶",
    prompt: `请帮我设计一个 Notion 模板：

用途：{{purpose}}
使用者：{{user}}

请输出：
1. 📋 页面整体结构（用缩进表示层级）
2. 🗃️ 需要创建的数据库（Database）及字段设计
   - 字段名 | 字段类型（Select/Multi-select/Date/Number等） | 选项值
3. 📊 需要创建的视图（Table/Board/Calendar/Gallery）
4. 🔗 页面之间的关联关系
5. ✨ 美化建议（封面图风格、图标、分割线）
6. 📝 使用说明

可以直接在 Notion 中按照你的结构搭建`,
    variables: [
      { key: "purpose", label: "模板用途", placeholder: "例：个人项目管理 / 读书笔记系统 / 求职追踪 / 内容日历" },
      { key: "user", label: "使用者", placeholder: "例：自由职业者 / 学生 / 小团队" },
    ],
  },
];
