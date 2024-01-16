import { all } from "redux-saga/effects";
import { userSaga } from "../features/user-information-feature/userInformationSlice";


export default function* rootSaga() {
    yield all([
        userSaga(),
    ]);
}