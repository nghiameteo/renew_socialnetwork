import {
  Box,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { LoginUser } from "../../app/models";
import { GreenButton } from "../page-register/Register";
import styles from "./Login.module.css";

interface OwnProps {
  onSubmit: (data: LoginUser) => void;
  isLoading: boolean;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .max(50, "Password too long")
    .required("Password is required"),
});

const Login = ({ onSubmit, isLoading }: OwnProps) => {
  const formFromFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: ({ email, password }) => {
      const data: LoginUser = {
        email,
        password,
      };
      onSubmit(data);
    },
  });

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography className={styles.typoHeader}>Sign In</Typography>
      <Link className={styles.linkContent} to="/register">
        Need an account?
      </Link>
      <form className={styles.form} onSubmit={formFromFormik.handleSubmit}>
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
            {isLoading ? "Processing" : "Sign In"}
          </GreenButton>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
