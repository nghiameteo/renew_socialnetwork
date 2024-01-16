import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { LoginUser } from "../../../app/models";
import Login from "../../../pages/page-login/Login";
import {
  loginAsync,
  selectIsAuthorized,
  selectIsLoading,
} from "../../user-information-feature/userInformationSlice";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginUser) => {
    dispatch(loginAsync(data));
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, []);
  return <Login onSubmit={onSubmit} isLoading={isLoading} />;
};

export default SignIn;
