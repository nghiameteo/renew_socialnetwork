import { Box, Button, ButtonProps, Container, TextField, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GreenButton } from "../page-register/Register";
import styles from "./EditSetting.module.css";
import { UpdateUser, User } from "../../app/models";

interface OwnProps {
  isLoading: boolean;
  user: User;
  onSubmit: (data: UpdateUser) => void;
  onLogout: () => void;
}

export const RedButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#F85149",
  borderColor: "#F85149",
  "&:hover": {
    backgroundColor: "#F99515",
  },
}));

const EditSettingSchema = Yup.object().shape({
  username: Yup.string().trim().min(3, "Username too short"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const EditSetting = ({ isLoading, user, onSubmit, onLogout }: OwnProps) => {
  const initialUser = {
    image: user.image,
    username: user.username,
    bio: user.bio,
    email: user.email,
    password: "",
  };
  const formFromFormik = useFormik({
    initialValues: initialUser,
    enableReinitialize: false,
    validationSchema: EditSettingSchema,
    onSubmit: ({ image, username, bio, email, password }, { resetForm }) => {
      const editUser: UpdateUser = {
        image,
        username,
        bio,
        email,
        password,
      };
      onSubmit(editUser);
      // resetForm({});
    },
  });

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography className={styles.typoHeader}>Settings</Typography>
      <form className={styles.form} onSubmit={formFromFormik.handleSubmit}>
        <TextField
          fullWidth
          id="image"
          name="image"
          label="image"
          value={formFromFormik.values.image}
          onChange={formFromFormik.handleChange}
          onBlur={formFromFormik.handleBlur}
          helperText={
            formFromFormik.touched.image && formFromFormik.errors.image
          }
        />
        <TextField
          fullWidth
          id="username"
          name="username"
          label="username"
          value={formFromFormik.values.username}
          onChange={formFromFormik.handleChange}
          onBlur={formFromFormik.handleBlur}
          error={
            formFromFormik.touched.username && Boolean(formFromFormik.errors.username)
          }
          helperText={
            formFromFormik.touched.username && formFromFormik.errors.username
          }
        />
        <TextField
          fullWidth
          id="bio"
          name="bio"
          label="bio"
          value={formFromFormik.values.bio}
          onChange={formFromFormik.handleChange}
          onBlur={formFromFormik.handleBlur}
          
          helperText={
            formFromFormik.touched.bio && formFromFormik.errors.bio
          }
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="email"
          value={formFromFormik.values.email}
          onChange={formFromFormik.handleChange}
          onBlur={formFromFormik.handleBlur}
          error={
            formFromFormik.touched.email && Boolean(formFromFormik.errors.email)
          }
          helperText={
            formFromFormik.touched.email && formFromFormik.errors.email
          }
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="password"
          type="password"
          value={formFromFormik.values.password}
          onChange={formFromFormik.handleChange}
          onBlur={formFromFormik.handleBlur}
          error={
            formFromFormik.touched.password &&
            Boolean(formFromFormik.errors.password)
          }
          helperText={
            formFromFormik.touched.password && formFromFormik.errors.password
          }
        />
        <Box className={styles.box}>
          <GreenButton
            className={styles.button}
            type="submit"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? "Processing" : "Update Setting"}
          </GreenButton>
          <RedButton
            className={styles.button}
            type="submit"
            size="large"
            onClick={onLogout}
          >
            or click here to logout
          </RedButton>

        </Box>
      </form>
    </Container>
  );
};

export default EditSetting;
