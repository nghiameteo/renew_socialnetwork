import { Box, Chip, Stack } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import styles from "./FilterArticle.module.css";
import { findTag } from "./filterTagSlice";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  tags: string[];
}
const FilterArticle = ({ tags }: OwnProps) => {
  const dispatch = useAppDispatch();
  const navigate=useNavigate();

  const onFindTag = (value: string) => {
    navigate('/')
    setTimeout(() => {
      dispatch(findTag({ tag: value }));
    }, 2000);
    
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
