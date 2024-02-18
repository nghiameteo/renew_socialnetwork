import { all } from "redux-saga/effects";
import { userSaga } from "../features/user-information-feature/userInformationSlice";
import { filterSaga } from "../features/filter/filterTagSlice";
import { multiArticleSaga } from "../features/all-article-features/article/multiArticleSlice";
import { singleArticleSaga } from "../features/all-article-features/article/singleArticleSlice";
import { commentSaga } from "../features/comment-feature/commentSlice";
import { userProfileSaga } from "../features/list-features-page/user-profile/userProfileSlice";

export default function* rootSaga() {
    yield all([
        userSaga(),
        filterSaga(),
        multiArticleSaga(),
        singleArticleSaga(),
        commentSaga(),
        userProfileSaga(),
    ]);
}