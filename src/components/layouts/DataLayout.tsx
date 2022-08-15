import { PathDefinitions, pathDefinitions } from "@/utils/endpoints";
import { useDataStore } from "@/utils/stores";
import { Select } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const DataLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { value, setValue } = useDataStore();
  const router = useRouter();

  const handleChange = async (val: string | null) => {
    setValue(val);

    if (val) {
      router.push({
        pathname: "/data/[endpoint]",
        query: { endpoint: PathDefinitions[val]?.label },
      });
    }
  };

  return (
    <>
      <div className="sm:mt-0 mt-6">
        <Select
          spellCheck={false}
          radius={"sm"}
          size="md"
          placeholder="Destiny2.GetDestinyManifest"
          maxDropdownHeight={280}
          data={pathDefinitions}
          value={value}
          onChange={handleChange}
          searchable
        />
      </div>
      {children}
    </>
  );
};

export default DataLayout;
