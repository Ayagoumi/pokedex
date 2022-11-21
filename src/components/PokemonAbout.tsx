import { Box, Grid, Typography } from "@mui/material";

interface IPokemonAboutProps {
  experience: number;
  height: number;
  weight: number;
  abilities: string[];
  description: string;
}

const PokemonAbout: React.FC<IPokemonAboutProps> = ({
  experience,
  height,
  weight,
  abilities,
  description,
}) => {
  return (
    <>
      <Box mb={3}>
        <Typography>{description}</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <Typography variant="caption">Base Experience</Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography>{experience}xp</Typography>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Typography variant="caption">Height</Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography>{height * 10}cm</Typography>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Typography variant="caption">Weight</Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography>{weight / 10}kg</Typography>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Typography variant="caption">Abilities</Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography>{abilities.join(", ")}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PokemonAbout;
