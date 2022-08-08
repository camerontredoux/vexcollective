import { Select } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import DataTreeView from "../../components/DataTreeView";
import { DestinyOpenAPI, OpenAPIKeys } from "../../utils/endpoints";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DataLayoutProps {
  endpointNames: any[];
  data: any;
}

const DataLayout: React.FC<DataLayoutProps> = ({ endpointNames, data }) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    console.log(DestinyOpenAPI.paths[value as OpenAPIKeys]);
  }, [value]);

  return (
    <>
      <Head>
        <title>Vex Collective</title>
        <meta
          name="description"
          content="Visualize statistics for your Destiny 2 characters"
        />
      </Head>
      <div className="sm:mt-0 mt-6">
        <Select
          spellCheck={false}
          radius={"sm"}
          size="md"
          placeholder={endpointNames[0].label}
          clearable
          maxDropdownHeight={280}
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          data={endpointNames}
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark w-full rounded-md">
        <div className="flex flex-col p-8 backdrop-brightness-75 rounded-md">
          {value ? (
            <details>
              <summary>
                <h1 className="text-2xl font-bold break-all">
                  {DestinyOpenAPI.paths[value as OpenAPIKeys].summary}
                </h1>
                <h2 className="text-base text-gray-500 break-all">{value}</h2>
              </summary>
              <p className="text-sm mt-4 text-gray-400">
                {value &&
                  DestinyOpenAPI.paths[value as OpenAPIKeys].description}
              </p>
            </details>
          ) : (
            <h1 className="text-2xl font-bold break-all">Choose an endpoint</h1>
          )}
        </div>
      </div>
      {data && <DataTreeView data={data} />}
    </>
  );
};

export default DataLayout;
