import { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { ActionsSection, DisplaySection } from "../components/_Home";
import PokeAPI from "pokeapi-typescript";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  setError,
  setPokemons,
  setOriginalData,
} from "../redux/slices/pokemonSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const fetchPokemon = async () => {
    try {
      const response = await PokeAPI.Pokemon.list(150, 0);
      const res = response.results.map(async (p) => {
        const fullData = PokeAPI.PokemonForm.resolve(p.name);
        return fullData;
      });
      const bigola = await Promise.all(res);
      dispatch(setOriginalData(bigola));
      dispatch(setPokemons(bigola));
    } catch (error) {
      dispatch(setError(error));
    }
  };

  useEffect(() => {
    fetchPokemon();
    return () => {
      dispatch(setPokemons([]));
      dispatch(setOriginalData([]));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h1">
        What Pokemon <br />
        are you looking for?
      </Typography>
      <ActionsSection />
      <DisplaySection />
    </Container>
  );
};

export default Home;
