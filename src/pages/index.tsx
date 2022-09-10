import SearchLayout from "@/components/layouts/SearchLayout";
import { Alert, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
import { NextPageWithLayout } from "./_app";

import Layout from "@/components/layouts/Layout";
import { ResponsiveRadar } from "@nivo/radar";

const features = {
  "Radar Charts": (
    <div className="text-black h-full w-full flex-1 absolute">
      <ResponsiveRadar
        theme={{
          textColor: "white",
        }}
        data={[
          {
            taste: "fruity",
            chardonay: 39,
            carmenere: 109,
            syrah: 112,
          },
          {
            taste: "bitter",
            chardonay: 37,
            carmenere: 111,
            syrah: 75,
          },
          {
            taste: "heavy",
            chardonay: 28,
            carmenere: 74,
            syrah: 96,
          },
          {
            taste: "strong",
            chardonay: 27,
            carmenere: 89,
            syrah: 88,
          },
          {
            taste: "sunny",
            chardonay: 29,
            carmenere: 35,
            syrah: 34,
          },
        ]}
        keys={["chardonay", "carmenere", "syrah"]}
        indexBy="taste"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        dotSize={10}
        gridShape="linear"
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "pastel1" }}
        blendMode="multiply"
        motionConfig="wobbly"
      />
    </div>
  ),
  "Activity Heatmaps": <div>Test</div>,
  "Kill Graphs": <div>Test</div>,
  "Inventory Viewer": <div>Test</div>,
};

type Features = keyof typeof features;

const Home: NextPageWithLayout = () => {
  const [feature, setFeature] = useState("Radar Charts");

  return (
    <>
      <Alert
        icon={<IconAlertCircle size={18} />}
        title="Attention!"
        color="indigo"
      >
        <p className="mb-2">
          If you don&apos;t have an account, you can click the buttons below to
          see some examples.
        </p>
        <div className="flex gap-2">
          <Link href={"/stats/3/4611686018480403495"}>
            <Button className="mb-1" color="indigo" variant="outline" size="xs">
              Cameron#0370
            </Button>
          </Link>
          <Link href={"/stats/3/4611686018468168710"}>
            <Button className="mb-1" color="indigo" variant="outline" size="xs">
              Wigot#5660
            </Button>
          </Link>
        </div>
      </Alert>
      <div className="drop-shadow-md bg-black bg-center bg-cover bg-[url('/hero-wallpaper.jpg')] w-full rounded-md">
        <div className="w-full h-full flex flex-col p-8 drop-shadow-lg rounded-md overflow-hidden">
          <h1 className="text-4xl font-bold">The Vex Collective Mind...</h1>
          <p className="text-xl mt-1">...has some information for you...</p>
          <p className="text-gray-400 mt-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-300 to-sky-500 font-medium">
            Hello there! Welcome to the Vex Collective. Please login to access
            private information about your Destiny 2 characters. Otherwise, type
            your Bungie name in the search bar to view public information.
          </p>
        </div>
      </div>
      <div className="drop-shadow-md bg-gray-mantine-dark-100 border border-gray-mantine-dark rounded-md">
        <div className=" p-8 rounded-md">
          <h1 className="text-4xl font-bold">Features</h1>
          <p className="text-xl mt-1">Click each one to see an example</p>

          <ul className="mt-6 flex gap-2 flex-wrap select-none">
            {Object.keys(features).map((feature, index) => (
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
      <div className="drop-shadow-md bg-gray-mantine-dark-100 border rounded-md border-gray-mantine-dark">
        <div className="p-8 rounded-md">
          <h1 className="text-4xl font-bold">{feature}</h1>
          <p className="text-xl mt-1">Tools at your disposal</p>
          <div className="mt-4 h-80 relative">
            {features[feature as Features]}
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = (page) => {
  return (
    <Layout>
      <SearchLayout>{page}</SearchLayout>
    </Layout>
  );
};

export default Home;
