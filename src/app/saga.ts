import { all } from "redux-saga/effects";
import { userSaga } from "../features/user-infomation-feature/userInfomationSlice";


export default function* rootSaga() {
    yield all([
        userSaga(),
    ]);
}