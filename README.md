# 💰 Expense Tracker (Full Stack)

A full-stack Expense Tracker web application that helps users manage income and expenses with secure authentication, visual analytics, and a clean modern UI.

---

## 🚀 Live Demo
👉 **[View Live Site](https://expence-tracker-theta-teal.vercel.app/)**

---

## 📌 Features

### 🔐 Authentication
- Secure User Signup & Login
- Protected routes using backend middleware
- Authentication state managed seamlessly via the Context API

### 💸 Expense Management
- Easily add and delete transactions
- Track income and expenses separately
- Real-time total balance calculation

### 📊 Analytics
- Visual Expense Pie Chart
- Income vs. Expense comparison charts
- Comprehensive dashboard insights

### 🎨 UI/UX
- Fully responsive design for mobile and desktop
- Clean, modern UI 
- Built-in Theme toggle (Dark/Light mode)

---

## 🛠 Tech Stack

**Frontend:**
- React (TypeScript) via Vite
- Tailwind CSS
- Context API
- Custom Hooks

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose

---

## 📂 Folder Structure

```text
Expense-Tracker/
│
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controller/   # Business logic (auth, transactions, stats)
│   │   ├── middlewares/  # Auth middleware
│   │   ├── model/        # Mongoose schemas (User, Transaction)
│   │   ├── router/       # API routes
│   │   └── index.ts      # Entry point
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components (charts, navbar, table)
│   │   ├── context/      # Auth & transaction state
│   │   ├── Hooks/        # Custom hooks
│   │   ├── layout/       # Layout components
│   │   ├── pages/        # Pages (Dashboard, Login, Signup)
│   │   ├── utils/        # Helper utilities
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
└── README.md

```

Here is the corrected and polished version of your README.md. I fixed the broken Markdown formatting (especially around the code blocks), organized the setup instructions for better readability, and ensured the whole document looks clean and professional for a MERN stack project using Vite and Tailwind.

Markdown
# 💰 Expense Tracker (Full Stack)

A full-stack Expense Tracker web application that helps users manage income and expenses with secure authentication, visual analytics, and a clean modern UI.

---

## 🚀 Live Demo
👉 **[View Live Site](https://expence-tracker-theta-teal.vercel.app/)**

---

## 📌 Features

### 🔐 Authentication
- Secure User Signup & Login
- Protected routes using backend middleware
- Authentication state managed seamlessly via the Context API

### 💸 Expense Management
- Easily add and delete transactions
- Track income and expenses separately
- Real-time total balance calculation

### 📊 Analytics
- Visual Expense Pie Chart
- Income vs. Expense comparison charts
- Comprehensive dashboard insights

### 🎨 UI/UX
- Fully responsive design for mobile and desktop
- Clean, modern UI 
- Built-in Theme toggle (Dark/Light mode)

---

## 🛠 Tech Stack

**Frontend:**
- React (TypeScript) via Vite
- Tailwind CSS
- Context API
- Custom Hooks

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose

---

## 📂 Folder Structure

```text
Expense-Tracker/
│
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controller/   # Business logic (auth, transactions, stats)
│   │   ├── middlewares/  # Auth middleware
│   │   ├── model/        # Mongoose schemas (User, Transaction)
│   │   ├── router/       # API routes
│   │   └── index.ts      # Entry point
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # UI components (charts, navbar, table)
│   │   ├── context/      # Auth & transaction state
│   │   ├── Hooks/        # Custom hooks
│   │   ├── layout/       # Layout components
│   │   ├── pages/        # Pages (Dashboard, Login, Signup)
│   │   ├── utils/        # Helper utilities
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
└── README.md
```
⚙️ How It Works
Authentication: User signs up or logs in. Authentication is handled securely using backend APIs and custom middleware.

Dashboard Access: Once authenticated, users can add new transactions, view their current balance, and check overall statistics.

Data Analysis: Users can analyze their spending habits through interactive charts.

Data Storage: All transaction and user data is stored securely in MongoDB.

State Management: The frontend updates the UI in real-time using React's Context API.


📦 Installation & Setup
1. Clone the Repository
git clone [https://github.com/your-username/expense-tracker.git](https://github.com/your-username/expense-tracker.git)
cd expense-tracker

2. Backend Setup
Navigate to the backend directory and install dependencies:

cd backend
npm install

Create a .env file in the backend directory and add your environment variables:

PORT=your_port
NODE_ENV=development
MONGO_URI_PROD=your_mongo_uri
SECRETKEY=your_secret_key
FRONTEND_URL=your_frontend_url

Start the backend server:

npm run dev

3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:

cd frontend
npm install

Create a .env file in the frontend directory and add your backend API URL:

VITE_BASE_URL=your_backend_url
Start the Vite development server:
npm run dev
