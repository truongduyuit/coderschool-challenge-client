import { Autocomplete } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setKeywords } from "../redux/main";
import { RootState } from "../redux/store";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const keywords = useSelector((state: RootState) => state.app.keywords);
  const tags = useSelector((state: RootState) => state.app.tags);

  const handleKeyDown = (event: any) => {
    if (
      event.key === "Enter" &&
      event.target &&
      typeof event.target.value === "string"
    ) {
      dispatch(setKeywords(event.target.value.split(" ") as string[]));
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      disableClearable
      limitTags={5}
      id="multiple-limit-tags"
      style={{
        color: "#fff",
      }}
      onKeyDown={handleKeyDown}
      options={tags.map((option) => option)}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option}
          onClick={() => {
            const keys = new Set(keywords);
            keys.add(option);
            dispatch(setKeywords(Array.from(keys)));
          }}
        >
          <Box>{option}</Box>
        </li>
      )}
      onChange={(event, newValue) => dispatch(setKeywords(newValue))}
      value={keywords}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type keywords"
          InputProps={{
            ...params.InputProps,
            type: "search",
            color: "primary",
          }}
        />
      )}
    />
  );
};
