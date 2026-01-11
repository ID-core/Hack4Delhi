export type UserRole = "employee" | "manager" | "hr" | "admin"

export interface User {
  id: string
  employeeId: string
  name: string
  email: string
  role: UserRole
  password: string
  department: string
  designation: string
  joiningDate: string
  reportingManager?: string
  avatar?: string
  assignedLocation?: {
    lat: number
    lng: number
    name: string
  }
  // Hierarchical parent references
  adminId?: string
  managerId?: string
  hrId?: string
}

export interface Employee extends User {
  phone: string
  address: string
  panNumber: string
  aadharNumber: string
  bankAccount: string
  currentPostingLocation: string
  transferHistory: Transfer[]
}

export interface Transfer {
  id: string
  employeeId: string
  fromLocation: string
  toLocation: string
  requestDate: string
  approvalDate?: string
  status: "pending" | "approved" | "rejected"
  reason: string
  score: number
}

export interface Appraisal {
  id: string
  employeeId: string
  year: number
  selfScore: number
  managerScore: number
  hrScore: number
  finalScore: number
  attendanceImpact: number
  geoHazriCompliance: number
  beatCoverage?: number
  status: "draft" | "submitted" | "reviewed" | "completed"
  goals: Goal[]
}

export interface Goal {
  id: string
  description: string
  targetDate: string
  status: "not-started" | "in-progress" | "completed"
  selfRating?: number
  managerRating?: number
}

export interface CheckInAttempt {
  timestamp: string
  lat: number
  lng: number
  distance: number
  compliant: boolean
}

export interface Attendance {
  id: string
  employeeId: string
  date: string
  checkIn: string
  checkOut: string
  location: {
    lat: number
    lng: number
  }
  geoHazriCompliant: boolean
  status: "present" | "absent" | "half-day" | "leave"
  checkInAttempts?: CheckInAttempt[]
}

export interface Leave {
  id: string
  employeeId: string
  type: "casual" | "earned" | "medical" | "maternity"
  fromDate: string
  toDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  approvedBy: string

// Leave approval workflow types
export type ApprovalAction = "APPLY" | "APPROVE" | "REJECT"

export type LeaveWorkflowStatus =
  | "PENDING"
  | "HR_APPROVED"
  | "HR_REJECTED"
  | "MANAGER_APPROVED"
  | "MANAGER_REJECTED"
  | "APPROVED"
  | "REJECTED"

export type ApproverRole = "hr" | "manager" | "admin" | null

export interface LeaveDecision {
  actorRole: UserRole
  actorId?: string
  action: ApprovalAction
  timestamp: string
  comment?: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  type: "casual" | "earned" | "medical" | "maternity"
  fromDate: string
  toDate: string
  reason: string
  status: LeaveWorkflowStatus
  currentApproverRole: ApproverRole
  decisionHistory: LeaveDecision[]
  createdAt: string
  updatedAt: string
}
}
