import React, { ChangeEvent } from "react";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { setQuery, getSearch } from "../redux/slices/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector<string>(getSearch);

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setQuery(event.target.value));
  }

  return (
    <TextField
      id="pokemon-search"
      placeholder="Search Pokemon"
      variant="outlined"
      value={query}
      onChange={handleQueryChange}
      InputProps={{
        sx: { pr: 0 },
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => dispatch(setQuery(""))}
              aria-label="clear search"
            >
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
