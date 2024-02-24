import { Box, Chip, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./FilterFeed.module.css";
import { findTag, getTagsAsync, selectTags } from "./filterTagSlice";

const FilterFeed = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(selectTags);

  const onFindTag = (value: string) => {
    dispatch(findTag({ tag: value }));
  };

  useEffect(() => {
    dispatch(getTagsAsync());
  }, []);

  return (
    <>
      <Box className={styles.boxContainer}>
        <Typography className={styles.typoHeader}>Popular Tags</Typography>

        <Stack className={styles.stack}>
          {tags.map((tag) => (
            <Chip
              className={styles.chip}
              key={tag}
              label={tag}
              size="small"
              onClick={() => onFindTag(tag)}
            ></Chip>
          ))}
        </Stack>
      </Box>
    </>
  );
};
export default FilterFeed;
