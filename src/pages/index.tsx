import { trpc } from "@/utils/trpc";
import {
  ActionIcon,
  Alert,
  Button,
  Code,
  SegmentedControl,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle, IconSearch } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPlaystation, FaSteam, FaXbox } from "react-icons/fa";
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
  const [account, setAccount] = useState("");
  const [membershipType, setMembershipType] = useState("1");

  const searchMutation = trpc.useMutation("destiny.search");

  const theme = useMantineTheme();
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (account) {
      const [displayName, displayNameCode] = account.split("#");

      if (displayName && displayNameCode) {
        const { json } = await searchMutation.mutateAsync({
          displayNameCode,
          displayName,
          membershipType,
        });

        if (json.Response.length > 0) {
          router.push(
            `/stats/${membershipType}/${json.Response[0].membershipId}`
          );
        }
      }
    }
  };

  const rightSection = (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <SegmentedControl
        size="xs"
        onChange={setMembershipType}
        value={membershipType}
        data={[
          { label: <FaXbox size={18} />, value: "1" },
          { label: <FaPlaystation size={18} />, value: "2" },
          { label: <FaSteam size={18} />, value: "3" },
        ]}
      />
      <ActionIcon type="submit">
        <IconSearch color={theme.colors.gray[4]} size={16} />
      </ActionIcon>
    </div>
  );

  return (
    <>
      <div className="w-full rounded-md mt-6 sm:mt-0">
        <form onSubmit={handleSearch}>
          <TextInput
            onChange={(e) => setAccount(e.target.value)}
            radius={"sm"}
            size="md"
            placeholder="Cameron#0370"
            rightSectionWidth={145}
            rightSection={rightSection}
          />
        </form>
      </div>
      <div>
        <Alert
          icon={<IconAlertCircle size={18} />}
          title="Attention!"
          color="indigo"
        >
          <p className="mb-2">
            If you don&apos;t have an account, you can either search for{" "}
            <Code className="text-sm" color="indigo">
              Cameron#0370
            </Code>{" "}
            or press the button below.
          </p>
          <Button className="mb-1" color="indigo" variant="outline" size="xs">
            <Link href={"/stats/3/4611686018480403495"}>Search</Link>
          </Button>
        </Alert>
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

export default Home;
