import { Autocomplete } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Props = {
  keywords: string[];
  setKeywords?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SearchBox = ({ setKeywords, keywords }: Props) => {
  const tags = useSelector((state: RootState) => state.app.tags);

  const handleKeyDown = (event: any) => {
    if (
      event.key === "Enter" &&
      event.target &&
      typeof event.target.value === "string"
    ) {
      setKeywords?.(event.target.value.split(" "));
    }
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      style={{
        color: "#fff",
      }}
      onKeyDown={handleKeyDown}
      options={tags.map((option) => option)}
      renderOption={(props, option) => (
        <li {...props} key={option} onClick={() => setKeywords?.([option])}>
          <Box>{option}</Box>
        </li>
      )}
      value={keywords.join(" ")}
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
