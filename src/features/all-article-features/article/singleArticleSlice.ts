import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Article, NewArticle, Profile, ProfileResponse, SingleArticleResponse } from "../../../app/models";
import { api } from "../../../app/axios-instance";
import { RootState } from "../../../app/store";
import { call, put, takeLatest } from "redux-saga/effects";
import router from "../../../app/router";

interface SingleArticleState {
    isLoading: boolean;
    article: Article | undefined;
    isFollowLoading: boolean;
}
const initialState: SingleArticleState = {
    isLoading: false,
    article: undefined,
    isFollowLoading: false
}
/* action */
//load single article from slug of article
export const getSingleArticleAsync = createAction<string>('singleArticle/getArticleAsync');
const tryGetSingleArticle = async (slug: string): Promise<SingleArticleResponse> => {
    return (await api.get<SingleArticleResponse>(`/articles/${slug}`, {})).data;
}

function* getSingleArticleSaga(action: PayloadAction<string>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(tryGetSingleArticle, action.payload);                
        yield put(loadSingleArticle(response.article));
        yield put(setIsLoading(false));
    }
    catch (error) {
        console.error('getSingleArticleSaga', error);
        yield put(setIsLoading(false));
    }
}

//create new article
export const addSingleArticleAsync = createAction<NewArticle, string>('singleArticle/addSingleArticleAsync');
const tryAddSingleArticle = async (data: NewArticle): Promise<SingleArticleResponse> => {
    return (await api.post<SingleArticleResponse>('/articles', { article: data })).data;
}
function* addSingleArticleSaga(action: PayloadAction<NewArticle>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(tryAddSingleArticle, action.payload);
        yield put(loadSingleArticle(response.article));
        yield put(setIsLoading(false));
        router.navigate(`/article/${response.article.slug}`);
    }
    catch (error) {
        console.error('addSingleArticleSaga', error);
        yield put(setIsLoading(false));
    }
}
//update article 
interface UpdateArticleParams { slug?: string; article: NewArticle; }
export const updateSingleArticleAsync = createAction<UpdateArticleParams>('singleArticle/updateSingleArticleAsync');
export const tryUpdateSingleArticle = async (data: UpdateArticleParams) => {
    return (await api.put<SingleArticleResponse>(`/articles/${data.slug}`, data)).data;
}
function* updateSingleArticleSaga(action: PayloadAction<UpdateArticleParams>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(tryUpdateSingleArticle, action.payload);
        yield put(loadSingleArticle(response.article));
        yield put(setIsLoading(false));
        router.navigate(`/article/${response.article.slug}`);
    }
    catch (error) {
        console.error('updateSingleArticleSaga', error);
        yield put(setIsLoading(false));
    }
}

// delete article
interface DelArticleParams { slug: string; }
export const deleteSingleArticleAsync = createAction<string>('singleArticle/deleteSingleArticleAsync');
export const tryDeleteSingleArticle = async (slug: string): Promise<SingleArticleResponse> => {
    return (await api.delete<SingleArticleResponse>(`/articles/${slug}`)).data;
}
function* deleteSingleArticleSaga(action: PayloadAction<string>) {
    try {
        yield put(setIsLoading(true));
        const response: SingleArticleResponse = yield call(tryDeleteSingleArticle, action.payload);
        yield put(loadSingleArticle(response.article));
        yield put(setIsLoading(false));
        router.navigate('/');
    }
    catch (error) {
        console.error('deleteSingleArticleSaga', error);
        yield put(setIsLoading(false))
    }
}

