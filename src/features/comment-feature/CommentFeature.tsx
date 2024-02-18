import { Box, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectIsAuthorized,
  selectUser,
} from "../user-information-feature/userInformationSlice";
import {
  addCommentAsync,
  delCommentAsync,
  getCommentAsync,
  selectComments,
  selectCommentState,
} from "./commentSlice";
import styles from "./CommentFeature.module.css";
import { Link } from "react-router-dom";
import CommentList from "../../pages/comment-list-single-item/CommentList";
import { NewComment } from "../../app/models";
import { useEffect } from "react";

interface OwnProps {
  slug: string;
}

const CommentFeature = ({ slug }: OwnProps) => {
  const dispatch = useAppDispatch();
  const {isLoadingLoadComment, isLoadingAddComment, isLoadingRemoveComment} = useAppSelector(selectCommentState);
  const comments = useAppSelector(selectComments);
  const currentUser = useAppSelector(selectUser);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const onSubmit = (data: NewComment) => {
    dispatch(addCommentAsync({ slug, comment: data }));
  };
  const onDelete = (id: number) => {
    dispatch(delCommentAsync({ slug, id: id }));
  };
  useEffect(() => {
    if (slug) {
      dispatch(getCommentAsync(slug));
    }
  }, [slug]);
  return (
    <>
      <Container className={styles.container} maxWidth="xl">
        <Box>
          {!isAuthorized && (
            <>
              <Link to="/login">Sign In</Link> or{" "}
              <Link to="/register">Sign Up</Link> to add comment
            </>
          )}
          <CommentList
            isLoadingLoadComment={isLoadingLoadComment}
            isLoadingAddComment={isLoadingAddComment}
            isLoadingDeleteComment={isLoadingRemoveComment}
            comments={comments}
            currentUser={currentUser}
            onSubmit={onSubmit}
            onDelete={onDelete}
          />
        </Box>
      </Container>
    </>
  );
};
export default CommentFeature;
