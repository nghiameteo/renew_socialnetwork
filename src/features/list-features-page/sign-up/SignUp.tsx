import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NewUser } from "../../../app/models";
import Register from "../../../pages/page-register/Register";
import {
  registerAsync,
  selectIsAuthorized,
  selectIsLoading,
} from "../../user-information-feature/userInformationSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const navigate = useNavigate();

  const onSubmit = async (data: NewUser) => {
    dispatch(registerAsync(data));
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, []);
  return <Register onSubmit={onSubmit} isLoading={isLoading} />;
};

export default SignUp;
