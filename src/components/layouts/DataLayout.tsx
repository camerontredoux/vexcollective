import {
  EndpointNames,
  PathDefinitions,
  pathDefinitions,
} from "@/utils/endpoints";
import { useDataStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { ActionIcon, Loader, Select, Text, TextInput } from "@mantine/core";
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
  const entity = trpc.useMutation("destiny.entityDefinition");

  const setData = useDataStore((state) => state.setData);

  const handleChange = async (val: string | null) => {
    setValue(val);

    if (!val) {
      setData(null);
      return;
    }

    mutate();
    entity.mutate({
      entityType: "DestinyNodeStepSummaryDefinition",
      hashIdentifier: 19519556,
    });

    // if (val) {
    //   router.push({
    //     pathname: "/data/[endpoint]",
    //     query: { endpoint: DestinyOpenAPI.paths[val as OpenAPIKeys].summary },
    //   });
    // }
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
          data={pathDefinitions}
          value={value}
          onChange={handleChange}
        />
      </div>

      {value ? (
        <div className="drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark w-full rounded-md">
          <div className="flex flex-col p-8 backdrop-brightness-75 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold break-all mr-4">
                {PathDefinitions[value]?.label}
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
                  <p className="text-sm mt-4 text-gray-400 pb-4 border-b border-gray-mantine-dark">
                    {PathDefinitions[value]?.desc.description}
                  </p>

                  {PathDefinitions[value]!.params.length > 0 && (
                    <>
                      <h2 className="text-lg mt-2 mb-2">Parameters</h2>
                      <div className="flex gap-2">
                        {PathDefinitions[value]?.params.map((param) => {
                          return (
                            <div
                              key={param.name}
                              className="flex flex-col w-full"
                            >
                              <TextInput
                                required={param.required}
                                label={param.name}
                              />
                              <Text size="xs">{param.description}</Text>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
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
