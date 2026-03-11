# Admin Dashboard Troubleshooting Guide

## Issue: Can't see user and doctor details in admin dashboard

Follow these steps to diagnose and fix the problem:

---

## ✅ Step 1: Verify Both Servers Are Running

### Check Backend (Port 5000):
```powershell
# In PowerShell, run:
Invoke-WebRequest -Uri "http://localhost:5000/api/health"
```

**Expected output:**
```json
{"success":true,"status":"healthy",...}
```

### Check Frontend (Port 3000):
Open browser: http://localhost:3000

**If either server is NOT running:**

```powershell
# Terminal 1 - Start Backend
cd "D:\Dulanjana\New folder\mind_haven_backend"
npm run dev

# Terminal 2 - Start Frontend  
cd "D:\Dulanjana\New folder\mind_haven\my-app"
npm run dev
```

---

## ✅ Step 2: Test Admin Login

1. Open http://localhost:3000/pages/login
2. Enter credentials:
   - **Email:** `admin@mindhaven.lk`
   - **Password:** `admin123`
3. Click Login

**Expected:** You should be redirected to `/pages/dashboard/admin`

**If login fails:**
- Check the error message
- Verify admin account exists (see Step 6 below)

---

## ✅ Step 3: Open Browser DevTools

**IMPORTANT:** Press `F12` or Right-click → "Inspect"

### Check the Console Tab:

You should see these log messages:
```
📊 Fetching admin stats...
API: Calling GET http://localhost:5000/api/admin/stats
Stats result: {success: true, data: {...}}
✓ Stats loaded: {...}

👥 Fetching users...
API: Calling GET http://localhost:5000/api/admin/users?page=1&limit=10
Users result: {success: true, data: {...}}
✓ Loaded X users

👨‍⚕️ Fetching doctors...
API: Calling GET http://localhost:5000/api/admin/doctors?page=1&limit=10
Doctors result: {success: true, data: {...}}
✓ Loaded X doctors
```

### Look for Error Messages:

**If you see:**
- ❌ **401 Unauthorized**: Token is invalid or missing
- ❌ **403 Forbidden**: You're not logged in as admin
- ❌ **404 Not Found**: Admin routes not registered
- ❌ **500 Server Error**: Backend database issue
- ❌ **CORS Error**: Backend/frontend not configured correctly

---

## ✅ Step 4: Check Network Tab

1. In DevTools, click the **Network** tab
2. Reload the admin dashboard page
3. Look for these requests:

| Request URL | Status | Response |
|-------------|--------|----------|
| `/api/admin/stats` | 200 OK | JSON with stats |
| `/api/admin/users?page=1&limit=10` | 200 OK | JSON with users array |
| `/api/admin/doctors?page=1&limit=10` | 200 OK | JSON with doctors array |

### Click on each request and check:
- **Request Headers:** Should include `Authorization: Bearer <token>`
- **Response:** Should show JSON data with `success: true`

**If requests are failing:**
- Status 401/403: Authentication issue (restart servers)
- Status 404: Backend routes not loaded (restart backend)
- Status 500: Check backend console for errors

---

## ✅ Step 5: Restart Both Servers (Clean Restart)

Sometimes changes don't hot-reload properly. Do a full restart:

### Stop All Servers:
```powershell
Get-Process node | Stop-Process -Force
```

### Start Backend:
```powershell
cd "D:\Dulanjana\New folder\mind_haven_backend"
npm run dev
```

Wait for: `✓ Server running on port 5000`

### Start Frontend (in new terminal):
```powershell
cd "D:\Dulanjana\New folder\mind_haven\my-app"
npm run dev
```

Wait for: `✓ Ready in Xms`

### Try Again:
1. Open http://localhost:3000/pages/login
2. Login as admin
3. Check if data appears

---

## ✅ Step 6: Verify Admin Account Exists

```powershell
cd "D:\Dulanjana\New folder\mind_haven_backend"
node create-admin-account.js
```

**Expected output:**
```
✓ Admin account created successfully!
Email: admin@mindhaven.lk
Password: admin123
```

Or if already exists:
```
❌ Admin account already exists
```

---

## ✅ Step 7: Verify Database Has Data

```powershell
cd "D:\Dulanjana\New folder\mind_haven_backend"
node verify-database.js
```

**Expected:** Should show counts of users, doctors, appointments, etc.

**If database is empty:**
- Run the test account creation scripts
- Check MongoDB Atlas connection in `.env`

---

## ✅ Step 8: Test Backend API Directly

Open these URLs in your browser (you'll see "Unauthorized" - that's OK, we just want to verify the routes exist):

- http://localhost:5000/api/admin/stats
- http://localhost:5000/api/admin/users
- http://localhost:5000/api/admin/doctors

**Expected:** All should return:
```json
{
  "success": false,
  "message": "No token provided"
}
```

**If you see 404:** Admin routes not registered
- Open `mind_haven_backend/server.js`
- Check if line exists: `app.use('/api/admin', adminRoutes);`
- If missing, the file wasn't saved properly

---

## 🔧 Common Fixes

### Fix 1: Backend Routes Not Loading
```powershell
# Check if admin routes are registered
cd "D:\Dulanjana\New folder\mind_haven_backend"
findstr "adminRoutes" server.js
```

Should show:
```
const adminRoutes = require('./src/routes/admin');
app.use('/api/admin', adminRoutes);
```

### Fix 2: Frontend Not Connecting to Backend
Check `my-app/src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000';
```

### Fix 3: CORS Issues
Check `mind_haven_backend/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Fix 4: Token Not Being Sent
Open DevTools Console and run:
```javascript
localStorage.getItem('authToken')
```

Should return a long string (JWT token). If `null`, log in again.

---

## 📞 Still Not Working?

If data still doesn't appear after following all steps:

1. **Take a screenshot of:**
   - Browser console (F12 → Console tab)
   - Network tab showing the failed requests
   - The admin dashboard page

2. **Check backend terminal for errors:**
   - Look at the terminal running `npm run dev` for the backend
   - Copy any error messages

3. **Provide this information:**
   - What step failed?
   - What error messages do you see?
   - Screenshots of console/network tabs

---

## ✅ Success Checklist

The admin dashboard should show:

- [  ] Total Users count (e.g., 171)
- [  ] Total Doctors count (e.g., 11)  
- [  ] Total Appointments count
- [  ] Total Reviews count
- [  ] Users table with names, emails, status
- [  ] Doctors table with names, specializations, ratings
- [  ] Activate/Deactivate buttons work
- [  ] Verify/Unverify buttons work
- [  ] Search functionality works

---

## 📝 Quick Test Commands

```powershell
# 1. Check backend is running
Invoke-WebRequest -Uri "http://localhost:5000/api/health"

# 2. Stop all node processes
Get-Process node | Stop-Process -Force

# 3. Start backend
cd "D:\Dulanjana\New folder\mind_haven_backend"; npm run dev

# 4. Start frontend (new terminal)
cd "D:\Dulanjana\New folder\mind_haven\my-app"; npm run dev

# 5. Verify admin account
cd "D:\Dulanjana\New folder\mind_haven_backend"; node create-admin-account.js
```

---

## 🎯 Most Common Issue

**90% of the time, the issue is:** Backend server wasn't restarted after adding admin routes.

**Solution:** 
1. Stop all servers: `Get-Process node | Stop-Process -Force`
2. Restart backend: `cd mind_haven_backend; npm run dev`
3. Restart frontend: `cd my-app; npm run dev`
4. Clear browser cache: `Ctrl+Shift+Delete`
5. Login again as admin

---

Last Updated: March 11, 2026
