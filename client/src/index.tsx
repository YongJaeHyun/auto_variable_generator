import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { hydrate, render } from "react-dom";

// hydrate 설정
const $root = document.getElementById("root") as HTMLElement;
const renderOrHydrate = $root.hasChildNodes() ? hydrate : render;

renderOrHydrate(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  $root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
