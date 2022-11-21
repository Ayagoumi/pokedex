import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IExtendedPokemonForm } from "../../@types/pokemonTypes";

export enum Field {
  favourite = "favourite",
  type = "type",
}

type AlternativeFilter = {
  favourite: boolean;
  type: string[];
};

interface initialStateAppConfigType {
  error: any;
  query: string;
  favourites: string[];
  filters: AlternativeFilter;
  pokemon: IExtendedPokemonForm[];
  originalData: IExtendedPokemonForm[];
}

let initialState: initialStateAppConfigType = {
  error: "",
  query: "",
  favourites: [],
  filters: {
    favourite: false,
    type: [] as string[],
  },
  pokemon: [] as IExtendedPokemonForm[],
  originalData: [] as IExtendedPokemonForm[],
};

const pokemonSlice = createSlice({
  name: "Pokemon",
  initialState,
  reducers: {
    setOriginalData(state, action) {
      state.originalData = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPokemons: (state, action) => {
      state.pokemon = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setFavourite: (state, action) => {
      state.filters.favourite = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const getOriginalData = (state: RootState) => state.pokemon.originalData;

export const getSearch = (state: RootState) => state.pokemon.query;

export const getPokemons = (state: RootState) => state.pokemon.pokemon;

export const getFavourites = (state: RootState) => state.pokemon.favourites;

export const getFilters = (state: RootState) => state.pokemon.filters;

export const getFilterFavourite = (state: RootState) =>
  state.pokemon.filters.favourite;

export const getFilterType = (state: RootState) => state.pokemon.filters.type;

export const getError = (state: RootState) => state.pokemon.error;

export const {
  setOriginalData,
  setQuery,
  setPokemons,
  setFavourites,
  setFilters,
  setFavourite,
  setError,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
