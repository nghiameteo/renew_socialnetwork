import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { UpdateUser } from "../../../app/models";
import EditSetting from "../../../pages/edit-settings/EditSetting";
import {
    getLogOut,
    selectIsAuthorized,
    selectIsLoading,
    selectUser,
    updateUserAsync,
} from "../../user-information-feature/userInformationSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const isLoading = useAppSelector(selectIsLoading);
  const currentUser = useAppSelector(selectUser);

  const onSubmit = (editUser: UpdateUser) => {
    dispatch(updateUserAsync(editUser));
  };

  const onLogout = () => {
    dispatch(getLogOut());
  };

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {!!currentUser && (
        <EditSetting
          isLoading={isLoading}
          user={currentUser}
          onSubmit={onSubmit}
          onLogout={onLogout}
        />
      )}
    </>
  );
};
export default Settings;
