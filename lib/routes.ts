export const buildViewRoute = (id: string) =>
  `/views/${encodeURIComponent(id)}`;

export const buildObjectRoute = (type: string, id: string) =>
  `/objects/${encodeURIComponent(type)}/${encodeURIComponent(id)}`;
