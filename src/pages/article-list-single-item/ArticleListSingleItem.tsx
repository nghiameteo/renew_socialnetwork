import { Pagination, PaginationItem } from "@mui/material";
import { useState } from "react";
import { Article } from "../../app/models";
import ArticleSingleItem from "../article-single-item/ArticleSingleItem";
import styles from "./ArticleListSingleItem.module.css";

interface OwnProps {
  articles: Article[];
  totalArticle: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

const ArticleListSingleItem = ({
  articles,
  totalArticle,
  page,
  pageSize,
  onPageChange,
}: OwnProps) => {
  const count: number = Math.floor(totalArticle / pageSize + 1);
  const [activePage, setActivePage] = useState(page + 1);
  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    setActivePage(value);
  };
  return (
    <>
      {articles.map((article) => (
        <ArticleSingleItem key={article.slug} article={article} />
      ))}
      {count > 1 && (
        <Pagination
          className={styles.paginationContainer}
          variant="outlined"
          shape="rounded"
          hideNextButton
          hidePrevButton
          siblingCount={count}
          count={count}
          defaultPage={1}
          page={page + 1}
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              className={
                item.page == activePage
                  ? styles.activePaginationPage
                  : styles.pendingPaginationPage
              }
            />
          )}
        />
      )}
    </>
  );
};
export default ArticleListSingleItem;
