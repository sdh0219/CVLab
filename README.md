# CVLab · 袁静课题组网站（Yuan Lab Website）

应急管理大学 计算机科学与工程学院 · 袁静课题组官方网站。
中英双语静态站点，Astro 构建，Cloudflare Pages 部署，Hallmark（editorial 学术编辑风）设计系统。

## 快速开始

```sh
npm install       # 首次安装依赖
npm run dev       # 本地开发 http://localhost:4321
npm run build     # 构建到 dist/
npm run preview   # 本地预览构建产物
npm run check     # 全部校验：类型 + 内容 schema + 双语配对 + 链接
```

## 目录速览

```
content/     全部站点内容（改文件即改网站，中英成对）
templates/   六类内容的标准模板（新增内容从这里复制）
docs/        content-guide.md 内容维护手册
scripts/     校验脚本 + 论文批量生成脚本
src/         页面、组件、布局、设计 token
```

内容怎么加（新闻/项目/成员/论文/数据集）见 **`docs/content-guide.md`**。
AI 协作开发规范见 **`AGENTS.md`**。

## 部署到 Cloudflare Pages

### 方式 A：GitHub 自动构建（推荐，推送即上线）

1. 把本仓库推送到 GitHub；
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git，选择该仓库；
3. 构建配置：Framework preset 选 **Astro**，Build command `npm run build`，输出目录 `dist`；
4. 保存后每次 `git push` 自动构建上线（构建命令里可以改成 `npm run check && npm run build` 以强制校验）。

### 方式 B：wrangler 直接上传

```sh
npx wrangler login          # 首次登录（浏览器授权）
npm run deploy              # = build + npx wrangler pages deploy dist
# 首次会询问 Project name，输入如 yuan-lab，之后直接上传
```

绑定自定义域名：Pages 项目 → Custom domains → 添加域名 → 按提示加 CNAME 记录。

## 技术栈

- [Astro 7](https://docs.astrobuild/) 静态生成 + Content Collections（zod schema 校验）
- Tailwind CSS 4 + Hallmark 设计 token（`src/styles/tokens.css`）
- 内置 i18n：中文 `/`，英文 `/en/`，双语完整性由 `scripts/check-i18n.mjs` 强制
- 字体自托管（@fontsource：思源宋体/黑体、Newsreader、IBM Plex Sans、JetBrains Mono），不依赖 Google Fonts CDN，国内可正常加载

## 内容维护红线

- 每条内容必须中英成对（`<slug>.zh.md` + `<slug>.en.md`），缺一构建不过
- 不虚构数据；未定内容用"待补充"标记，占位条目置 `placeholder: true`
- 图片放 `public/images/`，不外链
- 详见 `AGENTS.md` 与 `docs/content-guide.md`
