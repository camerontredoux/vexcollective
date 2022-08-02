import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
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
        className="flex flex-col sm:flex-row m-8"
      >
        <Navbar />
        <div className="flex flex-1 flex-col gap-4">
          <div className="w-full rounded-md mt-6 sm:mt-2">
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
          <div className="drop-shadow-md bg-center bg-cover bg-[url('/hero-wallpaper.jpg')] w-full rounded-md overflow-hidden">
            <div className="w-full h-full flex flex-col backdrop-blur-sm p-8 drop-shadow-lg backdrop-brightness-75">
              <h1 className="text-4xl font-bold">The Vex Collective Mind...</h1>
              <p className="text-xl mt-1">...has some information for you...</p>
              <br />
              <p className="text-gray-400 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-300 to-sky-500 font-medium">
                Hello there! Welcome to the Vex Collective. Please login to
                access private information about your Destiny 2 characters.
                Otherwise, type your Bungie name in the search bar to view
                public information.
              </p>
            </div>
          </div>
          <div className="bg-black w-full rounded-md p-8">
            <div>
              <h1 className="text-4xl font-bold">Features</h1>
              <p className="text-xl mt-1">Tools at your disposal</p>
              <br />
              <div className="flex gap-2 flex-wrap">
                <p className="feature-item">Radar Charts</p>
                <p className="feature-item">Activity Heatmaps</p>
                <p className="feature-item">Kill Graphs</p>
                <p className="feature-item">Inventory Viewer</p>
                <p className="feature-item">Aggression Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
