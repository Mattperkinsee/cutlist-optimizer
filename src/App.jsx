import { useState, useContext, useEffect, useMemo, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import SelectDataDict from "./pages/SelectDataDictPage";
// import ConnectionsSetupPage from "./pages/ConnectionsSetupPage";
// import ExecutePage from "./pages/ExecutePage";
import Specs from "./pages/Specs";
import OptimizedCutList from "./pages/OptimizedCutList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import ResponsiveAppBar from "./components/ResponsiveAppBar";
import NavBar from "./components/NavBar";
import { DataProvider } from "./components/context/DataContext";
import PropTypes from "prop-types";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App({ mode }) {
  const colorMode = useContext(ColorModeContext);

  return (
    <DataProvider>
      <Router>
        <NavBar toggleColorMode={colorMode.toggleColorMode} />
        <Routes>
          {/* set init page */}
          <Route path="/specs" element={<Specs mode={mode} />} />
          <Route path="/optimized" element={<OptimizedCutList mode={mode} />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

App.propTypes = {
  mode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number, // Or any other types that `mode` can be
  ]).isRequired, // If mode is required
};

export default function ToggleColorMode() {
  const storedColorPref = localStorage.getItem("colorPref");
  const initialMode = storedColorPref ? JSON.parse(storedColorPref) : "light";
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    localStorage.setItem("colorPref", JSON.stringify(mode));
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App mode={mode} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
