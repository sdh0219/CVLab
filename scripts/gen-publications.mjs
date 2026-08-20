// 一次性脚本：根据导师主页公开论文清单批量生成 publications 内容文件。
// 用法：node scripts/gen-publications.mjs（重复运行会覆盖已有文件）
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'publications');

// zone: [zh, en]
const papers = [
  { slug: 'bayes-earthquake-prediction', year: 2025, title: 'Research on Machine Learning Methods for Earthquake Prediction Based on Bayes Theory', authors: ['Yuan J.', 'Zhang X.'], venue: 'Pure and Applied Geophysics', zone: ['SCI 三区', 'SCI Q3'] },
  { slug: 'cses-whistler-morphology', year: 2025, title: 'Extraction and morphology analysis of whistlers based on the CSES satellite data', authors: ['Yuan J.', 'Chen Y. T.', 'Shen X. H.', 'et al.'], venue: 'Earth and Planetary Physics', zone: ['SCI 二区', 'SCI Q2'] },
  { slug: 'wider-whistler-radio-science', year: 2024, title: 'A New Wider Whistler Detection Method for Electromagnetic Satellite Observations', authors: ['Yuan J.', 'Zhou B.', 'Shen X.', 'et al.'], venue: 'Radio Science', zone: ['SCI 三区', 'SCI Q3'] },
  { slug: 'animal-behavior-survey', year: 2024, title: '监测地震前动物宏观行为异常的智能识别技术综述', authors: ['袁静', '等'], venue: '地球物理学报', venueEn: 'Chinese Journal of Geophysics', zone: ['EI', 'EI'], zhPaper: true },
  { slug: 'insulator-yolov8', year: 2024, title: 'Research on Insulator Defect Detection Algorithm Based on Improved YOLOv8', authors: ['Wang Y.', 'Yuan J.', 'et al.'], venue: 'Journal of Electrical Engineering & Technology', zone: ['SCI 四区', 'SCI Q4'] },
  { slug: 'u-tsrnet', year: 2024, title: 'U-TSRNet: A U-shaped Network for Real-time Cloud Removal from Videos', authors: ['Zhang W.', 'Yuan J.', 'et al.'], venue: 'The Visual Computer', zone: ['SCI 三区', 'SCI Q3'], corresponding: true },
  { slug: 'weak-whistler-tim', year: 2024, title: 'Weak Whistler Detection and Classification Method Based on Deep Learning', authors: ['Yuan J.', 'et al.'], venue: 'IEEE Transactions on Instrumentation and Measurement', zone: ['SCI 二区', 'SCI Q2'] },
  { slug: 'wider-band-whistler-zh', year: 2024, title: '电磁卫星观测中的更宽频带哨声波探测方法', authors: ['袁静', '等'], venue: '地球物理学报', venueEn: 'Chinese Journal of Geophysics', zone: ['EI', 'EI'], zhPaper: true },
  { slug: 'cses-whistler-extraction-zh', year: 2024, title: '基于张衡一号电磁卫星数据的哨声波智能提取方法', authors: ['袁静', 'et al.'], venue: '地球物理学报', venueEn: 'Chinese Journal of Geophysics', zone: ['EI', 'EI'], zhPaper: true },
  { slug: 'satellite-em-overview', year: 2024, title: 'Overview of Satellite Electromagnetic Observation and Anomaly Information Extraction Methods', authors: ['Yuan J.', 'et al.'], venue: 'Earthquake Science', zone: ['SCI', 'SCI'] },
  { slug: 'lightning-whistler-analysis-zh', year: 2024, title: '基于张衡一号卫星观测的闪电哨声波提取及分析', authors: ['袁静', '等'], venue: '地球物理学报', venueEn: 'Chinese Journal of Geophysics', zone: ['EI', 'EI'], zhPaper: true },
  { slug: 'dl-whistler-jgr', year: 2023, title: 'Deep learning-based whistler detection method', authors: ['Yuan J.', 'et al.'], venue: 'Journal of Geophysical Research: Space Physics', zone: ['SCI 二区 · Top 期刊', 'SCI Q2 · Top journal'] },
  { slug: 'transformer-whistler', year: 2023, title: 'Transformer Architecture for Whistler Detection and Classification', authors: ['Yuan J.', 'et al.'], venue: 'Remote Sensing', zone: ['SCI 二区', 'SCI Q2'] },
  { slug: 'casualty-prediction-review', year: 2023, title: 'A Review of Earthquake Casualty Prediction', authors: ['Yuan J.', 'et al.'], venue: 'Pure and Applied Geophysics', zone: ['SCI 三区', 'SCI Q3'] },
  { slug: 'virtual-seismograph', year: 2023, title: 'Video-Based Method for Virtual Seismograph', authors: ['Yuan J.', 'et al.'], venue: 'IEEE Geoscience and Remote Sensing Letters', zone: ['SCI 二区', 'SCI Q2'] },
  { slug: 'dual-channel-whistler', year: 2023, title: 'A Dual-Channel Detection Method for Weak Whistlers', authors: ['Yuan J.', 'et al.'], venue: 'Radio Science', zone: ['SCI 三区', 'SCI Q3'] },
  { slug: 'insulator-yolov5-zh', year: 2023, title: '基于改进 YOLOv5 的绝缘子故障检测', authors: ['袁静', '等'], venue: '电力科学与技术学报', venueEn: 'Journal of Electric Power Science and Technology', zhPaper: true },
  { slug: 'bird-nest-yolov5s', year: 2023, title: '基于改进 YOLOv5s 的鸟巢检测', authors: ['袁静', '等'], venue: '电测与仪表', venueEn: 'Electrical Measurement & Instrumentation', zhPaper: true },
  { slug: 'dl-seismic-monitoring-review', year: 2023, title: '深度学习在地震监测中的应用研究综述', authors: ['袁静', '等'], venue: '地球物理学进展', venueEn: 'Progress in Geophysics', zhPaper: true },
  { slug: 'video-building-damage', year: 2023, title: '基于视频智能分析技术的房屋震害预测方法', authors: ['袁静', '等'], venue: '地球物理学报', venueEn: 'Chinese Journal of Geophysics', zone: ['EI', 'EI'], zhPaper: true },
  { slug: 'earthquake-casualty-review-zh', year: 2023, title: '地震人员伤亡预测研究综述', authors: ['袁静', '等'], venue: '地球物理学进展', venueEn: 'Progress in Geophysics', zhPaper: true },
  { slug: 'cses-whistler-extraction-2022', year: 2022, title: 'Deep-Learning-Based CSES Whistler Extraction Method', authors: ['Yuan J.', 'et al.'], venue: 'Radio Science', zone: ['SCI 三区', 'SCI Q3'] },
  { slug: 'post-earthquake-relief-zh', year: 2022, title: '基于深度学习的震后应急物资配送', authors: ['袁静', 'et al.'], venue: '地震科学进展', venueEn: 'Progress in Earthquake Science', zhPaper: true },
  { slug: 'well-logging-ml', year: 2020, title: '几种经典机器学习算法在测井物性预测中的应用', authors: ['袁静', '等'], venue: '地球物理学进展', venueEn: 'Progress in Geophysics', zhPaper: true },
  { slug: 'smart-seismograph', year: 2019, title: 'A Fully-Automated Smart Seismograph Based on Machine Vision', authors: ['Yuan J.', 'et al.'], venue: 'Sensors', zone: ['SCI 三区', 'SCI Q3'] },
  { slug: 'smart-seismograph-zh', year: 2019, title: '基于机器视觉的智能地震监测系统设计', authors: ['袁静', '等'], venue: '传感技术学报', venueEn: 'Chinese Journal of Sensors and Actuators', zone: ['EI', 'EI'], zhPaper: true },
  { slug: 'pat-image-restoration', year: 2019, title: '基于多智能体强化学习的光声层析图像复原', authors: ['袁静', '等'], venue: '光学精密工程', venueEn: 'Optics and Precision Engineering', zone: ['EI', 'EI'], zhPaper: true },
  { slug: 'harmonic-time-freq', year: 2009, title: '时频分析在电力谐波检测中的应用研究', authors: ['袁静', '等'], venue: '电测与仪表', venueEn: 'Electrical Measurement & Instrumentation', zhPaper: true },
];

mkdirSync(outDir, { recursive: true });
for (const p of papers) {
  for (const locale of ['zh', 'en']) {
    const fm = [
      '---',
      `title: ${JSON.stringify(p.title)}`,
      `authors:`,
      ...p.authors.map((a) => `  - ${JSON.stringify(a)}`),
      `venue: ${JSON.stringify(locale === 'en' && p.venueEn ? p.venueEn : p.venue)}`,
      `year: ${p.year}`,
      `type: article`,
    ];
    if (p.zone) fm.push(`zone: ${JSON.stringify(p.zone[locale === 'zh' ? 0 : 1])}`);
    if (p.corresponding) fm.push('correspondingAuthor: true');
    fm.push('---\n');
    writeFileSync(join(outDir, `${p.slug}.${locale}.md`), fm.join('\n'), 'utf-8');
  }
}
console.log(`written ${papers.length * 2} files`);
