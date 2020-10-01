import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Inter;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
  </>
);

export default App;
