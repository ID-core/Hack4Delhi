(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mockAppraisals",
    ()=>mockAppraisals,
    "mockAttendance",
    ()=>mockAttendance,
    "mockLeaves",
    ()=>mockLeaves,
    "mockTransfers",
    ()=>mockTransfers,
    "mockUsers",
    ()=>mockUsers
]);
const mockUsers = [
    // Admin (1)
    {
        id: "admin1",
        employeeId: "ADM001",
        name: "Admin1",
        email: "admin@municipal.gov.in",
        password: "admin",
        role: "admin",
        department: "Administration",
        designation: "System Administrator",
        joiningDate: "2020-01-01",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "Municipal Headquarters"
        }
    },
    // Managers (2)
    {
        id: "manager1",
        employeeId: "MGR001",
        name: "Manager1",
        email: "manager1@municipal.gov.in",
        password: "Manager",
        role: "manager",
        department: "Operations",
        designation: "Operations Manager",
        joiningDate: "2019-05-10",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "Municipal Headquarters"
        }
    },
    {
        id: "manager2",
        employeeId: "MGR002",
        name: "Manager2",
        email: "manager2@municipal.gov.in",
        password: "Manager",
        role: "manager",
        department: "Operations",
        designation: "Operations Manager",
        joiningDate: "2019-06-15",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "Municipal Headquarters"
        }
    },
    // HRs Under Manager1 (2)
    {
        id: "hr1",
        employeeId: "HR001",
        name: "HR1",
        email: "hr1@municipal.gov.in",
        password: "Hr",
        role: "hr",
        department: "Human Resources",
        designation: "HR Specialist",
        joiningDate: "2018-03-20",
        managerId: "manager1",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "HR Department"
        }
    },
    {
        id: "hr2",
        employeeId: "HR002",
        name: "HR2",
        email: "hr2@municipal.gov.in",
        password: "Hr",
        role: "hr",
        department: "Human Resources",
        designation: "HR Specialist",
        joiningDate: "2018-04-10",
        managerId: "manager1",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "HR Department"
        }
    },
    // HRs Under Manager2 (2)
    {
        id: "hr3",
        employeeId: "HR003",
        name: "HR3",
        email: "hr3@municipal.gov.in",
        password: "Hr",
        role: "hr",
        department: "Human Resources",
        designation: "HR Specialist",
        joiningDate: "2018-05-15",
        managerId: "manager2",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "HR Department"
        }
    },
    {
        id: "hr4",
        employeeId: "HR004",
        name: "HR4",
        email: "hr4@municipal.gov.in",
        password: "Hr",
        role: "hr",
        department: "Human Resources",
        designation: "HR Specialist",
        joiningDate: "2018-06-20",
        managerId: "manager2",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "HR Department"
        }
    },
    // Employees Under HR1 (2)
    {
        id: "emp1",
        employeeId: "EMP001",
        name: "Employee1",
        email: "employee1@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-01-15",
        hrId: "hr1",
        managerId: "manager1",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.6139,
            lng: 77.209,
            name: "Zone A"
        }
    },
    {
        id: "emp2",
        employeeId: "EMP002",
        name: "Employee2",
        email: "employee2@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-02-20",
        hrId: "hr1",
        managerId: "manager1",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.614,
            lng: 77.21,
            name: "Zone A"
        }
    },
    // Employees Under HR2 (2)
    {
        id: "emp3",
        employeeId: "EMP003",
        name: "Employee3",
        email: "employee3@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-03-10",
        hrId: "hr2",
        managerId: "manager1",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.615,
            lng: 77.211,
            name: "Zone B"
        }
    },
    {
        id: "emp4",
        employeeId: "EMP004",
        name: "Employee4",
        email: "employee4@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-04-05",
        hrId: "hr2",
        managerId: "manager1",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.616,
            lng: 77.212,
            name: "Zone B"
        }
    },
    // Employees Under HR3 (2)
    {
        id: "emp5",
        employeeId: "EMP005",
        name: "Employee5",
        email: "employee5@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-05-12",
        hrId: "hr3",
        managerId: "manager2",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.617,
            lng: 77.213,
            name: "Zone C"
        }
    },
    {
        id: "emp6",
        employeeId: "EMP006",
        name: "Employee6",
        email: "employee6@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-06-08",
        hrId: "hr3",
        managerId: "manager2",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.618,
            lng: 77.214,
            name: "Zone C"
        }
    },
    // Employees Under HR4 (2)
    {
        id: "emp7",
        employeeId: "EMP007",
        name: "Employee7",
        email: "employee7@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-07-22",
        hrId: "hr4",
        managerId: "manager2",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.619,
            lng: 77.215,
            name: "Zone D"
        }
    },
    {
        id: "emp8",
        employeeId: "EMP008",
        name: "Employee8",
        email: "employee8@municipal.gov.in",
        password: "Employee",
        role: "employee",
        department: "Operations",
        designation: "Field Officer",
        joiningDate: "2021-08-30",
        hrId: "hr4",
        managerId: "manager2",
        adminId: "admin1",
        assignedLocation: {
            lat: 28.62,
            lng: 77.216,
            name: "Zone D"
        }
    }
];
const mockAttendance = [
    {
        id: "1",
        employeeId: "EMP001",
        date: "2026-01-10",
        checkIn: "09:05",
        checkOut: "17:10",
        location: {
            lat: 28.6135,
            lng: 77.2087
        },
        geoHazriCompliant: true,
        status: "present"
    },
    {
        id: "2",
        employeeId: "EMP001",
        date: "2026-01-11",
        checkIn: "09:20",
        checkOut: "17:00",
        location: {
            lat: 28.6137,
            lng: 77.2092
        },
        geoHazriCompliant: false,
        status: "present"
    },
    {
        id: "3",
        employeeId: "EMP001",
        date: "2026-01-12",
        checkIn: "--",
        checkOut: "--",
        location: {
            lat: 0,
            lng: 0
        },
        geoHazriCompliant: false,
        status: "absent"
    },
    {
        id: "4",
        employeeId: "EMP001",
        date: "2026-01-13",
        checkIn: "08:55",
        checkOut: "17:20",
        location: {
            lat: 28.6141,
            lng: 77.2093
        },
        geoHazriCompliant: true,
        status: "present"
    },
    {
        id: "5",
        employeeId: "EMP001",
        date: "2026-01-14",
        checkIn: "09:35",
        checkOut: "17:05",
        location: {
            lat: 28.6142,
            lng: 77.2091
        },
        geoHazriCompliant: false,
        status: "present"
    },
    {
        id: "6",
        employeeId: "EMP001",
        date: "2026-01-15",
        checkIn: "08:45",
        checkOut: "17:30",
        location: {
            lat: 28.6139,
            lng: 77.209
        },
        geoHazriCompliant: true,
        status: "present"
    },
    {
        id: "7",
        employeeId: "EMP001",
        date: "2026-01-16",
        checkIn: "09:15",
        checkOut: "17:00",
        location: {
            lat: 28.614,
            lng: 77.2095
        },
        geoHazriCompliant: false,
        status: "present"
    }
];
const mockAppraisals = [
    {
        id: "1",
        employeeId: "ADM001",
        year: 2026,
        selfScore: 92,
        managerScore: 90,
        hrScore: 91,
        finalScore: 91,
        attendanceImpact: 0,
        geoHazriCompliance: 98,
        beatCoverage: 96,
        status: "completed",
        goals: []
    },
    {
        id: "2",
        employeeId: "MGR001",
        year: 2026,
        selfScore: 88,
        managerScore: 86,
        hrScore: 87,
        finalScore: 87,
        attendanceImpact: 1,
        geoHazriCompliance: 95,
        beatCoverage: 93,
        status: "completed",
        goals: []
    },
    {
        id: "3",
        employeeId: "MGR002",
        year: 2026,
        selfScore: 86,
        managerScore: 84,
        hrScore: 85,
        finalScore: 85,
        attendanceImpact: -1,
        geoHazriCompliance: 93,
        beatCoverage: 91,
        status: "completed",
        goals: []
    },
    {
        id: "4",
        employeeId: "HR001",
        year: 2026,
        selfScore: 82,
        managerScore: 80,
        hrScore: 81,
        finalScore: 81,
        attendanceImpact: 0,
        geoHazriCompliance: 91,
        beatCoverage: 89,
        status: "completed",
        goals: []
    },
    {
        id: "5",
        employeeId: "HR002",
        year: 2026,
        selfScore: 84,
        managerScore: 82,
        hrScore: 83,
        finalScore: 83,
        attendanceImpact: -1,
        geoHazriCompliance: 92,
        beatCoverage: 90,
        status: "completed",
        goals: []
    },
    {
        id: "6",
        employeeId: "HR003",
        year: 2026,
        selfScore: 79,
        managerScore: 77,
        hrScore: 78,
        finalScore: 78,
        attendanceImpact: -3,
        geoHazriCompliance: 88,
        beatCoverage: 86,
        status: "submitted",
        goals: []
    },
    {
        id: "7",
        employeeId: "HR004",
        year: 2026,
        selfScore: 81,
        managerScore: 79,
        hrScore: 80,
        finalScore: 80,
        attendanceImpact: -2,
        geoHazriCompliance: 90,
        beatCoverage: 88,
        status: "submitted",
        goals: []
    },
    {
        id: "8",
        employeeId: "EMP001",
        year: 2026,
        selfScore: 85,
        managerScore: 78,
        hrScore: 80,
        finalScore: 81,
        attendanceImpact: -2,
        geoHazriCompliance: 92,
        beatCoverage: 88,
        status: "completed",
        goals: [
            {
                id: "g1",
                description: "Cover all assigned beats daily",
                targetDate: "2026-12-31",
                status: "completed",
                selfRating: 9,
                managerRating: 8
            },
            {
                id: "g2",
                description: "Maintain 95% Geo-Hazri compliance",
                targetDate: "2026-12-31",
                status: "in-progress",
                selfRating: 8,
                managerRating: 7
            }
        ]
    },
    {
        id: "9",
        employeeId: "EMP002",
        year: 2026,
        selfScore: 76,
        managerScore: 74,
        hrScore: 75,
        finalScore: 75,
        attendanceImpact: -4,
        geoHazriCompliance: 85,
        beatCoverage: 82,
        status: "draft",
        goals: []
    },
    {
        id: "10",
        employeeId: "EMP003",
        year: 2026,
        selfScore: 87,
        managerScore: 85,
        hrScore: 86,
        finalScore: 86,
        attendanceImpact: 0,
        geoHazriCompliance: 94,
        beatCoverage: 92,
        status: "completed",
        goals: []
    },
    {
        id: "11",
        employeeId: "EMP004",
        year: 2026,
        selfScore: 83,
        managerScore: 81,
        hrScore: 82,
        finalScore: 82,
        attendanceImpact: -1,
        geoHazriCompliance: 91,
        beatCoverage: 89,
        status: "completed",
        goals: []
    },
    {
        id: "12",
        employeeId: "EMP005",
        year: 2026,
        selfScore: 80,
        managerScore: 78,
        hrScore: 79,
        finalScore: 79,
        attendanceImpact: -2,
        geoHazriCompliance: 89,
        beatCoverage: 87,
        status: "submitted",
        goals: []
    },
    {
        id: "13",
        employeeId: "EMP006",
        year: 2026,
        selfScore: 72,
        managerScore: 70,
        hrScore: 71,
        finalScore: 71,
        attendanceImpact: -5,
        geoHazriCompliance: 82,
        beatCoverage: 80,
        status: "draft",
        goals: []
    },
    {
        id: "14",
        employeeId: "EMP007",
        year: 2026,
        selfScore: 89,
        managerScore: 87,
        hrScore: 88,
        finalScore: 88,
        attendanceImpact: 1,
        geoHazriCompliance: 96,
        beatCoverage: 94,
        status: "completed",
        goals: []
    },
    {
        id: "15",
        employeeId: "EMP008",
        year: 2026,
        selfScore: 77,
        managerScore: 75,
        hrScore: 76,
        finalScore: 76,
        attendanceImpact: -3,
        geoHazriCompliance: 87,
        beatCoverage: 85,
        status: "submitted",
        goals: []
    }
];
const mockTransfers = [
    {
        id: "1",
        employeeId: "EMP001",
        fromLocation: "Zone A - Karol Bagh",
        toLocation: "Zone B - Rohini",
        requestDate: "2026-01-10",
        status: "pending",
        reason: "Family relocation",
        score: 78
    }
];
const mockLeaves = [
    {
        id: "1",
        employeeId: "EMP001",
        type: "casual",
        fromDate: "2026-02-01",
        toDate: "2026-02-02",
        reason: "Personal work",
        status: "approved",
        approvedBy: "Priya Sharma"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const storedUser = localStorage.getItem("hrms-user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    const login = (email, password)=>{
        const foundUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.email === email);
        if (foundUser && foundUser.password === password) {
            setUser(foundUser);
            localStorage.setItem("hrms-user", JSON.stringify(foundUser));
            return true;
        }
        return false;
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("hrms-user");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            login,
            logout,
            isLoading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 45,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "YajQB7LURzRD+QP5gw0+K2TZIWA=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/attendance-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttendanceProvider",
    ()=>AttendanceProvider,
    "useAttendance",
    ()=>useAttendance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const AttendanceContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AttendanceProvider({ children }) {
    _s();
    const [attendanceRecords, setAttendanceRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AttendanceProvider.useEffect": ()=>{
            const saved = localStorage.getItem("attendance-records");
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    setAttendanceRecords(new Map(Object.entries(data)));
                } catch (e) {
                    console.error("Failed to load attendance records:", e);
                }
            }
        }
    }["AttendanceProvider.useEffect"], []);
    // Save to localStorage whenever records change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AttendanceProvider.useEffect": ()=>{
            const data = Object.fromEntries(attendanceRecords);
            localStorage.setItem("attendance-records", JSON.stringify(data));
        }
    }["AttendanceProvider.useEffect"], [
        attendanceRecords
    ]);
    const addCheckInAttempt = (date, attempt)=>{
        setAttendanceRecords((prev)=>{
            const updated = new Map(prev);
            const existing = updated.get(date);
            if (existing) {
                existing.checkInAttempts.push(attempt);
                // If this is the first compliant attempt, mark the day as compliant
                if (attempt.compliant && !existing.firstCompliantTime) {
                    existing.geoCompliant = true;
                    existing.firstCompliantTime = attempt.timestamp;
                    existing.status = "present";
                }
            } else {
                updated.set(date, {
                    date,
                    status: attempt.compliant ? "present" : "present",
                    geoCompliant: attempt.compliant,
                    checkInAttempts: [
                        attempt
                    ],
                    firstCompliantTime: attempt.compliant ? attempt.timestamp : undefined
                });
            }
            return updated;
        });
    };
    const getTodayAttendance = ()=>{
        const today = new Date().toISOString().split("T")[0];
        return attendanceRecords.get(today);
    };
    const getAllAttendance = ()=>{
        return Array.from(attendanceRecords.values()).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    };
    const getComplianceSummary = ()=>{
        const all = getAllAttendance();
        return {
            compliant: all.filter((a)=>a.geoCompliant).length,
            nonCompliant: all.filter((a)=>!a.geoCompliant && a.status === "present").length
        };
    };
    const getAttendanceRate = ()=>{
        const all = getAllAttendance();
        if (all.length === 0) return 0;
        const presentDays = all.filter((a)=>a.status === "present").length;
        return presentDays / all.length * 100;
    };
    const value = {
        attendanceRecords,
        addCheckInAttempt,
        getTodayAttendance,
        getAllAttendance,
        getComplianceSummary,
        getAttendanceRate
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AttendanceContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/attendance-context.tsx",
        lineNumber: 109,
        columnNumber: 10
    }, this);
}
_s(AttendanceProvider, "XSaQXFRpmhqBp3ipkcyzAhYU4zw=");
_c = AttendanceProvider;
function useAttendance() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AttendanceContext);
    if (!context) {
        throw new Error("useAttendance must be used within AttendanceProvider");
    }
    return context;
}
_s1(useAttendance, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AttendanceProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@vercel/analytics/dist/next/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Analytics",
    ()=>Analytics2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/nextjs/index.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// src/nextjs/utils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
"use client";
;
;
// package.json
var name = "@vercel/analytics";
var version = "1.3.1";
// src/queue.ts
var initQueue = ()=>{
    if (window.va) return;
    window.va = function a(...params) {
        (window.vaq = window.vaq || []).push(params);
    };
};
// src/utils.ts
function isBrowser() {
    return typeof window !== "undefined";
}
function detectEnvironment() {
    try {
        const env = ("TURBOPACK compile-time value", "development");
        if ("TURBOPACK compile-time truthy", 1) {
            return "development";
        }
    } catch (e) {}
    return "production";
}
function setMode(mode = "auto") {
    if (mode === "auto") {
        window.vam = detectEnvironment();
        return;
    }
    window.vam = mode;
}
function getMode() {
    const mode = isBrowser() ? window.vam : detectEnvironment();
    return mode || "production";
}
function isDevelopment() {
    return getMode() === "development";
}
function computeRoute(pathname, pathParams) {
    if (!pathname || !pathParams) {
        return pathname;
    }
    let result = pathname;
    try {
        const entries = Object.entries(pathParams);
        for (const [key, value] of entries){
            if (!Array.isArray(value)) {
                const matcher = turnValueToRegExp(value);
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[${key}]`);
                }
            }
        }
        for (const [key, value] of entries){
            if (Array.isArray(value)) {
                const matcher = turnValueToRegExp(value.join("/"));
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[...${key}]`);
                }
            }
        }
        return result;
    } catch (e) {
        return pathname;
    }
}
function turnValueToRegExp(value) {
    return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// src/generic.ts
var DEV_SCRIPT_URL = "https://va.vercel-scripts.com/v1/script.debug.js";
var PROD_SCRIPT_URL = "/_vercel/insights/script.js";
function inject(props = {
    debug: true
}) {
    var _a;
    if (!isBrowser()) return;
    setMode(props.mode);
    initQueue();
    if (props.beforeSend) {
        (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : PROD_SCRIPT_URL);
    if (document.head.querySelector(`script[src*="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
    script.dataset.sdkv = version;
    if (props.disableAutoTrack) {
        script.dataset.disableAutoTrack = "1";
    }
    if (props.endpoint) {
        script.dataset.endpoint = props.endpoint;
    }
    if (props.dsn) {
        script.dataset.dsn = props.dsn;
    }
    script.onerror = ()=>{
        const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
        console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
    };
    if (isDevelopment() && props.debug === false) {
        script.dataset.debug = "false";
    }
    document.head.appendChild(script);
}
function pageview({ route, path }) {
    var _a;
    (_a = window.va) == null ? void 0 : _a.call(window, "pageview", {
        route,
        path
    });
}
// src/react.tsx
function Analytics(props) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            inject({
                framework: props.framework || "react",
                ...props.route !== void 0 && {
                    disableAutoTrack: true
                },
                ...props
            });
        }
    }["Analytics.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            if (props.route && props.path) {
                pageview({
                    route: props.route,
                    path: props.path
                });
            }
        }
    }["Analytics.useEffect"], [
        props.route,
        props.path
    ]);
    return null;
}
;
var useRoute = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const finalParams = {
        ...Object.fromEntries(searchParams.entries()),
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be empty in pages router
        ...params || {}
    };
    return {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be empty in pages router
        route: params ? computeRoute(path, finalParams) : null,
        path
    };
};
// src/nextjs/index.tsx
function AnalyticsComponent(props) {
    const { route, path } = useRoute();
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(Analytics, {
        path,
        route,
        ...props,
        framework: "next"
    });
}
function Analytics2(props) {
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(AnalyticsComponent, {
        ...props
    }));
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_e048d4b5._.js.map