declare var __MAP_ACCESS_TOKEN__: string;

interface Feature {
  geometry: {
    coordinates: [number, number];
    type: "Point";
  };
  id: string;
  properties: {
    alert?: string;
    cdi?: number;
    code: string;
    detail: string;
    dmin: number;
    felt?: number;
    gap: number;
    ids: string;
    mag: number;
    magType: string;
    mmi?: number;
    net: string;
    nst?: number;
    place: string;
    rms: number;
    sig: number;
    sources: string;
    status: string;
    time: number;
    title: string;
    tsunami: 0;
    type: string;
    types: string;
    tz: number;
    updated: number;
    url: string;
  };
  type: "Feature";
}

interface FeatureCollection {
  bbox: number[];
  features: Feature[];
  metadata: {
    api: string;
    count: number;
    generated: number;
    status: number;
    title: "USGS Earthquakes";
    url: string;
  };
  type: "FeatureCollection";
}
