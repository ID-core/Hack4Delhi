# Data Structure & API Reference

## User Interface Definition

```typescript
export interface User {
  id: string                    // Unique identifier
  employeeId: string           // Employee ID (e.g., "ADM001")
  name: string                 // Full name
  email: string                // Email/Username for login
  password: string             // Password (stored plain-text in demo)
  role: UserRole               // "admin" | "manager" | "hr" | "employee"
  department: string           // Department name
  designation: string          // Job title
  joiningDate: string          // Date joined (YYYY-MM-DD)
  reportingManager?: string    // Name of reporting manager
  avatar?: string              // Avatar URL (optional)
  assignedLocation?: {         // Assigned location
    lat: number               // Latitude
    lng: number               // Longitude
    name: string              // Location name
  }
  
  // HIERARCHICAL REFERENCES (New)
  adminId?: string             // Reference to Admin (optional)
  managerId?: string           // Reference to Manager (optional)
  hrId?: string                // Reference to HR (optional)
}
```

## Demo Dataset Complete Structure

### Admin (1 user)

```typescript
{
  id: "admin1",
  employeeId: "ADM001",
  name: "Admin1",
  email: "admin",
  password: "admin",
  role: "admin",
  department: "Administration",
  designation: "System Administrator",
  joiningDate: "2020-01-01",
}
```

### Managers (2 users)

```typescript
{
  id: "manager1",
  employeeId: "MGR001",
  name: "Manager1",
  email: "Manager1",
  password: "Manager",
  role: "manager",
  department: "Operations",
  designation: "Operations Manager",
  joiningDate: "2019-05-10",
  adminId: "admin1",           // Parent: Admin1
}

{
  id: "manager2",
  employeeId: "MGR002",
  name: "Manager2",
  email: "Manager2",
  password: "Manager",
  role: "manager",
  department: "Operations",
  designation: "Operations Manager",
  joiningDate: "2019-06-15",
  adminId: "admin1",           // Parent: Admin1
}
```

### HRs (4 users - 2 per manager)

```typescript
// Under Manager1
{
  id: "hr1",
  employeeId: "HR001",
  name: "HR1",
  email: "HR1",
  password: "Hr",
  role: "hr",
  department: "Human Resources",
  designation: "HR Specialist",
  joiningDate: "2018-03-20",
  managerId: "manager1",       // Parent: Manager1
  adminId: "admin1",
}

{
  id: "hr2",
  employeeId: "HR002",
  name: "HR2",
  email: "HR2",
  password: "Hr",
  role: "hr",
  department: "Human Resources",
  designation: "HR Specialist",
  joiningDate: "2018-04-10",
  managerId: "manager1",       // Parent: Manager1
  adminId: "admin1",
}

// Under Manager2
{
  id: "hr3",
  employeeId: "HR003",
  name: "HR3",
  email: "HR3",
  password: "Hr",
  role: "hr",
  department: "Human Resources",
  designation: "HR Specialist",
  joiningDate: "2018-05-15",
  managerId: "manager2",       // Parent: Manager2
  adminId: "admin1",
}

{
  id: "hr4",
  employeeId: "HR004",
  name: "HR4",
  email: "HR4",
  password: "Hr",
  role: "hr",
  department: "Human Resources",
  designation: "HR Specialist",
  joiningDate: "2018-06-20",
  managerId: "manager2",       // Parent: Manager2
  adminId: "admin1",
}
```

### Employees (8 users - 2 per HR)

```typescript
// Under HR1
{
  id: "emp1",
  employeeId: "EMP001",
  name: "Employee1",
  email: "Employee1",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-01-15",
  hrId: "hr1",                 // Parent: HR1
  managerId: "manager1",
  adminId: "admin1",
}

{
  id: "emp2",
  employeeId: "EMP002",
  name: "Employee2",
  email: "Employee2",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-02-20",
  hrId: "hr1",                 // Parent: HR1
  managerId: "manager1",
  adminId: "admin1",
}

// Under HR2
{
  id: "emp3",
  employeeId: "EMP003",
  name: "Employee3",
  email: "Employee3",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-03-10",
  hrId: "hr2",                 // Parent: HR2
  managerId: "manager1",
  adminId: "admin1",
}

{
  id: "emp4",
  employeeId: "EMP004",
  name: "Employee4",
  email: "Employee4",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-04-05",
  hrId: "hr2",                 // Parent: HR2
  managerId: "manager1",
  adminId: "admin1",
}

// Under HR3
{
  id: "emp5",
  employeeId: "EMP005",
  name: "Employee5",
  email: "Employee5",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-05-12",
  hrId: "hr3",                 // Parent: HR3
  managerId: "manager2",
  adminId: "admin1",
}

{
  id: "emp6",
  employeeId: "EMP006",
  name: "Employee6",
  email: "Employee6",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-06-08",
  hrId: "hr3",                 // Parent: HR3
  managerId: "manager2",
  adminId: "admin1",
}

// Under HR4
{
  id: "emp7",
  employeeId: "EMP007",
  name: "Employee7",
  email: "Employee7",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-07-22",
  hrId: "hr4",                 // Parent: HR4
  managerId: "manager2",
  adminId: "admin1",
}

{
  id: "emp8",
  employeeId: "EMP008",
  name: "Employee8",
  email: "Employee8",
  password: "Employee",
  role: "employee",
  department: "Operations",
  designation: "Field Officer",
  joiningDate: "2021-08-30",
  hrId: "hr4",                 // Parent: HR4
  managerId: "manager2",
  adminId: "admin1",
}
```

## Hierarchy Query Examples

### Get all Managers for Admin

```typescript
const managers = mockUsers.filter(u => 
  u.role === "manager" && u.adminId === "admin1"
)
// Returns: [Manager1, Manager2]
```

