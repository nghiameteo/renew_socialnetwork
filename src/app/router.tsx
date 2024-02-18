import { createBrowserRouter } from "react-router-dom";
import Layout from "../features/list-features-page/layout-router-page";
import SignIn from "../features/list-features-page/sign-in";
import SignUp from "../features/list-features-page/sign-up";
import Feed from "../features/list-features-page/feed";
import Settings from "../features/list-features-page/setting";
import ArticleDetail from "../features/all-article-features/article/article-details/ArticleDetails";
import CreateArticle from "../features/all-article-features/article/create-article/CreateArticle";
import UpdateArticle from "../features/all-article-features/article/update-article/UpdateArticle";
import UserProfile from "../features/list-features-page/user-profile/user-profile/UserProfile";
import LayoutProfile from "../features/list-features-page/user-profile/layout-profile/LayoutProfile";


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
        path: "/editor",
        element: <CreateArticle />,
      },
      {
        path: "/editor/:slug",
        element: <UpdateArticle />,
      },
      {
        path: "/article/:slug",
        element: <ArticleDetail />,
      },
      {
        path: "/:username",
        element: <LayoutProfile />,
        children: [
          {
            path: "",
            element: <UserProfile tab="myArticle" />,
          },
          {
            path: "favorites",
            element: <UserProfile tab="favoriteArticle" />,
          },
        ]
      },
      {
        path: "*",
        element: <SignIn />,
      },
    ],
  },
]);
export default Router;
