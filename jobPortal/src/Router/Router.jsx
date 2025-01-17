// src/Router.jsx

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../Pages/About";
import SalaryPage from "../Pages/SalaryPage";
import CreateJob from "../Pages/CreateJob";
import Home from "../Pages/Home";
import MyJobs from "../Pages/MyJobs";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Components/Login";
import JobDetails from "../Pages/JobDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post-job",
        element: <CreateJob />
      },
      {
        path: "/my-job",
        element: <MyJobs />
      },
      {
        path: "/salary",
        element: <SalaryPage />
      },
      {
        path: "edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}all-jobs/${params.id}`)
      },
      {
        path: "/job/:id",
        element: <JobDetails />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;
