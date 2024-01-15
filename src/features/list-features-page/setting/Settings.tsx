import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { UpdateUser } from "../../../app/models";
import EditSetting from "../../../pages/edit-settings/EditSetting";
import { getLogOut, selectIsAuthorized, selectIsLoading, selectUser, updateUserAsync } from "../../user-infomation-feature/userInfomationSlice";

const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(selectIsAuthorized);
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectUser);

    const onSubmit = (editUser: UpdateUser) => { 
        dispatch(updateUserAsync(editUser));
    }
    const onLogOut = () => {
        dispatch(getLogOut());
     }
     useEffect(()=> {
        if(!isAuthorized) {
            navigate('/login')
        }
     },[])

    return (<>
        {!!user && <EditSetting isLoading={isLoading} user={user} onSubmit={onSubmit} onLogOut={onLogOut} />}
    </>)
}
export default Settings