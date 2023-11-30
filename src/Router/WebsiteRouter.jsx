import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers";
import NewTest from "../Pages/Dashboard/NewTest";
import AllTests from "../Pages/Dashboard/AllTests";
import NewBanner from "../Pages/Dashboard/NewBanner";
import AllBanners from "../Pages/Dashboard/AllBanners";
import UpdateTest from "../Pages/Dashboard/UpdateTest";
import All_Tests from "../Pages/AllTests/All_Tests";
import TestDetails from "../Pages/TestDetails/TestDetails";
import TestReservation from "../Pages/Dashboard/TestReservation";

const WebsiteRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: "/dashboard/AllUsers",
                        element: <AllUsers></AllUsers>
                    },
                    {
                        path: "/dashboard/newTest",
                        element: <NewTest></NewTest>
                    },
                    {
                        path: "/dashboard/allTests",
                        element: <AllTests></AllTests>
                    },
                    {
                        path: "/dashboard/updateTest/:id",
                        element: <UpdateTest></UpdateTest>
                    },
                    {
                        path: "/dashboard/newBanner",
                        element: <NewBanner></NewBanner>
                    },
                    {
                        path: "/dashboard/allBanners",
                        element: <AllBanners></AllBanners>
                    },
                    {
                        path: "/dashboard/reserve/:id",
                        element: <TestReservation></TestReservation>
                    },
                ]
            },
            {
                path: "/all_tests",
                element: <All_Tests></All_Tests>
            },
            {
                path: "/tests/:id",
                element: <TestDetails></TestDetails>
            },
        ]
    }
])

export default WebsiteRouter;