import MapboxGL from "mapbox-gl";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;

MapboxGL.accessToken = __MAP_ACCESS_TOKEN__;

const Map = () => {
  const container = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const map = new MapboxGL.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/light-v10",
    });

    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        map.setCenter([coords.longitude, coords.latitude]);
        map.setZoom(13);
      },
      () => {
        // If position is not granted default to zoomed-out view
        map.setCenter([0, 0]);
        map.setZoom(2);
      }
    );

    return () => map.remove();
  });

  return <Container ref={container} />;
};

export default Map;
