# 网站部署指南 - 从本地到上线

## 🚀 快速概览

您的React静态网站可以**完全免费**部署到以下任一平台：
- ✅ **Vercel**（推荐）- 最简单，自动部署
- ✅ **Netlify** - 功能丰富，也很简单
- ✅ **GitHub Pages** - 完全免费，需要GitHub账号
- ✅ **Cloudflare Pages** - 超快CDN，免费

**部署时间：10-15分钟** ⏱️

---

## 方案1：Vercel（最推荐）⭐⭐⭐⭐⭐

### 为什么选择Vercel？
- ✅ **专为React/Vite优化**
- ✅ **自动HTTPS**
- ✅ **全球CDN**
- ✅ **自动Git部署**（推送代码自动更新）
- ✅ **免费自定义域名**
- ✅ **零配置**

### 步骤1：准备代码

```bash
# 1. 确保代码可以构建
npm run build

# 2. 测试生产版本
npm run preview
# 访问 http://localhost:4173 确认一切正常
```

### 步骤2：创建GitHub仓库

```bash
# 在项目目录下（如果还没有git）
git init
git add .
git commit -m "Initial commit - Calculator website ready for deployment"

# 创建GitHub仓库（在GitHub.com上）
# 然后关联远程仓库
git remote add origin https://github.com/your-username/calculator-website.git
git branch -M main
git push -u origin main
```

**重要：** 确保 `.gitignore` 包含以下内容（已有✅）：
```
node_modules
dist
.env
.env.local
```

### 步骤3：部署到Vercel

**方式A：网页操作（推荐新手）**

1. 访问 https://vercel.com
2. 点击 "Sign Up" 用GitHub账号登录
3. 点击 "New Project"
4. 选择您的 `calculator-website` 仓库
5. 保持默认配置（Vercel自动识别Vite）：
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. 点击 **"Deploy"**

⏱️ **2-3分钟后，您的网站就上线了！**

您会得到一个免费域名：
```
https://calculator-website-xxx.vercel.app
```

**方式B：命令行部署（更快）**

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 按提示操作：
# - Set up and deploy? Yes
# - Which scope? 选择您的账号
# - Link to existing project? No
# - Project name? calculator-website
# - In which directory? ./
# - 其他保持默认

# 第一次部署后，以后只需：
vercel --prod
```

### 步骤4：配置自定义域名（可选）

**免费域名推荐：**
- Freenom（.tk, .ml 等）
- 或购买便宜域名：Namecheap, GoDaddy（~$12/年）

**在Vercel添加域名：**
1. 进入项目 Settings → Domains
2. 输入您的域名（如 `mycalculators.com`）
3. 按照提示在域名注册商添加DNS记录：
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. 等待DNS传播（5分钟-24小时）
5. Vercel自动配置HTTPS ✅

---

## 方案2：Netlify

### 步骤1：准备代码（同Vercel）

### 步骤2：部署

**方式A：拖放部署（最简单）**

1. 访问 https://netlify.com
2. 注册账号
3. 构建网站：
   ```bash
   npm run build
   ```
4. 将 `dist` 文件夹**直接拖到Netlify页面**
5. 完成！✅

**方式B：Git集成**

1. 连接GitHub账号
2. 选择仓库
3. 配置：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

**自定义域名：**
- Site settings → Domain management → Add custom domain

---

## 方案3：GitHub Pages（完全免费）

### 步骤1：修改 `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/calculator-website/',  // 替换为您的仓库名
})
```

### 步骤2：安装gh-pages

```bash
npm install --save-dev gh-pages
```

### 步骤3：修改 `package.json`

添加部署脚本：
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 步骤4：部署

```bash
# 构建并部署
npm run deploy
```

网站将部署到：
```
https://your-username.github.io/calculator-website/
```

**使用自定义域名：**
1. 在仓库根目录创建 `public/CNAME` 文件
2. 内容：`yourdomain.com`
3. 在域名注册商添加DNS记录：
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   
   Type: CNAME
   Name: www
   Value: your-username.github.io
   ```

---

## 方案4：Cloudflare Pages

### 优势：
- 超快速（Cloudflare全球CDN）
- 免费无限流量
- 自动HTTPS

