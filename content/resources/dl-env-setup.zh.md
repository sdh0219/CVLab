---
title: "深度学习环境配置入门：conda + PyTorch"
titleEn: "Getting Started with Deep-Learning Environments: conda + PyTorch"
summary: "面向新生的环境配置通识：用 conda 管理隔离环境、按显卡选择 PyTorch 版本、验证安装可用。"
category: setup
level: beginner
tags:
  - conda
  - PyTorch
  - 环境配置
order: 110
---

深度学习开发的第一步是配置一个干净、可复现的环境。本指南介绍通用的做法：用 conda 创建隔离环境，按显卡型号安装匹配的 PyTorch，最后验证 GPU 可用。

## 为什么用环境管理器

不同项目依赖不同版本的 PyTorch / CUDA，直接装在系统环境里迟早冲突。conda（或 venv）为每个项目创建独立环境，互不干扰，删除即净。建议从 [Miniconda](https://docs.conda.io/en/latest/miniconda.html) 开始，够轻量。

## 创建环境

```bash
# 创建名为 dl 的环境，指定 Python 版本
conda create -n dl python=3.10 -y
conda activate dl
```

Python 版本以项目 README 为准；3.10 是目前兼容性较好的选择。

## 安装 PyTorch

关键是**让 PyTorch 的 CUDA 版本与显卡驱动匹配**。先查驱动支持的上限：

```bash
nvidia-smi   # 右上角 CUDA Version 即驱动支持的最高 CUDA 版本
```

然后到 [PyTorch 官网](https://pytorch.org/get-started/locally/) 选择对应 CUDA 版本复制安装命令，例如：

```bash
# CUDA 12.1 示例（以官网命令为准）
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121

# 无 GPU 机器装 CPU 版
pip install torch torchvision
```

## 验证安装

```bash
python -c "import torch; print(torch.__version__, torch.cuda.is_available())"
```

输出 PyTorch 版本且 `cuda.is_available()` 为 `True` 即安装成功。

## 常见问题

- **`cuda.is_available()` 为 False**：PyTorch 版本与驱动不匹配（驱动过旧或装了 CPU 版），`nvidia-smi` 核对后重装对应版本。
- **下载慢**：配置国内 pip 镜像，或用 conda 渠道安装。
- **多项目依赖冲突**：一个项目一个环境，不要共用。

实验室服务器的具体配额、队列与镜像配置，请参考实验室内部说明或询问管理员。
