import type {
  ApproverRole,
  LeaveDecision,
  LeaveRequest,
  LeaveWorkflowStatus,
  UserRole,
} from "@/types"

// Use localStorage for persistence across page navigation
const LEAVE_STORE_KEY = "leave_store_v1"

function getLeaveStore(): { requests: LeaveRequest[] } {
  if (typeof window === "undefined") return { requests: [] }
  try {
    const stored = localStorage.getItem(LEAVE_STORE_KEY)
    return stored ? JSON.parse(stored) : { requests: [] }
  } catch {
    return { requests: [] }
  }
}

function saveLeaveStore(store: { requests: LeaveRequest[] }) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(LEAVE_STORE_KEY, JSON.stringify(store))
    console.log("💾 Leave store saved to localStorage")
  } catch (e) {
    console.error("❌ Failed to save leave store:", e)
  }
}

const now = () => new Date().toISOString()
const genId = () => `leave_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

const nextApprover: Record<Exclude<ApproverRole, null>, ApproverRole> = {
  hr: "manager",
  manager: "admin",
  admin: null,
}

const approveStatusMap: Record<Exclude<ApproverRole, null>, LeaveWorkflowStatus> = {
  hr: "HR_APPROVED",
  manager: "MANAGER_APPROVED",
  admin: "APPROVED",
}

const rejectStatusMap: Record<Exclude<ApproverRole, null>, LeaveWorkflowStatus> = {
  hr: "HR_REJECTED",
  manager: "MANAGER_REJECTED",
  admin: "REJECTED",
}

function assertCanAct(req: LeaveRequest, actorRole: UserRole) {
  if (req.currentApproverRole === null) {
    throw new Error("Leave request is finalized and cannot be edited")
  }
  if (actorRole !== req.currentApproverRole) {
    throw new Error("Only the current approver role can take action")
  }
}

export interface ApplyLeaveInput {
  employeeId: string
  type: LeaveRequest["type"]
  fromDate: string
  toDate: string
  reason: string
}

export function applyLeave(input: ApplyLeaveInput): LeaveRequest {
  const leaveStore = getLeaveStore()
  const id = genId()
  const request: LeaveRequest = {
    id,
    employeeId: input.employeeId,
    type: input.type,
    fromDate: input.fromDate,
    toDate: input.toDate,
    reason: input.reason,
    status: "PENDING",
    currentApproverRole: "hr",
    decisionHistory: [
      {
        actorRole: "employee",
        action: "APPLY",
        timestamp: now(),
      },
    ],
    createdAt: now(),
    updatedAt: now(),
  }
  leaveStore.requests.push(request)
  saveLeaveStore(leaveStore)
  console.log("✅ Leave applied:", request)
  console.log("📦 Store now has", leaveStore.requests.length, "leaves")
  return request
}

export interface ActOnLeaveInput {
  requestId: string
  actorRole: UserRole // must match currentApproverRole
  actorId?: string
  comment?: string
}

export function approveLeave(input: ActOnLeaveInput): LeaveRequest {
  const leaveStore = getLeaveStore()
  const req = leaveStore.requests.find((r) => r.id === input.requestId)
  if (!req) throw new Error("Leave request not found")
  assertCanAct(req, input.actorRole)

  const role = req.currentApproverRole as Exclude<ApproverRole, null>
  req.status = approveStatusMap[role]
  req.currentApproverRole = nextApprover[role]
  req.decisionHistory.push({
    actorRole: input.actorRole,
    actorId: input.actorId,
    action: "APPROVE",
    timestamp: now(),
    comment: input.comment,
  })
  req.updatedAt = now()
  saveLeaveStore(leaveStore)
  return req
}

export function rejectLeave(input: ActOnLeaveInput): LeaveRequest {
  const leaveStore = getLeaveStore()
  const req = leaveStore.requests.find((r) => r.id === input.requestId)
  if (!req) throw new Error("Leave request not found")
  assertCanAct(req, input.actorRole)

  const role = req.currentApproverRole as Exclude<ApproverRole, null>
  req.status = rejectStatusMap[role]
  req.currentApproverRole = null // rejection is terminal
  req.decisionHistory.push({
    actorRole: input.actorRole,
    actorId: input.actorId,
    action: "REJECT",
    timestamp: now(),
    comment: input.comment,
  })
  req.updatedAt = now()
  saveLeaveStore(leaveStore)
  return req
}

// Queries/helpers
export function getRequestsForEmployee(employeeId: string): LeaveRequest[] {
  const leaveStore = getLeaveStore()
  return leaveStore.requests.filter((r) => r.employeeId === employeeId)
}

export function getPendingForRole(role: Exclude<ApproverRole, null>): LeaveRequest[] {
  const leaveStore = getLeaveStore()
  const pending = leaveStore.requests.filter((r) => r.currentApproverRole === role)
  console.log(`🔍 getPendingForRole("${role}"): found ${pending.length} requests. Total in store: ${leaveStore.requests.length}`)
  leaveStore.requests.forEach((r) => console.log(`   - ${r.employeeId}: approver=${r.currentApproverRole}, status=${r.status}`))
  return pending
}

export function getStoreSnapshot(): LeaveRequest[] {
  const leaveStore = getLeaveStore()
  return [...leaveStore.requests]
}

// Reset store (useful for tests)
export function resetLeaveStore() {
  if (typeof window === "undefined") return
  localStorage.removeItem(LEAVE_STORE_KEY)
  console.log("🔄 Leave store reset")
}