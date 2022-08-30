import { getParamType } from "@/utils/endpoints";
import { ActionIcon, Collapse, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Icon3dCubeSphere } from "@tabler/icons";
import { ParameterObject } from "openapi3-ts/dist/mjs/model/OpenApi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ParameterInput: React.FC<{
  param: ParameterObject;
  setParams: Dispatch<SetStateAction<{ [key: string]: string } | null>>;
  setQueries: Dispatch<SetStateAction<{ [key: string]: string } | null>>;
}> = ({ param, setParams, setQueries }) => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 200);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (param.in === "path") {
      setParams((old: any) => ({ ...old, [param.name]: debounced }));
    } else {
      setQueries((old: any) => ({ ...old, [param.name]: debounced }));
    }
  }, [debounced, param, setParams, setQueries]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <TextInput
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

export default ParameterInput;
