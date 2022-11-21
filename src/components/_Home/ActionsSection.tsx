import React, { useEffect, Suspense } from "react";
import { Box, Button, Grid } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import {
  setPokemons,
  getFilterFavourite,
  setFavourite,
  setFilters,
  getFavourites,
  getFilters,
  getSearch,
  getOriginalData,
  Field,
} from "../../redux/slices/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  Filters,
  FilterValue,
  IExtendedPokemonForm,
} from "../../@types/pokemonTypes";
import { getIdFromUrl } from "../../utils";

const SearchBar = React.lazy(() => import("../SearchBar"));
const PokemonTypesFilter = React.lazy(() => import("../PokemonTypesFilter"));

export const ActionsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const favourite = useAppSelector(getFilterFavourite);
  const favourites = useAppSelector<string[]>(getFavourites);
  const filters = useAppSelector<Filters>(getFilters);

  const query = useAppSelector<string>(getSearch);
  const data = useAppSelector<IExtendedPokemonForm[]>(getOriginalData);

  function addFilter(field: Field, value: FilterValue) {
    const newFilters = { ...filters, [field]: value };
    dispatch(setFilters(newFilters));
  }

  function removeFilter(field: Field) {
    const newFilters = { ...filters };
    newFilters[field] = undefined;
    dispatch(setFilters(newFilters));
  }

  const handleToggleFavourites = () => {
    if (favourite === true) removeFilter(Field.favourite);
    else addFilter(Field.favourite, true);
    dispatch(setFavourite(!favourite));
  };

  const filterData = async () => {
    if (!data) {
      return;
    }

    let filteredData = [...data];
    const fields = Object.keys(filters) as Field[];

    for (const field of fields) {
      switch (field) {
        case Field.favourite: {
          const value = filters[field];
          if (value === true) {
            filteredData = filteredData.filter((pokemon) =>
              favourites.includes(pokemon.name)
            );
          }
          break;
        }
        case Field.type: {
          const value = filters[field] as string[];

          if (value?.length > 0) {
            filteredData = filteredData.filter((pokemon) => {
              const types = pokemon.types.map((type) => type.type.name);
              return value.every((val) => types.includes(val));
            });
          }
          break;
        }
      }
    }

    if (query) {
      filteredData = filteredData.filter((pokemon) =>
        pokemon.name.includes(query)
      );
    }

    filteredData.sort((a, b) => {
      const aId = getIdFromUrl(a.pokemon.url);
      const bId = getIdFromUrl(b.pokemon.url);

      if (aId > bId) {
        return 1;
      } else {
        return -1;
      }
    });

    dispatch(setPokemons(filteredData));
  };

  useEffect(() => {
    filterData();
    return () => {
      dispatch(setPokemons([]));
    };
  }, [filters, query, favourites]); // eslint-disable-line

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Grid
          container
          sx={{
            display: "flex",
            pt: 4,
            justifyContent: { xs: "center", md: "space-between" },
          }}
          spacing={2}
        >
          <Grid item xs={12} md={8.5} lg={9.3}>
            <SearchBar />
          </Grid>
          <Grid item xs="auto">
            <Button
              startIcon={favourite ? <Favorite /> : <FavoriteBorder />}
              color={favourite ? "primary" : "secondary"}
              sx={{ flexShrink: 0, ml: { md: "2rem" } }}
              onClick={handleToggleFavourites}
              name="favourite"
            >
              My Favourites ({favourites.length})
            </Button>
          </Grid>
        </Grid>
        <PokemonTypesFilter />
      </Suspense>
    </Box>
  );
};
