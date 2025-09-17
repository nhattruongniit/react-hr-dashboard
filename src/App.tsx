import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from "react-router";

import { router } from "./routes/routes";
import Spinner from './components/Spinner';

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>

      <ToastContainer />
    </>
  )
}

export default App
