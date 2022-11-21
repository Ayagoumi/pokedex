import React from "react";
import { Box, Button } from "@mui/material";
import {
  setFilters,
  getFilters,
  getFilterType,
  Field,
} from "../redux/slices/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Filters, FilterValue, PokemonType } from "../@types/pokemonTypes";
import PokemonTypeIcon from "./PokemonTypeIcon";

const PokemonTypesFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector<Filters>(getFilters);
  const PokemonTypes = Object.values(PokemonType);
  const types = useAppSelector<string[]>(getFilterType);

  function addFilter(field: Field, value: FilterValue) {
    const newFilters = { ...filters, [field]: value };
    dispatch(setFilters(newFilters));
  }

  function removeFilter(field: Field) {
    const newFilters = { ...filters };
    newFilters[field] = undefined;
    dispatch(setFilters(newFilters));
  }

  const handleToggleType = (type: string) => {
    const types = filters[Field.type] as string[];

    if (types?.includes(type)) {
      const newTypes = types.filter((t) => t !== type);
      if (newTypes.length === 0) removeFilter(Field.type);
      else addFilter(Field.type, newTypes);
    } else {
      if (types) addFilter(Field.type, [...types, type]);
      else addFilter(Field.type, [type]);
    }
  };

  return (
    <Box sx={{ flexShrink: 0, my: "1rem" }}>
      {PokemonTypes.map((type) => (
        <Button
          key={type}
          color={types?.includes(type) ? "primary" : "secondary"}
          onClick={() => handleToggleType(type)}
          aria-label={type}
          sx={{ mr: "0.5rem", mb: "0.5rem" }}
        >
          <PokemonTypeIcon type={type} />
        </Button>
      ))}
    </Box>
  );
};

export default PokemonTypesFilter;
