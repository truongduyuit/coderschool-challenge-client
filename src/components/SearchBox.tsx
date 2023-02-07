import { Autocomplete } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Props = {};

export const SearchBox = (props: Props) => {
  const navigator = useNavigate();
  const tags = useSelector((state: RootState) => state.app.tags);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      navigator(`/post?keywords=${event.target.value}`);
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
        <Link to={`/post?keywords=${option}`}>
          <li {...props}>
            <Box>{option}</Box>
          </li>
        </Link>
      )}
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
