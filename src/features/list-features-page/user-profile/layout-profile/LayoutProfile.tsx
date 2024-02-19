import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  Typography,
  styled,
} from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import styles from "./LayoutProfile.module.css";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getUserProfileAsync,
  selectIsLoadingFollow,
  selectIsLoadingProfile,
  selectProfile,
  toggleFollowUserProfileAsync,
} from "../userProfileSlice";
import {
  selectIsLoading,
  selectUser,
} from "../../../user-information-feature/userInformationSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";

const FollowButton = styled(Button)<ButtonProps>({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "3px 6px",
  border: "1px solid ",
  lineHeight: 1.25,
  backgroundColor: "none",
  borderColor: "#999",
  color: "#999",
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
  "&:hover": {
    backgroundColor: "#ccc",
    borderColor: "#999",
    color: "white",
    boxShadow: "none",
  },
});

const EditButton = styled(Button)<ButtonProps>({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "3px 6px",
  border: "1px solid ",
  lineHeight: 1.25,
  backgroundColor: "none",
  borderColor: "#5cb85c",
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
  "&:hover": {
    backgroundColor: "#5cb85c",
    borderColor: "#5cb85c",
    color: "white",
    boxShadow: "none",
  },
});

const FollowLoadingButton = styled(LoadingButton)<ButtonProps>({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "3px 6px",
  border: "1px solid ",
  lineHeight: 1.25,
  backgroundColor: "none",
  borderColor: "#999",
  color: "#999",
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
  "&:hover": {
    backgroundColor: "#ccc",
    borderColor: "#999",
    color: "white",
    boxShadow: "none",
  },
  "&.loading": {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "3px 6px",
    border: "1px solid ",
    lineHeight: 1.25,
    backgroundColor: "none",
    borderColor: "#999",
    color: "#999",
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
  },
});

const LayoutProfile = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const isLoadingUserProfile = useAppSelector(selectIsLoadingProfile);
  const isLoadingFollowProfile = useAppSelector(selectIsLoadingFollow);
  const profile = useAppSelector(selectProfile);
  const currentUser = useAppSelector(selectUser);
  const isLoadingCurrentUser = useAppSelector(selectIsLoading);

  const onFollowUser = (username: string, isFollowing: boolean) => {
    dispatch(
      toggleFollowUserProfileAsync({
        username: username,
        isFollowing: isFollowing,
      })
    );
  };
  useEffect(() => {
    !!username && username !== ""
      ? dispatch(getUserProfileAsync(username))
      : "";
  }, [username]);
  return (
    <>
      <Box className={styles.boxHeader}>
        <Container className={styles.headerContainer} maxWidth="xl">
          {/* avatar */}
          <Avatar
            className={styles.avatar}
            alt={username}
            src={profile?.username === username ? profile?.image : ""}
          />
          {/* username */}
          <Typography className={styles.typoUsername} variant="h4">
            {username}
          </Typography>
          <Box className={styles.boxFlexEnd}>
            {/* user is viewing it own profile */}
            {username === currentUser?.username && (
              <Link className={styles.linkButton} to="/settings">
                <EditButton
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon />}
                >
                  Edit Profile
                </EditButton>
              </Link>
            )}
            {/* user viewing other user profile */}
            {!isLoadingUserProfile &&
              !!profile &&
              username !== currentUser?.username && (
                <>
                  {/* link or button */}
                  {!currentUser && (
                    <Link className={styles.linkButton} to="/register">
                      <FollowButton
                        size="small"
                        variant="outlined"
                        startIcon={<AddIcon />}
                      >
                        Follow {username}
                      </FollowButton>
                    </Link>
                  )}
                  {!!currentUser && (
                    <FollowLoadingButton
                      loading={isLoadingFollowProfile}
                      onClick={() =>
                        onFollowUser(profile.username, profile.following)
                      }
                      size="small"
                      variant="outlined"
                      loadingPosition="start"
                      startIcon={
                        profile.following ? <RemoveIcon /> : <AddIcon />
                      }
                      className={isLoadingFollowProfile ? "loading" : undefined}
                    >
                      {profile?.following ? "Unfollow " : "Follow "}
                      {profile!.username}
                    </FollowLoadingButton>
                  )}
                </>
              )}
          </Box>
        </Container>
      </Box>
      {/* outlet children */}
      <Box className={styles.boxOutlet}>
        <Outlet />
      </Box>
    </>
  );
};
export default LayoutProfile;