// favorite toggle
export interface FavoritesArticleParams { article: Article; isFavorites: boolean; }
export const toggleFavoriteSingleArticleAsync = createAction<FavoritesArticleParams>('singleArticle/toggleFavoriteSingleArticleAsync');
const tryToggleFavoriteSingleArticle = async (params: FavoritesArticleParams): Promise<SingleArticleResponse> => {
    const url = `/articles/${params?.article.slug}/favorite`;
    return (await
        (!params.isFavorites
            ? api.post<SingleArticleResponse>(url, { slug: params?.article.slug })
            : api.delete<SingleArticleResponse>(url))
    )
        .data;
}
function* toggleFavoriteSingleArticleSaga(action: PayloadAction<FavoritesArticleParams>) {
    try {
        const newArticle = action.payload.article;
        const predictArticle = { favorited: !newArticle.favorited, favoritesCount: newArticle.favoritesCount + (newArticle.favorited ? -1 : +1) }
        yield put(toggleFavoriteSingleArticle({ ...newArticle, favorited: predictArticle.favorited, favoritesCount: predictArticle.favoritesCount }));
        const response: SingleArticleResponse = yield call(tryToggleFavoriteSingleArticle, action.payload);
        yield put(toggleFavoriteSingleArticle(response.article))
    }
    catch (error) {
        console.error('toggleFavoriteSingleArticleSaga', error);
    }
}
//follow toggle
interface FollowUserParams { username: string; isFollowing: boolean; }
export const toggleFollowSingleArticleUserAsync = createAction<FollowUserParams>('singleArticle/toggleFollowSingleArticleUserAsync');
export const tryToggleFollowSingleArticleUser = async (params: FollowUserParams): Promise<Profile> => {
    const url = `/profiles/${params.username}/follow`;

    return (await
        (!params.isFollowing
            ? api.post<Profile>(url, { username: params?.username })
            : api.delete<Profile>(url))
    )
        .data;
}
function* toggleFollowSingleArticleUserSaga(action: PayloadAction<FollowUserParams>) {
    try{
        yield put(setIsFollowLoading(true));
        const response : ProfileResponse = yield call(tryToggleFollowSingleArticleUser, action.payload);
        yield put(toggleFollowSingleArticle(response.profile));
        yield put(setIsFollowLoading(false));
    }
    catch (error) {
        console.error('toggleFollowSingleArticleUserSaga', error);
        yield put(setIsFollowLoading(false));
    }
}

/* single article saga */
export function* singleArticleSaga() {
    yield takeLatest(getSingleArticleAsync, getSingleArticleSaga);
    yield takeLatest(addSingleArticleAsync, addSingleArticleSaga);
    yield takeLatest(updateSingleArticleAsync, updateSingleArticleSaga);
    yield takeLatest(deleteSingleArticleAsync, deleteSingleArticleSaga);
    yield takeLatest(toggleFavoriteSingleArticleAsync, toggleFavoriteSingleArticleSaga);
    yield takeLatest(toggleFollowSingleArticleUserAsync, toggleFollowSingleArticleUserSaga);
}

/* single article slice */
export const singleArticleSlice = createSlice({
    name: 'singleArticle',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            const removeArticleAndWaitLoad = action.payload;
            return {
                ...state, 
                isLoading: removeArticleAndWaitLoad,
                article: removeArticleAndWaitLoad
                    ? undefined
                    : state.article,
            }
        },
        loadSingleArticle: (state, action: PayloadAction<Article | undefined>) => {
            const singleArticle = action.payload;
            return {
                ...state,
                article: singleArticle,
            }
        },
        toggleFavoriteSingleArticle: (state, action: PayloadAction<Article>) => {
            const singleArticle = action.payload;
            return {
                ...state,
                article: singleArticle,
            }
        },
        setIsFollowLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isFollowLoading: action.payload, }
        },
        toggleFollowSingleArticle: (state, action: PayloadAction<Profile>) => {
            const predictArticleChange: Article = {
                ...state.article!,
                author: action.payload
            };
            return { ...state, article: predictArticleChange }
        },
    }
});
export const { setIsLoading, loadSingleArticle, toggleFavoriteSingleArticle, setIsFollowLoading, toggleFollowSingleArticle } = singleArticleSlice.actions;
export const selectSingleArticle = (state: RootState) => state.singleArticle.article;
export const selectIsLoadingArticle = (state: RootState) => state.singleArticle.isLoading;
export const selectIsFollowLoadingArticle= (state: RootState)=> state.singleArticle.isFollowLoading;
export default singleArticleSlice.reducer;