import React from "react";
import { RoutePages } from "./pages";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Navbar from "./components/navbar/navbar";

import "./App.css";

function App() {
  return (
    <MantineProvider>
      <Navbar />
      <RoutePages />
    </MantineProvider>
  );
}

export default App;
