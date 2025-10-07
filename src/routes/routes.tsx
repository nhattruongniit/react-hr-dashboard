import { createBrowserRouter, Navigate, Outlet } from "react-router";

import { PATH } from "../configs";
import { Template1 } from "../layouts/template1";
import AuthRoutes from "./auth-routes";
import { createListLoader, createDetailLoader } from "../utils/createApiLoader";

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
        lazy: () => import('../pages/dashboard').then(module => ({ Component: module.Dashboard }))
      },
      {
        path: PATH.EMPLOYEE_LIST,
        loader: createListLoader('/api/employees'),
        lazy: () => import('../pages/employee/list').then(module => ({ Component: module.default }))
      },
      {
        path: PATH.EMPLOYEE_SHOW,
        loader: createDetailLoader('/api/employees/:id'),
        lazy: () => import('../pages/employee/show').then(module => ({ Component: module.default }))
      },
      {
        path: PATH.EMPLOYEE_EDIT,
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
    lazy: () => import('../pages/other-pages').then(module => ({ Component: module.NotFound }))
  }
])