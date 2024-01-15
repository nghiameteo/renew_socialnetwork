import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/page-login/Login";
import SignIn from "../features/list-features-page/sign-in";
import SignUp from "../features/list-features-page/sign-up";
import Layout from "../features/list-features-page/layout-router-page/Layout";

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            
            // login
            {
                path: "/login",
                element: <SignIn />,

            },
            {
                path: "/register",
                element: <SignUp />,
            },
                 
                     
        ],
    },
]);
export default Router;