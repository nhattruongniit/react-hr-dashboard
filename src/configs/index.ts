export const PATH = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTGER: "/register",
  USER_LIST: "/user/list",
  USER_CREATE: "/user/create",
  USER_SHOW: "/user/show",
  USER_EDIT: "/user/edit",
  LANDING_PAGE: "/landing-page",
  UNAUTHORIED_PAGE:  "/401",
  RESTRICT_ACCESS_PAGE:  "/403",
  PROFILE: "/profile",
  CALENDAR: "/calendar",
  EMPLOYEE_LIST: "/employee/list",
  EMPLOYEE_CREATE: "/employee/create",
  EMPLOYEE_SHOW: "/employee/show/:id",
  EMPLOYEE_EDIT: "/employee/edit/:id",
  LEAVE_MANAGEMENT_LIST: "/leave-management/list",
  LEAVE_MANAGEMENT_CREATE: "/leave-management/create",
  LEAVE_MANAGEMENT_SHOW: "/leave-management/show/:id",
  LEAVE_MANAGEMENT_EDIT: "/leave-management/edit/:id",
  LEAVE_MANAGEMENT_CALENDAR: "/leave-management/calendar",
  INVOICE_LIST: "/invoice/list",
  INVOICE_CREATE: "/invoice/create",
  INVOICE_SHOW: "/invoice/show/:id",
  INVOICE_EDIT: "/invoice/edit/:id",
  RESUME_LIST: "/resume/list",
  RESUME_SHOW: "/resume/show/:id",
  RESUME_EDIT: "/resume/edit/:id",
}

export const USER_ROLE = {
  ADMIN: 'admin',
  OPERATOR: 'operator',
  GUEST: "guest",
  MEMBER: 'member'
}

export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
}

export const LEAVE_TYPE = {
  ANNUAL: 'annual',
  SICK: 'sick',
  VACATION: 'vacation',
  PERSONAL: 'personal',
  UNPAID: 'unpaid',
  OTHER: 'other',
  EMERGENCY: 'emergency',
}

export const LEAVE_TYPE_COLOR = ["aqua", "#008FFB", "#00E396", "#775DD0", "#FEB019", "#FF4560", "#9f2cb1"]

export const INVOICE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
}

export const RESUME_STATUS = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  INTERVIEWED: 'interviewed',
}