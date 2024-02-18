import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import ArticleSingleItemDetail from "../../../../pages/article-single-item-detail/ArticleSingleItemDetail";
import {
    selectIsAuthorized,
    selectUser,
} from "../../../user-information-feature/userInformationSlice";
import {
    deleteSingleArticleAsync,
    getSingleArticleAsync,
    selectIsFollowLoadingArticle,
    selectIsLoadingArticle,
    selectSingleArticle,
    toggleFavoriteSingleArticleAsync,
    toggleFollowSingleArticleUserAsync,
} from "../singleArticleSlice";
import CommentFeature from "../../../comment-feature/CommentFeature";
import { CircularProgress } from "@mui/material";

const ArticleDetail = () => {
  const article = useAppSelector(selectSingleArticle);
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const currentAvailableUser = useAppSelector(selectUser);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const isLoading = useAppSelector(selectIsLoadingArticle);
  const isFollowLoading = useAppSelector(selectIsFollowLoadingArticle);
  const onDeleteArticle = () => {
    dispatch(deleteSingleArticleAsync( slug! ));
  };
  const onFavoriteArticle = () => {
    dispatch(
      toggleFavoriteSingleArticleAsync({
        article: article!,
        isFavorites: article?.favorited!,
      })
    );
  };

  const onFollowUser = () => {
    dispatch(
      toggleFollowSingleArticleUserAsync({
        username: article?.author.username!,
        isFollowing: article?.author.following!,
      })
    );
  };
  useEffect(() => {
    if (slug) {
        dispatch(getSingleArticleAsync(slug));
      }
  }, [slug]); 
  
  return (
    <>
      {!!article && (
        <ArticleSingleItemDetail
          article={article!}
          currentUser={currentAvailableUser}
          isAuthorized={isAuthorized}
          isFollowLoading={isFollowLoading}
          onDeleteArticle={onDeleteArticle}
          onFavorite={onFavoriteArticle}
          onFollow={onFollowUser}          
        />
      )}
      {!!article && !!slug && <CommentFeature slug={slug}/>}
      {!article && !isLoading && <>No article here!</>}
      {isLoading && <CircularProgress size={20}/>}
    </>
  );
};
export default ArticleDetail;
