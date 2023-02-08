import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { setKeywords } from "../redux/main";

type Props = {
  tags?: string[];
};

export const ListTags = ({ tags }: Props) => {
  const dispatch = useDispatch();

  return tags ? (
    <Stack className="mt-6" direction="row" spacing={1}>
      {tags.map((tag: string, index: number) => {
        return (
          <Box
            key={`${tag}${index}`}
            className="cursor-pointer font-bold"
            component="a"
            color="blue"
            onClick={() => dispatch(setKeywords([tag]))}
          >{`#${tag}`}</Box>
        );
      })}
    </Stack>
  ) : (
    <></>
  );
};
