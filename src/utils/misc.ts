import { HttpClientConfig } from "bungie-api-ts/http";

export const stringOrNull = (str: unknown) => {
  if (typeof str === "string") {
    return str;
  }

  return null;
};

export const httpClient = async (config: HttpClientConfig) => {
  return fetch(config.url, config)
    .then((res) => res.json())
    .catch((e) => console.error(e));
};
