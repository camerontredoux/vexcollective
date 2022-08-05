import { NextPage } from "next/types";
import { JSONTree } from "react-json-tree";
import openapi from "../../schemas/openapi.json";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Data: NextPage = () => {
  const paths = openapi.paths;

  const destiny2Paths = Object.keys(paths).filter((path) =>
    path.startsWith("/Destiny2")
  );

  return (
    <div>
      <JSONTree data={paths} />
      <JSONTree
        data={openapi.components.schemas["Destiny.Config.DestinyManifest"]}
      />
    </div>
  );
};

export default Data;
