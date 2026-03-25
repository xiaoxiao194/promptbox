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
      { key: "domain", label: "专业领域", placeholder: "例：科技 / 医学 / 法律 / 文学" },
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
];
