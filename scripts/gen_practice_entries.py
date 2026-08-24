# -*- coding: utf-8 -*-
"""生成 CVLab 网站 11 个项目实践条目（中英）+ 学习必读引导条目，删除 qd16。"""
import pathlib
from urllib.parse import quote

REPO = "https://github.com/sdh0219/CVLab-projects"

def guide_url(folder):
    return f"{REPO}/blob/main/{quote(folder)}/%E5%A4%8D%E7%8E%B0%E6%8C%87%E5%8D%97.md"

GUIDE_INTRO_URL = REPO + "/blob/main/%E5%AD%A6%E4%B9%A0%E5%BF%85%E8%AF%BB.md"

projects = [
    ("qd01-data-island-fusion", "QD01组_防灾减灾数据孤岛问题调研与AI解决方案设计",
     "防灾数据孤岛融合与 AI 看板", "Disaster Data Island Fusion & AI Dashboard",
     "把气象/地震/FEMA/人口脆弱性等 7 类公开数据清洗融合成统一数据表，并用 Streamlit 搭建风险评分与异常预警看板。适合学习数据工程与多源数据融合。",
     "Cleans and fuses 7 public data sources (weather, earthquakes, FEMA, CDC SVI, etc.) into unified tables, with a Streamlit dashboard for AI risk scoring and anomaly alerts. Great for learning data engineering.",
     "intermediate", ["数据融合", "Streamlit", "数据工程"], ["data fusion", "Streamlit", "data engineering"], 300),
    ("qd02-graphrag-knowledge-atlas", "QD02组_GraphRAG驱动的地震灾害AI关键技术图谱",
     "GraphRAG 地震灾害 AI 技术图谱", "GraphRAG Earthquake AI Knowledge Atlas",
     "把 49 篇地震防灾文献抽取成实体-关系知识图谱，支持全局/局部/查漏三种检索，并发布为可交互的网页图谱。适合学习 RAG 前沿与知识图谱。",
     "Extracts 49 earthquake-preparedness documents into an entity-relation knowledge graph with global/local/gap search, published as an interactive web atlas. Great for learning cutting-edge GraphRAG.",
     "advanced", ["GraphRAG", "知识图谱", "NLP"], ["GraphRAG", "knowledge graph", "NLP"], 301),
    ("qd03-rain-gauge-qc", "QD03组_雨量计异常数据清洗与修正",
     "雨量计异常数据清洗与修正", "Rain Gauge Anomaly Cleaning & Correction",
     "用物理规则 + 机器学习双重检测雨量计时序数据中的卡滞/尖峰/负值等 7 类异常并修正，带真值标签量化评估（F1 98.7%）。最适合入门的数据思维项目。",
     "Detects and repairs 7 types of rain gauge anomalies (stuck, spikes, negatives...) using physics rules plus ML, with ground-truth evaluation (F1 98.7%). The best first project for data thinking.",
     "beginner", ["数据清洗", "异常检测", "规则+ML"], ["data cleaning", "anomaly detection", "rules+ML"], 302),
    ("qd05-lstm-flood-forecast", "QD05组_基于LSTM的洪水水位监测",
     "基于 LSTM 的洪水水位监测", "LSTM Flood Water-Level Forecasting",
     "用 LSTM/BiLSTM 学习 18 年真实水文站数据，预测未来 24 小时水位并输出风险分级。经典的深度学习时间序列入门项目。",
     "Learns 18 years of real river-gauge data with LSTM/BiLSTM to forecast the next 24 hours of water levels with risk grading. A classic deep-learning time-series starter.",
     "intermediate", ["LSTM", "时间序列", "TensorFlow"], ["LSTM", "time series", "TensorFlow"], 303),
    ("qd09-earthquake-warning", "QD09组_个性化地震预警信息自动生成系统",
     "个性化地震预警信息生成系统", "Personalized Earthquake Warning System",
     "Flask 网页系统：按用户身份/年龄/位置，用规则引擎 + 震级分级 + 球面距离生成千人千面的地震预警文案。最适合入门的 Web 项目。",
     "A Flask web app that generates personalized earthquake warning texts via a rule engine, magnitude grading, and haversine distance. The best first web project.",
     "beginner", ["Flask", "规则引擎", "Web"], ["Flask", "rule engine", "web"], 304),
    ("qd12-social-media-rescue", "QD12组_社交媒体求救信息自动提取与定位",
     "社交媒体求救信息提取与定位", "Social Media Rescue Info Extraction & Mapping",
     "BERT+CRF 从求救文本抽取地点/人员/灾情/需求四类实体，本地地理编码后生成求救点交互地图（实体 F1 0.95）。最有含金量的 NLP 项目。",
     "BERT+CRF extracts location/person/disaster/need entities from distress texts, geocoded into an interactive rescue map (entity F1 0.95). The most substantial NLP project.",
     "advanced", ["BERT", "命名实体识别", "PyTorch"], ["BERT", "NER", "PyTorch"], 310),
    ("qd13-ga-supply-optimization", "QD13组_基于遗传算法的救援物资分配优化",
     "遗传算法救援物资分配优化", "GA-Based Relief Supply Optimization",
     "以河南 7·20 暴雨为背景，用增强型遗传算法求解多仓库-多灾点-多物资的五目标分配问题，配 Vue3+ECharts 可视化大屏。",
     "Solves the multi-warehouse, multi-victim, multi-supply 5-objective allocation problem with an enhanced genetic algorithm, visualized in a Vue3+ECharts dashboard.",
     "intermediate", ["遗传算法", "优化", "Vue3"], ["genetic algorithm", "optimization", "Vue3"], 320),
    ("qd14-rescue-routing", "QD14组_避开危险路段的救援路径规划",
     "避开危险路段的救援路径规划", "Hazard-Aware Rescue Route Planning",
     "在真实北京路网上叠加历史灾害缓冲区，用 Dijkstra 分别计算最短路与避危险路径并画图对比。全项目仅 1 个第三方依赖，最快的入门项目。",
     "Overlays historical disaster buffers on the real Beijing road network and compares shortest vs hazard-aware routes via Dijkstra. Only one third-party dependency—the quickest starter.",
     "beginner", ["Dijkstra", "路径规划", "GIS"], ["Dijkstra", "route planning", "GIS"], 330),
    ("qd15-emergency-command", "QD15组_AI应急指挥舱原型设计",
     "AI 应急指挥舱原型", "AI Emergency Command Prototype",
     "FastAPI+Vue3 前后端分离的指挥大屏：公开数据入库、地图/图表可视化、七步 AI 决策工作流（无 Key 自动降级为模拟）。完整的前后端工程实践。",
     "A FastAPI+Vue3 command dashboard: public data ingestion, map/chart visualization, and a 7-step AI decision workflow (auto-degrades to local simulation without an API key). Full-stack engineering practice.",
     "advanced", ["FastAPI", "Vue3", "前后端"], ["FastAPI", "Vue3", "full-stack"], 340),
    ("qd17-economic-recovery", "QD17组_灾后经济恢复周期预测",
     "灾后经济恢复周期预测", "Post-Disaster Economic Recovery Prediction",
     "把 USGS 地震目录、NOAA 损失库、BEA 州 GDP 拼成面板数据，用随机森林 vs GBDT 预测灾后经济恢复年数。表格数据机器学习完整流程。",
     "Fuses USGS earthquake catalog, NOAA losses, and BEA state GDP into a panel, predicting recovery years with Random Forest vs GBDT. The full tabular-ML workflow.",
     "beginner", ["随机森林", "机器学习", "sklearn"], ["random forest", "machine learning", "scikit-learn"], 360),
    ("qd18-debris-flow", "QD18组_AI辅助山区泥石流零死亡方案",
     "AI 辅助山区泥石流零死亡方案", "AI-Assisted Zero-Casualty Debris Flow Plan",
     "解密加密数据后读 12 层地理栅格，做 AHP 十因子易发性叠加、四级降雨预警模拟与村落-避难所转移规划。GIS 分析 + 加密授权机制教学。",
     "Decrypts the data, reads 12 GIS raster layers, and runs AHP susceptibility overlay, 4-level rainfall warning simulation, and village-to-shelter evacuation planning. GIS + crypto licensing.",
     "intermediate", ["AHP", "GIS栅格", "加密授权"], ["AHP", "GIS raster", "crypto"], 370),
]


