# Admin System Documentation

## 🎯 Overview

Complete administrative system for Mind Haven platform that allows admins to monitor and manage all users, doctors, appointments, and platform statistics.

---

## 🔐 Admin Credentials

| Role  | Email                | Password  |
|-------|----------------------|-----------|
| Admin | admin@mindhaven.lk   | admin123  |

---

## ✨ Features

### Dashboard Overview
- **Platform Statistics:**
  - Total Users (active/inactive counts)
  - Total Doctors (verified/unverified counts)
  - Total Appointments (breakdown by status: pending, confirmed, completed, cancelled)
  - Total Reviews with average rating

### User Management
- View all registered users with pagination
- Search users by name or email
- Filter by user type (user/doctor) and status (active/inactive)
- Activate/deactivate user accounts
- View detailed user information

### Doctor Management
- View all doctors with their profiles
- See specialization, experience, and consultation fees
- View doctor ratings and total reviews
- Verify/unverify doctor credentials
- Search and filter doctors

### Appointment Oversight
- Monitor all appointments across the platform
- Filter by appointment status
- Track booking patterns

---

## 🏗️ Architecture

### Backend Components

#### 1. User Model Update
**File:** `mind_haven_backend/src/models/User.js`

```javascript
userType: {
  type: String,
  enum: ['user', 'doctor', 'admin'], // Added 'admin'
  required: true
}
```

#### 2. Admin Middleware
**File:** `mind_haven_backend/src/middleware/auth.js`

```javascript
const authorizeAdmin = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};
```

All admin routes protected with: `protect` + `authorizeAdmin` middleware chain

#### 3. Admin Routes
**File:** `mind_haven_backend/src/routes/admin.js`

**Endpoints:**

| Method | Endpoint                            | Description                          |
|--------|-------------------------------------|--------------------------------------|
| GET    | `/api/admin/stats`                  | Platform overview statistics         |
| GET    | `/api/admin/users`                  | List all users (paginated)           |
| GET    | `/api/admin/doctors`                | List all doctors (paginated)         |
| GET    | `/api/admin/user/:id`               | Get single user details              |
| PUT    | `/api/admin/user/:id/toggle-status` | Activate/deactivate user             |
| PUT    | `/api/admin/doctor/:id/verify`      | Verify/unverify doctor               |
| DELETE | `/api/admin/user/:id`               | Soft delete user (deactivate)        |
| GET    | `/api/admin/appointments`           | List all appointments (paginated)    |

