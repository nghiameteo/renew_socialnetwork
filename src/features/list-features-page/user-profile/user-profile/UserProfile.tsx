import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  getMultiArticleAsync,
  selectMultiArticle,
} from "../../../all-article-features/article/multiArticleSlice";
import { Box, CircularProgress, Container, Tab, Tabs } from "@mui/material";
import styles from "./UserProfile.module.css";
import { useEffect, useState } from "react";
import ArticleListSingleItem from "../../../../pages/article-list-single-item/ArticleListSingleItem";

interface OwnProps {
  tab: string;
}
interface tabConfig {
  value: string;
  label: string;
}
const UserProfile = ({ tab }: OwnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const { isLoading, articles, totalArticle, page, pageSize } =
    useAppSelector(selectMultiArticle);
  const [activeTab, setActiveTab] = useState<string>("");
  const tabs = [
    {
      value: "myArticle",
      label: "My Articles",
    },
    {
      value: "favoriteArticle",
      label: "Favorites Articles",
    },
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    const routeValue = `/${username}/${
      newValue === "myArticle" ? "" : "favorites"
    }`;

    navigate(routeValue);
    setActiveTab(newValue);
  };

  const onActiveTabAndPageChange = (page: number) => {
    console.log(tab);

    if (tab === "myArticle") {
      dispatch(getMultiArticleAsync({ page, author: username }));
    } else if (tab === "favoriteArticle") {
      dispatch(getMultiArticleAsync({ page, favorited: username }));
    }
  };
  useEffect(() => {
    setActiveTab(tab);
    onActiveTabAndPageChange(1);
  }, [tab]);

  return (
    <Container className={styles.container} maxWidth="xl">
      <Box className={styles.boxTabs}>
        <Tabs
          className={styles.tabs}
          value={tab}
          TabIndicatorProps={{ className: styles.tabIndicator }}
          onChange={(_, key) => handleChange(_, key)}
        >
          {tabs.map((tab) => (
            <Tab
              className={
                tab.value === activeTab ? styles.activeTab : styles.pendingTab
              }
              key={tab.value}
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Box>
      <Box className={styles.boxTab}>
        {isLoading && <CircularProgress size={20} />}
        {!isLoading && tab === activeTab && (
          <ArticleListSingleItem
            articles={articles}
            totalArticle={totalArticle}
            page={page}
            pageSize={pageSize}
            onPageChange={onActiveTabAndPageChange}
          />
        )}
      </Box>
    </Container>
  );
};
export default UserProfile;
