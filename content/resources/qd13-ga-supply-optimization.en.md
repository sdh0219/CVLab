---
title: "Genetic Algorithm-Based Relief Supply Allocation Optimization"
titleEn: "Genetic Algorithm-Based Relief Supply Allocation Optimization"
summary: "Simulates the 2021 Henan extreme rainstorm flood relief scenario, using a genetic algorithm for multi-objective optimization of relief supply allocation between warehouses and disaster points, with a Vue3+ECharts interactive dashboard."
category: practice
level: intermediate
tags:
  - genetic algorithm
  - multi-objective optimization
  - Vue3
order: 320
---

## Download Resources

| Resource | Platform | Link | Notes |
|----------|----------|------|-------|
| All resources | GitHub | [CVLab-projects](https://github.com/sdh0219/CVLab-projects/tree/main/QD13组_基于遗传算法的救援物资分配优化) | Source + datasets + templates, ready to use |

> **How to get**: Clone `git clone https://github.com/sdh0219/CVLab-projects.git`, enter `QD13组_基于遗传算法的救援物资分配优化` directory.

> **This guide is written for people with absolutely no programming experience.** Just follow the steps—you don't need to understand the code to reproduce the results.
>
> If you just want to see results as quickly as possible, skip directly to **Chapter 3: One-Click Run** (just double-click one file).

---

## Overview

This project simulates relief supply allocation during the July 2021 Henan extreme rainstorm flood disaster. Facing multiple warehouses, multiple disaster points, and multiple supply types, it uses a **genetic algorithm** to compute an "optimal allocation plan"—telling each warehouse how much of each supply to send to which disaster point.

The optimization objectives balance five aspects: supply fulfillment rate, transportation cost, allocation fairness, disaster urgency, and time efficiency. The project also includes a web visualization dashboard for intuitively viewing allocation results, radar charts, and convergence curves.

**What you need:**

- A Windows computer (Mac/Linux also works, but the steps below use Windows as an example)
- Internet access (needed during dependency installation)
- **Required**: Python 3.10+
- **Optional**: Node.js 18+ (only needed if you want the interactive web visualization dashboard; without it, you can still see chart results in "backend-only" mode)
- Estimated time: **5 minutes** (if Python is already installed) or **15 minutes** (installing Python from scratch)

> If this feels overwhelming, just remember: **Install Python first, then double-click `一键运行.bat`, and let the script handle the rest.**

---

## Install Python

### 1.1 Download Python

1. Open your browser and visit: https://www.python.org/downloads/
2. Click the yellow **"Download Python 3.x.x"** button on the page
3. Wait for the download to complete (file is about 25 MB)

### 1.2 Install Python (Critical Step!)

1. Find the downloaded installer (usually in the "Downloads" folder), **double-click to run it**
2. When the installer opens, you'll see two large buttons and a line of small text at the bottom
3. **First check the "Add Python to PATH" box at the bottom** ← This step is critical! Without it, you'll get errors later
4. Then click **"Install Now"**
5. Wait for the progress bar to finish (about 30 seconds), then click **"Close"**

### 1.3 Verify Installation

1. Press `Win + R` (hold the Windows key and R key together) to open the Run dialog
2. Type `cmd` and press Enter—a black window will appear
3. Type the following command in the black window and press Enter:

   ```
   python --version
   ```

4. If it displays `Python 3.10.x` (or a higher version number), the installation is successful ✓
5. If it says "is not recognized as an internal or external command," the "Add Python to PATH" checkbox in step 3 wasn't checked—please reinstall

### 1.4 (Optional) Install Node.js

Only needed if you want the **Web visualization dashboard**. Skip this step if you only want backend chart results.

1. Visit: https://nodejs.org/
2. Download the **LTS (Long Term Support) version** (the button will say "LTS")
3. Double-click the installer, click "Next" through the prompts—no special settings needed
4. After installation, open a new cmd window and verify:

   ```
   node --version
   ```

   If it shows `v18.x.x` or higher, installation is successful ✓

---

## Get Project Files

Please obtain the project files using the download links in the Download Resources section at the top of this page.

---

## One-Click Run

### 3.1 Run

1. Navigate to the project's **`源码`** folder
2. Find the **`一键运行.bat`** file
3. **Double-click it**

### 3.2 What the Script Does Automatically

The black window will automatically perform the following operations (just wait):

| Step | Action | Est. Time |
|---|---|---|
| 1/4 | Create Python virtual environment | ~30 sec (first time only) |
| 2/4 | Install Python dependencies (numpy/pandas/matplotlib/flask, etc.) | ~1-2 min (first time only) |
| 3/4 | Detect Node.js | Instant |
| 4/4 | Run backend algorithm / start full system | See below |

**Step 4 automatically chooses one of two paths:**

- **If you have Node.js installed** → Starts the full system (backend + web dashboard), and the script will prompt you to visit `http://127.0.0.1:5180`
- **If you don't have Node.js** → Automatically falls back to "backend-only" mode, runs the genetic algorithm to generate chart results in `源码\output\`, and prompts you on how to install Node.js to unlock the full dashboard

### 3.3 What You'll See When It Succeeds

**Mode A (Node.js installed, full system):**

The window will stop at a prompt like this:

```
→ 正在启动可视化前端...
✓ 访问地址: http://127.0.0.1:5180
⚠ 按 Ctrl+C 停止服务
```

At this point, **do not close the black window**—open your browser and visit `http://127.0.0.1:5180` to see the visualization dashboard. After viewing, return to the black window and press `Ctrl+C` to stop the service.

**Mode B (Node.js not installed, backend only):**

The window will finally display:

```
============================================================
  后端运行完成！

  结果文件保存在：源码\output\
    satisfaction_comparison.png  各受灾点满足率对比图
    fitness_history.png          遗传算法收敛曲线
    allocation_heatmap.png       仓库-受灾点分配热力图
  ...
============================================================
```

Press any key to close the window, then go to **Chapter 5** to view results.

---

## Step-by-Step Run

If you want to operate manually, follow these steps. The commands below assume your project is on `D:\`—replace the path with your actual path.

### 4.1 Open Command Prompt

1. Press `Win + R`, type `cmd`, press Enter
2. Use the `cd` command to navigate to the project's source directory (replace the path with your actual path):

   ```
   cd /d D:\你的路径\13组_基于遗传算法的救援物资分配优化\源码
   ```

### 4.2 Create Virtual Environment and Install Dependencies

```
python -m venv .venv
".venv\Scripts\python.exe" -m pip install -r requirements.txt
```

> **What is a virtual environment?** It's an isolated Python environment folder—dependencies installed here won't affect other Python projects on your computer.

During installation, numpy, pandas, matplotlib, seaborn, flask, and other packages will be downloaded, taking about 1-2 minutes. Seeing `Successfully installed ...` means success.

### 4.3 Run Backend Algorithm (Generate Chart Results)

```
".venv\Scripts\python.exe" "code\main.py"
```

Runs in about 10-20 seconds, expected output (numbers may vary slightly due to randomness):

```
============================================================
1. 加载数据...
  - 受灾点数量: 6
  - 仓库数量: 3
  - 物资类型: 3
  - 总受灾人口: 1,234,567

2. 初始化模型...

3. 生成初始方案...

初始方案指标:
  - 平均满足率: 65.32%
  - 公平性指数: 0.7123
  - 紧急程度得分: 0.5432
  - 时间效率: 0.6789
  - 运输成本: 234,567

4. 运行遗传算法优化...
开始优化: 种群大小=100, 迭代次数=50, 变异率=0.1
优化完成! 最终适应度: 0.8123

优化后方案指标:
  - 平均满足率: 92.15%
  - 公平性指数: 0.9012
  - 紧急程度得分: 0.7834
  - 时间效率: 0.7456
  - 运输成本: 198,765

5. 优化效果对比:
  - 满足率提升: 26.83%
  - 公平性提升: 26.51%
  - 运输成本变化: -15.28%

6. 生成可视化图表...
  - 满足率对比图: output/satisfaction_comparison.png
  - 适应度变化曲线: output/fitness_history.png
  - 分配热力图: output/allocation_heatmap.png

  - 结果数据已保存到 output/ 目录

================================================================================
物资分配优化完成！
================================================================================
```

### 4.4 (Optional) Start Web Visualization Dashboard

> This step requires Node.js 18+. If not installed, go back to section 1.4 to install it first.

If you've already run the backend with 4.3 and want to start the interactive dashboard, the easiest way is to use the project's built-in launcher (it automatically detects and reuses cached results, no recomputation needed):

```
".venv\Scripts\python.exe" start.py
```

On first run, it will automatically run `npm install` in the `frontend\` directory (about 1-3 minutes). After installation, it starts the Vite dev server, and you'll see this prompt when successful:

```
  ✓ 访问地址: http://127.0.0.1:5180
  ⚠ 按 Ctrl+C 停止服务
```

Open your browser and visit **http://127.0.0.1:5180** to see the visualization dashboard.

If you prefer not to use the launcher, you can also do it manually in two steps:

```
REM 1) 导出优化结果数据供前端使用（生成 output\results.json 并同步到前端）
".venv\Scripts\python.exe" "code\export_for_frontend.py"

