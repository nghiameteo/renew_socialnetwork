import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { useSelector } from "react-redux";
import { selectIsAuthorized } from "../../../user-information-feature/userInformationSlice";
import {
  addSingleArticleAsync,
  selectIsLoadingArticle,
} from "../singleArticleSlice";
import { NewArticle } from "../../../../app/models";
import { useEffect } from "react";
import EditArticle from "../../../../pages/edit-single-article/EditArticle";

const CreateArticle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoadingArticle);
  const isAuthorized = useSelector(selectIsAuthorized);
  const onSubmit = async (data: NewArticle) => {
    dispatch(addSingleArticleAsync(data));
  };
  useEffect(() => {
    !isAuthorized ? navigate("/login"):"";
    !isAuthorized && navigate("/login");
  }, []);
  return <EditArticle onSubmit={onSubmit} isLoading={isLoading}/>;
};
export default CreateArticle;
