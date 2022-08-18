import {
  isSchemaObject,
  OpenAPIObject,
  ParameterObject,
  PathItemObject,
} from "openapi3-ts";
import _ from "underscore";
import openapi from "../schemas/openapi.json";

/*
A lot of this code is inspired by DestinyItemManager's bungie-api-ts library.
*/

export const BungieAPI = openapi as OpenAPIObject;

const pathPairs = _.pairs(BungieAPI.paths) as [string, PathItemObject][];

const Destiny2Paths = pathPairs.filter(([path, pathItem]) =>
  pathItem.summary?.startsWith("Destiny2")
);

export const x = Destiny2Paths.map(([path, desc]) => {
  const methodObj = (desc.get ?? desc.post)!;
  const params = (methodObj.parameters || []) as ParameterObject[];

  return {
    params,
    desc,
    path,
    label: desc.summary!,
    value: desc.summary!,
    group: methodObj.tags![0] || "Core",
  };
});

export const pathDefinitions = _.sortBy(x, "group");

export const PathDefinitions = _.reduce(
  pathDefinitions,
  (map, obj) => {
    map[obj.value] = obj;
    return map;
  },
  {} as { [key: string]: typeof pathDefinitions[0] }
);

console.log(PathDefinitions);
export const getParamType = (param: ParameterObject) => {
  if (isSchemaObject(param.schema!)) {
    return param.schema.type;
  }
};

const tags = _.groupBy(pathPairs, ([path, desc]) => {
  return (desc.get || desc.post)!.tags![0]!;
});
