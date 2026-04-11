# 💰 Expense Tracker (Full Stack)

A full-stack Expense Tracker web application that helps users manage income and expenses with authentication, analytics, and a clean UI.

---

## 🚀 Live Demo
👉 https://your-live-link.com  
*(Add your deployed link here)*

---

## 📌 Features

### 🔐 Authentication
- User Signup & Login
- Protected Routes using middleware
- Auth state managed via Context API

### 💸 Expense Management
- Add and delete transactions
- Track income and expenses
- Real-time balance calculation

### 📊 Analytics
- Expense Pie Chart
- Income vs Expense Chart
- Dashboard insights

### 🎨 UI/UX
- Responsive design
- Clean modern UI
- Theme toggle (Dark/Light)

---

## 🛠 Tech Stack

### Frontend
- React (TypeScript)
- Tailwind CSS
- Context API
- Custom Hooks

### Backend
- Node.js
- Express.js
- MongoDB

---

## 📂 Folder Structure
Expense-Tracker/
│
├── backend/
│ ├── src/
│ │ ├── config/ # Database connection
│ │ ├── controller/ # Business logic (auth, transactions, stats)
│ │ ├── middlewares/ # Auth middleware
│ │ ├── model/ # Mongoose schemas (User, Transaction)
│ │ ├── router/ # API routes
│ │ └── index.ts # Entry point
│ │
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/ # UI components (charts, navbar, table)
│ │ ├── context/ # Auth & transaction state
│ │ ├── Hooks/ # Custom hooks
│ │ ├── layout/ # Layout components
│ │ ├── pages/ # Pages (Dashboard, Login, Signup)
│ │ ├── utils/ # Helper utilities
│ │ ├── App.tsx
│ │ └── main.tsx
│ │
│ └── package.json
│
└── README.md



---

## ⚙️ How It Works

1. User signs up or logs in  
2. Authentication is handled using backend APIs and middleware  
3. Users can:
   - Add transactions  
   - View balance and stats  
   - Analyze expenses through charts  
4. Data is stored securely in MongoDB  
5. Frontend updates UI in real-time using Context API  

---

## 📦 Installation & Setup

### 🔹 Clone Repository
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

## Backend Setup
```
cd backend
npm install
```
Backend (/backend/.env)
```
PORT=your_port
NODE_ENV=development
MONGO_URI_PROD=your_mongo_uri
SECRETKEY=your_secret_key
FRONTEND_URL=your_frontend_url
```bash

Run Backend
```
npm run dev
```bash
Frontend setup
```
cd frontend
npm install
npm run dev
```bash

Frontend (/frontend/.env)
```
VITE_BASE_URL=your_backend_url
```bash
Run Frontend
```
npm run dev
```bash


