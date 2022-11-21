import { PokemonType } from "../@types/pokemonTypes";

import {
  greenTheme,
  yellowTheme,
  redTheme,
  blueTheme,
  purpleTheme,
  pinkTheme,
  brownTheme,
} from "../theme";

export function getTheme(type: PokemonType) {
  switch (type) {
    case PokemonType.bug:
    case PokemonType.flying:
    case PokemonType.grass:
      return greenTheme;

    case PokemonType.electric:
    case PokemonType.fighting:
      return yellowTheme;

    case PokemonType.fire:
    case PokemonType.dragon:
      return redTheme;

    case PokemonType.ice:
    case PokemonType.normal:
    case PokemonType.steel:
    case PokemonType.water:
      return blueTheme;

    case PokemonType.poison:
    case PokemonType.dark:
    case PokemonType.ghost:
      return purpleTheme;

    case PokemonType.psychic:
    case PokemonType.fairy:
      return pinkTheme;

    case PokemonType.ground:
    case PokemonType.rock:
      return brownTheme;
  }
}
