import { Select } from "@mantine/core";
import Head from "next/head";
import DataTreeView from "../../components/DataTreeView";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DataLayoutProps {
  data: any;
  title: string;
  description: string;
}

const DataLayout: React.FC<DataLayoutProps> = ({
  data,
  title,
  description,
}) => {
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
          radius={"sm"}
          size="md"
          placeholder="Manifest"
          searchable
          clearable
          nothingFound="No endpoint found"
          maxDropdownHeight={280}
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          data={[
            { value: "Manifest", label: "Manifest", group: "Destiny2" },
            { value: "GetStats", label: "GetStats", group: "Destiny2" },
            { value: "GetFireteam", label: "GetFireteam", group: "User" },
            { value: "GetUser", label: "GetUser", group: "User" },
            { value: "GetUser", label: "GetUser", group: "User" },
            { value: "GetUser", label: "GetUser", group: "User" },
          ]}
        />
      </div>
      <div className="drop-shadow-md bg-[#25262b] border border-[#373A40] w-full rounded-md">
        <div className="w-full h-full flex flex-col p-8 drop-shadow-lg backdrop-brightness-75 rounded-md overflow-hidden">
          <h1 className="text-2xl font-bold capitalize">{title}</h1>
          <p className="text-lg mt-1">{description}</p>
        </div>
      </div>
      {data && <DataTreeView data={data} />}
    </>
  );
};

export default DataLayout;
