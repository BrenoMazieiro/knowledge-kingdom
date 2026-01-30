export const env = {
  API_URL: import.meta.env.VITE_API_URL as string ?? '/graphql',
  WS_URL: import.meta.env.VITE_WS_URL as string ?? `ws://${window.location.host}/graphql`,
};
