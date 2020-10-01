import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import Map from "./components/Map";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Inter;
  }
`;

const Container = styled.div`
  height: 100vh;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Map />
      </Container>
    </>
  );
};

export default App;
