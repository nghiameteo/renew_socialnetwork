import { useState } from "react";
import { Article } from "../../app/models";
import ArticleSingleItem from "../article-single-item/ArticleSingleItem";
import styles from "./ArticleListSingleItem.module.css";
import { Pagination, PaginationItem } from "@mui/material";

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
        <ArticleSingleItem article={article} />
      ))}
      <Pagination
        className={styles.pagination}
        variant="outlined"
        shape="rounded"
        hideNextButton
        hidePrevButton
        siblingCount={count}
        count={count}
        defaultPage={1}
        page={activePage}
        onChange={handleChangePage}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            className={
              item.page == activePage ? styles.activePage : styles.nonactivePage
            }
          />
        )}
      />
    </>
  );
};
export default ArticleListSingleItem;