### 步骤：

1. 访问 https://pages.cloudflare.com
2. 连接GitHub
3. 选择仓库
4. 配置：
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output: `dist`
5. Deploy

---

## 🎯 推荐方案对比

| 平台 | 难度 | 速度 | 自定义域名 | 自动部署 | 推荐指数 |
|-----|-----|-----|-----------|---------|---------|
| **Vercel** | ⭐ | 很快 | 免费 | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⭐ | 很快 | 免费 | ✅ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ⭐⭐ | 快 | 免费 | ✅ | ⭐⭐⭐⭐ |
| **Cloudflare Pages** | ⭐⭐ | 最快 | 免费 | ✅ | ⭐⭐⭐⭐ |

**总结：** 
- 新手推荐 **Vercel**（最简单）
- 想要最快速度选 **Cloudflare Pages**
- 已有GitHub账号选 **GitHub Pages**（零成本）

---

## 📋 部署前检查清单

在部署前，确保完成以下检查：

### 1. 代码检查
```bash
# 运行Build确保没有错误
npm run build

# 测试生产版本
npm run preview
```

### 2. 环境变量（如果有）
创建 `.env.production` 文件：
```env
VITE_API_URL=https://api.yourdomain.com
```

在Vercel/Netlify添加环境变量：
- Settings → Environment Variables

### 3. SEO优化

**修改 `index.html`：**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>Free Online Calculators - Salary, Tax, Mortgage & More</title>
  <meta name="description" content="Free online calculators for salary tax, mortgage payments, investments, BMI, and more. Accurate, fast, and easy to use.">
  <meta name="keywords" content="calculator, salary calculator, tax calculator, mortgage calculator, free tools">
  
  <!-- Open Graph (社交媒体分享) -->
  <meta property="og:title" content="Free Online Calculators">
  <meta property="og:description" content="Smart calculators for your financial future">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourcalculators.com">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/vite.svg">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### 4. 创建 `robots.txt`

在 `public/robots.txt`：
```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### 5. 创建 `sitemap.xml`（可选）

在 `public/sitemap.xml`：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/tools/us-salary-tax-calculator</loc>
    <priority>0.9</priority>
  </url>
  <!-- 为每个工具添加URL -->
</urlset>
```

---

## 🔧 部署后配置

### 1. Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加网站
3. 验证所有权（通过HTML文件或DNS）
4. 提交sitemap.xml

### 2. Google Analytics

1. 访问 https://analytics.google.com
2. 创建属性
3. 获取跟踪代码
4. 添加到 `index.html` 的 `<head>` 中：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Google AdSense

1. 申请 AdSense账号
2. 添加验证代码到 `<head>`
3. 等待批准（1-3天）
4. 修改 `AdSlot.tsx` 接入广告代码（参考广告指南）

---

## 🚨 常见问题

### Q: 部署后页面刷新404？
**A:** React Router需要配置。

**Vercel：** 创建 `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Netlify：** 创建 `public/_redirects`
```
/*    /index.html   200
```

**GitHub Pages：** 需要使用HashRouter或404.html技巧

### Q: 网站加载慢？
**A:** 
1. 检查图片大小（压缩）
2. 启用代码分割
3. 使用CDN（Vercel/Netlify自动）

### Q: 如何更新网站？
**A:** 
```bash
# 修改代码后
git add .
git commit -m "Update calculators"
git push

# Vercel/Netlify会自动重新部署！
```

---

## 📊 监控和分析

### 免费工具：
1. **Google Analytics** - 流量分析
2. **Google Search Console** - SEO表现
3. **Vercel Analytics**（Vercel平台） - 性能监控
4. **Hotjar**（可选）- 用户行为热图

---

## 🎉 完成！

恭喜！您的网站现在已经上线了！

**下一步：**
1. ✅ 分享给朋友测试
2. ✅ 提交到Google Search Console
3. ✅ 申请AdSense
4. ✅ 开始SEO优化
5. ✅ 添加更多计算器

**您的网站地址：**
```
https://your-project.vercel.app
或
https://yourdomain.com
```

🚀 **开始赚钱吧！**
