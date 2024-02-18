import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { NewArticle } from "../../../../app/models";
import EditArticle from "../../../../pages/edit-single-article/EditArticle";
import { selectIsAuthorized } from "../../../user-information-feature/userInformationSlice";
import {
  selectIsLoadingArticle,
  selectSingleArticle,
  updateSingleArticleAsync,
} from "../singleArticleSlice";

const UpdateArticle = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoadingArticle);
  const isAuthorized = useSelector(selectIsAuthorized);
  const currentArticle = useAppSelector(selectSingleArticle);
  const onSubmit = async (data: NewArticle) => {
    dispatch(updateSingleArticleAsync({ slug, article: data }));
  };
  useEffect(() => {
    !isAuthorized ? navigate("/login") : "";
  }, []);
  return (
    <EditArticle
      article={currentArticle}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};
export default UpdateArticle;
