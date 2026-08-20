---
title: "AI-Assisted Mountain Debris Flow Zero-Casualty Solution"
titleEn: "AI-Assisted Mountain Debris Flow Zero-Casualty Solution"
summary: "A complete AI-assisted debris-flow disaster prevention pipeline from risk assessment and rainfall early warning to population evacuation and rescue dispatch, using 12-layer GIS raster data and encrypted disaster databases."
category: practice
level: intermediate
tags:
  - GIS
  - disaster assessment
  - AHP
  - raster analysis
order: 370
---

## Download Resources

| Resource | Platform | Link | Notes |
|----------|----------|------|-------|
| Source code + templates | GitHub | [CVLab-projects](https://github.com/sdh0219/CVLab-projects/tree/main/QD18组_AI辅助山区泥石流零死亡方案) | Full source, templates |
| Dataset | Gitee | [cvlab_yuan](https://gitee.com/susu1843/cvlab_yuan) | 12-layer GIS raster data + encrypted databases (286MB) |

> **How to get**: Clone `git clone https://github.com/sdh0219/CVLab-projects.git`, enter `QD18组_AI辅助山区泥石流零死亡方案` directory. The dataset (286MB) can be downloaded from Gitee and placed in `数据集/`.

# AI-Assisted Mountain Debris Flow Zero-Casualty Solution · Beginner's Reproduction Guide

> **This guide is written for people with absolutely no programming experience.** Just follow the steps — you don't need to understand any code to complete the reproduction.
>
> If you just want to see results as fast as possible, jump straight to **Chapter 3 One-Click Run** (just double-click one file).

---

## Overview

This project simulates a **complete AI-assisted "zero-casualty" prevention and control solution for mountain debris flow disasters**. Using real GIS raster data (12 layers of geographic information) and encrypted disaster databases, it automatically completes the full pipeline from "risk assessment → rainfall early warning → population evacuation → rescue dispatch," and generates charts and tables.

Running it once will give you:

- **6 analysis charts**: debris flow susceptibility map, risk level map, monitoring station map, graded early warning map, evacuation route map, DEM elevation comparison map
- **1 data table** (`grid_data.csv`, openable in Excel): 10-factor scores, susceptibility index, and risk level for each pixel
- **5 JSON results**: monitoring stations, evacuation plans, warning rules, rescue forces, high-risk settlements

The project has two special features (also the focus of this guide):

1. **The data is encrypted**: The `.enc` files under `数据集/database_data/` are encrypted with AES-256-CBC and must be decrypted at runtime.
2. **It has a proprietary authorization mechanism**: You must first generate a "license file" (`.license`) on your machine before the main program will run. The license is **bound to your computer** and is **single-use** (it becomes invalid after one run of the main program; you need to regenerate it next time).

**What you need:**

- A Windows computer (Mac/Linux also works, but the steps below use Windows as an example)
- Internet access (needed when installing dependencies)
- Estimated time: **5 minutes** (if Python is already installed) or **20 minutes** (from scratch, including rasterio installation)

> **About rasterio (the biggest installation obstacle)**: This project depends on the `rasterio` library to read geographic raster files. It occasionally fails to install on Windows (due to the GDAL dependency). If the one-click script can't install it, Chapter 6 section 6.5 provides detailed conda-based steps — this is the most critical part of this guide, so please read it carefully.

---

## Install Python (skip if already installed)

### 1.1 Download Python

1. Open your browser and visit: https://www.python.org/downloads/
2. Click the yellow **"Download Python 3.x.x"** button on the page
3. Wait for the download to complete (file is about 25 MB)

> **Version recommendation**: Choose **Python 3.10 / 3.11 / 3.12** for the most stable experience (project dependencies have been tested in this range). 3.13 also works, but if rasterio won't install, prefer 3.10~3.12.

### 1.2 Install Python (critical step!)

1. Find the downloaded installer (usually in the "Downloads" folder) and **double-click to run it**
2. When the installer opens, you'll see two large buttons and a line of small text at the bottom
3. **First check the box at the bottom "Add Python to PATH"** ← This step is extremely important! Not checking it will cause errors later
4. Then click **"Install Now"**
5. Wait for the progress bar to finish (about 30 seconds), then click **"Close"**

### 1.3 Verify the installation

1. Press `Win + R` on your keyboard (hold the Windows key and R key simultaneously) to open the "Run" dialog
2. Type `cmd` and press Enter — a black window will pop up
3. Type the following command in the black window, then press Enter:

   ```
   python --version
   ```

4. If it displays `Python 3.10.x` (or a higher version number), the installation was successful ✓
5. If it says "is not recognized as an internal or external command," you missed checking "Add to PATH" in step 3 — please reinstall

---

## Get Project Files

Please obtain the project files using the "Download Resources" table at the top of this page.

---

## One-Click Run (recommended for beginners)

### 3.1 Run

1. Navigate to the project's **`源码`** folder
2. Find the **`一键运行.bat`** file
3. **Double-click it**

### 3.2 Wait for automatic completion

The black window will automatically perform the following operations:

| Step | Operation | Estimated time |
|---|---|---|
| 1/5 | Create Python virtual environment | ~30 seconds (first time only) |
| 2/5 | Install dependencies (including rasterio) | ~1-3 minutes (first time only, large size) |
| 3/5 | Generate device-bound license | ~1 second |
| 4/5 | Run main program (decrypt/AHP/warning/evacuation/rescue/charts) | ~1-2 minutes |
| 5/5 | Prompt completion | — |

### 3.3 What you'll see when it succeeds

The window will finally display:

```
============================================================
  运行完成！

  结果文件保存在：
  源码\output\

  关键结果文件：
    fig1_risk_assessment.png     泥石流易发性 + 风险等级图
    ...
    grid_data.csv                逐像元数据（Excel 可直接打开）
    ...
============================================================
```

Press any key to close the window, then go to **Chapter 5** to view the results.

### 3.4 If it gets stuck at the "install rasterio" step

This is the **biggest obstacle** in this project. If the window shows a red `[错误] rasterio 安装失败` message, **don't panic** — just jump to **Chapter 6 section 6.5** and reinstall using the conda method (success rate is nearly 100%). After installing rasterio, come back and double-click `一键运行.bat` again — it will skip already-installed dependencies and go straight to the license and main program.

---

## Step-by-Step Run (if you want to understand what each step does)

If you want to run things manually, follow these steps. All commands are executed in the **`源码`** directory.

### 4.1 Open the command line and enter the source directory

1. Press `Win + R`, type `cmd`, press Enter
2. Use the `cd` command to navigate to the project's source directory (replace the path with your actual path):

   ```
   cd /d D:\你的路径\18组_AI辅助山区泥石流零死亡方案\源码
   ```

### 4.2 Create a virtual environment and install dependencies

```
python -m venv .venv
".venv\Scripts\python.exe" -m pip install --upgrade pip
```

First install the easier ones:

```
".venv\Scripts\python.exe" -m pip install numpy==2.2.6 matplotlib==3.10.9 pycryptodome==3.23.0 psycopg2-binary==2.9.12
```

Then install rasterio separately (the one that's prone to issues, see 6.5):

```
".venv\Scripts\python.exe" -m pip install rasterio==1.4.4
```

Verify that rasterio actually works (no error means success):

```
".venv\Scripts\python.exe" -c "import rasterio; print(rasterio.__version__)"
```

> **What is a virtual environment?** It's an isolated Python environment folder (`.venv`). Dependencies installed here won't affect other Python projects on your computer.

### 4.3 Generate the authorization license

```
".venv\Scripts\python.exe" keygen.py
```

This generates a `.license` file in the `源码/` directory and prints your device fingerprint and license file path.

> **Key point**: The license is **single-use authorization** — running `main.py` once invalidates it. So **you must re-run `keygen.py` before each run of the main program**, otherwise you'll get an "authorization used up" error.
>
> **It must be generated and run on the same computer** — it binds to your computer's MAC address and hostname. Using a different computer or virtual machine will result in a "device mismatch" error.

### 4.4 Run the main program

```
".venv\Scripts\python.exe" main.py
```

`main.py` requires no parameters. Once started, it sequentially completes nine sections:

1. **Data loading and decryption**: Loads 12 GeoTIFF layers, crops them to the minimum common size; decrypts 8 `.enc` files one by one
2. **AHP susceptibility assessment**: Weighted overlay of 10 factors using `ahp_weights` from `config.json`, classifies into 5 risk levels
3. **Rainfall monitoring analysis**: Statistics for station TOP10, hourly aggregation, finds maximum rainfall events
4. **Graded early warning simulation**: Counts trigger frequency by blue/yellow/orange/red thresholds (15/30/50/70 mm·1h)
5. **Population and shelter analysis**: Total population, district distribution, shelter types and capacity
6. **Evacuation route planning**: Identifies high-risk settlements, matches nearest low-risk shelters, estimates walking time
7. **Rescue force dispatch**: Configures 5 types of rescue forces (professional rescue teams / fire / armed police / medical / volunteers)
8. **Data export**: Exports `grid_data.csv` and 5 JSON files
9. **Visualization**: Generates 6 PNG charts

### 4.5 Command summary

| Step | Command | Execution directory |
|---|---|---|
| Generate authorization | `python keygen.py` | `源码/` |
| Run main program | `python main.py` | `源码/` |

---

## View Results

### 5.1 Where are the result files

After running is complete, results are saved in the **`源码\output\`** directory:

```
源码/output/
├── fig1_risk_assessment.png      ← 易发性指数 + 风险等级（左右双图）
├── fig2_factor_scores.png        ← 10 因子标准化得分（2×5 子图，标题标权重）
├── fig3_monitoring_stations.png  ← 雨量监测站点分布
├── fig4_warning_simulation.png   ← 分级预警区域模拟（蓝/黄/橙/红）
├── fig5_evacuation_routes.png    ← 群众转移路线与避险点规划
├── fig6_dem_risk_overlay.png     ← DEM 高程与易发性热力图对比
├── grid_data.csv                 ← 逐像元数据（UTF-8-SIG，Excel 可直接打开）
├── monitoring_stations.json      ← 监测站点
├── evacuation_plans.json         ← 转移计划
├── warning_rules.json            ← 预警规则
├── rescue_forces.json            ← 救援力量
└── settlements.json              ← 高风险聚落
```

### 5.2 How to open them

- **.png files**: Double-click to open with an image viewer
- **.csv files**: Open with Excel (or Notepad) — you'll see each pixel's latitude/longitude, 10-factor scores, susceptibility index, and risk level
- **.json files**: Open with Notepad or a browser — you'll see structured monitoring station, evacuation plan, and other data

### 5.3 Expected results

After the main program runs successfully, the black window will finally print:

```
全部完成！
输出目录: ...18组_AI辅助山区泥石流零死亡方案\源码\output
共生成: 6张图 + grid_data.csv + 4个JSON
```

> Note: The source code says "4 JSON files," but actually 5 are exported (the extra one is `settlements.json`). The actual output is authoritative.

The terminal log also prints: AHP 10-factor weights, risk level pixel distribution, rainfall TOP10 stations, warning trigger frequency, total population and district distribution, shelter statistics, evacuation plans (settlement → shelter, distance, travel time), rescue force configuration, etc. — these are the decision basis for the "zero-casualty" solution.

---

## Troubleshooting

### Error reference table

| Error message | Cause | Solution |
|---|---|---|
| `'python' 不是内部或外部命令` | Python not installed or not in PATH | Reinstall Python, make sure to check "Add Python to PATH" |
| `ModuleNotFoundError: No module named 'rasterio'` | rasterio not installed | See section 6.5, install using conda method instead |
| `[License] Error: .license 文件不存在` | No license generated | Go back to `源码/` and run `python keygen.py`, or just re-run the one-click script |
| `[License] Error: 授权已失效` / `授权已用完` | License is single-use; it was consumed during the last main program run | Re-run `python keygen.py` to generate a new license, then run `main.py` |
| `[License] Error: 授权与当前设备不匹配` | License was bound to a different computer/VM | You must run keygen.py on the **same computer** where you run main.py |
| `[License] Error: 授权签名无效` | `.license` was manually modified | Delete `.license` and re-run `keygen.py` |
| Decryption `json.loads` error / `UnicodeDecodeError` | `.enc` file was modified or key restoration failed | Never manually edit `.enc`; restore data from the original backup |
| `FileNotFoundError: ... processed_data\*.tif` | Wrong path | Check that `config.json`'s `paths` point to the correct directories (see 6.6) |
| `PermissionError` | File is in use | Close programs like Excel/image viewers that have result files open, then re-run |
| Window closes immediately | Runtime error but no visible message | In cmd, manually `cd` into `源码/` and manually run `一键运行.bat` to see the error |
| Chinese shows as boxes in charts | System missing SimHei/Microsoft YaHei fonts | Windows usually has them built in; Linux needs `fonts-wqy-zenhei` or change `config.json`'s `fonts` |

### 6.1 Can I avoid using the command line?

Yes. Just double-click `一键运行.bat` — no need to type any commands manually.

### 6.2 Do I need to reinstall for the second run?

No. The virtual environment and dependencies are installed only once. Subsequent runs jump straight to the license and main program steps. However, **you must regenerate the license before each main program run** (single-use authorization). The one-click script handles this automatically.

### 6.3 Why does the authorization always "run out"?

This is by design of the project's proprietary mechanism: the `.license` field `max_uses: 1` means running `main.py` once increments `use_count` to the limit and sets `valid=False`. This demonstrates the "device binding + single-use authorization" security model. **The fix is simple: re-run `keygen.py` before each run** (the one-click script handles this automatically).

### 6.4 Can I run it in a VM/container?

**Not recommended.** The license binds to a device fingerprint (`SHA-256(MAC address + hostname)`). Generating a license in a VM and then running it on the host machine will result in a "device mismatch" error. Please run `keygen.py` on the **same physical machine** where you will ultimately run `main.py`.

### 6.5 What if rasterio won't install (most important!)

`rasterio` depends on the GDAL geospatial library. On Windows, `pip install rasterio` occasionally fails due to a missing GDAL compilation environment. **The conda method is preferred** (highest success rate):

**Method A: Use conda (recommended, highest success rate)**

If you don't have conda yet, first install Miniconda (lightweight): https://docs.conda.io/en/latest/miniconda.html

After installation, open **Anaconda Prompt** (not regular cmd) and execute:

```
conda create -n debris-flow python=3.10 -y
conda activate debris-flow

REM 用 conda 装 GDAL + rasterio + numpy + matplotlib（带预编译二进制，不编译）
conda install -c conda-forge gdal rasterio numpy=2.2.6 matplotlib=3.10.9 -y

REM 剩下两个用 pip 装
pip install pycryptodome==3.23.0 psycopg2-binary==2.9.12
```

Then enter the source directory and run the license and main program (note: use the conda environment's python, not .venv):

```
cd /d D:\你的路径\18组_AI辅助山区泥石流零死亡方案\源码
python keygen.py
python main.py
```

> If you use a conda environment, **don't use `.venv`** — choose one or the other. In the conda environment, `python` is directly the interpreter you need.

**Method B: Use pip (try this first, works in most cases)**

```
".venv\Scripts\python.exe" -m pip install rasterio==1.4.4
```

rasterio officially provides pre-built Windows wheels on PyPI (with GDAL bundled). **Python 3.10~3.12 + 64-bit** usually installs directly. If it fails:

- Try a domestic mirror: `-i https://pypi.tuna.tsinghua.edu.cn/simple`
- Confirm you have 64-bit Python (32-bit has no pre-built wheels)
- Confirm Python version is 3.10~3.12
- If all else fails, use Method A (conda)

### 6.6 Path can't find data / project folder was moved

The `paths` field in `源码/config.json` uses **absolute paths**. They currently point to the project's actual location. If you **moved or renamed the project folder**, you must update these four paths in `config.json`:

```json
{
  "paths": {
    "base": "D:/你的新路径/18组_AI辅助山区泥石流零死亡方案",
    "raster_dir": "D:/你的新路径/18组_AI辅助山区泥石流零死亡方案/数据集/processed_data",
    "vector_dir": "D:/你的新路径/18组_AI辅助山区泥石流零死亡方案/数据集/database_data",
    "output_dir": "D:/你的新路径/18组_AI辅助山区泥石流零死亡方案/源码/output"
  }
}
```

> Path separators can be `/` or `\\`. Open `config.json` with Notepad to edit — just be careful not to break the JSON format (don't miss commas or quotes).
>
> What happens if you don't fill in these fields? `main.py` will fall back to a default path concatenation logic, which hardcodes old directory names (`1_数据包` / `2_源码`) that don't match the current `数据集` / `源码` structure, so it won't find the data. **Always keep config.json paths correct.**

### 6.7 Chinese garbled text

The project path contains Chinese characters. `main.py` already has `sys.stdout.reconfigure(encoding='utf-8')` at the top. The one-click script also sets `chcp 65001` at the beginning. If garbled text persists, run `chcp 65001` in cmd before running.

### 6.8 Decryption red lines

- **Never** manually open, edit, or "save as" `.enc` files (saving with Notepad/Excel will corrupt the binary structure and cause decryption failures)
- **Never** copy a `.license` generated on another computer (device mismatch)
- `.license` is plaintext JSON but contains a signature — **never** manually edit its fields (it will trigger signature verification failure)

---

## Project Structure (optional reading)

```
18组_AI辅助山区泥石流零死亡方案/
├── 源码/
│   ├── 一键运行.bat              ← 双击运行（零基础首选）
│   ├── main.py                   ← 主程序（9 节流程入口，无参数）
│   ├── keygen.py                 ← 授权生成器（设备绑定，单次授权）
│   ├── key_manager.py            ← 授权验证 + AES 密钥还原 + 消费授权
│   ├── config.json               ← 运行配置（路径/权重/阈值/预警/救援/出图）
│   ├── requirements.txt          ← 依赖清单
│   ├── .license                  ← （运行 keygen.py 后生成；单次授权）
│   └── output/                   ← （运行 main.py 后自动生成，存放结果）
├── 数据集/
│   ├── database_data/            ← 加密矢量/表格数据（.enc）
│   │   ├── dangerous_sources.enc    危险源
│   │   ├── hidden_dangers.enc       隐患点
│   │   ├── population.enc           人口分布
│   │   ├── rainfall_data.enc        降雨历史记录
│   │   ├── rainfall_stations.enc    雨量站点
│   │   ├── risk_spots.enc           风险点
│   │   ├── roads.enc                道路
│   │   ├── shelters.enc             避难场所
│   │   └── encryption_info.json     加密说明（AES-256-CBC / SHA-256 / PKCS7）
│   ├── processed_data/            ← 处理后英文命名栅格（12 层 .tif，主程序实际读取）
│   │   ├── dem.tif / slope.tif / aspect.tif / landuse.tif
│   │   ├── soil_moisture.tif / soil_sediment.tif / soil_type.tif
│   │   ├── lithology.tif / ndvi.tif / terrain_class.tif
│   │   └── organic_carbon.tif / ph.tif
│   ├── raw_data/                  ← 原始中文命名栅格（14 层 .tif，仅供溯源）
│   └── data_description.docx      ← 数据说明（用 Word/WPS 打开）
├── 文档模板/                       ← 技术方案/PPT/操作文档
└── 复现指南.md                    ← 本文件
```

### Core mechanisms

- **AHP susceptibility assessment**: Weighted overlay of 10 factors, weights defined in `config.json`'s `ahp_weights` (slope 0.25 highest, pH 0.02 lowest, summing to 1.00). Some factors are reverse-normalized (higher elevation/NDVI/organic carbon means lower susceptibility); pH uses non-linear normalization.
- **Risk classification**: Divided into 5 levels by `risk_thresholds: [0.2, 0.4, 0.6, 0.8]`.
- **Graded early warning**: Based on Chinese national standards GB/T 28592-2012 and QX/T 487-2019, with blue/yellow/orange/red thresholds (1h: 15/30/50/70 mm).
- **Rescue forces**: 5 types (professional rescue teams 2×50, fire 3×30, armed police 2×100, medical 4×20, volunteers 5×15 personnel).
- **Encrypted authorization**: The raw material for the AES key exists only in the `keygen.py` source code; it's XOR-encrypted with the device fingerprint (first 16 bytes) and written to the `.license`'s `enc_key` field, then signed with HMAC-SHA256. When `main.py` starts, it verifies the signature → verifies the device → restores the AES key → consumes the authorization → decrypts the `.enc` files.

---

If you encounter issues during reproduction, check the following files for troubleshooting:

- `源码/main.py` — 9-section main pipeline implementation
- `源码/config.json` — all configurable parameters
- `源码/keygen.py` / `源码/key_manager.py` — encrypted authorization generation and verification
- `数据集/database_data/encryption_info.json` — encryption parameter documentation
