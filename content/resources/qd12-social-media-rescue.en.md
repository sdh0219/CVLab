---
title: "Social Media Distress Information Extraction & Geolocation"
titleEn: "Social Media Distress Information Extraction & Geolocation"
summary: "Uses BERT+CRF to automatically extract four types of critical information (location, personnel, disaster type, needs) from social media distress messages, then geocodes locations onto an interactive map."
category: practice
level: intermediate
tags:
  - NLP
  - BERT
  - information extraction
  - geocoding
order: 310
---

## Download Resources

| Resource | Platform | Link | Notes |
|----------|----------|------|-------|
| Source code + templates | GitHub | [CVLab-projects](https://github.com/sdh0219/CVLab-projects/tree/main/QD12组_社交媒体求救信息自动提取与定位) | Full source, small datasets, templates |
| Pre-trained models | Gitee | [cvlab_yuan](https://gitee.com/susu1843/cvlab_yuan) | BERT model (auto-downloadable) + training checkpoint |

> **How to get**: Clone `git clone https://github.com/sdh0219/CVLab-projects.git`, enter `QD12组_社交媒体求救信息自动提取与定位` directory. The BERT model auto-downloads from HuggingFace on first run; download the training checkpoint from Gitee and place it in `源码/outputs/checkpoints/`.

> **This guide is written for people with absolutely no programming experience.** Just follow the steps—you don't need to understand the code to reproduce the results.
>
> If you just want to see results as quickly as possible, skip directly to **Chapter 3: One-Click Run** (just double-click one file).
>
> **Good news**: The project comes with a pre-trained model built in—**no training needed, ready to use right away**.

---

## Overview

This project simulates distress information processing in disaster scenarios. When a disaster strikes, social platforms are flooded with distress messages (e.g., "Zhengzhou Jingguang Road Tunnel flooded, water 2 meters deep, 4 of us trapped in one car, need rescue boats"). Reading each message manually is too slow. This project uses AI to automatically accomplish two things:

- **Automatically extract key information**: From a distress text, automatically identify **location**, **personnel**, **disaster situation**, and **needs**—four types of critical information (using a BERT deep learning model, test set F1 = 0.95)
- **Automatically geolocate on a map**: Based on extracted locations, automatically look up coordinates, mark distress points on a map, and generate an **interactive distress point distribution dashboard** (all 288 distress points successfully located)

**In one sentence**: Input a batch of disaster distress social media posts → AI automatically organizes them into a table + draws a distress point distribution map.

**What you need:**

- A Windows computer (Mac/Linux also works, but the steps below use Windows as an example)
- Internet access (needed during dependency installation; not needed afterward)
- Estimated time: **10 minutes** (if Python is already installed) or **20 minutes** (starting from scratch)

> **About GPU**: This project comes with a pre-trained model built in—**no GPU needed, no training needed**, runs on any ordinary computer. If you want to retrain the model yourself, an NVIDIA GPU will be much faster (5-10 minutes); without a GPU, CPU works too (30-60 minutes).

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
| 1/7 | Create Python virtual environment | ~30 sec (first time only) |
| 2/7 | Upgrade pip | ~5 sec |
| 3/7 | Install PyTorch CPU version (~200MB) | ~2-5 min (first time only) |
| 4/7 | Install other dependencies (transformers, etc.) | ~2-3 min (first time only) |
| 5/7 | Prepare data (gazetteer + dataset + annotations) | ~10 sec |
| 6/7 | Evaluate model + batch inference on 288 entries | ~1-2 min |
| 7/7 | Generate distress point distribution dashboard | ~5 sec |

> **Second run is much faster**: Steps 1-4 are automatically skipped (already installed), starting directly from step 5, completing in about 2 minutes.

### 3.3 What You'll See When It Succeeds

The window will finally display:

```
============================================================
  运行完成！

  结果文件保存在：
  源码\outputs\maps\rescue_map.html        ← 求救点分布仪表盘（浏览器打开）
  源码\outputs\reports\metrics.json         ← 评估指标（F1 约 0.95）
  源码\outputs\reports\training_curve.png   ← 训练曲线图（如已训练）
  数据集\processed\structured_results.csv   ← 结构化结果表（Excel 打开）

  怎么看结果：
    1. 双击 rescue_map.html → 浏览器打开求救点分布仪表盘
    2. 用 Excel 打开 structured_results.csv → 查看 288 条提取结果
============================================================
```

Press any key to close the window, then go to **Chapter 5** to view results.

### 3.4 About Training (Optional)

This project **already has a pre-trained model built in**. The one-click script automatically detects and skips the training step, going directly to evaluation and inference.

If you want to **retrain the model yourself** (e.g., to experiment with parameters):

1. Delete the `源码\outputs\checkpoints\bert_ner_best` folder
2. Double-click `一键运行.bat` again
3. The script will automatically start training (CPU ~30-60 minutes, with GPU ~5-10 minutes)

---

## Step-by-Step Run

If you want to operate manually, follow these steps. All commands are executed in the **`源码`** directory.

### 4.1 Open Command Prompt

1. Press `Win + R`, type `cmd`, press Enter
2. Use the `cd` command to navigate to the project's source directory (replace the path with your actual path):

   ```
   cd /d D:\你的路径\12组_社交媒体求救信息自动提取与定位\源码
   ```

### 4.2 Create Virtual Environment and Install Dependencies

```
python -m venv .venv
".venv\Scripts\python.exe" -m pip install --upgrade pip
```

**Install PyTorch (CPU version, recommended, no GPU needed):**

```
".venv\Scripts\python.exe" -m pip install torch --index-url https://download.pytorch.org/whl/cpu
```

> **If you have an NVIDIA GPU and want GPU acceleration** (optional, only needed for training, not inference):
> Visit https://pytorch.org/get-started/locally/ to select the appropriate CUDA version, e.g.:
> `pip install torch --index-url https://download.pytorch.org/whl/cu121`

**Install other dependencies:**

```
".venv\Scripts\python.exe" -m pip install -r requirements.txt
```

> **What is a virtual environment?** It's an isolated Python environment folder—dependencies installed here won't affect other Python projects on your computer.

### 4.3 Data Preparation (Build Gazetteer + Dataset + Annotations)

```
".venv\Scripts\python.exe" -m src.geo.build_geo_dict
".venv\Scripts\python.exe" -m src.data.build_dataset
".venv\Scripts\python.exe" -m src.data.annotate
```

> These three steps generate: a gazetteer of 212 Chinese disaster-area place names, 288 raw distress texts, and BIO-annotated train/dev/test data.
> If the dataset already exists, these steps will rebuild it (results are identical).

### 4.4 Evaluate Model (Using Built-in Checkpoint, Reproduce F1 = 0.95)

```
".venv\Scripts\python.exe" -m src.evaluate
```

> This step loads the pre-trained model from `outputs/checkpoints/bert_ner_best/`,
> evaluates on the test set, outputs P/R/F1 metrics, and saves results to `outputs/reports/metrics.json`.

### 4.5 Batch Inference (288 Distress Texts → Structured Table)

```
".venv\Scripts\python.exe" -m src.infer --batch
```

> This step performs inference on each of the 288 raw distress texts, extracting location/personnel/disaster/needs,
> performs geocoding to look up coordinates, and finally exports `数据集\processed\structured_results.csv`.

### 4.6 Generate Distress Point Distribution Dashboard

```
".venv\Scripts\python.exe" -m src.visualize
```

> Generates `outputs/maps/rescue_map.html`—an interactive HTML dashboard with
> all 288 distress points plotted on a map by their real coordinates, supporting search/filter/click-to-locate.
> If static resources are missing before first run, run first: `".venv\Scripts\python.exe" scripts\download_static.py`

### 4.7 Single Text Inference (For Demo)

```
".venv\Scripts\python.exe" -m src.infer --text "求助! 汶川映秀镇3楼塌了,有3个人,急需水,电话13900001234"
```

> Input a custom distress text and immediately see the extraction results and geolocation.

### 4.8 Full Training (Optional, Can Skip If Checkpoint Exists)

If you want to train the model from scratch (instead of using the built-in checkpoint):

```
".venv\Scripts\python.exe" -m src.train                    # Train with default parameters
".venv\Scripts\python.exe" -m src.train --epochs 5         # Only 5 epochs (quick test)
".venv\Scripts\python.exe" -m src.train --no_crf           # Without CRF (ablation study)
```

---

## View Results

### 5.1 Where Are the Result Files

After completion, results are saved in the following locations:

```
源码/outputs/
├── maps/
│   └── rescue_map.html              ← 求救点分布仪表盘（核心产物，浏览器打开）
├── reports/
│   ├── metrics.json                 ← 评估指标（F1 = 0.9511）
│   ├── training_curve.png           ← 训练曲线图（可放 PPT）
│   ├── train_log.txt                ← 完整训练日志
│   └── badcase.txt                  ← 预测错误的样本（17 条）
└── checkpoints/
    └── bert_ner_best/               ← 训练好的模型权重（已内置）

数据集/processed/
└── structured_results.csv           ← 结构化结果表（288 条，Excel 打开）
```

### 5.2 How to Open

- **rescue_map.html**: **Double-click to open in your browser** to see the distress point distribution dashboard
  - 288 distress points plotted on a map by real coordinates
  - Red = urgent, Orange = high, Yellow = moderate
  - Click any marker to see details (location/personnel/disaster/needs/original text)
  - The table at the bottom supports search and filtering by urgency/disaster type
  - Click a table row → the map automatically flies to that distress point
  - **JS/CSS are fully localized, works offline** (only map tile loading requires internet; degrades to solid color background when offline)

- **structured_results.csv**: Open with **Excel** or **WPS Spreadsheet** to see 288 structured results
  - Fields: id / original text / location / personnel / disaster / needs / urgency / longitude / latitude / matched place name

- **metrics.json**: Open with Notepad to see evaluation metrics (P/R/F1)

- **training_curve.png**: Double-click to open in an image viewer to see training loss and F1 curves

### 5.3 Expected Results

| Metric | Value | Notes |
|---|---|---|
| Test set F1 | ≈ 0.9511 | BERT+CRF model, far exceeds rule baseline 0.31 |
| Geocoding success rate | 100% | All 288 entries successfully located (local gazetteer 212 entries) |
| Urgent distress count | 127 | Red markers, priority rescue needed |
| High priority | 115 | Orange markers |
| Moderate priority | 46 | Yellow markers |

**Three-method comparison** (validating deep learning advantage):

| Method | Test F1 | Notes |
|---|---|---|
| Rule / dictionary baseline | ≈ 0.31 | Regex + dictionary matching |
| LLM few-shot (Qwen) | ≈ 0.65 | Zero training, prompt engineering (requires API Key) |
| **BERT + CRF (this project's main model)** | **≈ 0.95** | Supervised fine-tuning, best performance |

### 5.4 Single Text Demo Result

Input:
```
急!郑州京广路隧道被淹,水深2米,我们一辆车4个人出不来,求救船只,电话13900001111
```

System automatically outputs:

| Location | Personnel | Disaster | Needs | Urgency | Coordinates |
|---|---|---|---|---|---|
| 郑州京广路隧道 | 一辆车4个人 | 被淹 / 水深2米 | 船只 / 电话13900001111 | Urgent | (113.64, 34.748) |

---

## Troubleshooting

### Error Reference Table

| Error Message | Cause | Solution |
|---|---|---|
| `'python' is not recognized as an internal or external command` | Python not installed or not in PATH | Reinstall Python, make sure to check "Add Python to PATH" |
| `ModuleNotFoundError: No module named 'torch'` | PyTorch not installed | Double-click `一键运行.bat` to rerun, or manually run: `pip install torch --index-url https://download.pytorch.org/whl/cpu` |
| `ModuleNotFoundError: No module named 'transformers'` | Dependencies not fully installed | Double-click `一键运行.bat` to rerun, or manually run: `pip install -r requirements.txt` |
| `OSError: ... bert-base-chinese download failed` | BERT model missing | Project has model built in at `源码/models/`; check if folder is complete; if missing, run `python scripts/download_model.py` to redownload from domestic mirror |
| `FileNotFoundError: ... bert_ner_best` | Model checkpoint missing | Check if `源码/outputs/checkpoints/bert_ner_best/pytorch_model.bin` exists; if missing, retrain: `python -m src.train` |
| `FileNotFoundError: ... 数据集` | Data path incorrect | Ensure `数据集/` directory is complete, not moved or renamed; check that `DATA_DIR` in `源码/src/config.py` points to `../数据集/` |
| `PermissionError` | File in use | Close all open result files (e.g., Excel has csv open, browser has html open), then rerun |
| Window closes immediately | Runtime error | Manually navigate to `源码` directory in cmd, run `一键运行.bat` to see the error message |
| `RuntimeError: CUDA out of memory` | GPU out of memory | Run with CPU version (default is CPU); or reduce batch size |
| Dependency install stuck / timeout | Network issue | Use domestic mirror: `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple` |
| `UnicodeDecodeError` | Chinese path encoding issue | Ensure terminal uses UTF-8 (`chcp 65001`); avoid special characters in paths |

### PyTorch Installation Issues (Most Common Obstacle)

PyTorch is the core dependency of this project. You may encounter the following issues during installation:

**Problem 1: Default PyTorch install is too large (~2.5GB)**

The default `pip install torch` downloads the GPU version with CUDA (~2.5GB), which is slow to download and takes up space.
If you only need to **run inference** (not training), the CPU version is sufficient (~200MB):

```
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

**Problem 2: Installation failed / download timeout**

Use a domestic PyPI mirror to accelerate:

```
pip install torch --index-url https://download.pytorch.org/whl/cpu -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**Problem 3: Have an NVIDIA GPU and want to use it**

1. First check your CUDA version: type `nvidia-smi` in cmd, look at the CUDA Version in the top right
2. Visit https://pytorch.org/get-started/locally/ to select the corresponding version
3. For example, CUDA 12.1: `pip install torch --index-url https://download.pytorch.org/whl/cu121`

> **Tip**: This project comes with a pre-trained model—**inference doesn't need a GPU**. The CPU version of PyTorch is more than sufficient.

### BERT Model Issues

**Problem: Getting `OSError: bert-base-chinese download failed` during training?**

This project has the BERT pre-trained model built in at `源码/models/AI-ModelScope/bert-base-chinese/`. Under normal circumstances, no download is needed.
If that folder is missing or corrupted, redownload from a domestic mirror:

```
".venv\Scripts\python.exe" scripts\download_model.py
```

Or set the HuggingFace domestic mirror and retry:

```
set HF_ENDPOINT=https://hf-mirror.com
".venv\Scripts\python.exe" -m src.train
```

### FAQ

**Q: Can I avoid using the command line?**
A: Yes. Just double-click `一键运行.bat`—no need to manually type any commands.

**Q: Do I need to reinstall on the second run?**
A: No. The virtual environment and dependencies are installed only once; subsequent runs automatically skip the installation steps and go directly to inference.

**Q: Can I run it without a GPU?**
A: Absolutely. This project has a pre-trained model built in; inference runs on CPU, completing 288 inferences in about 1-2 minutes. A GPU only has a noticeable advantage when training the model yourself.

**Q: My results differ from the numbers in the guide?**
A: Normal. Inference results are affected by random seeds and data precision, so minor variations may occur. The core conclusions (F1 ≈ 0.95, all 288 entries successfully located) won't change.

**Q: The map tiles don't show / blank background?**
A: Map tiles (street tiles) require online loading. When offline, it degrades to a solid color background, but all markers, popups, filters, and location features work fully offline. Refresh the page after reconnecting to see the tiles.

**Q: TensorBoard says "TensorFlow installation not found"?**
A: Normal, doesn't affect usage. We use PyTorch, not TensorFlow—this just means some advanced features are unavailable. The SCALARS/HPARAMS/TEXT panels we use all work fine.

**Q: How do I try my own distress text?**
A: Run in the `源码` directory:
`".venv\Scripts\python.exe" -m src.infer --text "你的求救文本"`
You'll immediately see the extracted location/personnel/disaster/needs and geolocation results.

**Q: How do I run the LLM baseline (Qwen)?**
A: The LLM baseline is an optional comparison experiment that requires an Alibaba Cloud DashScope API Key:
1. Apply for a Key at https://bailian.console.aliyun.com/
2. Copy `源码\.env.example` to `源码\.env`, fill in `DASHSCOPE_API_KEY=sk-your-key`
3. Run `".venv\Scripts\python.exe" -m src.baselines.llm_ner --evaluate --shots 3`
The main workflow works without configuration—you just miss one comparison experiment.

---

## Project Structure

```
12组_社交媒体求救信息自动提取与定位/
├── 源码/                              ← 项目源代码（PROJ_ROOT = 本目录）
│   ├── 一键运行.bat                    ← 双击运行（零基础首选）
│   ├── requirements.txt               ← 依赖清单
│   ├── README.md                      ← 项目原始说明
│   ├── .env.example                   ← LLM 基线 API Key 模板（可选）
│   │
│   ├── src/                           ← 核心源码（17 个模块）
│   │   ├── config.py                  ← 集中配置：路径、标签、超参
│   │   ├── data/                      ← 数据构建 / 标注 / 预处理
│   │   │   ├── build_dataset.py       ←   生成原始数据集（288 条）
│   │   │   ├── annotate.py            ←   BIO 标注 + 划分 train/dev/test
│   │   │   ├── preprocess.py          ←   文本清洗（URL/@/emoji/繁简）
│   │   │   └── dataset.py             ←   PyTorch Dataset + Collate
│   │   ├── models/                    ← 模型定义
│   │   │   ├── bert_ner.py            ←   BERT + Linear (+ CRF) 模型
│   │   │   └── crf.py                 ←   纯 PyTorch CRF + Viterbi 解码
│   │   ├── baselines/                 ← 对照实验基线
│   │   │   ├── rule_based.py          ←   规则/词典基线（F1≈0.31）
│   │   │   └── llm_ner.py             ←   LLM few-shot 基线（需 API Key）
│   │   ├── geo/                       ← 地理编码
│   │   │   ├── build_geo_dict.py      ←   生成地名库（212 条）
│   │   │   ├── local_db.py            ←   本地最长匹配
│   │   │   ├── online_api.py          ←   高德/百度 API（可选）
│   │   │   └── geocoder.py            ←   统一接口：本地优先 → 在线回退
│   │   ├── train.py                   ← 训练入口（含 TensorBoard + 曲线图）
│   │   ├── evaluate.py                ← 评估（P/R/F1 + bad case）
│   │   ├── infer.py                   ← 推理（文本→实体→地理编码→CSV）
│   │   └── visualize.py               ← 求救点分布仪表盘（HTML）
│   │
│   ├── scripts/                       ← 辅助脚本
│   │   ├── run_all.bat / run_all.sh   ← 一键运行全流程（含训练）
│   │   ├── download_model.py          ← 下载 BERT 模型（如缺失）
│   │   ├── download_static.py         ← 下载地图静态资源
│   │   ├── start_tensorboard.bat      ← 启动 TensorBoard
│   │   └── regen_old_map.py           ← 还原旧版 folium 地图
│   │
│   ├── models/                        ← BERT 预训练权重（已内置，约 1.6GB）
│   │   └── AI-ModelScope/bert-base-chinese/
│   │
│   └── outputs/                       ← 运行产物
│       ├── checkpoints/bert_ner_best/ ← 训练好的模型（已内置，直接可用）
│       ├── maps/
│       │   ├── rescue_map.html        ← 求救点分布仪表盘（最终产物）
│       │   └── static/                ← 离线 JS/CSS（jquery/leaflet）
│       └── reports/                   ← 评估指标 / 训练曲线 / bad case
│
├── 数据集/                            ← 数据（已内置）
│   ├── raw/distress_messages_raw.jsonl  ← 原始求救文本（288 条）
│   ├── processed/
│   │   ├── train.jsonl / dev.jsonl / test.jsonl  ← BIO 标注数据
│   │   └── structured_results.csv     ← 结构化结果表（推理导出）
│   └── geo/china_geo_dict.json        ← 地名→经纬度字典（212 条）
│
├── 文档模板/                          ← 技术报告与汇报材料
│   ├── 社交媒体求救信息自动提取与定位-技术报告-1.doc
│   ├── 社交媒体求救信息自动提取与定位-技术报告-2.doc
│   └── 项目汇报.pptx
│
└── 复现指南.md                        ← 本文件
```

### Core Pipeline

The entire project is a deep learning pipeline with 6 stages:

```
数据构建 → BIO 标注 → BERT+CRF 训练 → 评估 → 推理 → 地理编码 + 可视化
   │           │            │            │        │            │
   ▼           ▼            ▼            ▼        ▼            ▼
 288条原始   train/dev    模型权重     F1=0.95   CSV 表格    HTML 仪表盘
 求救文本    /test 划分   (已内置)     (已内置)   (288 条)    (288 点地图)
```

### Core Technology

- **Model**: BERT (bert-base-chinese) + Linear layer + CRF (Conditional Random Field)
- **Task**: Sequence labeling (NER Named Entity Recognition), BIO annotation scheme
- **4 entity types**: LOC (location), PER (personnel), DIS (disaster situation), NEED (needs)
- **Evaluation**: seqeval strict entity-level evaluation (type + boundary must both match exactly)
- **Geocoding**: Local gazetteer of 212 entries (longest match) + Gaode/Baidu online API fallback
- **Visualization**: Leaflet + MarkerCluster + jQuery (all localized, 0 CDN references)

### Configuration Reference (src/config.py)

| Config Item | Default | Description |
|---|---|---|
| `DATA_DIR` | `../数据集/` | Dataset root directory |
| `BERT_MODEL_NAME` | Local `models/AI-ModelScope/bert-base-chinese` | Local weights preferred, falls back to online download |
| `MAX_LEN` | 128 | Maximum text length |
| `TRAIN_BATCH` / `EVAL_BATCH` | 16 / 32 | Training / evaluation batch size |
| `LEARNING_RATE` | 2e-5 | Learning rate |
| `NUM_EPOCHS` | 10 | Number of training epochs |
| `USE_CRF` | True | Whether to add CRF layer on top of BERT |
| `SPLIT_RATIO` | (0.7, 0.1, 0.2) | train / dev / test split ratio |

> If you encounter issues during reproduction, refer to `源码/README.md` for troubleshooting, or contact the project author.
