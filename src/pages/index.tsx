import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const [feature, setFeature] = useState("Radar Charts");

  const features = [
    "Radar Charts",
    "Activity Heatmaps",
    "Kill Graphs",
    "Inventory Viewer",
    "Aggression Analysis",
  ];

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
          <div className="drop-shadow-md bg-center bg-cover bg-[url('/hero-wallpaper.jpg')] w-full rounded-md overflow-hidden">
            <div className="w-full h-full flex flex-col backdrop-blur-sm p-8 drop-shadow-lg backdrop-brightness-75">
              <h1 className="text-4xl font-bold">The Vex Collective Mind...</h1>
              <p className="text-xl mt-1">...has some information for you...</p>
              <p className="text-gray-400 mt-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-sky-300 to-sky-500 font-medium">
                Hello there! Welcome to the Vex Collective. Please login to
                access private information about your Destiny 2 characters.
                Otherwise, type your Bungie name in the search bar to view
                public information.
              </p>
            </div>
          </div>
          <div className="bg-black w-full rounded-md p-8 drop-shadow-md">
            <div>
              <h1 className="text-4xl font-bold">Features</h1>
              <p className="text-xl mt-1">Click each one to see an example</p>

              <ul className="mt-6 flex gap-2 flex-wrap select-none">
                {features.map((feature, index) => (
                  <li
                    onClick={() => setFeature(feature)}
                    className="cursor-pointer feature-item"
                    key={index}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-black w-full rounded-md p-8 drop-shadow-md">
            <div>
              <h1 className="text-4xl font-bold">{feature}</h1>
              <p className="text-xl mt-1">Tools at your disposal</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
