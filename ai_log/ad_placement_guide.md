# 广告位置指南 - 计算器网站（已更新）

## 概览

本网站现有 **11个广告位**，分布在不同页面以最大化广告收入。所有广告位使用 `AdSlot` 组件实现。

---

## 各页面广告位详情

### 1️⃣ 主页 (Home Page) ⭐ 新增4个广告位
**路径：** `/`  
**文件：** `src/pages/Home.tsx`

#### 广告位 #1: Hero下方横幅
```tsx
<AdSlot id="home-top-banner" className="my-8" />
```
- **位置：** Hero区域正下方
- **推荐尺寸：** 728x90 或 970x90（桌面）/ 320x100（手机）
- **优势：** 用户进入网站第一眼看到

#### 广告位 #2: 分类网格后
```tsx
<AdSlot id="home-after-categories" className="my-8" />
```
- **位置：** 14个分类图标网格下方
- **推荐尺寸：** 728x90 或 300x250
- **优势：** 用户浏览分类后的黄金位置

#### 广告位 #3: 热门工具后
```tsx
<AdSlot id="home-after-popular" className="my-8" />
```
- **位置：** 热门工具列表下方
- **推荐尺寸：** 728x90 或 336x280
- **优势：** 参与度高的区域后

#### 广告位 #4: 页面底部
```tsx
<AdSlot id="home-bottom-banner" className="my-8 mb-12" />
```
- **位置：** SEO文本块下方，页面底部
- **推荐尺寸：** 728x90
- **优势：** 最后印象，适合粘性广告

---

### 2️⃣ 分类页面 (Category Page)
**路径：** `/category/:id`  
**文件：** `src/pages/Category.tsx`

#### 广告位 #1: 顶部横幅
```tsx
<AdSlot id="category-top-banner" className="mb-8" />
```
- **位置：** 页面顶部，分类标题下方
- **推荐尺寸：** 728x90 或 970x90

#### 广告位 #2: 工具列表间插广告
```tsx
<AdSlot id="category-list-ad" className="my-8" label="Sponsored" />
```
- **位置：** 工具列表第3个项目后
- **推荐尺寸：** 300x250 或 336x280
- **代码位置：** `src/components/category/ToolList.tsx` 第62行

---

### 3️⃣ 计算器详情页 (Calculator Detail Page) ⭐ 收入最高
**路径：** `/tools/:id`  
**文件：** `src/pages/CalculatorDetail.tsx`

#### 广告位 #1: 顶部横幅
```tsx
<AdSlot id="calc-top-banner" className="mb-8" />
```
- **位置：** 页面顶部，面包屑导航下方
- **推荐尺寸：** 728x90 或 970x90

#### 广告位 #2: 内容区广告 1
```tsx
<AdSlot id="in-content-1" />
```
- **位置：** "What is this?" 内容区域后
- **推荐尺寸：** 336x280 或 300x250

#### 广告位 #3: 内容区广告 2
```tsx
<AdSlot id="in-content-2" />
```
- **位置：** "How to use" 内容区域后
- **推荐尺寸：** 336x280 或 300x250

#### 广告位 #4: 侧边栏广告（桌面端）
```tsx
<AdSlot id="sidebar-ad" className="h-[600px]" label="Advertisement" />
```
- **位置：** 右侧边栏
- **推荐尺寸：** 300x600（半页广告）或 160x600

#### 广告位 #5: 底部建议位
**当前状态：** 未设置  
**建议添加：** FAQ区域下方

---

## 广告位总览

| 页面类型 | 广告位数量 | 广告位ID | 收入潜力 |
|---------|----------|---------|---------|
| 主页 | 4 ⭐ | home-top-banner<br>home-after-categories<br>home-after-popular<br>home-bottom-banner | ⭐⭐⭐ 高 |
| 分类页 | 2 | category-top-banner<br>category-list-ad | ⭐⭐ 中 |
| 计算器页 | 5 | calc-top-banner<br>in-content-1<br>in-content-2<br>sidebar-ad<br>(+ 建议1个) | ⭐⭐⭐⭐ 最高 |

**总计：** 11个活跃广告位

---

## 如何接入 Google AdSense

### 步骤1: 申请 AdSense
1. 访问 https://www.google.com/adsense
2. 注册并提交网站审核
3. 等待批准（通常1-3天）

### 步骤2: 修改 `AdSlot.tsx`
替换 `src/components/common/AdSlot.tsx`：

```tsx
import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

interface AdSlotProps {
    id: string;
    className?: string;
    label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ id, className, label = 'Advertisement' }) => {
    useEffect(() => {
        try {
            // Push AdSense ad
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={cn("w-full my-6 flex flex-col items-center justify-center", className)}>
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{label}</div>
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // 替换为您的 AdSense ID
                 data-ad-slot="YYYYYYYYYY"                 // 可选：指定广告单元ID
                 data-ad-format="auto"
                 data-full-width-responsive="true">
            </ins>
        </div>
    );
};
```

### 步骤3: 在 `index.html` 添加脚本
在 `public/index.html` 的 `<head>` 中添加：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossorigin="anonymous"></script>
```

### 步骤4: 测试
```bash
npm run build
npm run preview
```
访问 http://localhost:4173 查看广告显示

---

## 收入优化建议

### 高价值广告位排名
1. ⭐⭐⭐⭐ **计算器页侧边栏** - 用户停留时间长，粘性广告
2. ⭐⭐⭐⭐ **计算器页内容区** - 阅读时高可见度
3. ⭐⭐⭐ **主页Hero下方** - 第一印象
4. ⭐⭐⭐ **主页分类后** - 参与度高
5. ⭐⭐ **分类页顶部** - 浏览意图强

### 广告密度最佳实践
- ✅ 主页：4个广告（每个主要内容块后1个）
- ✅ 分类页：2个广告（适中密度）
- ✅ 计算器页：5个广告（最高密度，但不过分）

### A/B 测试建议
1. 测试响应式广告 vs 固定尺寸
2. 测试不同广告位置的点击率
3. 比较横幅广告 vs 矩形广告的收入

---

## 广告尺寸速查表

| 设备 | 推荐广告尺寸 |
|------|-------------|
| 桌面 - 横幅 | 728x90, 970x90 |
| 桌面 - 矩形 | 300x250, 336x280 |
| 桌面 - 侧边栏 | 300x600, 160x600 |
| 手机 - 横幅 | 320x100, 320x50 |
| 手机 - 矩形 | 300x250 |
| 响应式 | auto（推荐）|

---

## 下一步

1. ✅ 主页广告位已添加（4个）
2. ⏳ 申请 Google AdSense
3. ⏳ 修改 AdSlot.tsx 接入广告代码
4. ⏳ 测试并监控广告表现
5. ⏳ 根据数据优化广告位置

**现在您的网站有11个广告位，准备好开始赚钱了！** 🎉
