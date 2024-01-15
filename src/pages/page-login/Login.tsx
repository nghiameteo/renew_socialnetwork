import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { LoginUser } from "../../app/models";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import styles from "./Login.module.css";

interface OwnProps {
  onSubmit: (data: LoginUser) => void;
  isLoading: boolean;
}
const SigInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 5 characters long")
    .required("Password is required."),
});

const Login = ({ onSubmit, isLoading }: OwnProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigInSchema,
    onSubmit: ({ email, password }) => {
      const loginData: LoginUser = {
        email,
        password,
      };
      onSubmit(loginData);
    },
  });
  return (   
    <Container className={styles.container} maxWidth="xl">
      <Typography className={styles.typoFirst} variant="h2">
        Sign in
      </Typography>
      <Link className={styles.link} to="/register">
        Need an account?
      </Link>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
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
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};
export default Login;