def make_zh(d):
    tags = "\n".join("  - " + t for t in d[7])
    return (
        "---\n"
        f'title: "{d[2]}"\n'
        f'titleEn: "{d[3]}"\n'
        f'summary: "{d[4]}"\n'
        "category: practice\n"
        f"level: {d[6]}\n"
        "tags:\n" + tags + "\n"
        f'externalUrl: "{guide_url(d[1])}"\n'
        f"order: {d[9]}\n"
        "---\n\n"
        "本条目为外部项目：点击标题直达该项目在 GitHub 上的《复现指南》（源码与数据集同目录）。"
        f"全部 11 个项目的总览与建议学习顺序见[学习必读]({GUIDE_INTRO_URL})。\n"
    )


def make_en(d):
    tags = "\n".join("  - " + t for t in d[8])
    return (
        "---\n"
        f'title: "{d[3]}"\n'
        f'titleEn: "{d[3]}"\n'
        f'summary: "{d[5]}"\n'
        "category: practice\n"
        f"level: {d[6]}\n"
        "tags:\n" + tags + "\n"
        f'externalUrl: "{guide_url(d[1])}"\n'
        f"order: {d[9]}\n"
        "---\n\n"
        "External project entry: the title links directly to its reproduction guide on GitHub "
        "(source and datasets live in the same folder). See the "
        f"[study guide overview]({GUIDE_INTRO_URL}) for all 11 projects and a suggested learning order.\n"
    )


