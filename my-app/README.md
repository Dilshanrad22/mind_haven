add all accont details # Mind Haven - Frontend (Next.js)

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

---

## 🔐 Test Accounts

### Quick Test Accounts

| Role         | Email                  | Password    |
| ------------ | ---------------------- | ----------- |
| Regular User | user@test.com          | password123 |
| Doctor       | doctor@test.com        | password123 |
| **Admin**    | **admin@mindhaven.lk** | **admin123** |

---

### 👥 20 Regular User Accounts

**Default Password:** `password123`

| # | Name | Email | Age | Location |
|---|------|-------|-----|----------|
| 1 | Dulanjana Perera | dulanjana.perera@gmail.com | 20 | Colombo 07 |
| 2 | Nimalka Fernando | nimalka.fernando@gmail.com | 18 | Kandy |
| 3 | Kasun Wickramasinghe | kasun.wickrama@gmail.com | 30 | Galle |
| 4 | Sanduni Rajapaksha | sanduni.raja@gmail.com | 25 | Negombo |
| 5 | Tharindu Silva | tharindu.silva@gmail.com | 22 | Kurunegala |
| 6 | Chamodi Dissanayake | chamodi.dissanayake@gmail.com | 17 | Matara |
| 7 | Ravindu Jayawardena | ravindu.jaya@gmail.com | 27 | Jaffna |
| 8 | Thilini Amarasinghe | thilini.amara@gmail.com | 23 | Anuradhapura |
| 9 | Kavinda Bandara | kavinda.bandara@gmail.com | 16 | Ratnapura |
| 10 | Amaya Gunasekara | amaya.guna@gmail.com | 26 | Batticaloa |
| 11 | Dineth Herath | dineth.herath@gmail.com | 21 | Colombo 05 |
| 12 | Sachini Weerasinghe | sachini.weera@gmail.com | 28 | Trincomalee |
| 13 | Nipun Lakmal | nipun.lakmal@gmail.com | 24 | Badulla |
| 14 | Dishani Mendis | dishani.mendis@gmail.com | 19 | Gampaha |
| 15 | Chamod Rathnayake | chamod.rathna@gmail.com | 29 | Kalutara |
| 16 | Oshadi Silva | oshadi.silva@gmail.com | 22 | Hambantota |
| 17 | Supun Manjula | supun.manjula@gmail.com | 25 | Chilaw |
| 18 | Nethmi Jayasinghe | nethmi.jaya@gmail.com | 20 | Nuwara Eliya |
| 19 | Udara Pathirana | udara.pathirana@gmail.com | 27 | Ampara |
| 20 | Piyumi Karunarathna | piyumi.karuna@gmail.com | 23 | Polonnaruwa |

---

### 👨‍⚕️ 10 Doctor/Counsellor Accounts

**Default Password:** `doctor123`

| # | Name | Email | Specialization | Experience | Fee (LKR) |
|---|------|-------|----------------|------------|-----------|
| 1 | Dr. Pradeep Jayasuriya | dr.pradeep.jaya@mindhaven.lk | Clinical Psychology | 14 yrs | 5000 |
| 2 | Dr. Samanthi Wijesinghe | dr.samanthi.wije@mindhaven.lk | Child Psychology | 10 yrs | 4500 |
| 3 | Dr. Ruwan Perera | dr.ruwan.perera@mindhaven.lk | Psychiatry | 16 yrs | 6000 |
| 4 | Dr. Madhavi Fernando | dr.madhavi.fernando@mindhaven.lk | Relationship Counseling | 8 yrs | 4000 |
| 5 | Dr. Aruna Dissanayake | dr.aruna.dissa@mindhaven.lk | Stress Management | 12 yrs | 4500 |
| 6 | Dr. Chanaka Silva | dr.chanaka.silva@mindhaven.lk | Addiction Counseling | 13 yrs | 5500 |
| 7 | Dr. Niluka Rathnayake | dr.niluka.rathna@mindhaven.lk | Anxiety Disorders | 9 yrs | 4200 |
| 8 | Dr. Ishara Bandara | dr.ishara.bandara@mindhaven.lk | PTSD & Trauma | 11 yrs | 5000 |
| 9 | Dr. Tharanga Gunasekara | dr.tharanga.guna@mindhaven.lk | Mindfulness & Meditation | 7 yrs | 3800 |
| 10 | Dr. Lasith Wickramasinghe | dr.lasith.wickrama@mindhaven.lk | Cognitive Behavioral Therapy | 15 yrs | 5200 |

---

### 📋 Usage

**Login as Regular User:**
1. Go to http://localhost:3000/pages/login
2. Use any user email (e.g., `dulanjana.perera@gmail.com`)
3. Password: `password123`

**Login as Doctor:**
1. Go to http://localhost:3000/pages/login
2. Use any doctor email (e.g., `dr.pradeep.jaya@mindhaven.lk`)
3. Password: `doctor123`

**Login as Admin:**
1. Go to http://localhost:3000/pages/login
2. Email: `admin@mindhaven.lk`
3. Password: `admin123`
4. Access admin dashboard to manage users, doctors, and appointments

**Total Test Accounts:** 33 (20 users + 10 doctors + 3 quick test accounts including admin)
