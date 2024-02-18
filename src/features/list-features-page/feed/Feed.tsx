import { Box, CircularProgress, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import ArticleListSingleItem from "../../../pages/article-list-single-item/ArticleListSingleItem";
import {
  getMultiArticleAsync,
  selectMultiArticle,
} from "../../all-article-features/article/multiArticleSlice";
import FilterFeed from "../../filter/FilterFeed";
import { cleanTag, selectTag } from "../../filter/filterTagSlice";
import { selectIsAuthorized } from "../../user-information-feature/userInformationSlice";
import styles from "./Feed.module.css";

export interface TabList {
  value: string;
  label: string;
}
const TabInformation = {
  followFeed: {
    value: "FollowFeed",
    label: "Your Feed",
  },
  globalFeed: {
    value: "GlobalFeed",
    label: "Global Feed",
  },
  filter: {
    value: "filterFeed",
  },
};

const Feed = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const tag = useAppSelector(selectTag);
  const articlesData = useAppSelector(selectMultiArticle);
  const { articles, totalArticle, page, pageSize, isLoading } = articlesData;
  const [activeTab, setActiveTab] = useState<string>(
    TabInformation.globalFeed.value
  );
  const tabItems = useMemo((): TabList[] => {
    const tabsItems: TabList[] = [];
    if (isAuthorized) {
      // todo: => tabsItems.push(TabInformation.followFeed);
      tabsItems.push(TabInformation.followFeed);
    }
    // todo: => tabsItems.push(TabInformation.globalFeed);
    tabsItems.push(TabInformation.globalFeed);
    if (!!tag && tag !== "" && activeTab == TabInformation.filter.value) {
      tabsItems.push({
        value: TabInformation.filter.value,
        label: `#${tag}`,
      });
    }
    return tabsItems;
  }, [isAuthorized, activeTab, tag]);

  const onActiveTabAndPageChange = (page: number) => {
    if (activeTab === TabInformation.filter.value) {
      dispatch(getMultiArticleAsync({ page, tag }));
    } else if (activeTab === TabInformation.followFeed.value) {
      dispatch(getMultiArticleAsync({ page, feedFollow: true }));
    } else {
      dispatch(getMultiArticleAsync({ page }));
    }
  };

  useEffect(() => {
    onActiveTabAndPageChange(1);
    if (activeTab !== TabInformation.filter.value) {
      dispatch(cleanTag());
    }
  }, [activeTab, tag]);

  useEffect(() => {
    dispatch(cleanTag());
    if (isAuthorized) {
      setActiveTab(TabInformation.followFeed.value);
    } else {
      setActiveTab(TabInformation.globalFeed.value);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (!!tag && activeTab !== TabInformation.filter.value) {
      setActiveTab(TabInformation.filter.value);
    }
  }, [tag]);

  return (
    <>
      <Box className={styles.headerBox}>
        <Container className={styles.containerHeader} maxWidth="xl">
          <Typography className={styles.typoHeaderFirst}>conduit</Typography>
          <Typography className={styles.typoHeaderSecond}>
            A place to share your knowledge.
          </Typography>
        </Container>
      </Box>
      <Container className={styles.containerMain} maxWidth="xl">
        <Grid className={styles.gridContainer} container spacing={1}>
          <Grid className={styles.gridItemArticles} item xs={8}>
            <Box className={styles.boxTabs}>
              <Tabs
                className={styles.tabs}
                value={activeTab}
                onChange={(_, key) => setActiveTab(key)}
                TabIndicatorProps={{ className: styles.tabIndicator }}
              >
                {tabItems.map((item) => (
                  <Tab
                    className={
                      item.value === activeTab
                        ? styles.activeTab
                        : styles.pendingTab
                    }
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  />
                ))}
              </Tabs>
            </Box>
            <Box className={styles.boxTab}>
              {isLoading && <CircularProgress size={20}/>}
              {!isLoading && totalArticle === 0 && (
                <Typography> No article here</Typography>
              )}
              {!isLoading && totalArticle > 0 && (
                <ArticleListSingleItem
                  articles={articles}
                  totalArticle={totalArticle}
                  page={page}
                  pageSize={pageSize}
                  onPageChange={onActiveTabAndPageChange}
                />
              )}
            </Box>
          </Grid>
          <Grid className={styles.gridFilter} item xs={4}>
            <FilterFeed />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Feed;