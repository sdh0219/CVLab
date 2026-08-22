---
title: "Post-Disaster Building Damage Identification & GIS Assessment"
titleEn: "Post-Disaster Building Damage Identification & GIS Assessment"
summary: "Inputs pre/post-disaster satellite imagery to automatically identify building damage levels (intact/minor/severe/destroyed) using a Siamese U-Net, generating statistical charts and GIS spatial assessment."
category: practice
level: advanced
tags:
  - remote sensing
  - image segmentation
  - PyTorch
  - GIS
order: 350
---

## Download Resources

| Resource | Platform | Link | Notes |
|----------|----------|------|-------|
| Source code + templates | GitHub | [CVLab-projects](https://github.com/sdh0219/CVLab-projects/tree/main/QD16组_灾后建筑损毁自动识别与GIS空间化评估) | Full source, guide (excludes large data and weights) |
| Source (China mirror) | Gitee | [cvlab_yuan](https://gitee.com/susu1843/cvlab_yuan) | Clone from Gitee for faster access in China |
| Inference weights | GitHub Release | [QD16_best.pth](https://github.com/sdh0219/CVLab-projects/releases/download/data-v1/QD16_best.pth) | best.pth (105MB), place in `源码/aline/outputs/checkpoints/` |
| Dataset (12 volumes) | GitHub Release | [Release page](https://github.com/sdh0219/CVLab-projects/releases/tag/data-v1) | 22GB split archive part00~part11, download all and reassemble |

> **How to get**:
> 1. Clone `git clone https://github.com/sdh0219/CVLab-projects.git` (or `git clone https://gitee.com/susu1843/cvlab_yuan.git` in China), enter `QD16组_灾后建筑损毁自动识别与GIS空间化评估` directory.
> 2. Download `QD16_best.pth` (105MB), place in `源码/aline/outputs/checkpoints/` as `best.pth`.
> 3. Download all 12 volume files `qd16_dataset.part00` through `qd16_dataset.part11` (~22GB total) from the [Release page](https://github.com/sdh0219/CVLab-projects/releases/tag/data-v1), place them in the same directory.
> 4. Reassemble and extract (Windows command line, in that directory):
>    ```
>    copy /b qd16_dataset.part00+qd16_dataset.part01+qd16_dataset.part02+qd16_dataset.part03+qd16_dataset.part04+qd16_dataset.part05+qd16_dataset.part06+qd16_dataset.part07+qd16_dataset.part08+qd16_dataset.part09+qd16_dataset.part10+qd16_dataset.part11 qd16_dataset.tar
>    tar -xf qd16_dataset.tar
>    ```
>    Place the extracted `数据集/` directory in the project root.

---

> **This guide is written for people with zero programming experience.** Just follow the steps—you don't need to understand the code to reproduce it.
>
> **Fastest path**: Install Python → double-click `源码\aline\一键运行.bat` → view result images. About 15 minutes total.

---

## Overview

This project uses AI to automatically identify the damage level of buildings after a disaster. It takes pre-disaster and post-disaster satellite imagery as input, and outputs a damage classification for each building (intact / minor / severe / destroyed), along with statistical charts.

The project has two technical tracks:
- **Track A (core)**: Building damage identification—uses a deep learning model to identify damage levels. **Beginners only need to reproduce this track.**
- **Track B (advanced)**: Drone DSM volume estimation—uses drone 3D data to estimate damage volume. Requires additional GDAL installation; beginners can skip this.

**What you need:**

- A Windows computer (Mac/Linux also work, but steps are demonstrated on Windows)
- Internet access (about 500 MB download for dependencies)
- Estimated time: **15 minutes** (including dependency installation), only 1 minute for subsequent runs
- No GPU required—this guide uses CPU mode (slightly slower but accessible to everyone)

---

## Install Python

### 1.1 Download Python

1. Open your browser and visit: https://www.python.org/downloads/
2. Click the yellow button **"Download Python 3.x.x"**
3. Wait for the download to complete (about 25 MB)

### 1.2 Install Python (critical step!)

1. Double-click the downloaded installer
2. **First check "Add Python to PATH" at the bottom** ← Very important! Errors will occur if not checked
3. Click **"Install Now"**
4. Wait for installation to complete, click **"Close"**

### 1.3 Verify Installation

1. Press `Win + R`, type `cmd`, press Enter
2. Type `python --version`, press Enter
3. `Python 3.10.x` or higher displayed = installation successful ✓

---

## Get Project Files

Please use the "Download Resources" table at the top of this page to obtain the project files.

---

## One-Click Run

### 3.1 Run

1. Enter the `源码\aline\` folder
2. Find **`一键运行.bat`**
3. **Double-click it**

### 3.2 Wait for automatic completion

| Step | Operation | Estimated Time |
|---|---|---|
| 1/4 | Create virtual environment | About 30 seconds (first time only) |
| 2/4 | Install dependencies (PyTorch CPU version + OpenCV, etc.) | About 5 minutes (first time only, ~500 MB download) |
| 3/4 | Run inference (load weights, identify damage) | About 30 seconds |
| 4/4 | Generate statistics and bar charts | About 10 seconds |

### 3.3 Success Indicator

The window will finally display:
```
============================================================
  运行完成！

  推理结果保存在：
  源码\aline\outputs\predictions\
  ...
============================================================
```

### 3.4 ⚠️ Chinese Path Issue

If the error message contains `cv2.error` or `NoneType`, it is likely caused by a Chinese path. Solution:

1. Move the entire project folder to a **pure English path**, e.g.: `D:\projects\16group\`
2. Double-click `一键运行.bat` again

---

## Step-by-Step Run

### 4.1 Open Command Line

Press `Win + R` → type `cmd` → press Enter, then enter the project directory:

```
cd /d D:\你的路径\16组_灾后建筑损毁自动识别与GIS空间化评估\源码\aline
```

### 4.2 Create Virtual Environment

```
python -m venv .venv
```

### 4.3 Install Dependencies

```
".venv\Scripts\python.exe" -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
".venv\Scripts\python.exe" -m pip install opencv-python shapely matplotlib tqdm numpy
```

> This uses CPU-version PyTorch (no GPU needed), about 500 MB download, please be patient.

### 4.4 Run Inference

```
set FORCE_CPU=1
".venv\Scripts\python.exe" inference.py
```

> `set FORCE_CPU=1` forces CPU usage, avoiding errors when no GPU is available.

### 4.5 Generate Statistics

```
".venv\Scripts\python.exe" stats.py
```

---

## View Results

### 5.1 Where are the result files

```
源码\aline\outputs\
├── predictions\               ← Inference results
│   ├── *_overlay.png           ← Post-disaster image + damage color overlay (most intuitive)
│   ├── *_dmg_color.png         ← Color-coded damage classification map
│   ├── *_dmg_mask.png          ← Damage mask image
│   └── *_dmg.npy               ← Damage index data (for program use)
└── stats\                      ← Statistical results
    ├── *.csv                   ← Per-building damage count/area statistics
    └── *.png                   ← Damage level bar chart
```

### 5.2 How to open

- **.png files**: Double-click to open with an image viewer. We recommend viewing `*_overlay.png`, which shows the post-disaster image overlaid with colors:
  - 🟢 Green = Intact
  - 🟡 Yellow = Minor damage
  - 🟠 Orange = Severe damage
  - 🔴 Red = Destroyed
- **.csv files**: Open with Excel to view per-building statistics

---

## Troubleshooting

### Error Reference Table

| Error Message | Cause | Solution |
|---|---|---|
| `'python' 不是内部或外部命令` | Python not installed or not in PATH | Reinstall Python, check "Add Python to PATH" |
| `best.pth 不存在` (best.pth does not exist) | Pre-trained weights file missing | Obtain best.pth from the project provider, place in `outputs\checkpoints\` directory |
| `CUDA out of memory` | GPU memory insufficient | The one-click script defaults to CPU mode; when running manually, ensure `set FORCE_CPU=1` |
| `cv2.error` or `NoneType` | Chinese path issue | Move the project to a pure English path (e.g., `D:\projects\16group\`) |
| `ModuleNotFoundError: No module named 'torch'` | PyTorch not installed | Double-click `一键运行.bat` again, or manually run the install commands in Section 4 |
| `待推理样本: 0` (Samples to infer: 0) | Test data missing | Check that the `数据集\aline_dataset\test_ex\` directory has image files |
| `RuntimeError: Error(s) in loading state_dict` | Weights and code version mismatch | Confirm best.pth belongs to this project, not another |

### FAQ

**Q: Installing dependencies is slow, what should I do?**
A: PyTorch is about 500 MB; the first install takes a few minutes. You can configure a domestic mirror to speed it up:
```
".venv\Scripts\python.exe" -m pip install opencv-python shapely matplotlib tqdm numpy -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**Q: Can I run it without a GPU?**
A: Yes. The one-click script defaults to CPU mode. Inference is slower than GPU (about 30 seconds vs 5 seconds), but the results are identical.

**Q: Only a few inference result images?**
A: Normal. The prediction directory has been streamlined to 2 samples each for 11 disaster events. If you need complete inference results, run `inference.py` to regenerate.

**Q: How can I use GPU acceleration?**
A: Install GPU-version PyTorch: visit https://pytorch.org/, follow the official guide to select a CUDA version install command. Then do not set `FORCE_CPU=1`.

---

## B-Track Volume Estimation

> Track B requires installing rasterio (which depends on the GDAL library). Installation on Windows is complex; beginners are advised to complete Track A first before attempting.

### 7.1 Install rasterio

Recommended to install via Anaconda (easiest):
```
conda install -c conda-forge gdal rasterio
```

Or install via pip (may fail):
```
pip install rasterio
```

### 7.2 Run Track B

```
cd 数据集\aline-b\bline
python dsm_volume.py --dsm ..\drone_dataset_brighton_beach-master\odm_dem\dsm.tif
```

### 7.3 Track B Results

- `volume_out\volume_heatmap.png`: Height distribution heatmap above the baseline
- Console output: Volume estimate (m³)

---

## Project Structure

```
16组_灾后建筑损毁自动识别与GIS空间化评估/
├── 源码/
│   └── aline/                        ← Track A project
│       ├── 一键运行.bat               ← Beginner entry point
│       ├── config.py                  ← Configuration (DATA_ROOT pre-configured)
│       ├── inference.py               ← Inference entry (load weights → identify damage)
│       ├── stats.py                   ← Statistics entry (per-building stats + bar chart)
│       ├── train.py                   ← Training entry (not needed for beginners)
│       ├── models/siamese_unet.py     ← Siamese U-Net model definition
│       ├── data/                      ← Dataset classes and synthetic data generation
│       └── outputs/
│           ├── checkpoints/best.pth  ← Pre-trained weights (105 MB)
│           ├── predictions/           ← Inference results
│           └── stats/                ← Statistical results
├── 数据集/
│   ├── aline_dataset/                ← Track A xBD satellite imagery
│   └── aline-b/                      ← Track B drone data
├── 文档模板/
└── 复现指南.md
```

### Core Algorithm

- The model uses a **Siamese U-Net**: the encoder shares weights, takes pre-disaster/post-disaster image pairs, and identifies damage level per building
- xBD official 4-level scale: no-damage / minor / major / destroyed
- Area conversion: `面积(m²) = 像素数 × GSD²` (GSD = ground sample distance, default 1 meter/pixel)

> If you encounter issues during reproduction, refer to `源码/aline/README.md` for troubleshooting.
