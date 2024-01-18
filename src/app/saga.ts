import { all } from "redux-saga/effects";
import { userSaga } from "../features/user-information-feature/userInformationSlice";
import { filterSaga } from "../features/filter/filterTagSlice";
import { multiArticleSaga } from "../features/all-article-features/article/multiArticleSlice";

export default function* rootSaga() {
    yield all([
        userSaga(),
        filterSaga(),
        multiArticleSaga(),
    ]);
}