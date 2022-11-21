import React, { useState, useMemo, useEffect, Suspense } from "react";
import { Grid, LinearProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setFavourites,
  getFavourites,
  getPokemons,
} from "../../redux/slices/pokemonSlice";
import { IExtendedPokemonForm } from "../../@types/pokemonTypes";
import InfiniteScroll from "react-infinite-scroller";

const PokemonCard = React.lazy(() => import("../PokemonCard"));

const getTenMore = (pokemons: IExtendedPokemonForm[], page: number) => {
  return pokemons.slice(page * 10, page * 10 + 10);
};

const getFirstTenElements = (pokemons: IExtendedPokemonForm[]) => {
  return pokemons.slice(0, 10);
};

export const DisplaySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(getPokemons);
  const favourites = useAppSelector<string[]>(getFavourites);
  const [page, setPage] = useState(-1);
  const [data, setData] = useState<IExtendedPokemonForm[]>(
    getFirstTenElements(pokemons)
  );
  let hasMore = useMemo(
    () => (data.length < pokemons.length ? true : false),
    [data, pokemons]
  );

  useEffect(() => {
    setData(getFirstTenElements(pokemons));
    setPage(-1);
  }, [pokemons]);

  function addFavourite(pokemon: IExtendedPokemonForm) {
    dispatch(setFavourites([...favourites, pokemon.name]));
  }

  function removeFavourite(pokemon: IExtendedPokemonForm) {
    dispatch(
      setFavourites(
        favourites.filter((favourite) => favourite !== pokemon.name)
      )
    );
  }

  const handleOnRowsScrollEnd = () => {
    if (data.length <= pokemons.length) {
      setPage(page + 1);
      setData([...data, ...getTenMore(pokemons, page)]);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleOnRowsScrollEnd}
        loader={<LinearProgress key={0} sx={{ my: 2 }} aria-label="loading" />}
        hasMore={hasMore}
      >
        <Grid container spacing={2}>
          {data.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PokemonCard
                pokemon={pokemon}
                isFavourite={favourites.includes(pokemon.name)}
                onAddFavourite={() => addFavourite(pokemon)}
                onRemoveFavourite={() => removeFavourite(pokemon)}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Suspense>
  );
};
