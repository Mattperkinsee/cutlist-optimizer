/* eslint-disable react/prop-types */
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDataContext } from "./context/DataContext";

export default function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isExecuting
  } = useDataContext();

  // eslint-disable-next-line react/prop-types
  const { toggleColorMode } = props;
  const theme = useTheme();

  // Listen for the "window-maximized" message from the main process


  // Determine tab index based on current route
  const getTabIndex = (path) => {
    switch (path) {
      case "/specs":
        return 0;
      case "/optimized":
        return 1;
      case "/execute":
        return 2;
      default:
        return 0;
    }
  };

  const navIdx = getTabIndex(location.pathname);

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate("/specs");
        break;
      case 1:
        navigate("/optimized");
        break;
      case 2:
        navigate("/execute");
        break;
      default:
        break;
    }
  };



  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Box className="navBarBox" sx={{ flexGrow: 1 }}>
      <AppBar
        className="navBar"
        position="fixed"
        sx={{ height: "56px", WebkitAppRegion: "drag" }} // Make the entire app bar draggable
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            className={"my-sixth-step"}
            sx={{ ml: 1, fontSize: "14px" }} // Adjust the font size as needed
            onClick={toggleColorMode}
          >
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
          {/* Tabs */}
          <Tabs
            value={navIdx}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="simple tabs example"
          >
            {/* <Tab label="Inventory/Specs" disabled={isExecuting} /> */}
            {/* <Tab label="Optimized Cutlist" disabled={isExecuting} /> */}
            {/* <Tab label="Execute" /> */}
          </Tabs>

      
          <div style={{ display: "flex" }}>
         
          </div>
        </div>
      </AppBar>

      <TabPanel value={navIdx} index={0}></TabPanel>
      <TabPanel value={navIdx} index={1}></TabPanel>
      <TabPanel value={navIdx} index={2}></TabPanel>
    </Box>
  );
}
