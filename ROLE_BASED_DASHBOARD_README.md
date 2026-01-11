# Role-Based Dashboard System - Demo Dataset & Implementation

## Overview
A comprehensive role-based access control system with hierarchical organization structure for the Nigam Seva HRMS application.

## Demo User Credentials

### Hierarchy Structure
```
Admin1 (admin)
├── Manager1 (manager)
│   ├── HR1 (hr)
│   │   ├── Employee1 (employee)
│   │   └── Employee2 (employee)
│   └── HR2 (hr)
│       ├── Employee3 (employee)
│       └── Employee4 (employee)
└── Manager2 (manager)
    ├── HR3 (hr)
    │   ├── Employee5 (employee)
    │   └── Employee6 (employee)
    └── HR4 (hr)
        ├── Employee7 (employee)
        └── Employee8 (employee)
```

### Login Credentials

#### Admin (1 total)
| Name | Email/Username | Password |
|------|---|---|
| Admin1 | admin | admin |

#### Managers (2 total)
| Name | Email/Username | Password |
|------|---|---|
| Manager1 | Manager1 | Manager |
| Manager2 | Manager2 | Manager |

#### HRs (4 total)
| Name | Email/Username | Password | Reports To |
|------|---|---|---|
| HR1 | HR1 | Hr | Manager1 |
| HR2 | HR2 | Hr | Manager1 |
| HR3 | HR3 | Hr | Manager2 |
| HR4 | HR4 | Hr | Manager2 |

#### Employees (8 total)
| Name | Email/Username | Password | Reports To |
|------|---|---|---|
| Employee1 | Employee1 | Employee | HR1 |
| Employee2 | Employee2 | Employee | HR1 |
| Employee3 | Employee3 | Employee | HR2 |
| Employee4 | Employee4 | Employee | HR2 |
| Employee5 | Employee5 | Employee | HR3 |
| Employee6 | Employee6 | Employee | HR3 |
| Employee7 | Employee7 | Employee | HR4 |
| Employee8 | Employee8 | Employee | HR4 |

## Features Implemented

### 1. Data Model Enhancements
- Added hierarchical parent references to `User` interface:
  - `adminId`: Reference to Admin
  - `managerId`: Reference to Manager
  - `hrId`: Reference to HR
  - `password`: User password field

### 2. Role-Based Menu Visibility

The sidebar now intelligently filters menu items based on user role:

| Menu Item | Employee | HR | Manager | Admin |
|-----------|----------|-----|---------|-------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| My Profile | ✅ | ✅ | ✅ | ✅ |
| Performance | ✅ | ✅ | ✅ | ✅ |
| Attendance | ✅ | ✅ | ✅ | ✅ |
| Leave Management | ✅ | ✅ | ✅ | ✅ |
| Transfer Requests | ✅ | ✅ | ✅ | ✅ |
| HR Dashboard | ❌ | ✅ | ❌ | ✅ |
| **Administration** | ❌ | ✅ | ✅ | ✅ |

### 3. Administration Dashboard

#### Admin View
- Sees complete organizational hierarchy
- Can expand/collapse to view:
  - All Managers
  - HRs under each Manager
  - Employees under each HR
- Hierarchical tree display with expand/collapse functionality

#### Manager View
- Sees only their assigned HRs and employees
- Display structure:
  - Their HR Names (expandable)
  - Employees under each HR
- Access control: Can only view direct reports

#### HR View
- Sees only their assigned employees
- Display structure:
  - Simple employee list with role badges
  - Employee details card layout
- Access control: Can only view direct reports

#### Employee View
- ❌ Cannot access Administration dashboard
- Route protection ensures redirect to dashboard

### 4. Access Control Rules

#### Admin
- ✅ Can view all managers, HRs, and employees
- ✅ View complete organizational structure
- ✅ No restrictions on hierarchy traversal

#### Manager
- ✅ Can view assigned HRs
- ✅ Can view employees under assigned HRs
- ❌ Cannot view other managers or their reports
- ❌ Cannot see HRs from other managers

#### HR
- ✅ Can view assigned employees
- ❌ Cannot view other HRs or their employees
- ❌ Cannot see managers or organizational hierarchy beyond their employees

#### Employee
- ❌ Cannot access Administration dashboard
- ❌ Cannot view organizational hierarchy
- Route protection redirects to dashboard

### 5. UI Components

#### HierarchyTree Component (`components/hierarchy-tree.tsx`)
- Recursive tree structure display
- Expandable/collapsible nodes
- Role-specific icon display:
  - 🛡️ Shield icon for Admin
  - 💼 Briefcase icon for Manager
  - 👥 Users icon for HR
  - 👤 User icon for Employee
