import { Chip, Stack } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import styles from "./Filter.module.css";
import { findTag } from "./filterTagSlice";

interface OwnProps {
  tags: string[];
}
const FilterArticle = ({ tags }: OwnProps) => {
  const dispatch = useAppDispatch();

  const onFindTag = (value: string) => {
    dispatch(findTag({ tag: value }));
  };

  return (
    <>
      <Stack className={styles.stack}>
        {tags.map((tag) => (
          <Chip
            className={styles.chipArticle}
            key={tag}
            label={tag}
            variant="outlined"
            size="small"
            onClick={() => onFindTag(tag)}
          ></Chip>
        ))}
      </Stack>
    </>
  );
};
export default FilterArticle;
