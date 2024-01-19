import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Typography,
  styled,
} from "@mui/material";
import { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { LoadTokenFromLocalStorage } from "../../../app/utils";
import {
  loadCurrentToken,
  selectIsAuthorized,
  selectToken,
} from "../../user-information-feature/userInformationSlice";
import styles from "./Layout.module.css";
interface SettingUrl {
  title: string;
  link: string;
}
interface totalSettingUrl {
  pageLinksDefault: SettingUrl[];
  pageLinksAuthorize: SettingUrl[];
}
export const ConduitButton = styled(Button)<ButtonProps>({
  boxShadow: "none",
  textTransform: "none",
  fontSize: "3rem",
  fontWeight: "900",
  padding: "0",
  border: "none",
  lineHeight: 1.25,
  backgroundColor: "none",
  borderColor: "#none",
  color: "#5cb85c",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
});

const PageLinks: totalSettingUrl = {
  pageLinksDefault: [
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
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const currentStoreToken = useAppSelector(selectToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentStoreToken && !!LoadTokenFromLocalStorage()) {
      dispatch(loadCurrentToken());
    }
  }, [currentStoreToken, loadCurrentToken, LoadTokenFromLocalStorage]);
  return (
    <Box className={styles.boxLayout}>
      <Container className={styles.container} maxWidth="xl">
        <Link to="/" className={styles.leftContentLink}>
          <Typography className={styles.typoConduit}>conduit</Typography>
        </Link>

        <Box className={styles.rightContentBox}>
          {(isAuthorized
            ? PageLinks.pageLinksAuthorize
            : PageLinks.pageLinksDefault
          ).map((page) => {
            return (
              <NavLink
                key={page.title}
                to={page.link}
                className={styles.navigateLink}
              >
                {({ isActive}) => (
                  <Typography className={isActive ? styles.typoNavigateLinkActive : styles.typoNavigateLink}>
                    {page.title}
                  </Typography>
                )}
              </NavLink>
            );
          })}
        </Box>
      </Container>
      <Outlet />
      <Box className={styles.aboveFooter}/>
      <Link className={styles.footerLink} to="/">
        <GitHubIcon />
        Fork on GitHub
      </Link>
    </Box>
  );
};

export default Layout;