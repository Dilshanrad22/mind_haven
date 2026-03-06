# Mind Haven - Frontend (Next.js)

**Frontend-only Next.js application for Mind Haven Mental Wellness Platform**

## 🎨 This is FRONTEND ONLY

This folder contains **only frontend code**. All backend API logic is in the separate `mind_haven_backend` folder.

---

## 📁 Clean Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── components/      # UI Components
│   │   ├── pages/           # Your pages (login, dashboard, etc.)
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── services/
│   │   └── api.ts           # API service (calls backend at localhost:5000)
│   └── types/
│       └── index.ts         # TypeScript type definitions
└── package.json
```

**No backend files here!** All API routes, models, and database code is in `mind_haven_backend`.

---

## 🚀 How to Run

```bash
npm run dev
```

Frontend will start on: **http://localhost:3000**

---

## 🔗 Backend Connection

The frontend connects to the backend API at: **http://localhost:5000**

This is configured in `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:5000";
```

---

## 📦 What's Included

### ✅ Frontend Files (Keep these)

- **Pages**: Your UI pages (login, dashboard, etc.)
- **Components**: Reusable UI components
- **Services**: API service to communicate with backend
- **Types**: TypeScript type definitions
- **Styles**: CSS files

### ❌ Removed (Now in Backend)

- ~~API routes~~
- ~~Database models~~
- ~~Authentication middleware~~
- ~~MongoDB connection~~
- ~~JWT utilities~~

All backend logic is now in the separate `mind_haven_backend` folder!

---

## 🎯 How to Use

### Call Backend APIs

```typescript
import ApiService from "@/services/api";

// Login
const result = await ApiService.login({
  email: "user@example.com",
  password: "password123",
});

// Signup
await ApiService.signup({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
  userType: "user",
});

// Get current user
const user = await ApiService.getCurrentUser();

// Logout
ApiService.logout();
```

---

## ⚠️ Important

**Make sure the backend is running first!**

```bash
# In another terminal
cd ../mind_haven_backend
npm run dev
```

The backend must be running on port 5000 for the frontend to work.

---

## 🏗️ Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Separate Express.js server (see `mind_haven_backend`)

---

## 📚 Documentation

For backend API documentation, see: `../mind_haven_backend/README.md`

---

**This is a clean, frontend-only application! 🎨**

### 🔐 Test User Accounts

| Role         | Email                | Password    |
| ------------ | -------------------- | ----------- |
| Regular User | john.doe@example.com | password123 |
| Doctor       | dr.smith@example.com | doctor123   |
