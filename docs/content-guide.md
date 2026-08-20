# 内容维护手册（给实验室同学）

本站所有内容都存在 `content/` 目录下的 Markdown 文件里。**改文件 = 改网站**：推送到仓库后 Cloudflare Pages 会自动重新构建上线。

## 通用规则

1. 每条内容都是**一对文件**：`<slug>.zh.md`（中文）+ `<slug>.en.md`（英文），`slug` 是网址里的标识符（用英文小写和连字符，如 `whistle-detection`）。两个文件字段要一一对应。
2. `---` 包围的部分是 frontmatter（结构化字段），下面是正文。
3. 图片放 `public/images/<类目>/`，frontmatter 里写 `/images/<类目>/文件名.jpg`。
4. 新增内容最快的办法：从 `templates/` 复制对应模板，改掉内容，**两个语言都要写**。
5. 改完在本地跑 `npm run check`，全绿再提交（或推送到仓库让自动检查跑）。

## 常见操作

### 发一条新闻

1. 复制 `templates/news.zh.md` → `content/news/<日期-slug>.zh.md`（如 `2025-12-01-new-paper.zh.md`）
2. 同样复制英文模板 → 同名 `.en.md`
3. 修改 `date`（日期）、`title` / `titleEn`、正文
4. 首页"最新动态"和新闻页会自动更新（按日期倒序）

### 加一个新项目

1. 复制 `templates/project.zh.md` 和 `.en.md` → `content/projects/<slug>.zh.md` / `.en.md`
2. 填写来源单位、周期、标签；`featured: true` 可上首页精选
3. 如果代码已在 Gitee 开放：填 `repoUrl`，`hasRepro: true`，并在正文按模板的四节写复现指南（环境配置 → 数据准备 → 运行步骤 → 常见问题）
4. 项目会按 `order` 从小到大排列

### 上架一个数据集

1. 复制 `templates/dataset.zh.md` / `.en.md` → `content/datasets/<slug>.zh.md` / `.en.md`
2. 数据本体放 Gitee 仓库（大文件用 Release 附件），`giteeUrl` 填仓库地址
3. 正文里写"引用方式"（BibTeX），页面会提供一键复制
4. 在相关项目的 `datasetRefs` 里加上本数据集的 slug，项目页会自动互链

### 加一位新成员

1. 复制 `templates/member.zh.md` / `.en.md` → `content/members/<姓名拼音>.zh.md` / `.en.md`
2. `role` 选：`pi`（导师）/ `phd` / `master` / `undergrad` / `alumni`（毕业成员）
3. 照片放 `public/images/people/`，正方形效果最好

### 添加一条学习资源

1. 复制 `templates/resource.zh.md` / `.en.md` → `content/resources/<slug>.zh.md` / `.en.md`
2. 选分类：`course`（课程）/ `setup`（环境配置）/ `tutorial`（技术教程）/ `domain`（领域入门）/ `link`（外部资源）
3. **外部资源**（如国外课程网站）：填 `externalUrl` 和 `language`，正文留空——目录页直接外链，不生成详情页
4. **站内教程**：不填 `externalUrl`，正文写教程（概述 → 步骤 → 常见问题），自动生成详情页
5. 可选：`level` 标难度、`authorRef` 关联整理人（成员 slug）

### 登记一篇论文

1. 复制 `templates/publication.zh.md` / `.en.md` → `content/publications/<第一作者-年份-关键词>.zh.md` / `.en.md`
2. 标题保留论文原文（英文），`venue` 填期刊全称；SCI 分区填 `zone`
3. 正文留空即可，论文页按年份自动分组

## 内容红线

- **不虚构**：没有的数据、奖项、人数不要写，页面上的"待补充"标记等有真实信息后再替换
- **示例条目**：带"示例"角标的内容是演示占位，正式内容上架后应删除或改写
- **个人项目不上站**：网站只展示课题组立项的项目

## 本地预览

```
npm install     # 第一次
npm run dev     # 打开 http://localhost:4321
```

有问题先看 `AGENTS.md`（AI 协作规范，人看也有用）。