REM 2) 启动前端
cd frontend
npm install
npm run dev
```

> `start.py` also supports two parameters:
> - `python start.py --skip-export`: Skip data export, directly start frontend (faster, requires `output\results.json` to already exist)
> - `python start.py --export-only`: Only export data, don't start frontend

---

## View Results

### 5.1 Where Are the Result Files

Regardless of run mode, backend results are saved in the **`源码\output\`** directory:

```
源码/output/
├── satisfaction_comparison.png   ← 各受灾点满足率对比图（初始 vs 优化）
├── fitness_history.png           ← 遗传算法收敛曲线（适应度随代数变化）
├── allocation_heatmap.png        ← 仓库-受灾点分配热力图
├── results.json                  ← 完整结果数据（供前端使用，1.7 MB）
├── initial_solution.npy          ← 初始方案数组
├── optimized_solution.npy        ← 优化后方案数组
└── fitness_history.npy           ← 适应度历史数据
```

### 5.2 How to Open

- **.png files**: Double-click to open in an image viewer and see the charts directly
- **.json / .npy files**: These are data files for programs to read; ordinary users don't need to open them. If you want to see the content, open .json with Notepad (.npy is binary; opening with Notepad shows garbled text, which is normal)

### 5.3 Web Visualization Dashboard (If Full System Is Running)

Visit **http://127.0.0.1:5180** in your browser to see:

- Supply allocation plan (warehouse → disaster point supply flow)
- Five-dimensional metric radar chart (fulfillment rate/cost/fairness/urgency/time)
- Genetic algorithm convergence curve
- Warehouse-disaster point allocation relationship diagram

### 5.4 Expected Results (Key Findings)

| Metric | Initial (Manual) Plan | Optimized Plan | Change |
|---|---|---|---|
| Average fulfillment rate | ~65% | ~92% | **Significant increase** |
| Fairness index | ~0.71 | ~0.90 | **Significant increase** |
| Transportation cost | Higher | ~15% reduction | **Decreased** |
| Urgency score | Lower | Increased | **Improved** |

> Key finding: The genetic algorithm-optimized plan is significantly better than the manual initial allocation in fulfillment rate, fairness, and urgent-priority assurance, with reduced transportation cost. Specific numbers may vary slightly between runs due to algorithm randomness, but the improvement trend remains consistent.

---

## Troubleshooting

### Error Reference Table

| Error Message | Cause | Solution |
|---|---|---|
| `'python' is not recognized as an internal or external command` | Python not installed or not in PATH | Reinstall Python, make sure to check "Add Python to PATH" (see section 1.2) |
| `ModuleNotFoundError: No module named 'numpy'` | Python dependencies not installed | Double-click `一键运行.bat` to rerun, or manually run `pip install -r requirements.txt` |
| `ModuleNotFoundError: No module named 'flask'` | Flask not installed | Same as above, run `pip install -r requirements.txt` |
| `'npm' is not recognized as an internal or external command` | Node.js not installed (only affects web dashboard) | Install Node.js 18+ (see section 1.4); or continue using "backend-only" mode for chart results |
| `FileNotFoundError: ... henan_disaster_processed_data.py` | Data path incorrect | Ensure project directory is complete, `数据集\` or `源码\code\data\` not moved or renamed |
| `Port 5180 is already in use` | Frontend port occupied | Close the program using port 5180, or modify the port in `源码\frontend\vite.config.js` |
| `Port 5181 is already in use` | Backend API port occupied | Close the program using port 5181, or set the `API_PORT` environment variable before running |
| Frontend opens blank / no data | results.json not generated | First run `python code\export_for_frontend.py` to generate data, then start frontend |
| `SyntaxError: (unicode error)` | Chinese path encoding issue | Ensure terminal uses UTF-8: run `chcp 65001` in cmd; avoid deep nesting when paths contain Chinese |
| Window closes immediately | Runtime error | Manually navigate to `源码` directory in cmd, type `一键运行.bat` to see the full error |
| `pip install` stuck or timeout | Network issue | Use domestic mirror: `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple` |

### FAQ

**Q: Can I avoid using the command line?**
A: Yes. Just double-click `一键运行.bat`—no need to manually type any commands.

**Q: Do I need to reinstall on the second run?**
A: No. The virtual environment (`.venv`) and dependencies are installed only once; subsequent runs automatically skip to the run step. Frontend `node_modules` also only needs to be installed once.

**Q: Can I reproduce the project without Node.js?**
A: Yes. The one-click script automatically uses "backend-only" mode, running the genetic algorithm to generate 3 PNG chart results in `源码\output\` that you can view by double-clicking. The web interactive dashboard is an enhanced experience and doesn't affect core algorithm reproduction.

**Q: My results differ from the numbers in the table above?**
A: Normal. The genetic algorithm involves randomness (initial population, crossover, mutation), so results vary slightly between runs. The core conclusion (optimized plan outperforms manual plan) won't change. To make results reproducible, add `np.random.seed(42)` at the beginning of `code\main.py`.

**Q: How do I switch to a different dataset?**
A: Use the universal main program. Edit `源码\code\config.json`, change `data.disaster_points_file` to the target dataset path (relative to `code/` directory), then run:
```
".venv\Scripts\python.exe" "code\main_universal.py"
```
Available datasets are in `数据集\` under `dataset_01_large_scale`, `dataset_02_complex_scenario`; configuration templates are in `数据集\config_examples\`.

**Q: How do I adjust algorithm parameters (population size, iterations, etc.)?**
A: Edit the `algorithm` section of `源码\code\config.json`. For example, changing `generations` from 50 to 100 will make the algorithm iterate longer with better results but slower.

**Q: Can I close the black window?**
A: In "backend-only" mode, you can close it after results are displayed. In "full system" mode (web dashboard running), **do not close the black window**—closing it stops the service. View the dashboard first, then return to the window and press `Ctrl+C` to gracefully stop.

**Q: How do I stop the web service?**
A: Press `Ctrl+C` in the black window running `start.py`.

---

## Project Structure

```
13组_基于遗传算法的救援物资分配优化/
├── 源码/
│   ├── 一键运行.bat              ← 双击运行（零基础首选）
│   ├── start.bat / start.py / start.sh   ← 跨平台一键启动（后端+前端）
│   ├── requirements.txt           ← Python 依赖清单
│   ├── README.md / 源码说明文档.md  ← 项目说明
│   ├── code/                      ← Python 后端核心
│   │   ├── main.py                ← 专用版主程序（河南洪灾，快速演示，生成图表）
│   │   ├── main_universal.py      ← 通用版主程序（可配置，推荐入口）
│   │   ├── ga_enhanced.py         ← 遗传算法增强算子（选择/交叉/变异/局部搜索）
│   │   ├── data_loader.py         ← 通用数据加载与校验
│   │   ├── export_for_frontend.py ← 导出 JSON 供 Vue 前端
│   │   ├── api_server.py          ← Flask API 服务（端口 5181）
│   │   ├── config.json            ← 通用版运行配置
│   │   ├── config_README.md       ← 配置字段说明
│   │   └── data/                 ← 河南洪灾基准数据
│   ├── frontend/                  ← Vue 3 + ECharts 可视化前端
│   │   ├── package.json           ← 前端依赖（vue / echarts / vite 6）
│   │   ├── vite.config.js          ← Vite 配置（端口 5180）
│   │   └── src/                   ← 前端源码
│   └── output/                    ← 运行结果（图表 + results.json 缓存）
├── 数据集/
│   ├── processed_data/            ← 河南洪灾基准数据（6 受灾点 × 3 仓库 × 3 物资）
│   ├── dataset_01_large_scale/    ← 大规模洪涝模拟（80 × 12 × 3）
│   ├── dataset_02_complex_scenario/ ← 复杂场景模拟（15 × 6 × 5）
│   ├── raw_data/                  ← 原始数据
│   ├── config_examples/           ← 切换数据集的 config 模板
│   ├── tools/                     ← 模拟数据生成脚本
│   └── 数据说明文档.md           ← 数据集唯一说明文档
├── 文档模板/                       ← 技术方案、PPT、个人报告
└── 复现指南.md                    ← 本文件
```

### Core Algorithm & Ports

- **Genetic algorithm**: Population size 100, 50 iterations, mutation rate 0.1, crossover rate 0.8, elitism 10%
- **Five objective weights**: Fulfillment rate 0.35 + Transportation cost 0.15 + Fairness 0.20 + Urgency 0.20 + Time efficiency 0.10 = 1.0
- **Backend API port**: 5181 (Flask, modifiable via `API_PORT` environment variable)
- **Frontend dev port**: 5180 (Vite)

### Three Run Modes Summary

| Mode | Command | For Whom |
|---|---|---|
| One-click (full) | Double-click `一键运行.bat` (with Node.js) | Everyone, includes web dashboard |
| One-click (backend only) | Double-click `一键运行.bat` (without Node.js) | Everyone, chart results only |
| Dedicated main program | `python code\main.py` | Quick demo of Henan case |
| Universal main program | `python code\main_universal.py` | Switch datasets / tune parameters |

> If you encounter issues during reproduction, refer to `源码\README.md`, `源码\源码说明文档.md`, and `数据集\数据说明文档.md` for troubleshooting, or contact the project author.
