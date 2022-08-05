import openapi from "../schemas/openapi.json";

export type Tag = "User" | "Content" | "GroupV2" | "Destiny2" | "Trending";

export type OpenAPIKeys = keyof typeof openapi.paths;

export type OpenAPI = {
  [key in keyof typeof openapi]: typeof openapi[key];
};

export const destinyAPISchema: OpenAPI = openapi;

export const createEndpoints = (tag: Tag) => {
  return Object.keys(destinyAPISchema.paths).filter((schema: string) =>
    destinyAPISchema.paths[schema as OpenAPIKeys].summary.startsWith(tag)
  );
};
