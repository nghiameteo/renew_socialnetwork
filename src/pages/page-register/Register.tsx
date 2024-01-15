import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { NewUser } from "../../app/models";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import styles from "./Register.module.css";

interface OwnProps {
  onSubmit: (data: NewUser) => void;
  isLoading: boolean;
}
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username too short!")
    .max(50, "Username too long!")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password too short!")
    .max(50, "Password too long!")
    .required("Password required"),
});

const Register = ({ onSubmit, isLoading }: OwnProps) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: ({ username, email, password }) => {
      const registerData: NewUser = {
        username,
        email,
        password,
      };
      onSubmit(registerData);
    },
  });
  return (
    
    <Container className={styles.container} maxWidth="xl">
      <Typography className={styles.typoFirst} variant="h2">
        Sign up
      </Typography>
      <Link className={styles.link} to="/login">
        Have an account?
      </Link>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
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
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
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
        <Box className={styles.box}>
          <Button
            className={styles.button}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign up"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
