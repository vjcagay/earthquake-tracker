import MapboxGL, { Map as MapboxMap, Marker, Popup } from "mapbox-gl";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import dateToISO from "../utils/dateToISO";

interface Props {
  className?: string;
  features?: Feature[];
}

const Container = styled.div`
  &.mapboxgl-map {
    font: initial;
  }

  .mapboxgl-popup-content {
    background: rgba(238, 80, 61, 1);
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 1px 4px 0px rgba(0, 0, 0, 0.4);
    color: #ffffff;
  }

  .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    border-bottom-color: rgba(238, 80, 61, 1);
  }

  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    border-top-color: rgba(238, 80, 61, 1);
  }

  .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: rgba(238, 80, 61, 1);
  }

  .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: rgba(238, 80, 61, 1);
  }
`;

const createMarker = (magnitude: number) => {
  // We set that 50px is the biggest circle for the strongest earthquakes (mag: 10)
  // Then round to the nearest pixel size
  const size = Math.round((magnitude / 10) * 50);

  const el = document.createElement("div");
  el.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: rgba(238, 80, 61, 1);
    box-shadow: 0 1px 4px 0px rgba(0,0,0,0.4);
  `;
  return el;
};

const createPopup = ({ properties }: Feature) => {
  const popup = new Popup({ closeButton: false, offset: 15 });
  popup.setHTML(`
    <b style="display: block; font-size: 24px; text-align: center;">
      ${properties.mag}
    </b>
    <small style="display: block; text-align: center; margin: 8px 0;">
      ${properties.place}
    </small>
    <small style="display: block; text-align: center;">
      ${dateToISO(new Date(properties.time))} ${new Date(properties.time).toTimeString().split(" ")[0]}
    </small>
  `);
  return popup;
};

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
        const marker = new Marker({
          element: createMarker(feature.properties.mag),
        })
          .setLngLat(feature.geometry.coordinates)
          .setPopup(createPopup(feature));
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

  return <Container className={props.className} ref={container} />;
};

export default Map;
