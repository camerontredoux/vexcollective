import openapi from "../schemas/openapi.json";

export type Tag = "User" | "Content" | "GroupV2" | "Destiny2" | "Trending";

export type OpenAPIKeys = keyof typeof openapi.paths;

export type OpenAPI = {
  [key in keyof typeof openapi]: typeof openapi[key];
};

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
    description: DestinyOpenAPI.paths[endpoint].description,
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
