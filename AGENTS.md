# CVLab（袁静课题组网站）· AI 协作规范

任何 AI 代理或开发者在本仓库工作前，必须先读完本文件。

## 项目概况

- 袁静课题组（Yuan Lab）官方网站，应急管理大学计算机科学与工程学院。
- 技术栈：Astro 7 + Tailwind CSS 4 + 内置 i18n（中文 `/`，英文 `/en/`）。无其他框架依赖。
- 部署目标：Cloudflare Pages（静态产物 `dist/`）。
- 设计系统：Hallmark（editorial 学术编辑风）。所有颜色、字体必须引用 `src/styles/tokens.css` 中的命名 token，禁止内联色值/字体。

## 常用命令

```
npm run dev        # 本地开发（后台方式：astro dev --background，配套 astro dev stop/status/logs）
npm run build      # 构建到 dist/
npm run check      # astro check + 双语校验 + 链接校验（提交前必须通过）
npm run check:i18n # 仅双语配对校验
npm run check:links# 仅链接校验（需先 build）
npm run deploy     # build + wrangler 部署（需 Cloudflare 登录）
```

## 目录结构

```
content/           # 全部站点内容（唯一内容来源）
  members/         #   成员（<slug>.zh.md + <slug>.en.md 成对）
  researchAreas/   #   研究方向
  projects/        #   科研项目（正文=项目介绍与复现指南）
  datasets/        #   数据集
  publications/    #   论文
  news/            #   新闻
  resources/       #   学习资源（课程/环境配置/教程/领域入门/外部链接）
src/
  pages/           # 中文页面；src/pages/en/ 为英文镜像，路由结构必须一一对应
  layouts/ components/ styles/ i18n/ lib/
scripts/           # check-i18n / check-links 校验脚本
templates/         # 七类内容的标准模板（新增内容先复制模板）
docs/              # content-guide.md 内容维护手册
public/images/     # 图片等静态资源（frontmatter 中引用 /images/... 路径）
```

## 内容规则（硬性约束）

1. **双语成对**：`content/<collection>/` 下每个条目必须同时存在 `<slug>.zh.md` 与 `<slug>.en.md`，字段结构一致。`npm run check:i18n` 强制校验，缺一不可。
2. **frontmatter 遵循 schema**：字段定义在 `src/content.config.ts`（zod）。改字段先改 schema，构建会校验。
3. **entry id 约定**：id 为 `<slug>__zh` / `<slug>__en`，通过 `src/lib/content.ts` 的 `getLocaleEntries` / `getPairedEntries` 查询，不要手写 id 解析。
4. **诚实文案**：不虚构数据、论文、奖项、数字。未定内容用 UI 词典的 `common.tbd`（待补充）标注，占位条目 frontmatter 置 `placeholder: true`，页面会显示"示例"标记。学习资源板块的外部链接必须真实存在且免费/公开，不收录盗版资源站。
5. **个人项目红线**：不得把开发者个人项目冒充实验室项目上站。项目条目来源以导师立项清单为准。
6. **图片**：放 `public/images/<类目>/`，frontmatter 写 `/images/...` 字符串路径；不使用外链图片。
7. **中英页面镜像**：新增 `src/pages/` 页面时必须同步创建 `src/pages/en/` 对应页面，路由结构一致。
8. **UI 文案**：界面字符串一律走 `src/i18n/ui.ts` 词典（`t(locale, key)`），双语同时补充，不允许在组件里硬编码界面文字。

## 资源托管规则（硬性约束）

1. **主仓在 GitHub**：本仓库及全部项目资源（代码、内容、文档、数据集等）以 GitHub 为唯一主托管地，对外链接默认指向 GitHub。
2. **数据集 Gitee 备份**：为方便国内用户下载，部分数据集须在 Gitee 建立镜像备份。数据集条目通过 frontmatter 的 `giteeUrl` 字段填写 Gitee 备份地址；无备份的条目该字段可缺省，但不得伪造。
3. **链接真实可访问**：`repoUrl`（项目仓库）、`giteeUrl`（数据集 Gitee 备份）等 frontmatter 链接必须指向真实、公开、可访问的仓库地址，禁止虚构或指向私有/失效链接。发布前人工核对一次。
4. **双链接展示**：数据集页面同时展示 GitHub 主链接与 Gitee 备份链接时，文案须标明"主仓库 / 国内镜像"用途，便于用户按需选择。
5. **同步责任**：Gitee 备份与 GitHub 主仓内容保持一致，数据集更新后及时同步镜像，避免国内外版本不一致。

## 设计规范（Hallmark）

- 语气：editorial（学术编辑风）。排版层级清晰、用色克制、行文式布局。
- 颜色/字体/间距/动效全部引用 `src/styles/tokens.css` 命名 token；新增值先进 token 表。
- 响应式最低支持 320px；禁止横向滚动。
- 动效只用 transform/opacity，尊重 prefers-reduced-motion。

## 提交前自查

1. `npm run check` 全绿；
2. 新内容双语齐全、来源真实；
3. 改动页面在 320px 宽度下无横向滚动、布局不破。