### Get all HRs for Manager1

```typescript
const hrs = mockUsers.filter(u => 
  u.role === "hr" && u.managerId === "manager1"
)
// Returns: [HR1, HR2]
```

### Get all Employees for HR1

```typescript
const employees = mockUsers.filter(u => 
  u.role === "employee" && u.hrId === "hr1"
)
// Returns: [Employee1, Employee2]
```

### Get direct reports for any user

```typescript
function getDirectReports(userId: string, users: User[]): User[] {
  const user = users.find(u => u.id === userId)
  if (!user) return []
  
  switch (user.role) {
    case "admin":
      return users.filter(u => u.adminId === userId)
    case "manager":
      return users.filter(u => u.managerId === userId)
    case "hr":
      return users.filter(u => u.hrId === userId)
    case "employee":
    default:
      return []
  }
}
```

### Get all subordinates (recursive)

```typescript
function getAllSubordinates(userId: string, users: User[]): User[] {
  const directReports = getDirectReports(userId, users)
  const allSubordinates: User[] = [...directReports]
  
  for (const report of directReports) {
    allSubordinates.push(
      ...getAllSubordinates(report.id, users)
    )
  }
  
  return allSubordinates
}
```

## Authentication API

### Login Request

```typescript
interface LoginRequest {
  email: string      // Username/email
  password: string   // Password
}
```

### Login Response

```typescript
interface LoginResponse {
  success: boolean
  user?: User        // User object if success
  message?: string   // Error message if fail
}
```

### Login Implementation

```typescript
function login(email: string, password: string): boolean {
  const foundUser = mockUsers.find((u) => u.email === email)
  if (foundUser && foundUser.password === password) {
    setUser(foundUser)
    localStorage.setItem("hrms-user", JSON.stringify(foundUser))
    return true
  }
  return false
}
```

## HierarchyTree Component Data Structure

### HierarchyNode Interface

```typescript
interface HierarchyNode {
  user: User           // User object
  children: HierarchyNode[]  // Array of child nodes (recursive)
}
```

### Example Hierarchy for Admin

```typescript
const adminHierarchy: HierarchyNode[] = [
  {
    user: Manager1,
    children: [
      {
        user: HR1,
        children: [
          { user: Employee1, children: [] },
          { user: Employee2, children: [] }
        ]
      },
      {
        user: HR2,
        children: [
          { user: Employee3, children: [] },
          { user: Employee4, children: [] }
        ]
      }
    ]
  },
  {
    user: Manager2,
    children: [
      {
        user: HR3,
        children: [
          { user: Employee5, children: [] },
          { user: Employee6, children: [] }
        ]
      },
      {
        user: HR4,
        children: [
          { user: Employee7, children: [] },
          { user: Employee8, children: [] }
        ]
      }
    ]
  }
]
```

## Access Control Logic

### Can Access Administration

```typescript
const canAccessAdministration = (user: User | null): boolean => {
  if (!user) return false
  return ["admin", "manager", "hr"].includes(user.role)
}
```

### Get Visible Users (Role-Based Filtering)

```typescript
function getVisibleUsers(currentUser: User, allUsers: User[]): User[] {
  if (currentUser.role === "admin") {
    // Admin sees all
    return allUsers
  } else if (currentUser.role === "manager") {
    // Manager sees themselves, HRs, and employees under their HRs
    return allUsers.filter(u => 
      u.id === currentUser.id ||
      u.managerId === currentUser.id ||
      u.hrId !== undefined && 
        allUsers.find(hr => 
          hr.id === u.hrId && hr.managerId === currentUser.id
        )
    )
  } else if (currentUser.role === "hr") {
    // HR sees themselves and their employees
    return allUsers.filter(u => 
      u.id === currentUser.id ||
      u.hrId === currentUser.id
    )
  } else if (currentUser.role === "employee") {
    // Employee sees only themselves
    return [currentUser]
  }
  return []
}
```

## React Hooks Usage

### useAuth Hook

```typescript
interface AuthContextType {
  user: User | null           // Current logged-in user
  login: (email: string, password: string) => boolean
  logout: () => void
  isLoading: boolean
}

const { user, login, logout, isLoading } = useAuth()
```

### useState for Tree Expansion

```typescript
const [isExpanded, setIsExpanded] = useState(depth < 2)

const toggleExpand = () => setIsExpanded(!isExpanded)
```

### useMemo for Hierarchy Building

```typescript
const hierarchyData = useMemo(() => {
  if (!user) return []
  // Build hierarchy based on user role
  return buildHierarchy(user)
}, [user])
```

## localStorage Keys

```typescript
// User session storage key
const USER_SESSION_KEY = "hrms-user"

// Store user
localStorage.setItem("hrms-user", JSON.stringify(user))

// Retrieve user
const storedUser = localStorage.getItem("hrms-user")
const user = storedUser ? JSON.parse(storedUser) : null

// Clear user
localStorage.removeItem("hrms-user")
```

## Database Schema (For Future Backend)

```sql
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  employeeId VARCHAR(20) UNIQUE,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),  -- Should be hashed
  role ENUM('admin', 'manager', 'hr', 'employee'),
  department VARCHAR(100),
  designation VARCHAR(100),
  joiningDate DATE,
  reportingManager VARCHAR(100),
  avatar VARCHAR(255),
  assignedLocation JSON,
  
  -- Hierarchical references
  adminId VARCHAR(50),
  managerId VARCHAR(50),
  hrId VARCHAR(50),
  
  -- Timestamps
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (adminId) REFERENCES users(id),
  FOREIGN KEY (managerId) REFERENCES users(id),
  FOREIGN KEY (hrId) REFERENCES users(id)
)
```

---

This document provides the complete data structure and API reference for the role-based dashboard system!
