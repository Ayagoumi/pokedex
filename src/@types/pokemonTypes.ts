import { Field } from "../redux/slices/pokemonSlice";
import { IPokemonForm, IPokemon } from "pokeapi-typescript";

export type Filters = { [key in Field]: FilterValue };
export type FilterValue = boolean | string | string[] | undefined;

export enum PokemonType {
  bug = "bug",
  dark = "dark",
  dragon = "dragon",
  electric = "electric",
  fairy = "fairy",
  fighting = "fighting",
  fire = "fire",
  flying = "flying",
  ghost = "ghost",
  grass = "grass",
  ground = "ground",
  ice = "ice",
  normal = "normal",
  poison = "poison",
  psychic = "psychic",
  rock = "rock",
  steel = "steel",
  water = "water",
}

export enum PokemonStat {
  hp = "hp",
  attack = "attack",
  defense = "defense",
  specialAttack = "special-attack",
  specialDefense = "special-defense",
  speed = "speed",
}

export interface IExtendedPokemonForm extends IPokemonForm {
  types: [{ slot: number; type: IPokemon }];
}
