---
title: "Post-Disaster Economic Recovery Cycle Prediction"
titleEn: "Post-Disaster Economic Recovery Cycle Prediction"
summary: "Uses machine learning to predict post-earthquake regional economic recovery years, feeding USGS earthquake catalogs, NOAA loss data, and BEA GDP into Random Forest and GBDT models for comparison, with auto-generated PPT."
category: practice
level: beginner
tags:
  - machine learning
  - economic prediction
  - scikit-learn
order: 360
---

## Download Resources

| Resource | Platform | Link | Notes |
|----------|----------|------|-------|
| All resources | GitHub | [CVLab-projects](https://github.com/sdh0219/CVLab-projects/tree/main/QD17组_灾后经济恢复周期预测) | Source + datasets + templates, ready to use |
| All resources (China mirror) | Gitee | [cvlab_yuan](https://gitee.com/susu1843/cvlab_yuan) | Clone from Gitee for faster access in China, includes all data |

> **How to get**: Clone `git clone https://github.com/sdh0219/CVLab-projects.git` (or `git clone https://gitee.com/susu1843/cvlab_yuan.git` in China), enter `QD17组_灾后经济恢复周期预测` directory.

# Post-Disaster Economic Recovery Cycle Prediction · Beginner's Reproduction Guide

> **This guide is written for people with absolutely no programming experience.** Just follow the steps — you don't need to understand any code to complete the reproduction.
>
> If you just want to see results as fast as possible, jump straight to **Chapter 3 One-Click Run** (just double-click one file).

---

## Overview

This project uses machine learning to predict **how many years it takes for a region's economy to recover after an earthquake**.

In short: after an earthquake strikes, local GDP drops and then recovers year by year. This project feeds US historical earthquake and state-level GDP data into a model, teaching it to predict "how many years to recover."

- **Data sources**: USGS earthquake catalog, NOAA significant earthquake loss database, BEA (U.S. Bureau of Economic Analysis) state-level GDP — all public data, **pre-included in the project, no need to download yourself**
- **Models**: Trains two tree-based models (Random Forest + Gradient Boosting Tree) and compares which one predicts more accurately
- **Output**: Model evaluation metrics, confusion matrix plots, feature importance plots, and an **auto-generated presentation PPT**

**What you need:**

- A Windows computer (Mac/Linux also works, but the steps below use Windows as an example)
- Internet access (needed when installing dependencies)
- Estimated time: **about 8 minutes** (from scratch, including Python installation); **about 5 minutes** (if Python is already installed)

---

## Install Python (skip if already installed)

### 1.1 Download Python

1. Open your browser and visit: https://www.python.org/downloads/
2. Click the yellow **"Download Python 3.x.x"** button on the page
3. Wait for the download to complete (file is about 25 MB)

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
| 1/8 | Create Python virtual environment | ~30 seconds (first time only) |
| 2/8 | Install dependencies (pandas / scikit-learn, etc.) | ~1 minute (first time only) |
| 3/8 | Set up data directory link | A few seconds |
| 4/8 | Generate exploratory integrated data | ~10 seconds |
| 5/8 | Generate modeling dataset (1500 rows) | ~10 seconds |
| 6/8 | Train Gradient Boosting Tree model | ~1-2 minutes |
| 7/8 | Train Random Forest model | ~1-2 minutes |
| 8/8 | Generate presentation PPT | ~10 seconds |

> Step 3 "Set up data directory link" is so the code can find the data in the `数据集\` folder. It's done automatically by the script — you don't need to worry about it.

### 3.3 What you'll see when it succeeds

The window will finally display:

```
============================================================
  运行完成！

  主要结果文件：
    源码\地震灾后经济恢复周期预测汇报.pptx        ← 汇报 PPT（双击用 PowerPoint 打开）
    源码\outputs\gradient_boosting_recovery_1500_improved_balanced\  ← GBDT 结果
    源码\outputs\random_forest_recovery_1500\      ← RF 结果
    ...
============================================================
```

Press any key to close the window, then go to **Chapter 5** to view the results.

---

## Step-by-Step Run (if you want to understand what each step does)

If you want to run things manually, follow these steps. **Each step can be copied and pasted directly into the command line.**

### 4.1 Open the command line

1. Press `Win + R`, type `cmd`, press Enter
2. Use the `cd` command to navigate to the project's source directory (replace the path with your actual path):

   ```
   cd /d D:\你的路径\17组_灾后经济恢复周期预测\源码
   ```

### 4.2 Create a virtual environment and install dependencies

```
python -m venv .venv
".venv\Scripts\python.exe" -m pip install -r requirements.txt
```

> **What is a virtual environment?** It's an isolated Python environment folder (`.venv`). Dependencies installed here won't affect other Python projects on your computer.
>
> If installation is slow or fails, you can switch to a domestic mirror by replacing the second command with:
> ```
> ".venv\Scripts\python.exe" -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
> ```

### 4.3 Set up the data directory link (critical, only needed once)

The code reads data from `源码\data\` by default, but the data is actually in `数据集\`. The following command links `数据集` as `源码\data` so the code can find the data:

```
mklink /J data "..\数据集"
```

> `mklink /J` is a built-in Windows directory junction command. Regular users can execute it — **no administrator privileges needed** — and it doesn't copy data. After successful execution, `源码\data\raw` is equivalent to `数据集\raw`. **You only need to do this once; no need to repeat it for subsequent runs.**

### 4.4 (Optional) Download raw data

The data is already included in `数据集\raw\`, so **you can usually skip this step**. If you really want to re-download the latest data:

```
".venv\Scripts\python.exe" download_data.py
```

Data sources (all free and public):
- USGS earthquake catalog: https://earthquake.usgs.gov/
- NOAA significant earthquake database: https://www.ngdc.noaa.gov/
- BEA regional economic accounts: https://apps.bea.gov/

> Downloading depends on the network and may be slow or occasionally fail. It's okay if it fails — just use the built-in data to continue.

### 4.5 Generate exploratory integrated data

```
".venv\Scripts\python.exe" process_data.py
```

### 4.6 Generate modeling dataset (1500 rows)

```
".venv\Scripts\python.exe" prepare_rf_recovery_dataset.py --limit 1500 --output earthquake_rf_recovery_dataset_1500.csv
```

### 4.7 Train Gradient Boosting Tree (GBDT)

```
".venv\Scripts\python.exe" train_gradient_boosting_recovery.py
```

> The results from this step are in `outputs\gradient_boosting_recovery_1500_improved_balanced\`. **The next step's PPT depends on it**, so you must train GBDT first.

### 4.8 Train Random Forest (RF)

For easy comparison with GBDT, the Random Forest here uses the same 1500-row dataset:

```
".venv\Scripts\python.exe" train_random_forest_recovery.py --data-path "data\processed\earthquake_rf_recovery_dataset_1500.csv" --feature-path "data\processed\earthquake_recovery_feature_columns.txt" --output-dir "outputs\random_forest_recovery_1500"
```

> These three `--xxx` parameters tell the script which dataset to use, which feature list, and where to save results. The one-click run script already has these parameters set up automatically — just copy them verbatim when running manually.

### 4.9 Generate presentation PPT

```
".venv\Scripts\python.exe" generate_recovery_ppt.py
```

### 4.10 (Optional) Generate GBDT principle flowchart

```
".venv\Scripts\python.exe" create_gbdt_principle_flowchart.py
```

---

## View Results

### 5.1 Where are the result files

After running is complete, results are saved in the **`源码\`** directory:

```
源码/
├── 地震灾后经济恢复周期预测汇报.pptx          ← 最重要的成果：汇报 PPT
├── outputs/
│   ├── gradient_boosting_recovery_1500_improved_balanced/   ← GBDT 结果
│   │   ├── metrics.json                 模型评估指标（准确率 / F1）
│   │   ├── classification_report.txt    分类报告
│   │   ├── confusion_matrix.png         混淆矩阵图
│   │   ├── feature_importance_top20.png 特征重要性图
│   │   ├── target_distribution.png      目标变量分布图
│   │   ├── test_predictions.csv         测试集预测结果
│   │   └── gradient_boosting_recovery_model.joblib  训练好的模型
│   ├── random_forest_recovery_1500/      ← 随机森林结果（文件类型同上）
│   └── presentation/
│       ├── charts/                      ← PPT 用到的 10 张配图
│       └── policy_scenario_results.csv  ← 政策情景对比结果
└── dpf/
    └── gbdt_principle_flowchart_hd.png   ← GBDT 原理流程图（可选）
```

### 5.2 How to open them

- **.pptx files**: Double-click to open with PowerPoint (or WPS) — it's a 13-page presentation
- **.png files**: Double-click to open with an image viewer — you'll see confusion matrices, feature importance charts, etc.
- **.json files**: Open with Notepad — you'll see model accuracy, F1, and other evaluation metrics
- **.csv files**: Open with Excel — you'll see prediction result data
- **.txt files**: Open with Notepad — you'll see per-class precision/recall

### 5.3 Expected results

| Model | Prediction target | Output | How to evaluate |
|---|---|---|---|
| Gradient Boosting Tree (GBDT) | 0-4 year post-disaster recovery cycle | `metrics.json`, confusion matrix plot | Open `metrics.json` to check `accuracy` and `f1`; open `confusion_matrix.png` to see if each class is predicted correctly |
| Random Forest (RF) | Same as above | Same as above (in a different directory) | Compare with GBDT to see which is more accurate |

Meaning of model prediction labels:

- `0` = GDP recovered in the earthquake year itself
- `1` = recovered within 1 year post-disaster
- `2` = recovered within 2 years post-disaster
- `3` = recovered within 3 years post-disaster
- `4` = not recovered within 3 years

> Specific accuracy values are based on the actual `metrics.json` output (different scikit-learn versions may have slight differences), but both models running successfully and generating complete results counts as a successful reproduction.

---

## Troubleshooting

### Error reference table

| Error message | Cause | Solution |
|---|---|---|
| `'python' 不是内部或外部命令` | Python not installed or not in PATH | Reinstall Python, make sure to check "Add Python to PATH" |
| `ModuleNotFoundError: No module named 'pandas'` etc. | Dependencies not installed | Double-click `一键运行.bat` to re-run; or manually run `".venv\Scripts\python.exe" -m pip install -r requirements.txt` |
| `FileNotFoundError: ... data\raw\...` | Data directory link not set up | Run `mklink /J data "..\数据集"` in the `源码\` directory |
| `Feature columns are missing from dataset` | Random Forest used old version data | Use the command with `--data-path` parameter from section 4.8 to use the 1500-row dataset |
| PPT generation failed / `FileNotFoundError: ...joblib` | Didn't train GBDT first | You must run GBDT training (section 4.7) first, then generate PPT (section 4.9) |
| `OneHotEncoder ... 'sparse_output'` parameter error | scikit-learn version too old | Upgrade to scikit-learn 1.2+: `pip install -U scikit-learn` |
| Chinese characters show as boxes in charts | System missing Chinese fonts | Windows usually has "Microsoft YaHei" built in, so this rarely happens; if it does, install a Chinese font |
| `download_data.py` network failure | BEA / USGS / NOAA API fluctuations | Data is built in, just skip the download; or retry |
| Black window closes immediately | Runtime error | In cmd, manually `cd /d` to the source path and run `一键运行.bat` to see the full error |

### Frequently asked questions

**Q: Can I avoid using the command line?**
A: Yes. Just double-click `一键运行.bat` — no need to type any commands manually.

**Q: Do I need to reinstall for the second run?**
A: No. The virtual environment, dependencies, and data link are set up only once. Subsequent runs jump straight to the training step.

**Q: The results (accuracy) differ between two runs?**
A: The script has a fixed random seed (42), so results are reproducible with the same dependency versions. If you change the scikit-learn version, values may vary slightly, but the model running successfully and generating a PPT counts as a successful reproduction.

**Q: What if I want Random Forest and Gradient Boosting Tree to use different data?**
A: This guide uses the same 1500-row dataset for both models for easy comparison. If you want Random Forest to use 2000 rows, first run `prepare_rf_recovery_dataset.py --limit 2000`, then run `train_random_forest_recovery.py` without the `--data-path` parameter.

**Q: What if I want to change the recovery cycle window (e.g., look at 5 years post-disaster)?**
A: Run `prepare_rf_recovery_dataset.py --limit 1500 --output earthquake_rf_recovery_dataset_1500.csv --max-horizon 5` (default is 3 years). Note that the larger the window, the fewer available samples.

---

## Project Structure (optional reading)

```
17组_灾后经济恢复周期预测/
├── 源码/                                ← 全部 Python 代码
│   ├── 一键运行.bat                     ← 双击运行（零基础首选）
│   ├── requirements.txt                 ← 依赖清单
│   ├── download_data.py                 ← 数据下载（USGS/NOAA/BEA，已内置可选）
│   ├── process_data.py                  ← 探索性整合数据生成（2000 行）
│   ├── prepare_rf_recovery_dataset.py   ← 建模数据集与恢复周期标签生成
│   ├── train_random_forest_recovery.py  ← 随机森林训练
│   ├── train_gradient_boosting_recovery.py ← 梯度提升树训练（PPT 依赖其输出）
│   ├── generate_recovery_ppt.py          ← 汇报 PPT 自动生成
│   ├── create_gbdt_principle_flowchart.py ← GBDT 原理流程图
│   └── README.md                         ← 项目原始说明
├── 数据集/                              ← 数据已内置
│   ├── raw/                             ← 原始下载数据
│   │   ├── usgs_earthquakes_usa_m45_1990_2026.csv   ← USGS M4.5+ 地震事件
│   │   ├── noaa_ncei_significant_earthquakes_usa_1990_2026.csv ← NOAA 重大地震损失
│   │   ├── bea_sagdp1_all_areas_1997_2025.csv       ← BEA 州级 GDP 总量
│   │   ├── bea_sagdp2_all_areas_1997_2025.csv       ← BEA 州级行业 GDP
│   │   └── bea_sagdp_1997_2025.zip                  ← BEA 原始压缩包
│   ├── processed/                       ← 处理后建模数据
│   │   ├── earthquake_rf_recovery_dataset_1500.csv  ← 1500 行主建模数据
│   │   ├── earthquake_recovery_feature_columns.txt  ← 43 个输入特征清单
│   │   └── ...（其余为中间产物）
│   └── dataset_summary.json            ← 数据下载摘要
├── 文档模板/                            ← 技术方案与汇报模板
│   ├── 灾后经济恢复周期预测-技术方案.doc
│   └── 地震灾后经济恢复周期预测汇报.pptx
└── 复现指南.md                          ← 本文件
```

### Core approach

- **Recovery cycle labels**: Using the actual GDP from the year before the disaster as a baseline, if GDP returns to or exceeds the baseline in the disaster year or post-disaster year 1/2/3, it's labeled as 0/1/2/3 year recovery respectively; not recovering within 3 years is labeled as 4. Labels are objectively calculated from BEA actual GDP, avoiding subjective manual annotation.
- **Prediction task**: 5-class (0–4) multi-class classification problem.
- **Model comparison**: Random Forest (ensemble of independent trees voting) vs. Gradient Boosting Tree (each tree corrects the previous tree's errors). Both enable class weighting to handle the imbalance of "recovered in the same year (class 0) being over-represented."
- **Strict validation**: Training/test sets are split by "region + year" grouping to prevent data leakage from samples of the same region and year appearing in both training and test sets.
- **Presentation PPT**: Based on the Gradient Boosting Tree results, automatically draws 10 charts and assembles them into a 13-page presentation.

> If you encounter issues during reproduction, check `源码/README.md` for troubleshooting, or contact the project provider.
