import { DestinyOpenAPI, EndpointNames, OpenAPIKeys } from "@/utils/endpoints";
import { useDataStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { ActionIcon, Loader, Select } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DataLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [hideDescription, setHideDescription] = useState(false);
  const router = useRouter();

  const { data, mutate, isLoading } = trpc.useMutation("destiny.manifest");

  const setData = useDataStore((state) => state.setData);

  const handleChange = async (val: string | null) => {
    setValue(val);

    if (!val) {
      setData(null);
      return;
    }

    mutate();

    if (val) {
      router.push({
        pathname: "/data/[endpoint]",
        query: { endpoint: DestinyOpenAPI.paths[val as OpenAPIKeys].summary },
      });
    }
  };

  useEffect(() => {
    setData(data?.manifest);
  }, [data, setData]);

  return (
    <>
      <div className="sm:mt-0 mt-6">
        <Select
          rightSection={isLoading ? <Loader size="xs" /> : null}
          spellCheck={false}
          radius={"sm"}
          size="md"
          placeholder={EndpointNames[0]!.label}
          clearable
          maxDropdownHeight={280}
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          data={EndpointNames}
          value={value}
          onChange={handleChange}
        />
      </div>

      {value ? (
        <div className="drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark w-full rounded-md">
          <div className="flex flex-col p-8 backdrop-brightness-75 rounded-md">
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
            <AnimatePresence>
              {!hideDescription && (
                <motion.div
                  className="overflow-hidden text-justify"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  <p className="text-sm mt-4 text-gray-400">
                    {DestinyOpenAPI.paths[value as OpenAPIKeys].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
};

export default DataLayout;
