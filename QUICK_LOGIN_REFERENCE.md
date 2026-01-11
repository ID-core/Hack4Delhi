# Quick Login Reference

## Copy-Paste Credentials for Testing

### Admin
```
Email: admin
Password: admin
```

### Managers
```
Email: Manager1
Password: Manager

OR

Email: Manager2
Password: Manager
```

### HRs
```
Email: HR1
Password: Hr

Email: HR2
Password: Hr

Email: HR3
Password: Hr

Email: HR4
Password: Hr
```

### Employees
```
Email: Employee1
Password: Employee

Email: Employee2
Password: Employee

Email: Employee3
Password: Employee

Email: Employee4
Password: Employee

Email: Employee5
Password: Employee

Email: Employee6
Password: Employee

Email: Employee7
Password: Employee

Email: Employee8
Password: Employee
```

---

## Testing Checklist

### ✅ Admin (admin / admin)
- [ ] Login successful
- [ ] See "Administration" menu item
- [ ] Navigate to /administration
- [ ] See both managers (Manager1, Manager2)
- [ ] Expand Manager1 to see HR1, HR2
- [ ] Expand Manager2 to see HR3, HR4
- [ ] Expand HRs to see their employees
- [ ] Info cards show "System Administrator View"
- [ ] Total count is 16

### ✅ Manager1 (Manager1 / Manager)
- [ ] Login successful
- [ ] See "Administration" menu item
- [ ] Navigate to /administration
- [ ] See only HR1 and HR2 (NOT HR3, HR4)
- [ ] Expand HR1 to see Employee1, Employee2
- [ ] Expand HR2 to see Employee3, Employee4
- [ ] Info cards show "Manager View"
- [ ] Total count is 4

### ✅ HR1 (HR1 / Hr)
- [ ] Login successful
- [ ] See "Administration" menu item
- [ ] Navigate to /administration
- [ ] See only Employee1 and Employee2
- [ ] No expand buttons (leaf nodes)
- [ ] Info cards show "HR Specialist View"
- [ ] Total count is 2

### ✅ Employee1 (Employee1 / Employee)
- [ ] Login successful
- [ ] "Administration" menu NOT visible
- [ ] Navigate to /administration manually
- [ ] See "Access Denied" screen
- [ ] Click "Return to Dashboard"
- [ ] Redirected to /dashboard
- [ ] Menu items: Dashboard, Profile, Performance, Attendance, Leave, Transfers only

---

## Expected Organizational View

### Admin View (Complete Hierarchy)
```
Admin1
├── Manager1 (can expand)
│   ├── HR1 (can expand)
│   │   ├── Employee1
│   │   └── Employee2
│   └── HR2 (can expand)
│       ├── Employee3
│       └── Employee4
└── Manager2 (can expand)
    ├── HR3 (can expand)
    │   ├── Employee5
    │   └── Employee6
    └── HR4 (can expand)
        ├── Employee7
        └── Employee8
```

### Manager1 View (Limited Hierarchy)
```
Manager1
├── HR1 (can expand)
│   ├── Employee1
│   └── Employee2
└── HR2 (can expand)
    ├── Employee3
    └── Employee4
```

### HR1 View (Only Employees)
```
HR1
├── Employee1
└── Employee2
```

### Employee1 View
```
❌ Access Denied
```

---

## What to Expect

### Menu Changes by Role
- **Admin**: All menus visible including "Administration"
- **Manager**: All menus visible including "Administration" 
- **HR**: All menus visible including "Administration"
- **Employee**: All menus EXCEPT "Administration" and "HR Dashboard"

### Dashboard Changes by Role
- **Admin**: Sees full org chart from Admin1 down
- **Manager**: Sees only their assigned HRs and their employees
- **HR**: Sees only their assigned employees
- **Employee**: Cannot access /administration at all

### UI Elements
- Expandable/collapsible nodes with arrows
- Role badges with colors:
  - 🛡️ Admin = Amber
  - 💼 Manager = Blue
  - 👥 HR = Green
  - 👤 Employee = Slate
- Info cards showing role, view type, and count
- Cards have hover effects
- Smooth animations when expanding/collapsing

---

## Features to Verify

### ✅ Authentication
- Correct password checking per user
- Session stored in localStorage
- Logout clears session

### ✅ Menu Visibility
- Menu items filtered by role
- Administration only for admin/manager/hr
- Employee sees limited menu

### ✅ Route Protection
- Unauthorized access blocked
- Error message shows
- Redirect button works

### ✅ Data Display
- Correct hierarchy based on role
- Proper parent-child relationships
- Expandable/collapsible nodes
- No data leakage between roles

### ✅ UI/UX
- Responsive layout
- Clear visual hierarchy
- Role identification clear
- Smooth animations
