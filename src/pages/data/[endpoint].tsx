import DataTreeView from "@/components/DataTreeView";
import DataLayout from "@/components/layouts/DataLayout";
import { getParamType, PathDefinitions } from "@/utils/endpoints";
import { useDataStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { ActionIcon, TextInput } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Endpoint: NextPageWithLayout = () => {
  const [hideDescription, setHideDescription] = useState(false);

  const value = useDataStore((state) => state.value);

  const { data, mutate, isLoading } = trpc.useMutation("destiny.manifest");
  const entity = trpc.useMutation("destiny.entityDefinition");

  const setData = useDataStore((state) => state.setData);

  useEffect(() => {
    setData(data?.manifest);
  }, [data, setData]);

  return (
    <>
      {value && (
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
                  <p className="text-sm mt-4 text-gray-400">
                    {PathDefinitions[value]?.desc.description}
                  </p>

                  {PathDefinitions[value]!.params.length > 0 && (
                    <>
                      <h2 className="text-lg mt-4 mb-2">Parameters</h2>
                      <div className="flex flex-col gap-2">
                        {PathDefinitions[value]?.params.map((param) => {
                          return (
                            <div
                              key={param.name}
                              className="flex flex-col gap-2 w-full"
                            >
                              <TextInput
                                required={param.required}
                                label={param.name}
                                placeholder={getParamType(param)}
                              />
                              <div className="text-start text-sm">
                                {param.description}
                              </div>
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
      )}
      {data && <DataTreeView data={data} />}
    </>
  );
};

Endpoint.getLayout = (page) => {
  return <DataLayout>{page}</DataLayout>;
};

export default Endpoint;
