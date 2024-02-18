import { Box, Container, TextField, Typography } from "@mui/material";
import { Article, NewArticle } from "../../app/models";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./EditArticle.module.css";
import { GreenButton } from "../page-register/Register";
interface OwnProps {
  onSubmit: (data: NewArticle) => void;
  isLoading: boolean;
  article?: Article;
}
const EditArticleSchema = Yup.object().shape({
  title: Yup.string().min(1, "Too short").required("Title is required."),
  description: Yup.string().required("Description is required."),
  body: Yup.string().required("Body is required."),
});

const EditArticle = ({ article, isLoading, onSubmit }: OwnProps) => {
  const initialValues = {
    title: article?.title || "",
    description: article?.description || "",
    body: article?.body || "",
    tagList: article?.tagList || [],
  };
  const formFromFormik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: EditArticleSchema,
    onSubmit: ({ title, description, body, tagList }, { resetForm }) => {
      const articleData: NewArticle = {
        title,
        description,
        body,
        tagList,
      };
      onSubmit(articleData);
      resetForm();
    },
  });

  return (
    <>
      <Container className={styles.container} maxWidth="xl">
        <Typography className={styles.typoHeader}>{!!article? 'Update Article':'New Article'}</Typography>
        <form className={styles.form} onSubmit={formFromFormik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="title"
            value={formFromFormik.values.title}
            onChange={formFromFormik.handleChange}
            onBlur={formFromFormik.handleBlur}
            error={
              formFromFormik.touched.title &&
              Boolean(formFromFormik.errors.title)
            }
            helperText={
              formFromFormik.touched.title && formFromFormik.errors.title
            }
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="description"
            value={formFromFormik.values.description}
            onChange={formFromFormik.handleChange}
            onBlur={formFromFormik.handleBlur}
            error={
              formFromFormik.touched.description &&
              Boolean(formFromFormik.errors.description)
            }
            helperText={
              formFromFormik.touched.description &&
              formFromFormik.errors.description
            }
          />
          <TextField
            fullWidth
            id="body"
            name="body"
            label="body"
            multiline
            minRows={2}
            maxRows={6}
            placeholder="write something"
            value={formFromFormik.values.body}
            onChange={formFromFormik.handleChange}
            onBlur={formFromFormik.handleBlur}
            error={
              formFromFormik.touched.body &&
              Boolean(formFromFormik.errors.body)
            }
            helperText={
              formFromFormik.touched.body && formFromFormik.errors.body
            }
          />
          <TextField
            fullWidth
            id="tagList"
            name="tagList"
            label="tagList"
            value={formFromFormik.values.tagList}
            onChange={formFromFormik.handleChange}
            onBlur={formFromFormik.handleBlur}
            error={
              formFromFormik.touched.tagList &&
              Boolean(formFromFormik.errors.tagList)
            }
            helperText={
              formFromFormik.touched.tagList && formFromFormik.errors.tagList
            }
          />
          <Box className={styles.box}>
            <GreenButton
              className={styles.button}
              type="submit"
              size="large"
              disabled={isLoading}
            >
              {!article && <>{isLoading ? "Processing" : "New Article"}</>}
              {!!article && <>{isLoading ? "Processing" : "Update Article"}</>}              
            </GreenButton>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default EditArticle;
