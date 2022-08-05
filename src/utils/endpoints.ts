import openapi from "../schemas/openapi.json";

export type OpenAPIKeys = keyof typeof openapi.paths;

export type OpenAPI = {
  [key in keyof typeof openapi]: typeof openapi[key];
};

export const destinyAPISchema: OpenAPI = openapi;

export const createEndpoints = (tag: string) => {
  return Object.keys(destinyAPISchema.paths).filter((schema: string) =>
    destinyAPISchema.paths[schema as OpenAPIKeys].summary.startsWith(tag)
  );
};
