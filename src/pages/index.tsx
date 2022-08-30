import SearchLayout from "@/components/layouts/SearchLayout";
import { Alert, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
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

  // const setManifest = useManifestStore((state) => state.setManifest);

  // useEffect(() => {
  //   (async () => {
  //     await manifestDbOld
  //       .open()
  //       .catch((err) => console.error(err.stack || err));

  //     if (manifestDbOld.stat) {
  //       const stat = await manifestDbOld.stat.toArray();

  //       const statMap = _.reduce(stat, (map, obj) => {
  //         map[obj.hash] = obj;
  //         return map;
  //       });

  //       setManifest(statMap);
  //     }
  //   })();
  // }, [setManifest]);

  return (
    <>
      <div>
        <Alert
          icon={<IconAlertCircle size={18} />}
          title="Attention!"
          color="indigo"
        >
          <p className="mb-2">
            If you don&apos;t have an account, you can click the buttons below
            to see some examples.
          </p>
          <div className="flex gap-2">
            <Link href={"/stats/3/4611686018480403495"}>
              <Button
                className="mb-1"
                color="indigo"
                variant="outline"
                size="xs"
              >
                Cameron#0370
              </Button>
            </Link>
            <Link href={"/stats/3/4611686018468168710"}>
              <Button
                className="mb-1"
                color="indigo"
                variant="outline"
                size="xs"
              >
                Wigot#5660
              </Button>
            </Link>
          </div>
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

Home.getLayout = (page) => {
  return <SearchLayout>{page}</SearchLayout>;
};

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {

//   return {
//     props: {},
//   };
// };

export default Home;
