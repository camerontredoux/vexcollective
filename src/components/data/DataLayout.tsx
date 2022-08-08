import { ActionIcon, Select } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
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
  const [hideDescription, setHideDescription] = useState(false);

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
            <>
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold break-all mr-4">
                  {DestinyOpenAPI.paths[value as OpenAPIKeys].summary}
                </h1>
                <ActionIcon
                  onClick={() => setHideDescription(!hideDescription)}
                  variant="default"
                >
                  {hideDescription ? (
                    <IconChevronDown size={16} />
                  ) : (
                    <IconChevronUp size={16} />
                  )}
                </ActionIcon>
              </div>
              <h2 className="text-base text-gray-500 break-all">{value}</h2>
              {hideDescription ? null : (
                <p className="text-sm mt-4 text-gray-400">
                  {value &&
                    DestinyOpenAPI.paths[value as OpenAPIKeys].description}
                </p>
              )}
            </>
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
