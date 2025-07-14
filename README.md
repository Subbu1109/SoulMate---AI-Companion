# 💞 SoulMate.AGI – Your Emotional Wellness Companion

## 📌 Description

**SoulMate.AGI** is a comprehensive AI-powered mental wellness assistant that blends **emotion detection**, **interactive chat**, **multi-lingual voice input**, **personal journaling with sentiment scoring**, and **analytics**—all into a seamless web experience.

Whether you're feeling overwhelmed, joyful, or reflective, SoulMate.AGI listens, understands, and supports you with intelligent features driven by computer vision, NLP, and speech recognition.

---

## 🎯 Purpose

Mental health challenges are growing, and access to personalized, empathetic care remains limited. SoulMate.AGI aims to:
- 👀 **Understand their emotions** in real time
- 🗣️ **Talk to an emotional support companion**
- 📓 **Reflect on daily feelings via a sentiment diary**
- 🎤 **Use multi-lingual voice input to journal hands-free**
- 🌍 **Experience multilingual emotional tracking**
- 📊 **View emotional trends with analytics**
- 🧘‍♀️ **Provide breathing exercises, daily wellness tips, guided relaxation sessions, and yoga content for inner balance**

---

## 🗂️ Project Directory Structure

```bash
SOULMATE/
│
├── backend/                    # Flask backend server
│   └── main.py
│
├── chatbot/                    # AI mental health chat logic
│   └── chat.py
│
├── emotion_detection/         # CNN emotion detection model
│   ├── emotion_model.h5
│   ├── emotion_detection_cam.py
│   ├── test_camera.py
│   └── *.jpg (sample training images)
│
├── speech_text/               # Speech-to-text using google translate
│   └── speech_wo_auto.py
│
├── frontend/                  # Next.js + Tailwind frontend
│   ├── about/
│   ├── analytics/
│   ├── chat/
│   ├── diary/
│   ├── wellness/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── components/
│
├── venv/                      # Python virtual environment
│
├── requirements.txt           # Python dependencies
├── speech_to_text.py          # Standalone speech module
├── .gitignore
├── LISENCE
└── README.md
```

---

## Steps to Execute the Project

### 1. Setup Environment

a. **Create a virtual environment:**

```bash
python -m venv venv
```

b. **Activate your virtual environment:**

- **Windows:**
```bash
.venv\Scripts\activate
```

---

### 2. Install Dependencies

c. **Install from `requirements.txt`:**

```bash
pip install -r requirements.txt
```

---
## Execute the plug-ins (Chatbot, Camera, Voice-to-text) individually to check their performance

a. **Run Chatbot:**

```bash
python chatbot/chat.py
```

b. **Run Emotional Detection Camera:**

1. **Test Camera**

```bash
python emotion_detection/test_camera.py
```

2. **Execute emotional detection camera**

```bash
python emotion_detection/emotion_detection_cam.py
```

c. **Run Multi-lingual voice to text:**

1. **Multi-lingual voice to text using google translate API**

```bash
python speech_text/speech_wo_auto.py
```

2. **Multi-lingual voice to text using googletrans library**

```bash
python speech_to_text.py
```

---

## Backend Execution Steps

a. **Run Flask backend server:**

```bash
python backend/main.py
```

---

## Frontend Execution Steps

a. **Install frontend dependencies:**

```bash
npm install 
```

b. **Fix vulnerabilities (optional but recommended):**

```bash
npm audit fix
```

c. **Run the React frontend:**

```bash
npm run dev
```

---
