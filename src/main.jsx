import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout.jsx';
import Tasks from './pages/Tasks/Tasks.jsx';
import CreateTask from './pages/CreateTask/CreateTask.jsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Tasks />,
      },
      {
        path: "/create-task",
        element: <CreateTask />,
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div><Toaster position="bottom-right"
      reverseOrder={true} /></div>
    <RouterProvider router={router} />
  </React.StrictMode>);
