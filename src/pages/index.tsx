import { Button, Checkbox, Modal, Space, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import Layout from "../components/layouts/Layout";
import { NextPageWithLayout } from "./_app";

const features = [
  "Radar Charts",
  "Activity Heatmaps",
  "Kill Graphs",
  "Inventory Viewer",
  "Aggression Analysis",
];

const Home: NextPageWithLayout = () => {
  const [feature, setFeature] = useState("Radar Charts");
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [account, setAccount] = useState("");
  const [debounced] = useDebouncedValue(account, 300);

  const router = useRouter();

  const rightSection = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        px={8}
        variant="default"
        onClick={() => setOpened(true)}
        size="xs"
      >
        Options
      </Button>
      {/* <ActionIcon onClick={() => setOpened(true)} variant="default">
        <IconSearch size={16}></IconSearch>
      </ActionIcon> */}
    </div>
  );

  const handleExampleAccountChecked = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(e.target.checked);
    if (checked) {
      router.push({ query: {} });
    } else {
      router.push({ query: { account: "4611686018480403495" } });
    }
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        onClose={() => setOpened(false)}
        opened={opened}
      >
        <Checkbox
          checked={checked}
          onChange={handleExampleAccountChecked}
          label="Use an example account?"
          value="example-account"
        />
        <Space h={"md"} />
        <TextInput
          disabled={checked}
          data-autofocus
          placeholder="Player Name"
        />
      </Modal>
      <div className="w-full rounded-md mt-6 sm:mt-0">
        <TextInput
          onChange={(e) => setAccount(e.target.value)}
          radius={"sm"}
          size="md"
          placeholder="Cameron#0370"
          rightSectionWidth={75}
          rightSection={rightSection}
          disabled={checked}
        />
      </div>
      <div className="drop-shadow-md bg-black bg-center bg-cover bg-[url('/hero-wallpaper.jpg')] w-full rounded-md">
        <div className="w-full h-full flex flex-col backdrop-blur-sm p-8 drop-shadow-lg backdrop-brightness-75 rounded-md overflow-hidden">
          <h1 className="text-4xl font-bold">The Vex Collective Mind...</h1>
          <p className="text-xl mt-1">...has some information for you...</p>
          <p className="text-gray-400 mt-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-300 to-sky-500 font-medium">
            Hello there! Welcome to the Vex Collective. Please login to access
            private information about your Destiny 2 characters. Otherwise, type
            your Bungie name in the search bar to view public information.
          </p>
        </div>
      </div>
      <div className="drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark rounded-md">
        <div className="backdrop-brightness-75 p-8 rounded-md">
          <h1 className="text-4xl font-bold">Features</h1>
          <p className="text-xl mt-1">Click each one to see an example</p>

          <ul className="mt-6 flex gap-2 flex-wrap select-none">
            {features.map((feature, index) => (
              <li
                onClick={() => setFeature(feature)}
                className="cursor-pointer feature-item"
                key={index}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-blue-300 via-sky-300 to-sky-500">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="drop-shadow-md bg-gray-mantine-light border rounded-md border-gray-mantine-dark">
        <div className="backdrop-brightness-75 p-8 rounded-md">
          <h1 className="text-4xl font-bold">{feature}</h1>
          <p className="text-xl mt-1">Tools at your disposal</p>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