- Color-coded role badges
- Hover effects and smooth animations
- Depth-based styling for visual hierarchy

#### Administration Page (`app/administration/page.tsx`)
- Role-based view customization
- Info cards showing:
  - Current user role
  - Viewing entity type
  - Total count of visible records
- No-data state with helpful messages
- Access denial screen for unauthorized users
- Responsive layout

## Technical Implementation

### Files Modified/Created

1. **types/index.ts**
   - Added hierarchical parent references
   - Added password field to User interface

2. **lib/mock-data.ts**
   - Created comprehensive demo dataset
   - 16 total users with proper hierarchy
   - All parent-child relationships configured

3. **lib/auth-context.tsx**
   - Updated login to use password field from user data
   - Maintains user session in localStorage

4. **components/sidebar.tsx**
   - Added Administration menu item
   - Role-based visibility: hr, manager, admin

5. **components/hierarchy-tree.tsx** (New)
   - Recursive hierarchy tree component
   - Expandable/collapsible nodes
   - Role-based styling and icons

6. **app/administration/page.tsx** (New)
   - Main administration dashboard
   - Role-based view rendering
   - Access control enforcement
   - Hierarchical data display

7. **app/administration/layout.tsx** (New)
   - Layout wrapper for administration section

## Access Control Implementation

### Route Protection
```tsx
// Check if user has permission
const canAccess = ["admin", "manager", "hr"].includes(user?.role || "")

if (!canAccess) {
  // Show access denied screen
  // Option to return to dashboard
}
```

### Data Filtering Logic
```tsx
// Admin: Sees all managers
if (user.role === "admin") {
  return filteredUsers.filter(u => u.role === "manager")
}

// Manager: Sees only their HRs
if (user.role === "manager") {
  return filteredUsers.filter(u => u.managerId === user.id)
}

// HR: Sees only their employees
if (user.role === "hr") {
  return filteredUsers.filter(u => u.hrId === user.id)
}
```

## Testing Guide

### Test Cases

1. **Admin Login & Access**
   - Login with: admin / admin
   - Verify: See all managers in hierarchy
   - Verify: Can expand each manager to see HRs
   - Verify: Can expand each HR to see employees

2. **Manager Login & Access**
   - Login with: Manager1 / Manager
   - Verify: See only their 2 HRs (HR1, HR2)
   - Verify: Can expand to see employees under each HR
   - Verify: Cannot see Manager2 or their reports

3. **HR Login & Access**
   - Login with: HR1 / Hr
   - Verify: See only their 2 employees
   - Verify: Cannot see other HRs' employees
   - Verify: No expand/collapse for employees (leaf nodes)

4. **Employee Access Prevention**
   - Login with: Employee1 / Employee
   - Verify: Administration menu not visible
   - Verify: Manual route navigation to /administration shows access denied
   - Verify: Can redirect back to dashboard

5. **Menu Visibility**
   - Test each role
   - Verify correct menu items appear based on role
   - Verify Administration menu only appears for admin, manager, hr

## UI Features

### Visual Indicators
- Color-coded role badges
- Role-specific icons
- Expandable/collapsible tree nodes
- Hover effects on cards
- Active state highlighting

### Responsive Design
- Mobile-friendly layout
- Scrollable hierarchy for large datasets
- Adaptive grid for info cards
- Touch-friendly expand/collapse buttons

### User Experience
- Clear role identification
- Intuitive hierarchy visualization
- No-data states with helpful messages
- Access denial with helpful redirect
- Smooth animations and transitions

## Scalability Considerations

### Future Enhancements
1. Add search functionality
2. Export hierarchy to PDF/CSV
3. Bulk operations on multiple users
4. Audit logs for access tracking
5. Department/Location-based filtering
6. Advanced role permissions
7. Real-time sync with backend API

### Code Modularity
- HierarchyTree component can be reused
- Access control logic is centralized
- User filtering is abstracted
- Easy to extend with new roles

## Notes

- All user passwords are role-based (e.g., all Managers use "Manager")
- Hierarchy is immutable in this demo (stored in mock data)
- No actual data persistence (in-memory only)
- For production: Move to backend API with real database

## Quick Start

1. Login with any demo credentials from tables above
2. Navigate to "Administration" menu (visible only for admin/manager/hr)
3. Expand/collapse hierarchy nodes
4. Try different roles to see different views
5. Attempt to access as Employee to see access denial
