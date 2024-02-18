import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Article, ConvertDate, User } from "../../app/models";
import FilterArticle from "../../features/filter/FilterArticle";
import styles from "./ArticleSingleItemDetail.module.css";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from '@mui/material/CircularProgress';

const GreyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey[500],
  borderColor: grey[500],
  "&:hover": {
    color: grey[300],
    borderColor: grey[300],
    backgroundColor: grey[500],
  },
}));

const GreenButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: green[500],
  borderColor: green[500],
  "&:hover": {
    color: "white",
    borderColor: green[500],
    backgroundColor: green[500],
  },
}));

const DeleteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: red[900],
  borderColor: red[900],
  "&:hover": {
    color: "white",
    borderColor: red[900],
    backgroundColor: red[900],
  },
}));

interface OwnProps {
  article: Article;
  currentUser?: User;
  isAuthorized?: boolean;
  isFollowLoading?: boolean;
  onDeleteArticle: () => void;
  onFavorite: () => void;
  onFollow: () => void;
}
const ArticleSingleItemDetail = ({
  article,
  currentUser,
  isAuthorized,
  isFollowLoading,
  onDeleteArticle,
  onFavorite,
  onFollow,
}: OwnProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseReject = () => {
    setOpen(false);
  };
  const handleCloseAccept = () => {
    setOpen(false);
    onDeleteArticle();
  };
  const renderLink = () => {
    return (
      <Container className={styles.buttonContainer}>
        <GreyButton
          onClick={() => {
            isAuthorized ? onFollow() : navigate("/login");
          }}
          color="success"
          size="small"
          variant="outlined"
          startIcon={
            isFollowLoading ? (
              <CircularProgress size={20}/>
            ) : article.author.following ? (
              <RemoveIcon />
            ) : (
              <AddIcon />
            )
          }
          className={styles.button}
        >
          {article.author.following == true ? "Unfollow " : "Follow "}
          {article.author.username}
        </GreyButton>

        <GreenButton
          onClick={() => {
            isAuthorized ? onFavorite() : navigate("/login");
          }}
          color="success"
          size="small"
          variant="outlined"
          startIcon={
            article.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
          }
          className={styles.button}
        >
          {article.author.following == true ? "Unfavorite " : "Favorite "}(
          {article.favoritesCount})
        </GreenButton>
      </Container>
    );
  };
  const renderOwnerLink = () => {
    return (
      <Container className={styles.buttonContainer}>
        <GreenButton
          onClick={() => navigate(`/editor/${article.slug}`)}
          size="small"
          variant="outlined"
          color="success"
          startIcon={<EditIcon />}
          className={styles.button}
        >
          Edit Article
        </GreenButton>
        <DeleteButton
          onClick={handleClickOpen}
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          className={styles.button}
        >
          Delete article
        </DeleteButton>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleCloseReject}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Are you sure to delete the article?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              The article will be deleted and cannot be recovered!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseReject}>
              Disagree
            </Button>
            <Button onClick={handleCloseAccept} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  };
  return (
    <Box className={styles.boxContainerLvl1}>
      <Box className={styles.boxContainerHeaderLvl2}>
        <Container className={styles.containerHeader} maxWidth="xl">
          <Typography className={styles.typoH3} variant="h3">
            {article.title}
          </Typography>
          <Grid
            className={styles.gridContainer}
            container
            wrap="nowrap"
            spacing={1}
          >
            <Grid item>
              <Link
                className={styles.linkAvatar}
                to={`/${article.author.username}`}
              >
                <Avatar
                  alt={article.author.username}
                  src={`${article.author.image}`}
                />
              </Link>
            </Grid>
            <Grid className={styles.gridItemContainerSortColumn} item>
              <Link
                className={styles.linkUsername}
                to={`/${article.author.username}`}
              >
                {article.author.username}
              </Link>
              <Typography className={styles.typoDate} variant="caption">
                {ConvertDate(article.createdAt)}
              </Typography>
            </Grid>
            <Grid item>
              {currentUser?.username == article.author.username
                ? renderOwnerLink()
                : renderLink()}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container className={styles.containerFooter} maxWidth="xl">
        <Box className={styles.boxFooter}>
          <Typography className={styles.typoFooter} variant="h6">
            {article.body}
          </Typography>
          <FilterArticle tags={article.tagList} />
        </Box>
      </Container>
    </Box>
  );
};
export default ArticleSingleItemDetail;