out = pathlib.Path("content/resources")
count = 0
for d in projects:
    (out / f"{d[0]}.zh.md").write_text(make_zh(d), encoding="utf-8")
    (out / f"{d[0]}.en.md").write_text(make_en(d), encoding="utf-8")
    count += 2

intro_zh = (
    "---\n"
    'title: "项目实践 · 学习必读（先读这一页）"\n'
    'titleEn: "Project Practice · Start Here"\n'
    'summary: "11 个实践项目的使用说明：怎么读指南、怎么下载项目、遇到报错怎么办，以及建议的学习顺序。做项目之前先花 10 分钟读它。"\n'
    "category: practice\n"
    "tags:\n  - 使用说明\n"
    f'externalUrl: "{GUIDE_INTRO_URL}"\n'
    "order: 299\n"
    "---\n\n外部链接：点击直达 GitHub 上的《学习必读》。\n"
)
intro_en = (
    "---\n"
    'title: "Project Practice · Start Here"\n'
    'titleEn: "Project Practice · Start Here"\n'
    'summary: "How to use the 11 practice projects: reading the guides, downloading, troubleshooting, and a suggested learning order. Spend 10 minutes here before starting."\n'
    "category: practice\n"
    "tags:\n  - guide\n"
    f'externalUrl: "{GUIDE_INTRO_URL}"\n'
    "order: 299\n"
    "---\n\nExternal link to the study guide overview on GitHub.\n"
)
(out / "practice-start-here.zh.md").write_text(intro_zh, encoding="utf-8")
(out / "practice-start-here.en.md").write_text(intro_en, encoding="utf-8")

for f in ["qd16-building-damage-gis.zh.md", "qd16-building-damage-gis.en.md"]:
    p = out / f
    if p.exists():
        p.unlink()
        print("deleted:", f)

print(f"written {count} project files + 2 intro files")
