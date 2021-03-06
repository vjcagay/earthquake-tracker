import React, { useLayoutEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import dateToISO from "./utils/dateToISO";
import getTimeZone from "./utils/getTimeZone";
import Dialog from "./components/Dialog";
import Map from "./components/Map";

const GlobalStyle = createGlobalStyle`
  :root {
    --background-primary: rgba(250, 250, 250, 0.9);
    --background-secondary: #ebebeb;
    --background-selected: rgba(170, 170, 170, 0.25);
    --color-primary: #000000;
    --color-secondary: #868686;
    --border-primary: #d2d2d2;
    --border-secondary: #e6e6e6;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background-primary: rgba(50, 50, 50, 0.9);
      --background-secondary: #464646;
      --background-selected: rgba(170, 170, 170, 0.25);
      --color-primary: #ffffff;
      --color-secondary: #aaaaaa;
      --border-primary: #7f7f7f;
      --border-secondary: #505050;
    }
  }

  * {
    font-family: Inter;
  }

  body {
    background: black;
  }
`;

const Container = styled.div`
  height: 100vh;
  position: relative;
`;

const MapStyled = styled(Map)`
  height: 100%;
`;

const DialogStyled = styled(Dialog)`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 350px;
  height: 500px;
  z-index: 2;
`;

const fetchFeatures = async (ISODate: string): Promise<Feature[]> => {
  const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query";
  const format = "format=geojson";
  const startTime = `starttime=${ISODate}T00:00:00${encodeURIComponent(getTimeZone())}`;
  const endTime = `endtime=${ISODate}T23:59:59${encodeURIComponent(getTimeZone())}`;
  const minMagnitude = "minmagnitude=3";

  const results = await fetch(`${baseUrl}?${format}&${startTime}&${endTime}&${minMagnitude}`);

  const json: FeatureCollection = await results.json();

  return json.features;
};

const App = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState({
    id: "",
    centerMap: false,
  });
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setFeatures([]);
    setFeatures(await fetchFeatures(dateToISO(date)));
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchData();
  }, [date]);

  const onFeatureSelect = (feature: { id: string; centerMap: boolean }) => setSelectedFeature(feature);

  return (
    <>
      <GlobalStyle />
      <Container>
        <MapStyled features={features} selectedFeature={selectedFeature} onFeatureSelect={onFeatureSelect} />
        <DialogStyled
          features={features}
          loading={loading}
          onDateChange={(date) => setDate(date)}
          selectedFeature={selectedFeature}
          onFeatureSelect={onFeatureSelect}
        />
      </Container>
    </>
  );
};

export default App;
