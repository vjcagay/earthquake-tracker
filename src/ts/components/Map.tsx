import MapboxGL, { Map as MapboxMap, Marker } from "mapbox-gl";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  className?: string;
  features?: Feature[];
}

MapboxGL.accessToken = __MAP_ACCESS_TOKEN__;

let map: MapboxMap;

const Map = (props: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    map = new MapboxMap({
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

    return () => map?.remove();
  }, []);

  const [markers, setMarkers] = useState<Marker[]>([]);

  // Convert the features into markers that Mapbox understands
  useEffect(() => {
    if (map) {
      const newMarkers = props.features.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        const marker = new Marker().setLngLat([longitude, latitude]);
        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [props.features]);

  useEffect(() => {
    markers.forEach((marker) => marker.addTo(map));

    // For each new set of markers, remove old ones
    return () => markers.forEach((marker) => marker.remove());
  }, [markers]);

  return <div className={props.className} ref={container} />;
};

export default Map;
