import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
  capitalize
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Comment, ConvertDate, NewComment, User } from "../../app/models";
import { GreenButton } from "../page-register/Register";
import styles from "./CommentList.module.css";

interface OwnProps {
  isLoadingLoadComment: boolean;
  isLoadingAddComment: boolean;
  isLoadingDeleteComment: boolean;
  comments: Comment[];
  currentUser?: User;
  onSubmit: (data: NewComment) => void;
  onDelete: (id: number) => void;
}

const CommentSchema = Yup.object().shape({
  body: Yup.string()
    .trim()
    .required("Need write something")
    .min(1, "Comment too short"),
});

const CommentList = ({
  isLoadingLoadComment,
  isLoadingAddComment,
  isLoadingDeleteComment,
  comments,
  currentUser,
  onSubmit,
  onDelete,
}: OwnProps) => {
  const [touchComment, setTouchComment] = useState<number>(NaN);
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: CommentSchema,
    onSubmit: ({ body }, { resetForm }) => {
      const bodyCmt: NewComment = { body };
      onSubmit(bodyCmt);
      resetForm({});
    },
  });
  const onDeleteComment = (id: number) => {
    setTouchComment(id);
    onDelete(id);
    setTimeout(() => {
      setTouchComment(NaN);
    }, 3000);
  };
  return (
    <>
      {!!currentUser && (
        <Container className={styles.formContainer} maxWidth="xl">
          <Link className={styles.linkAvatar} to={`/${currentUser.username}`}>
            <Avatar
              className={styles.avatarWriteCmt}
              alt={capitalize(currentUser.username)}
              src={`${currentUser.image}`}
            />
          </Link>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="body"
              name="body"
              label="comment"
              multiline
              minRows={2}
              maxRows={6}
              placeholder="write comment"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <GreenButton
              variant="contained"
              type="submit"
              disabled={isLoadingAddComment || Boolean(formik.errors.body)}
            >
              {isLoadingAddComment ? (
                <CircularProgress size={20} />
              ) : (
                "Post Comment"
              )}
            </GreenButton>
          </form>
        </Container>
      )}
      {isLoadingLoadComment ? (
        <Container className={styles.containerShowComment}>
          <LoadingButton
            loading={isLoadingLoadComment}
            color="error"
            loadingPosition="start"
            startIcon={<>icon</>}
          >
            Wait load Comment
          </LoadingButton>
        </Container>
      ) : (
        <Container className={styles.containerShowComment}>
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <Box className={styles.cmtBox} key={comment.id}>
                <Card className={styles.cardContainer}>
                  <CardHeader
                    avatar={
                      <Avatar alt="Avatar" src={`${comment.author.image}`} />
                    }
                    action={
                      currentUser?.username == comment.author.username && (
                        <>
                          <LoadingButton
                            loading={isLoadingDeleteComment&& comment.id==touchComment}
                            onClick={() => onDeleteComment(comment.id)}
                            color="error"
                            loadingPosition="start"
                            startIcon={<DeleteIcon />}
                          />
                        </>
                      )
                    }
                    title={
                      <Link
                        className={styles.link}
                        to={`/${comment.author.username}`}
                      >
                        <Typography
                          className={styles.author}
                          variant="body1"
                          color="success"
                        >
                          {comment.author.username}
                        </Typography>
                      </Link>
                    }
                    subheader={
                      <Typography className={styles.date} variant="caption">
                        {ConvertDate(comment.createdAt)}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography className={styles.description} variant="body2">
                      {comment.body}
                    </Typography>
                  </CardContent>
                </Card>
                {index + 1 < comments.length && <Divider />}
              </Box>
            ))}
        </Container>
      )}
    </>
  );
};
export default CommentList;
