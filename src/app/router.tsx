import { createBrowserRouter } from "react-router-dom";
import Layout from "../features/list-features-page/layout-router-page";
import SignIn from "../features/list-features-page/sign-in";
import SignUp from "../features/list-features-page/sign-up";
import Feed from "../features/list-features-page/feed";
import Settings from "../features/list-features-page/setting";


const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <SignIn />,
      },
    ],
  },
]);
export default Router;
