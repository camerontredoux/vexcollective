import { motion } from "framer-motion";
import Head from "next/head";
import DataTreeView from "../../components/DataTreeView";
import Navbar from "../Navbar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ManifestProps {
  data: any;
  title: string;
  description: string;
}

const DataLayout: React.FC<ManifestProps> = ({ data, title, description }) => {
  return (
    <>
      <Head>
        <title>Vex Collective</title>
        <meta
          name="description"
          content="Visualize statistics for your Destiny 2 characters"
        />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-screen flex flex-col p-8 sm:flex-row"
      >
        <Navbar />
        <div className="flex flex-1 flex-col gap-4">
          <div className="w-full rounded-md mt-6 sm:mt-0">
            <form className="flex justify-between">
              <input
                className="placeholder:text-base xs:placeholder:text-base rounded-l-md focus:outline-0 py-2 pl-4 w-full bg-zinc-800 placeholder:text-zinc-600 focus:placeholder:text-zinc-500 text-zinc-500"
                type="text"
                placeholder="Cameron#0370"
              />
              <button
                className="text-xs xs:text-base p-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-600 rounded-r-md"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div className="drop-shadow-md bg-black bg-center bg-cover bg-[url('/hero-wallpaper.jpg')] w-full rounded-md">
            <div className="w-full h-full flex flex-col backdrop-blur-sm p-8 drop-shadow-lg backdrop-brightness-75 rounded-md overflow-hidden">
              <h1 className="text-4xl font-bold capitalize">{title}</h1>
              <p className="text-xl mt-1">{description}</p>
            </div>
          </div>
          {data && <DataTreeView data={data} />}
        </div>
      </motion.div>
    </>
  );
};

export default DataLayout;
