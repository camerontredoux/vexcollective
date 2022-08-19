import DataTreeView from "@/components/DataTreeView";
import DataLayout from "@/components/layouts/DataLayout";
import { getParamType, PathDefinitions } from "@/utils/endpoints";
import { useDataStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import { ActionIcon, Collapse, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  Icon3dCubeSphere,
  IconChevronDown,
  IconChevronUp,
  IconSend,
} from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ParameterObject, SchemaObject } from "openapi3-ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import _ from "underscore";
import { NextPageWithLayout } from "../_app";

const Endpoint: NextPageWithLayout = () => {
  const [hideDescription, setHideDescription] = useState(false);
  const router = useRouter();

  const { endpoint } = router.query;

  const value = useDataStore((state) => state.value);
  const setValue = useDataStore((state) => state.setValue);

  const getBungieMutation = trpc.useMutation("destiny.get");

  const setData = useDataStore((state) => state.setData);
  const data = useDataStore((state) => state.data);

  useEffect(() => {
    setValue(endpoint as string);
    setData(null);
    setParams(null);
  }, [endpoint, setValue, setData]);

  const handleSendRequest = async () => {
    let currentPath = PathDefinitions[endpoint as string]?.path;

    if (params) {
      _.forEach(Object.entries(params), ([key, value]) => {
        currentPath = currentPath?.replace(`{${key}}`, value);
      });
    }

    if (currentPath) {
      getBungieMutation.mutate({
        path: currentPath,
        method: PathDefinitions[endpoint as string]?.method!,
        pcgr: (value as string) === "Destiny2.GetPostGameCarnageReport",
      });
    }
  };

  const [path, setPath] = useState("");
  const [params, setParams] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    setPath(PathDefinitions[value as string]?.path!);
  }, [value]);

  useEffect(() => {
    setData(getBungieMutation.data?.json);
  }, [getBungieMutation.data?.json, setData]);

  return (
    <>
      {value && (
        <div className="drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark w-full rounded-md">
          <div className="flex flex-col p-8 backdrop-brightness-75 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold break-all mr-4">
                {PathDefinitions[value]?.label}
              </h1>
              <div className="flex gap-2">
                <ActionIcon
                  onClick={handleSendRequest}
                  color="blue"
                  variant="subtle"
                >
                  <IconSend size={16} />
                </ActionIcon>
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
            </div>
            <h2 className="text-base text-gray-500 break-all">
              <span className="font-medium">
                {PathDefinitions[value as string]?.method}:{" "}
              </span>
              {PathDefinitions[value as string]?.path}
            </h2>
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
                      <div className="flex items-center mt-4 mb-2">
                        <h2 className="text-lg mr-2">Parameters</h2>
                        <p className="flex items-center text-xs mt-1 text-gray-400">
                          Click
                          <span className="cursor-pointer mx-1 hover:text-gray-200">
                            <Icon3dCubeSphere size={18} strokeWidth={1.5} />
                          </span>
                          for more info.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {PathDefinitions[value]?.params.map((param, index) => {
                          return (
                            <ParameterInput
                              params={params}
                              setParams={setParams}
                              path={path}
                              setPath={setPath}
                              param={param}
                              key={index}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}

                  {PathDefinitions[value]!.properties.length > 0 && (
                    <>
                      <div className="flex items-center mt-4 mb-2">
                        <h2 className="text-lg mr-2">Request Body</h2>
                        <p className="flex items-center text-xs mt-1 text-gray-400">
                          Click
                          <span className="cursor-pointer mx-1 hover:text-gray-200">
                            <Icon3dCubeSphere size={18} strokeWidth={1.5} />
                          </span>
                          for more info.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {PathDefinitions[value]!.properties.map((param) => {
                          return (
                            <RequestBodyInput
                              name={param[0]}
                              param={param[1]}
                              key={param[0]}
                            />
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

const ParameterInput: React.FC<{
  param: ParameterObject;
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
  params: { [key: string]: string } | null;
  setParams: Dispatch<SetStateAction<{ [key: string]: string } | null>>;
}> = ({ param, path, setPath, params, setParams }) => {
  const oldPath = path;

  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 200);
  const [locked, setLocked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setParams((old: any) => ({ ...old, [param.name]: debounced }));
  }, [debounced, param.name, setParams]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <TextInput
        disabled={locked}
        rightSection={
          <ActionIcon onClick={() => setOpened((o) => !o)}>
            <Icon3dCubeSphere size={18} strokeWidth={1.5} />
          </ActionIcon>
        }
        onChange={handleChange}
        required={param.required}
        label={param.name}
        placeholder={getParamType(param)}
      />
      <Collapse in={opened}>
        <div className="text-start text-sm">{param.description}</div>
      </Collapse>
    </div>
  );
};

const RequestBodyInput: React.FC<{ param: SchemaObject; name: string }> = ({
  param,
  name,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <TextInput
        rightSection={
          param.description && (
            <ActionIcon onClick={() => setOpened((o) => !o)}>
              <Icon3dCubeSphere size={18} strokeWidth={1.5} />
            </ActionIcon>
          )
        }
        required={param.required ? true : false}
        label={name}
        placeholder={param.type}
      />
      {param.description && (
        <Collapse in={opened}>
          <div className="text-start text-sm">{param.description}</div>
        </Collapse>
      )}
    </div>
  );
};

Endpoint.getLayout = (page) => {
  return <DataLayout>{page}</DataLayout>;
};

export default Endpoint;
