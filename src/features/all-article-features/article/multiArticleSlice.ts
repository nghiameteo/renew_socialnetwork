import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../app/axios-instance";
import { Article, MultipleArticleResponse, SingleArticleResponse } from "../../../app/models";
import { RootState } from "../../../app/store";

interface MultiArticlePagingState {
    isLoading: boolean;
    articles: Article[];
    totalArticle: number;
    page: number;
    pageSize: number;
}
const initialState: MultiArticlePagingState = {
    isLoading: false,
    articles: [],
    totalArticle: 0,
    page: 0,
    pageSize: 10,
}

interface MultiArticlePagingParams {
    page?: number;
    pageSize?: number;
    tag?: string;
    author?: string;
    favorited?: string;
    feedFollow?: boolean;
}
export const getMultiArticleAsync = createAction<MultiArticlePagingParams>('multiArticle/getMultiArticleAsync');
const tryGetMultiArticle = async (params: MultiArticlePagingParams | undefined): Promise<MultipleArticleResponse> => {
    const url = params?.feedFollow ? '/articles/feed' : '/articles';
    const limit = params?.pageSize || 10;
    const offset = (params?.page || 1) > 1 ? (params!.page! - 1) * limit : 0;
    const queryParams = {
        tag: params?.tag,
        author: params?.author,
        favorited: params?.favorited,
        limit: limit,
        offset: offset,
    }
    return (await api.get<MultipleArticleResponse>(url, { params: queryParams })).data;
}
function* getMultiArticleSaga(action: PayloadAction<MultiArticlePagingParams | undefined>) {
    try {
        yield put(setIsLoading(true));
        yield put(changePage(Number(action.payload?.page) - 1));
        const response: MultipleArticleResponse = yield call(tryGetMultiArticle, action.payload);
        yield put(loadMultiArticle(response));
        yield put(setIsLoading(false));
    }
    catch (error) {
        console.error('multiArticleSaga', error);
        yield put(setIsLoading(false));
    }
}

export interface FavoritesArticleParams {
    article: Article;
    isFavorites: boolean;
}
export const toggleFavoritedMultiArticleAsync = createAction<FavoritesArticleParams>('multiArticle/toggleFavoritedMultiArticleAsync')
const tryToggleFavoritedMultiArticle = async (params: FavoritesArticleParams): Promise<SingleArticleResponse> => {
    const url = `/articles/${params?.article.slug}/favorite`;
    if (!params?.isFavorites) {
        return (await api.post<SingleArticleResponse>(url, { slug: params?.article.slug })).data;
    }
    else {
        return (await api.delete<SingleArticleResponse>(url)).data;
    }
}
function* toggleFavoritedMultiArticleSaga(action: PayloadAction<FavoritesArticleParams>) {
    try {
        const newArticle = action.payload.article;
        const predictArticle = { favorited: !newArticle.favorited, favoritesCount: newArticle.favoritesCount + (newArticle.favorited ? -1 : +1) }
        yield put(changeFavorite({ ...newArticle, favorited: predictArticle.favorited, favoritesCount: predictArticle.favoritesCount }));
        const response: SingleArticleResponse = yield call(tryToggleFavoritedMultiArticle, action.payload);
        yield put(changeFavorite(response.article))
    }
    catch (error) {
        console.error('toggleFavoritedMultiArticleSaga', error);
    }
}

export function* multiArticleSaga() {
    yield takeLatest(getMultiArticleAsync, getMultiArticleSaga);
    yield takeLatest(toggleFavoritedMultiArticleAsync, toggleFavoritedMultiArticleSaga);
}

export const multiArticleSlice = createSlice({
    name: 'multiArticle',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLoading: action.payload };
        },
        loadMultiArticle: (state, action: PayloadAction<MultipleArticleResponse>) => {
            return { ...state, articles: action.payload.articles, totalArticle: action.payload.articlesCount };
        },
        changeFavorite: (state, action: PayloadAction<Article>) => {
            return {
                ...state,
                articles: state.articles.map(item => item.slug === action.payload.slug ? action.payload : item)
            };
        },
        changePage: (state, action: PayloadAction<number>) => {
            return { ...state, page: action.payload }
        }
    }
})

export const { setIsLoading, loadMultiArticle, changeFavorite, changePage } = multiArticleSlice.actions;

export const selectMultiArticle = (state: RootState) => state.multiArticle;

export default multiArticleSlice.reducer;