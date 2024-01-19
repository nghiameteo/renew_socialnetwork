import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Article, ConvertDate } from "../../app/models";
import { toggleFavoritedMultiArticleAsync } from "../../features/all-article-features/article/multiArticleSlice";
import FilterArticle from "../../features/filter/FilterArticle";
import { selectIsAuthorized } from "../../features/user-information-feature/userInformationSlice";
import styles from "./ArticleSingleItem.module.css";

interface OwnProps {
  article: Article;
}

const ArticleSingleItem = ({ article }: OwnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(selectIsAuthorized);

  const onFavoriteArticleItem = () => {
    if (isAuthorized) {
      dispatch(
        toggleFavoritedMultiArticleAsync({
          article,
          isFavorites: article.favorited,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className={styles.cardContainer}>
      <CardHeader
        className={styles.cardHeader}
        avatar={<Avatar alt="Avatar" src={`${article.author.image}`} />}
        action={
          <Button
            variant="outlined"
            onClick={() => onFavoriteArticleItem()}
            startIcon={
              article.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
            }
            color="success"
            size="small"
          >
            {article.favoritesCount}
          </Button>
        }
        title={
          <Link to={`/${article.author.username}`} className={styles.linkUser}>
            <Typography
              variant="body1"
              color="inherit"
              className={styles.author}
            >
              {article.author.username}
            </Typography>
          </Link>
        }
        subheader={
          <Typography variant="caption" className={styles.date}>
            {ConvertDate(article.createdAt)}
          </Typography>
        }
      />
      <CardContent className={styles.cardContent}>
        <Typography gutterBottom variant="h5" className={styles.title}>
          {article.title}
        </Typography>
        <Typography variant="body2" className={styles.description}>
          {article.description.length > 100
            ? `${article.description.substring(0, 100)}...`
            : article.description}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardAction}>
        <Link to={`/article/${article.slug}`} className={styles.link}>
          <Typography variant="caption" className={styles.typoReadMore}>
            Read more...
          </Typography>
        </Link>
        <Box className={styles.tagList}>
          <FilterArticle tags={article.tagList} />
        </Box>
      </CardActions>
      <Divider className={styles.divider} />
    </Card>
  );
};

export default ArticleSingleItem;
