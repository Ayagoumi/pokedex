import { ThemeProvider } from "@mui/material";
import { baseTheme } from "./theme";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
