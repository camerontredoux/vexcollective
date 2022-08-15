import { OpenAPIObject, ParameterObject, PathItemObject } from "openapi3-ts";
import _ from "underscore";
import openapi from "../schemas/openapi.json";

export type Tag = "User" | "Content" | "GroupV2" | "Destiny2" | "Trending";

export type OpenAPIKeys = keyof typeof openapi.paths;

export type OpenAPI = {
  [key in keyof typeof openapi]: typeof openapi[key];
};

export const openapiObject = openapi as OpenAPIObject;

const pathPairs = _.pairs(openapiObject.paths) as [string, PathItemObject][];

export const pathDefinitions = pathPairs.map(([path, desc]) => {
  const method = desc.get ? "GET" : "POST";
  const methodObj = (desc.get ?? desc.post)!;
  const params = (methodObj.parameters || []) as ParameterObject[];

  return {
    path,
    method,
    params,
    desc,
    label: desc.summary!,
    value: path,
    group: methodObj.tags![0] || "Core",
  };
});

export const PathDefinitions = _.reduce(
  pathDefinitions,
  (map, obj) => {
    map[obj.path] = obj;
    return map;
  },
  {} as { [key: string]: typeof pathDefinitions[0] }
);

console.dir(PathDefinitions);

const tags = _.groupBy(pathPairs, ([path, desc]) => {
  return (desc.get || desc.post)!.tags![0]!;
});

export const DestinyOpenAPI: OpenAPI = openapi;

const createEndpoints = (tag: Tag) => {
  return Object.keys(DestinyOpenAPI.paths).filter((endpoint) =>
    DestinyOpenAPI.paths[endpoint as OpenAPIKeys].summary.startsWith(tag)
  );
};

const createData = (endpoint: OpenAPIKeys, group: string) => {
  return {
    label: DestinyOpenAPI.paths[endpoint].summary,
    value: endpoint,
    group,
  };
};

const Destiny2 = createEndpoints("Destiny2");
const User = createEndpoints("User");
const Content = createEndpoints("Content");
const GroupV2 = createEndpoints("GroupV2");
const Trending = createEndpoints("Trending");

const Destiny2Data = Destiny2.map((endpoint) =>
  createData(endpoint as OpenAPIKeys, "Destiny2")
);

const UserData = User.map((endpoint) =>
  createData(endpoint as OpenAPIKeys, "User")
);

const ContentData = Content.map((endpoint) =>
  createData(endpoint as OpenAPIKeys, "Content")
);

const GroupV2Data = GroupV2.map((endpoint) =>
  createData(endpoint as OpenAPIKeys, "GroupV2")
);

const TrendingData = Trending.map((endpoint) =>
  createData(endpoint as OpenAPIKeys, "Trending")
);

export const EndpointNames = [
  ...Destiny2Data,
  ...UserData,
  ...ContentData,
  ...GroupV2Data,
  ...TrendingData,
];
