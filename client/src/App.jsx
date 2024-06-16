import React from "react";
import { Provider } from "react-redux";
import { RoutePages } from "./pages";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Navbar from "./components/navbar/navbar";
import { store } from "./store/store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Navbar />
        <RoutePages />
      </MantineProvider>
    </Provider>
  );
}

export default App;
