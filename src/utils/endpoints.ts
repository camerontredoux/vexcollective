import {
  isSchemaObject,
  OpenAPIObject,
  ParameterObject,
  PathItemObject,
  ReferenceObject,
  RequestBodyObject,
  SchemaObject,
  SchemasObject,
} from "openapi3-ts";
import _ from "underscore";
import openapi from "../schemas/openapi.json";

/*
A lot of this code is inspired by DestinyItemManager's bungie-api-ts library, but I wanted to figure it out myself.
*/

export const BungieAPI = openapi as OpenAPIObject;

const pathPairs = _.pairs(BungieAPI.paths) as [string, PathItemObject][];

const Destiny2Paths = pathPairs.filter(([path, pathItem]) =>
  pathItem.summary?.startsWith("Destiny2")
);

export const x = Destiny2Paths.map(([path, desc]) => {
  const method = desc.get ? "GET" : "POST";
  const methodObj = (desc.get ?? desc.post)!;
  const params = (methodObj.parameters || []) as ParameterObject[];
  const requestBody = methodObj.requestBody as RequestBodyObject;

  const ref = (
    requestBody?.content["application/json"]!.schema as ReferenceObject
  )?.$ref;

  const refName = ref?.slice(ref.lastIndexOf("/") + 1);
  const refObject = BungieAPI.components?.schemas![refName]! as SchemasObject;

  const properties = _.pairs(refObject?.properties!) as [
    string,
    SchemaObject
  ][];

  return {
    method,
    params,
    properties,
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

export const getParamType = (param: ParameterObject) => {
  if (isSchemaObject(param.schema!)) {
    return param.schema.type;
  }
};
