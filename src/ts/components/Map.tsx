import MapboxGL from "mapbox-gl";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";

interface Props {
  className?: string;
}

MapboxGL.accessToken = __MAP_ACCESS_TOKEN__;

const Map = (props: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const map = new MapboxGL.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/dark-v10",
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

    map.addControl(
      new MapboxGL.NavigationControl({
        showZoom: true,
      }),
      "bottom-right"
    );

    return () => map.remove();
  });

  return <div className={props.className} ref={container} />;
};

export default Map;
