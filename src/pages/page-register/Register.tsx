import { useFormik } from "formik";
import * as Yup from "yup";
import { NewUser } from "../../app/models";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

interface OwnProps {
  onSubmit: (data: NewUser) => void;
  isLoading: boolean;
}

export const GreenButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#5cb85c",
  borderColor: "#5cb85c",
  "&:hover": {
    backgroundColor: "#449d44",
  },
}));
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username too short")
    .max(12, "Username too long")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .max(50, "Password too long")
    .required("Password is required"),
});

const Register = ({ onSubmit, isLoading }: OwnProps) => {
  const formFromFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: ({ username, email, password }) => {
      const data: NewUser = {
        username,
        email,
        password,
      };
      onSubmit(data);
    },
  });

  return (
    <Container className={styles.container} maxWidth="xl">
      <Typography className={styles.typoHeader}>Sign Up</Typography>
      <Link className={styles.linkContent} to="/login">
        Have an account?
      </Link>
      <form className={styles.form} onSubmit={formFromFormik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="username"
          value={formFromFormik.values.username}
          onChange={formFromFormik.handleChange}
          onBlur={formFromFormik.handleBlur}
          error={
            formFromFormik.touched.username &&
            Boolean(formFromFormik.errors.username)
          }
          helperText={
            formFromFormik.touched.username && formFromFormik.errors.username
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
            {isLoading ? "Processing" : "Sign Up"}
          </GreenButton>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
