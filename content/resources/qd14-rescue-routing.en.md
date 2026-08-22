---
title: "Hazard-Aware Rescue Route Planning"
titleEn: "Hazard-Aware Rescue Route Planning"
summary: "Uses real road network data and historical disaster records with Dijkstra's algorithm to compute shortest paths and safe routes avoiding landslides, floods, and congestion, featuring the 1679 Sanhe-Pinggu earthquake and 2012 Beijing July 21 rainstorm scenarios."
category: practice
level: beginner
tags:
  - route planning
  - Dijkstra
  - GIS
order: 330
---

## Download Resources

| Resource | Platform | Link | Notes |
|----------|----------|------|-------|
| Source code + templates | GitHub | [CVLab-projects](https://github.com/sdh0219/CVLab-projects/tree/main/QD14组_避开危险路段的救援路径规划) | Full source, small datasets, templates |
| Source (China mirror) | Gitee | [cvlab_yuan](https://gitee.com/susu1843/cvlab_yuan) | Clone from Gitee for faster access in China |
| Road network data | GitHub Release | [QD14_edges.csv](https://github.com/sdh0219/CVLab-projects/releases/download/data-v1/QD14_edges.csv) | osm_sichuan_earthquake/edges.csv (105MB) |

> **How to get**: Clone `git clone https://github.com/sdh0219/CVLab-projects.git` (or `git clone https://gitee.com/susu1843/cvlab_yuan.git` in China), enter `QD14组_避开危险路段的救援路径规划` directory. The Sichuan earthquake edges.csv (105MB) must be downloaded from GitHub Release and placed in `数据集/osm_sichuan_earthquake/`.

> **This guide is written for people with absolutely no programming experience.** Just follow the steps—you don't need to understand the code to reproduce the results.
>
> If you just want to see results as quickly as possible, skip directly to **Chapter 3: One-Click Run** (just double-click one file).

---

## Overview

This project simulates rescue route planning in disaster scenarios. Using real map road data and historical disaster records, it computes two types of routes:

- **Standard shortest path**: Only considers the shortest distance, but may pass through hazardous road segments
- **Safe route**: Avoids hazardous segments such as landslides and flooding—longer in distance but safer

The project includes two real historical disaster scenarios:
- **Earthquake scenario**: 1679 Sanhe-Pinggu earthquake
- **Flood scenario**: 2012 Beijing July 21 extreme rainstorm

**What you need:**

- A Windows computer (Mac/Linux also works, but the steps below use Windows as an example)
- Internet access (needed during dependency installation)
- Estimated time: **5 minutes** (if Python is already installed) or **15 minutes** (starting from scratch)

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
5. If it says "is not recognized as an internal or external command," the "Add to PATH" checkbox in step 3 wasn't checked—please reinstall

---

## Get Project Files

Please obtain the project files using the download links in the Download Resources section at the top of this page.

---

## One-Click Run

### 3.1 Run

1. Navigate to the project's **`源码`** folder
2. Find the **`一键运行.bat`** file
3. **Double-click it**

### 3.2 Wait for Automatic Completion

The black window will automatically perform the following operations:

| Step | Action | Est. Time |
|---|---|---|
| 1/4 | Create Python virtual environment | ~30 sec (first time only) |
| 2/4 | Install dependencies (Pillow) | ~10 sec (first time only) |
| 3/4 | Run earthquake scenario | ~5 sec |
| 4/4 | Run flood scenario | ~5 sec |

### 3.3 What You'll See When It Succeeds

The window will finally display:

```
============================================================
  运行完成！

  结果文件保存在：
  数据集\结果输出\amap_earthquake\  （地震场景）
  数据集\结果输出\amap_flood\       （洪水场景）
  ...
============================================================
```

Press any key to close the window, then go to **Chapter 5** to view results.

---

## Step-by-Step Run

If you want to operate manually, follow these steps.

### 4.1 Open Command Prompt

1. Press `Win + R`, type `cmd`, press Enter
2. Use the `cd` command to navigate to the project's source directory (replace the path with your actual path):

   ```
   cd /d D:\你的路径\14组_避开危险路段的救援路径规划\源码
   ```

### 4.2 Create Virtual Environment and Install Dependencies

```
python -m venv .venv
".venv\Scripts\python.exe" -m pip install "Pillow>=10.0"
```

> **What is a virtual environment?** It's an isolated Python environment folder—dependencies installed here won't affect other Python projects on your computer.

### 4.3 Run Earthquake Scenario

```
".venv\Scripts\python.exe" "src\rescue_planner.py" --data-dir "..\数据集\amap_earthquake" --output-dir "..\数据集\结果输出\amap_earthquake"
```

### 4.4 Run Flood Scenario

```
".venv\Scripts\python.exe" "src\rescue_planner.py" --data-dir "..\数据集\amap_flood" --output-dir "..\数据集\结果输出\amap_flood"
```

---

## View Results

### 5.1 Where Are the Result Files

After completion, results are saved in the **`数据集\结果输出\`** directory:

```
数据集/结果输出/
├── amap_earthquake/          ← 地震场景结果
│   ├── path_comparison.csv   ← 路径对比数据（距离、危险类型）
│   ├── route_map.png         ← 路线图
│   └── route_map_abstract.png ← 抽象路网图
└── amap_flood/               ← 洪水场景结果
    ├── path_comparison.csv
    ├── route_map.png
    └── route_map_abstract.png
```

### 5.2 How to Open

- **.png files**: Double-click to open in an image viewer and see the route maps
- **.csv files**: Open with Excel or Notepad to see the path comparison data

### 5.3 Expected Results

| Scenario | Route Type | Distance | Hazard Types | Notes |
|---|---|---:|---|---|
| Earthquake | Standard shortest path | ~20 km | Landslide, congestion | Shorter but passes through earthquake impact zone |
| Earthquake | Safe route | ~27 km | Congestion | Avoids major landslide risks |
| Flood | Standard shortest path | ~20 km | Congestion, flooding | Shorter but passes through flood impact zone |
| Flood | Safe route | ~27 km | Congestion | Avoids major flooding risks |

---

## Troubleshooting

### Error Reference Table

| Error Message | Cause | Solution |
|---|---|---|
| `'python' is not recognized as an internal or external command` | Python not installed or not in PATH | Reinstall Python, make sure to check "Add Python to PATH" |
| `ModuleNotFoundError: No module named 'PIL'` | Pillow not installed | Double-click `一键运行.bat` to rerun, or manually run `pip install Pillow` |
| `FileNotFoundError` | Data path incorrect | Ensure dataset directory is complete, not moved or renamed |
| `PermissionError` | File in use or insufficient permissions | Close all open result files (e.g., Excel has csv open), then rerun |
| Window closes immediately | Runtime error | Manually run `一键运行.bat` in cmd to see the error message |

### FAQ

**Q: Can I avoid using the command line?**
A: Yes. Just double-click `一键运行.bat`—no need to manually type any commands.

**Q: Do I need to reinstall on the second run?**
A: No. The virtual environment and dependencies are installed only once; subsequent runs go directly to the run step.

**Q: My results differ from the numbers in the table above?**
A: Normal. Path calculations are affected by data precision, so minor variations may occur. The core conclusion (safe route avoids hazardous segments compared to shortest path) won't change.

**Q: How do I modify the disaster scenario?**
A: Edit `数据集/amap_earthquake/scenario.json` or `数据集/amap_flood/scenario.json`, modify the start/end coordinates, then rerun.

---

## Project Structure

```
14组_避开危险路段的救援路径规划/
├── 源码/
│   ├── 一键运行.bat              ← 双击运行（零基础首选）
│   ├── requirements.txt           ← 依赖清单（仅 Pillow）
│   ├── README.md                  ← 项目原始说明
│   ├── src/
│   │   ├── rescue_planner.py      ← 核心程序：建图、Dijkstra、可视化
│   │   └── amap_fetcher.py        ← 高德地图数据获取（已有缓存数据，无需运行）
│   ├── tools/
│   │   ├── create_disaster_scenarios.py       ← 灾害场景生成
│   │   ├── create_amap_static_visuals.py      ← 真实地图底图叠加
│   │   └── create_abstract_route_maps.py      ← 抽象路网图生成
│   └── configs/                   ← ODM 流水线配置文件
├── 数据集/
│   ├── amap_earthquake/           ← 地震场景数据（道路节点、边、灾害映射）
│   ├── amap_flood/                ← 洪水场景数据
│   ├── historical_disasters/      ← 历史灾害事件数据
│   └── 结果输出/                  ← 运行结果保存在这里
├── 文档模板/                       ← 个人报告、PPT
└── 复现指南.md                    ← 本文件
```

### Core Algorithm

- **Standard shortest path**: Uses Dijkstra's algorithm, edge weight = road distance
- **Safe route**: Uses Dijkstra's algorithm, edge weight = distance × risk factor × (1 + congestion weight × congestion level)
- Risk factors: Normal 1.0, Congestion 1.4, Flooding 2.2, Landslide 4.0

> If you encounter issues during reproduction, refer to `源码/README.md` for troubleshooting, or contact the project author.
