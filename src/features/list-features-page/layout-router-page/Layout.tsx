import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  Typography,
  capitalize,
  styled,
} from "@mui/material";
import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  loadCurrentToken,
  selectIsAuthorized,
  selectIsReady,
  selectUser,
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
  const isReady = useAppSelector(selectIsReady);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    if (!isReady) {
      dispatch(loadCurrentToken());
    }
  }, [isReady]);

  return (
    isReady && (
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
                  {({ isActive }) => (
                    <Typography
                      className={
                        isActive
                          ? styles.typoNavigateLinkActive
                          : styles.typoNavigateLink
                      }
                    >
                      {page.title}
                    </Typography>
                  )}
                </NavLink>
              );
            })}
            {!!currentUser && (
              <Link
                className={styles.linkUser}
                to={`/${currentUser.username}`}
                title={currentUser.username}
              >
                <Avatar
                  className={styles.avatar}
                  alt={capitalize(currentUser.username)}
                  src={currentUser.image}
                />
                <Typography className={styles.typoUserName}>
                  {currentUser.username}
                </Typography>
              </Link>
            )}
          </Box>
        </Container>
        <Outlet />
        <Box className={styles.aboveFooter} />
        <Link className={styles.footerLink} to="/">
          <GitHubIcon />
          Fork on GitHub
        </Link>
      </Box>
    )
  );
};

export default Layout;
