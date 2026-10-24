# 秋水桥梁 · 公开发布仓库

本仓库同时承担两个职责：

1. **分发安装包**：所有客户端产物都放在 [Releases](https://github.com/QiuShuiYuanMo/qiushui-releases/releases)。
2. **托管下载页**：`main` 分支根目录就是 GitHub Pages 站点 —— <https://qiushuiyuanmo.github.io/qiushui-releases/>

---

## 目录结构

| 文件 | 作用 |
| --- | --- |
| `index.html` | 下载页结构（静态骨架 + 语义化标记） |
| `styles.css` | 设计令牌与全部样式（深/浅两套主题，CSS 变量驱动） |
| `app.js` | 读取 `releases.json` 渲染下载列表与校验表；处理主题切换、系统识别、复制哈希 |
| `releases.json` | **当前版本的资产清单**（文件名、大小、SHA256、下载地址） |

页面没有构建步骤、没有外部依赖（除 Google Fonts），推送到 `main` 即生效。

---

## 发布新版本时怎么更新

1. 在 Releases 里上传新版本的全部资产（各平台安装包、`SHA256SUMS.txt`、签名证书）。
2. 重新生成 `releases.json`：

   ```bash
   # 把 <资产目录> 换成你下载下来的发布资产目录
   node gen-releases-json.mjs <资产目录> 2.4.0 releases.json
   ```

   生成脚本会按文件名归类平台/架构，并计算每个文件的 SHA256，避免手抄出错。

3. 如果新版本改了文案（版本号、日期、FAQ），同步修改 `index.html` 里的静态兜底值。
4. 提交并推送 `main`，Pages 会自动重建。

---

## 设计说明

页面遵循 [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) 的设计系统：

- **风格**：Minimalism / Swiss，深色优先（开发者工具气质），可切换浅色。
- **配色**：深色 `#0F172A` 底 / `#1B2336` 卡片 / `#22C55E` 强调；浅色对应 `#F8FAFC` / `#FFFFFF` / `#059669`。
- **字体**：IBM Plex Sans（正文）+ JetBrains Mono（版本号、哈希、代码）。
- **约束**：图标全部内联 SVG（无 emoji）、触控目标 ≥ 44px、焦点环可见、
  `prefers-reduced-motion` 下关闭动画、375 / 768 / 1024 / 1440 四档响应式。

---

## 说明

**本仓库只分发安装包，不含任何源码。**

- 源码不在本仓库，也不随安装包一起分发。
- Release 页面由 GitHub 自动附加的 “Source code (zip/tar.gz)” 只包含本仓库本身（也就是这个下载页），
  不含客户端或服务端源码。
- 安装包内的 `runtime-config.json` 只包含控制面地址与**公钥**，不含任何密钥或账号凭据。
