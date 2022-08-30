import { ActionIcon, Collapse, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Icon3dCubeSphere } from "@tabler/icons";
import { SchemaObject } from "openapi3-ts/dist/mjs/model/OpenApi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const RequestBodyInput: React.FC<{
  param: [string, SchemaObject];
  setBody: Dispatch<SetStateAction<{ [key: string]: string } | null>>;
}> = ({ param, setBody }) => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 200);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setBody((old: any) => ({ ...old, [param[0]]: debounced }));
  }, [debounced, setBody, param]);

  const name = param[0];
  const schema = param[1];

  return (
    <div className="flex flex-col gap-2 w-full">
      <TextInput
        rightSection={
          schema.description && (
            <ActionIcon onClick={() => setOpened((o) => !o)}>
              <Icon3dCubeSphere size={18} strokeWidth={1.5} />
            </ActionIcon>
          )
        }
        onChange={handleChange}
        required={schema.required ? true : false}
        label={name}
        placeholder={schema.type}
      />
      {schema.description && (
        <Collapse in={opened}>
          <div className="text-start text-sm">{schema.description}</div>
        </Collapse>
      )}
    </div>
  );
};

export default RequestBodyInput;
