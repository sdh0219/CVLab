---
title: "AI Emergency Command Cabin Prototype"
titleEn: "AI Emergency Command Cabin Prototype"
summary: "Disaster emergency command center dashboard visualization system with Python FastAPI backend and Vue3 frontend, displaying disaster distribution, rescue resources, and real-time situational awareness."
category: practice
level: intermediate
tags:
  - visualization
  - FastAPI
  - Vue3
  - emergency management
order: 340
---

## Download Resources

| Resource | Platform | Link | Notes |
|----------|----------|------|-------|
| All resources | GitHub | [CVLab-projects](https://github.com/sdh0219/CVLab-projects/tree/main/QD15组_AI应急指挥舱原型设计) | Source + datasets + templates, ready to use |

> **How to get**: Clone `git clone https://github.com/sdh0219/CVLab-projects.git`, enter `QD15组_AI应急指挥舱原型设计` directory.

---

> **This guide is written for people with zero programming experience.** Just follow the steps—you don't need to understand the code to reproduce it.
>
> **Fastest path**: Install Python + Node.js → double-click `源码\一键运行.bat` → open the dashboard in your browser. About 20 minutes total.

---

## Overview

This is a large-screen visualization system for disaster emergency command. It uses real public data (earthquakes, floods, and other disaster data) to display disaster distribution, rescue resources, real-time situational awareness, and more on a web dashboard.

The project uses a front-end/back-end separation architecture:
- **Backend**: Python FastAPI provides API endpoints (uses SQLite database, no need to install database software)
- **Frontend**: Vue3 dashboard interface (using ECharts charts + Leaflet maps)

**What you need:**

- A Windows computer
- Internet access (about 700 MB download for dependencies)
- Estimated time: **20 minutes** (first install), only 30 seconds for subsequent starts
- **No** Redis database required (the system has fault-tolerant handling)
- **No** OpenAI API key required (the dashboard displays normally; only AI decision-making features are unavailable)
- **No** MySQL/PostgreSQL required (uses built-in SQLite)

---

## Install Python

This project requires two tools: Python (backend) and Node.js (frontend).

### 1.1 Install Python

1. Visit https://www.python.org/downloads/
2. Download Python 3.10+
3. Double-click the installer, **check "Add Python to PATH"** at the bottom, click "Install Now"
4. Verify: press `Win + R` → type `cmd` → type `python --version` → version number displayed = success ✓

### 1.2 Install Node.js

1. Visit https://nodejs.org/
2. Download the **LTS version** (the button labeled "LTS")
3. Double-click to install, click "Next" through each step, then "Install", done
4. Verify: in cmd type `node --version` → version number displayed = success ✓

---

## Get Project Files

Please use the "Download Resources" table at the top of this page to obtain the project files.

---

## One-Click Run

### 3.1 Run

1. Enter the project's **`源码`** folder
2. Find **`一键运行.bat`**
3. **Double-click it**

### 3.2 Wait for automatic completion

The script will automatically:
1. Create a backend virtual environment and install dependencies (about 2 minutes, first time only)
2. Import data (about 10 seconds)
3. Install frontend dependencies (about 3 minutes, first time only)
4. Start the backend and frontend in two new windows

### 3.3 Open the dashboard

Wait for the two popup windows to show "running" for both backend and frontend:

1. Open a browser (Chrome recommended)
2. Visit: **http://localhost:5173**
3. See the AI Emergency Command Cabin dashboard = success ✓

### 3.4 Stop services

Close the two black popup windows.

---

## Step-by-Step Run

### 4.1 Backend

Open cmd, enter the backend directory:

```
cd /d D:\你的路径\15组_AI应急指挥舱原型设计\源码\backend
```

Create a virtual environment and install dependencies:

```
python -m venv .venv
".venv\Scripts\python.exe" -m pip install -r requirements.txt
```

Import data:

```
".venv\Scripts\python.exe" import_real_data.py
```

Start the backend:

```
".venv\Scripts\python.exe" -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

After the backend starts, API docs are at http://localhost:8000/docs

### 4.2 Frontend

**Open a new cmd window**, enter the frontend directory:

```
cd /d D:\你的路径\15组_AI应急指挥舱原型设计\源码\frontend
```

Install dependencies and start:

```
npm install
npm run dev
```

After the frontend starts, visit http://localhost:5173

> **Note**: The backend and frontend must run simultaneously (neither window can be closed). Start the backend first, then the frontend.

---

## View Results

### 5.1 Dashboard Interface

Visit http://localhost:5173 in your browser to see:
- **Map layers**: disaster distribution, rescue resource locations
- **Statistical charts**: counts of each disaster type, rescue progress
- **Real-time data**: fetched from the backend API

### 5.2 API Endpoints

Visit http://localhost:8000/docs to see all API endpoint documentation, which you can test directly.

---

## Troubleshooting

### Error Reference Table

| Error Message | Cause | Solution |
|---|---|---|
| `'python' 不是内部或外部命令` | Python not installed or not in PATH | Reinstall Python, check "Add Python to PATH" |
| `'node' 不是内部或外部命令` | Node.js not installed | Install Node.js LTS version |
| `npm install` is slow or fails | Network issues | Use a domestic mirror: `npm config set registry https://registry.npmmirror.com` |
| `pip install` is slow | Network issues | Add mirror: `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple` |
| `ModuleNotFoundError` | Dependencies not fully installed | Double-click `一键运行.bat` again, or manually run `pip install -r requirements.txt` |
| Blank page on port 5173 | Backend not started | Check if the backend window is running; start backend first, then frontend |
| `Port 5173 already in use` | Port 5173 is occupied | Close other programs that may use this port, or change the port in `vite.config.ts` |
| `Port 8000 already in use` | Port 8000 is occupied | Close other programs that may use this port |
| Frontend reports `Network Error` | Backend not started or CORS issue | Ensure backend is running on port 8000 |

### FAQ

**Q: Can I use it without Redis?**
A: Yes. The system has fault-tolerant handling; when Redis is unavailable, caching degrades gracefully and the dashboard displays normally.

**Q: Can I use it without an OpenAI key?**
A: Yes. All data display features work normally; only the "AI decision suggestions" feature is unavailable.

**Q: Can I close the two windows?**
A: No. The backend and frontend windows provide API and page services respectively; closing them stops the service. Closing a window = stopping the service.

**Q: Do I need to reinstall next time?**
A: No. Dependencies are installed only once; next time just double-click `一键运行.bat` to start directly.

**Q: How can I let others access it?**
A: The backend is already bound to `0.0.0.0:8000`; other devices on the same LAN can access it via your IP. The frontend requires additional configuration.

---

## Project Structure

```
15组_AI应急指挥舱原型设计/
├── 源码/
│   ├── 一键运行.bat              ← Beginner entry point
│   ├── backend/                  ← Backend (Python FastAPI)
│   │   ├── main.py               ← Backend entry (uvicorn main:app)
│   │   ├── requirements.txt       ← Backend dependencies
│   │   ├── import_real_data.py    ← Data import script
│   │   └── app/
│   │       ├── api/              ← API routes (dashboard data endpoints)
│   │       ├── models/           ← Data models
│   │       ├── services/         ← Business logic (including AI services)
│   │       ├── utils/cache.py    ← Redis cache (fault-tolerant, works without Redis)
│   │       ├── config.py         ← Configuration (SQLite + Redis URL + OpenAI key)
│   │       └── database.py       ← Database initialization (SQLite)
│   └── frontend/                 ← Frontend (Vue3 + Vite)
│       ├── package.json          ← Frontend dependencies
│       ├── src/
│       │   ├── views/           ← Page components (dashboard layout)
│       │   ├── components/       ← Charts, maps, and other components
│       │   └── api/             ← Backend API calls
│       └── vite.config.ts        ← Vite config
├── 数据集/                        ← Real public disaster data
├── 文档模板/
└── 复现指南.md
```

### Tech Stack

- **Backend**: FastAPI + SQLAlchemy + Pydantic + Redis (optional) + OpenAI (optional)
- **Frontend**: Vue3 + Vite + Element Plus + ECharts + Leaflet
- **Database**: SQLite (built-in, no installation needed)
- **Dashboard**: ECharts charts + Leaflet maps

### Degradation Notes

| Component | Required? | Impact if not installed |
|---|---|---|
| Python + Node.js | Required | Cannot run |
| SQLite | Required (but built-in) | No additional installation needed |
| Redis | **Optional** | Caching degrades, dashboard works normally |
| OpenAI API key | **Optional** | AI decision features unavailable, dashboard works normally |
| MySQL/PostgreSQL | **Not needed** | Project uses SQLite |

> If you encounter issues during reproduction, refer to `源码/backend/README.md` or `源码/frontend/README.md` for troubleshooting.
