import { AppBar, Container, Typography } from "@mui/material";
import React from "react";
import Home from "./Pages/Home";
import { HomeContextProvider } from "./Pages/HomeContext";

function App() {
  return (
    <HomeContextProvider>
      <Container maxWidth="md">
        <AppBar position="static" sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            FoodFellow
          </Typography>
        </AppBar>
        <Home />
      </Container>
    </HomeContextProvider>
  );
}

export default App;