**Sample Response - Stats:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 171,
    "totalDoctors": 11,
    "totalAppointments": 45,
    "totalReviews": 23,
    "averageRating": 4.5,
    "activeUsers": 165,
    "inactiveUsers": 6,
    "verifiedDoctors": 10,
    "unverifiedDoctors": 1,
    "appointmentsByStatus": {
      "pending": 12,
      "confirmed": 18,
      "completed": 10,
      "cancelled": 5
    }
  }
}
```

### Frontend Components

#### 1. Admin Dashboard
**File:** `my-app/src/app/pages/dashboard/admin/page.tsx`

**Features:**
- 📊 Stats overview cards with color-coded metrics
- 🔄 Three-tab interface (Overview, Users, Doctors)
- 🔍 Real-time search functionality
- 🎯 Quick action buttons (activate/deactivate, verify/unverify)
- 🔒 Built-in authorization check (redirects non-admins)
- ⚡ Loading states and error handling

**Component Structure:**
```typescript
AdminDashboard {
  - Authorization check on mount
  - Fetch stats data
  - Tab navigation (overview, users, doctors)
  - User management table
  - Doctor management table
  - Search and filter controls
  - Action handlers (toggle status, verify)
}
```

#### 2. API Service Updates
**File:** `my-app/src/services/api.ts`

**New Admin Methods:**
```typescript
getAdminStats()                          // Get platform statistics
getAdminUsers(params)                    // List users with filters
getAdminDoctors(params)                  // List doctors with filters
toggleUserStatus(userId)                 // Activate/deactivate user
toggleDoctorVerification(doctorId)       // Verify/unverify doctor
getAdminUserDetails(userId)              // Get single user details
deleteUser(userId)                       // Soft delete user
getAdminAppointments(params)             // List all appointments
```

#### 3. Login Redirect Logic
**File:** `my-app/src/app/pages/login/page.tsx`

```typescript
// Updated redirect logic after successful login
if (userType === 'admin') {
  router.push('/pages/dashboard/admin');
} else if (userType === 'doctor') {
  router.push('/pages/dashboard/counsellor');
} else {
  router.push('/pages/dashboard/user');
}
```

---

## 🚀 Usage Flow

### For Admins

1. **Login**
   - Navigate to http://localhost:3000/pages/login
   - Email: `admin@mindhaven.lk`
   - Password: `admin123`
   - Automatically redirected to admin dashboard

2. **Dashboard Access**
   - View platform statistics at a glance
   - Access Overview, Users, or Doctors tabs

3. **User Management**
   - Search users by name/email
   - Click "Deactivate" to disable user accounts
   - Click "Activate" to re-enable accounts
   - View user details (name, email, phone, join date)

4. **Doctor Management**
   - Search doctors by name/specialization
   - View doctor profiles with ratings
   - Click "Verify" to approve doctor credentials
   - Click "Unverify" to revoke verification
   - See consultation fees and experience

5. **Monitor Activity**
   - Track appointment statistics
   - View platform growth metrics
   - Monitor active vs inactive users

---

## 🔒 Security Features

1. **JWT Authentication:**
   - All admin routes require valid JWT token
   - Token stored in localStorage
   - Automatically included in API headers

2. **Role-Based Authorization:**
   - `protect` middleware verifies JWT token
   - `authorizeAdmin` middleware checks userType
   - Non-admins receive 403 Forbidden response

3. **Self-Protection:**
   - Admins cannot deactivate their own accounts
   - Backend validates user ID matches before toggling

4. **Soft Delete:**
   - Users are deactivated (isActive = false), not permanently deleted
   - Preserves data integrity and audit trail

5. **Client-Side Protection:**
   - Dashboard checks authentication on mount
   - Redirects unauthenticated users to login
   - Prevents unauthorized access attempts

---

## 📊 Database Schema Impact

### User Model Changes
```javascript
// Before:
userType: { type: String, enum: ['user', 'doctor'] }

// After:
userType: { type: String, enum: ['user', 'doctor', 'admin'] }
```

### New Admin Account Structure
```javascript
{
  name: "Admin User",
  email: "admin@mindhaven.lk",
  password: "<hashed with bcryptjs>",
  userType: "admin",
  phone: "+94 77 123 4567",
  dateOfBirth: "1990-01-01",
  gender: "other",
  isActive: true,
  createdAt: "<timestamp>",
  updatedAt: "<timestamp>"
}
```

---

## 🧪 Testing

### Manual Testing Steps

1. **Test Admin Login:**
   ```
   Email: admin@mindhaven.lk
   Password: admin123
   Expected: Redirect to /pages/dashboard/admin
   ```

2. **Test User Activation/Deactivation:**
   - Login as admin
   - Navigate to Users tab
   - Click "Deactivate" on any user
   - Verify user status updates
   - Click "Activate" to restore

3. **Test Doctor Verification:**
   - Navigate to Doctors tab
   - Click "Verify"/"Unverify" on any doctor
   - Verify Doctor.isVerified field updates

4. **Test Stats API:**
   ```bash
   # With valid admin token
   curl -H "Authorization: Bearer <admin_token>" \
        http://localhost:5000/api/admin/stats
   ```

5. **Test Unauthorized Access:**
   ```bash
   # Try accessing without token (should fail)
   curl http://localhost:5000/api/admin/stats
   
   # Try with regular user token (should return 403)
   curl -H "Authorization: Bearer <user_token>" \
        http://localhost:5000/api/admin/stats
   ```

### Backend Tests Available

```bash
cd mind_haven_backend

# Test authentication (includes admin)
node test-auth.js

