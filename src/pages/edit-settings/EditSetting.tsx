
import { useFormik } from "formik";
import * as Yup from "yup";

import { UpdateUser, User } from "../../app/models";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import styles from "./EditSetting.module.css";

interface OwnProps {
  isLoading: boolean;
  user: User;
  onSubmit: (user: UpdateUser) => void;
  onLogOut: () => void;
}

const UserSchema = Yup.object().shape({
  username: Yup.string().trim().min(1, "Too short"),
  email: Yup.string().trim().email().min(1, "Too short"),
});

const EditSetting = ({ isLoading, user, onSubmit, onLogOut }: OwnProps) => {
  const initialUser = {
    image: user.image,
    username: user.username,
    bio: user.bio,
    email: user.email,
    password: "",
  };
  const formik = useFormik({
    initialValues: initialUser,
    enableReinitialize: true,
    validationSchema: UserSchema,
    onSubmit: ({ image, username, bio, email, password }, { resetForm }) => {
      const editUser: UpdateUser = {
        image,
        username,
        bio,
        email,
        password,
      };
      onSubmit(editUser);
      resetForm();
    },
  });
  return (   
    <Container className={styles.container} maxWidth="xl">
        <Typography className={styles.typoFirst} variant="h4">
          Update Setting
        </Typography>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="image"
            name="image"
            label="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.image && formik.errors.image}
          />
          <TextField
            fullWidth
            id="username"
            name="username"
            label="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id="bio"
            name="bio"
            label="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.bio && formik.errors.bio}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box className={styles.boxEnd}>            
              <Button
                className={styles.button}
                color="primary"
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : " Update Setting"}
              </Button>
              <Button
                className={styles.buttonLogOut}
                color="primary"
                variant="contained"
                type="submit"
                onClick={onLogOut}
              >
                Or click here to logout
              </Button>            
          </Box>
        </form>
      </Container>    
  );
};

export default EditSetting;
