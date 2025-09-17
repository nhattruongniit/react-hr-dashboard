// import React from "react";
// import { Routes, Route } from "react-router";

// import { PATH } from "../configs";

// import Template1 from "../layouts/template1/template1";
// import AuthRoutes from "./auth-routes";
// import GuestRoute from "./guest-routes";
// import Spinner from "../components/Spinner";
// import RoleRoutes from "./role-routes";

import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { PATH } from "../configs";

import { Template1 } from "../layouts/template1";
import AuthRoutes from "./auth-routes";
import { httpRequest } from "../services/initRequest";
import axios from "axios";

// Lazy loaded components that are currently being used
const Dashboard = React.lazy(() => import('../pages/dashboard').then(module => ({ default: module.Dashboard })));
const NotFound = React.lazy(() => import('../pages/other-pages').then(module => ({ default: module.NotFound })));

// const routesConfig = [
//   {
//     path: PATH.LOGIN,
//     component: Login,
//     guard: GuestRoute,
//   },
//   {
//     path: PATH.REGISTGER,
//     component: Register,
//     guard: GuestRoute,
//   },
//   {
//     path: PATH.ROOT,
//     component: Dashboard,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.LANDING_PAGE,
//     component: LandingPage,
//   },
//   {
//     path: PATH.USER_SHOW,
//     component: ShowUser,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.USER_CREATE,
//     component: CreateUser,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.USER_LIST,
//     component: ListUser,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.USER_EDIT,
//     component: EditUser,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.UNAUTHORIED_PAGE,
//     component: UnauthoriedPage,
//   },
//   {
//     path: PATH.RESTRICT_ACCESS_PAGE,
//     component: RestrictAccessPage,
//   },
//   {
//     path: PATH.PROFILE,
//     component: Profile,
//     layout: Template1,
//     guard: AuthRoutes
//   },
//   {
//     path: PATH.CALENDAR,
//     component: Calendar,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.EMPLOYEE_LIST,
//     component: EmployeeList,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.EMPLOYEE_CREATE,
//     component: EmployeeCreate,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.EMPLOYEE_EDIT,
//     component: EmployeeEdit,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.EMPLOYEE_SHOW,
//     component: EmployeeShow,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.LEAVE_MANAGEMENT_CREATE,
//     component: LeaveManagementCreate,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.LEAVE_MANAGEMENT_EDIT,
//     component: LeaveManagementEdit,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.LEAVE_MANAGEMENT_LIST,
//     component: LeaveManagementList,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   {
//     path: PATH.LEAVE_MANAGEMENT_CALENDAR,
//     component: LeaveManagementCalendar,
//     layout: Template1,
//     guard: AuthRoutes,
//   },
//   // {
//   //   path: PATH.RESUME_LIST,
//   //   component: ResumeList,
//   //   layout: Template1,
//   //   guard: AuthRoutes,
//   // },
//   // {
//   //   path: PATH.RESUME_EDIT,
//   //   component: ResumeEdit,
//   //   layout: Template1,
//   //   guard: AuthRoutes,
//   // },
//   // {
//   //   path: PATH.RESUME_SHOW,
//   //   component: ResumeShow,
//   //   layout: Template1,
//   //   guard: AuthRoutes,
//   // },
// ]

// function renderRoutes() {
//   return (
//     <React.Suspense fallback={<Spinner />}>
//       <Routes>
//         {routesConfig.map((route) => {
//           const Component = route?.component || React.Fragment;
//           const Layout = route?.layout || React.Fragment;
//           const Guard = route?.guard || React.Fragment;
//           const requireRoles:any = [];

//           return (
//             <Route 
//               key={route?.path} 
//               path={route?.path} 
//               element={
//                 <Guard>
//                   <Layout>
//                     <RoleRoutes requireRoles={requireRoles}>
//                       <Component />
//                     </RoleRoutes>
//                   </Layout>
//                 </Guard>
//               } 
//             />
//           )
//         })}

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </React.Suspense>
   
//   )
// }


// export const RoutersMain = () => {
//   return renderRoutes()
// }


export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <AuthRoutes>
        <Template1>
          <Outlet />
        </Template1>
      </AuthRoutes>
    ),
    children: [
      { index: true, element: <Navigate to={PATH.DASHBOARD} replace /> },
      {
        path: PATH.DASHBOARD,
        element: <Dashboard />
      },
      {
        path: PATH.EMPLOYEE_LIST,
        loader: async () => {
          const data = await axios('http://localhost:3000/api/employees', {
            method: 'GET'
          })
          return data.data;
        },
        lazy: () => import('../pages/employee/list').then(module => ({ Component: module.default }))
      },
      {
        path: PATH.EMPLOYEE_SHOW,
        loader: async ({ params }) => {
          const { id } = params;
          if (!id) {
            throw new Response("Bad Request", { status: 400 });
          }
          const data = await axios(`http://localhost:3000/api/employees/${id}`, {
            method: 'GET',
          })
          return data.data;
        },
        lazy: () => import('../pages/employee/show').then(module => ({ Component: module.default }))
      },
      {
        path: PATH.EMPLOYEE_EDIT,
        loader: async ({ params }) => {
          const { id } = params;
          if (!id) {
            throw new Response("Bad Request", { status: 400 });
          }

          const data = await httpRequest(`/api/user/${id}`, {
            method: 'GET',
          })
          return { data };
        },
        lazy: () => import('../pages/employee/edit').then(module => ({ Component: module.default }))
      },
      {
        path: PATH.EMPLOYEE_CREATE,
        lazy: () => import('../pages/employee/create').then(module => ({ Component: module.default }))
      },
    ]
  }, 
  {
    path: "*",
    element: <NotFound />
  }
])