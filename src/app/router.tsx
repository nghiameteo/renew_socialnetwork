import { createBrowserRouter } from "react-router-dom";
import Layout from "../features/list-features-page/layout-router-page";
import SignIn from "../features/list-features-page/sign-in";
import SignUp from "../features/list-features-page/sign-up";
import Feed from "../features/list-features-page/feed";


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
        path: "*",
        element: <SignIn />,
      },
    ],
  },
]);
export default Router;
