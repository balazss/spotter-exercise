import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "themes/theme";

import { SearchPage } from "./pages/searchpage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchPage />
    </ThemeProvider>
  );
}

export default App;
