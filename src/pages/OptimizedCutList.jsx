// import React from "react";
import { Box, Container } from "@mui/material";
// import ConnectionsSetup from "../components/ConnectionsSetup";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
// import BootstrapTooltip from "../components/BootstrapTooltip";
// import { useNavigate } from "react-router-dom";

const OptimizedCutList = () => {
//   const navigate = useNavigate();

//   function handleClick() {
//     navigate("/home");
//   }
  return (
    <>
      <Container>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minHeight: "90vh",
            textAlign: "center",
          }}
        >
          <Box sx={{ marginTop: "20px" }}>
            <ArrowCircleRightIcon
              sx={{ opacity: 0 }}
              color="primary"
              fontSize="large"
            />
           
            <h1>Optimized Cutlist</h1>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default OptimizedCutList;
