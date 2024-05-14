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
import MyPostedJobs from "../pages/Main_Requirements/MyPostedJobs";
import MyApplyedJob from "../pages/Main_Requirements/MyApplyedJob";
import Blog from "../pages/Main_Requirements/Blog";
import BlogDetails from "../pages/Main_Requirements/BlogDetails";

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
                loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)
            },
            {
                path: '/myPostedJobs',
                element: <PrivetRoute>
                    <MyPostedJobs></MyPostedJobs>
                </PrivetRoute>
            },
            {
                path: "/myApplyedJob",
                element: <PrivetRoute>
                    <MyApplyedJob></MyApplyedJob>
                </PrivetRoute>
            },
            {
                path: "/blog",
                element: <Blog></Blog>
            },
            {
                path: "/blog/:id",
                element: <BlogDetails></BlogDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/blogs/${params.id}`)
            }
        ]
    }
])

export default router;