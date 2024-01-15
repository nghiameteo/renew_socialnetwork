import { Outlet } from "react-router-dom";

interface SettingUrl {
  title: string;
  link: string;
}
interface totalSettingUrl {
  pageLinks: SettingUrl[];
  pageLinksAuthorize: SettingUrl[];
}
const PageLinks: totalSettingUrl = {
  pageLinks: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Sign In",
      link: "/login",
    },
    {
      title: "Sign Up",
      link: "/register",
    },
  ],
  pageLinksAuthorize: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "New Article",
      link: "/editor",
    },
    {
      title: "Settings",
      link: "/settings",
    },
  ],
};

const Layout = () => {
  return (
    <>
      <>Test</>
      <Outlet />
    </>
  );
};
export default Layout;
