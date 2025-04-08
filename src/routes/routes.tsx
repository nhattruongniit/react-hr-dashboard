import React from "react";
import { Routes, Route } from "react-router-dom";
import { PATH } from "../configs";

import Template1 from "../layouts/template1/template1";
import AuthRoutes from "./auth-routes";
import GuestRoute from "./guest-routes";
import Spinner from "../components/Spinner";
import RoleRoutes from "./role-routes";

// pages
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const Dashboard = React.lazy(() => import('../pages/dashboard').then(module => ({ default: module.Dashboard })));
const LandingPage = React.lazy(() => import('../pages/landing-page').then(module => ({ default: module.LandingPage })));
const ListUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.ListUser })));
const ShowUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.ShowUser })));
const CreateUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.CreateUser })));
const EditUser = React.lazy(() => import('../pages/user').then(module => ({ default: module.EditUser })));
const EmployeeList = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeList })));
const EmployeeShow = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeShow })));
const EmployeeCreate = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeCreate })));
const EmployeeEdit = React.lazy(() => import('../pages/employee').then(module => ({ default: module.EmployeeEdit })));
const LeaveManagementCreate = React.lazy(() => import('../pages/leave-management').then(module => ({ default: module.LeaveManagementCreate })));
const LeaveManagementList = React.lazy(() => import('../pages/leave-management').then(module => ({ default: module.LeaveManagementList })));
const LeaveManagementShow = React.lazy(() => import('../pages/leave-management').then(module => ({ default: module.LeaveManagementShow })));
const LeaveManagementEdit = React.lazy(() => import('../pages/leave-management').then(module => ({ default: module.LeaveManagementEdit })));
const LeaveManagementCalendar = React.lazy(() => import('../pages/leave-management').then(module => ({ default: module.LeaveManagementCalendar })));

const NotFound = React.lazy(() => import('../pages/other-pages').then(module => ({ default: module.NotFound })));
const UnauthoriedPage = React.lazy(() => import('../pages/other-pages').then(module => ({ default: module.UnauthoriedPage })));
const RestrictAccessPage = React.lazy(() => import('../pages/other-pages').then(module => ({ default: module.RestrictAccessPage })));
const Profile = React.lazy(() => import('../pages/profile').then(module => ({ default: module.Profile })));
const Calendar = React.lazy(() => import('../pages/calendar').then(module => ({ default: module.Calendar })));

const routesConfig = [
  {
    path: PATH.LOGIN,
    component: Login,
    guard: GuestRoute,
  },
  {
    path: PATH.REGISTGER,
    component: Register,
    guard: GuestRoute,
  },
  {
    path: PATH.ROOT,
    component: Dashboard,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.LANDING_PAGE,
    component: LandingPage,
  },
  {
    path: PATH.USER_SHOW,
    component: ShowUser,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.USER_CREATE,
    component: CreateUser,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.USER_LIST,
    component: ListUser,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.USER_EDIT,
    component: EditUser,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.UNAUTHORIED_PAGE,
    component: UnauthoriedPage,
  },
  {
    path: PATH.RESTRICT_ACCESS_PAGE,
    component: RestrictAccessPage,
  },
  {
    path: PATH.PROFILE,
    component: Profile,
    layout: Template1,
    guard: AuthRoutes
  },
  {
    path: PATH.CALENDAR,
    component: Calendar,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.EMPLOYEE_LIST,
    component: EmployeeList,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.EMPLOYEE_CREATE,
    component: EmployeeCreate,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.EMPLOYEE_EDIT,
    component: EmployeeEdit,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.EMPLOYEE_SHOW,
    component: EmployeeShow,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.LEAVE_MANAGEMENT_SHOW,
    component: LeaveManagementShow,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.LEAVE_MANAGEMENT_CREATE,
    component: LeaveManagementCreate,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.LEAVE_MANAGEMENT_EDIT,
    component: LeaveManagementEdit,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.LEAVE_MANAGEMENT_LIST,
    component: LeaveManagementList,
    layout: Template1,
    guard: AuthRoutes,
  },
  {
    path: PATH.LEAVE_MANAGEMENT_CALENDAR,
    component: LeaveManagementCalendar,
    layout: Template1,
    guard: AuthRoutes,
  },
  
]

function renderRoutes() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Routes>
        {routesConfig.map((route) => {
          const Component = route?.component || React.Fragment;
          const Layout = route?.layout || React.Fragment;
          const Guard = route?.guard || React.Fragment;
          const requireRoles:any = [];

          return (
            <Route 
              key={route?.path} 
              path={route?.path} 
              element={
                <Guard>
                  <Layout>
                    <RoleRoutes requireRoles={requireRoles}>
                      <Component />
                    </RoleRoutes>
                  </Layout>
                </Guard>
              } 
            />
          )
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
   
  )
}


export const RoutersMain = () => {
  return renderRoutes()
}