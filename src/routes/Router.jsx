import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AllJobs from "../pages/Main_Requirements/AllJobs";
import AddJob from "../pages/Main_Requirements/AddJob";
import JobDetails from "../pages/Main_Requirements/JobDetails";
import PrivetRoute from "./PrivetRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/allJobs",
                element: <AllJobs></AllJobs>
            },
            {
                path: '/addJobs',
                element: <AddJob></AddJob>
            },
            {
                path: '/job/:id',
                element: <PrivetRoute>
                    <JobDetails></JobDetails>
                </PrivetRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`)
            }
        ]
    }
])

export default router;