# Test signup flows
node test-signup.js

# Full integration tests
node integration-test.js
```

---

## 🎨 UI Design

### Color Scheme
- **Primary:** Green theme (`#00610B`, `#16320d`, green-600)
- **Accents:** Emerald (`emerald-600`, `emerald-50`)
- **Status Colors:**
  - Active: Green
  - Inactive: Red
  - Verified: Blue
  - Pending: Yellow

### Component Patterns
- **Cards:** Rounded (`rounded-2xl`), shadowed (`shadow-xl`)
- **Tables:** Striped rows, hover effects
- **Buttons:** Gradient backgrounds, hover animations
- **Icons:** Lucide React library

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Collapsible sidebar (future enhancement)
- Touch-friendly buttons

---

## 🔄 Future Enhancements

### Planned Features
1. **Activity Logs:** Track admin actions with timestamps
2. **Bulk Operations:** Select multiple users/doctors for batch actions
3. **Export Data:** Download reports as CSV/PDF
4. **Advanced Filters:** Date ranges, rating ranges, specialty filters
5. **Doctor Approval Workflow:** Review applications before verification
6. **Email Notifications:** Notify users of status changes
7. **Analytics Dashboard:** Charts and graphs for trends
8. **Role Permissions:** Multiple admin levels (super admin, moderator)

### Technical Improvements
1. **Pagination:** Implement infinite scroll or jump-to-page
2. **Real-time Updates:** WebSocket for live data refresh
3. **Caching:** Redis for frequently accessed stats
4. **Audit Trail:** Log all admin actions for compliance
5. **Two-Factor Auth:** Enhanced security for admin accounts

---

## 📝 Files Modified/Created

### Backend Files
- ✅ `mind_haven_backend/src/models/User.js` (updated)
- ✅ `mind_haven_backend/src/middleware/auth.js` (updated)
- ✅ `mind_haven_backend/src/routes/admin.js` (created)
- ✅ `mind_haven_backend/server.js` (updated)
- ✅ `mind_haven_backend/create-admin-account.js` (created)

### Frontend Files
- ✅ `my-app/src/app/pages/dashboard/admin/page.tsx` (created)
- ✅ `my-app/src/services/api.ts` (updated)
- ✅ `my-app/src/app/pages/login/page.tsx` (updated)
- ✅ `my-app/README.md` (updated)

### Documentation
- ✅ `my-app/ADMIN_SYSTEM_DOCUMENTATION.md` (this file)

---

## 🆘 Troubleshooting

### Issue: Cannot login as admin
**Solution:**
1. Verify admin account exists in database
2. Check MongoDB connection in backend
3. Verify JWT_SECRET in `.env` matches between sessions
4. Clear browser localStorage and try again

### Issue: 403 Forbidden on admin endpoints
**Solution:**
1. Verify JWT token is valid
2. Check token is being sent in Authorization header
3. Confirm user has `userType: 'admin'` in database
4. Check middleware chain in route definition

### Issue: Stats not loading
**Solution:**
1. Check backend server is running (port 5000)
2. Open browser console for error messages
3. Verify CORS settings allow frontend origin
4. Check MongoDB connection is active

### Issue: User toggle not working
**Solution:**
1. Confirm you're not trying to deactivate your own account
2. Check user._id exists and is valid MongoDB ObjectId
3. Verify backend route has `protect` + `authorizeAdmin` middleware
4. Check network tab for API response errors

---

## 📞 Support

For issues or questions:
1. Check browser console for JavaScript errors
2. Check backend logs: `mind_haven_backend/backend-log.txt`
3. Verify all dependencies are installed: `npm install`
4. Ensure both servers are running (frontend + backend)

---

## 📚 Related Documentation

- [Workspace Instructions](.github/copilot-instructions.md)
- [Frontend Documentation](my-app/README.md)
- [Backend README](mind_haven_backend/README.md)
- [API Routes Documentation](mind_haven_backend/SEPARATED_ARCHITECTURE.md)

---

**Last Updated:** March 11, 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready
