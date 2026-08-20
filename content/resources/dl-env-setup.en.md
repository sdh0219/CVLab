---
title: "Getting Started with Deep-Learning Environments: conda + PyTorch"
titleEn: "Getting Started with Deep-Learning Environments: conda + PyTorch"
summary: "A beginner's guide to isolated environments with conda, choosing the right PyTorch build for your GPU, and verifying the install."
category: setup
level: beginner
tags:
  - conda
  - PyTorch
  - environment
order: 110
---

The first step of deep-learning development is a clean, reproducible environment. This guide covers the standard approach: create an isolated environment with conda, install a PyTorch build matching your GPU, and verify that CUDA works.

## Why an environment manager

Different projects need different PyTorch / CUDA versions; installing into the system Python eventually conflicts. conda (or venv) gives each project its own environment that can be removed cleanly. [Miniconda](https://docs.conda.io/en/latest/miniconda.html) is a lightweight starting point.

## Create an environment

```bash
conda create -n dl python=3.10 -y
conda activate dl
```

Follow the project README for the Python version; 3.10 is a safe default today.

## Install PyTorch

The key is **matching the PyTorch CUDA build to your driver**. Check the driver ceiling first:

```bash
nvidia-smi   # the CUDA Version at top-right is the max the driver supports
```

Then pick the matching command from the [PyTorch website](https://pytorch.org/get-started/locally/), e.g.:

```bash
# CUDA 12.1 example (always use the command from the official site)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121

# CPU-only machines
pip install torch torchvision
```

## Verify the install

```bash
python -c "import torch; print(torch.__version__, torch.cuda.is_available())"
```

A PyTorch version plus `cuda.is_available()` returning `True` means success.

## FAQ

- **`cuda.is_available()` is False**: the build and driver mismatch (old driver, or a CPU build). Recheck `nvidia-smi` and reinstall the matching build.
- **Slow downloads**: configure a local pip mirror or use conda channels.
- **Dependency conflicts across projects**: one environment per project; never share.

For lab-server quotas, queues, and mirror configuration, see the lab's internal notes or ask the administrator.
