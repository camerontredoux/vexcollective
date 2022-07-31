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
        <div className="bg-black w-full rounded-md p-8 flex-1 mt-6 sm:mt-0">
          <h1 className="text-4xl font-bold">The Vex Collective Mind...</h1>
          <p className="text-xl mt-4">...has some information for you...</p>
          <br />
          <p className="text-gray-400 mt-4">
            Hello there! Welcome to the Vex Collective. Please login to access
            private information about your Destiny 2 characters. Otherwise, type
            your gamertag in the search bar to view public information.
          </p>
          <br />
          <form className="mt-8 flex justify-between">
            <input
              className="placeholder:text-xs xs:placeholder:text-base rounded-l-md focus:outline-0 p-2 w-full bg-zinc-800 placeholder:text-zinc-600 hover:bg-zinc-900"
              type="text"
              placeholder="Cameron#0370"
            />
            <button
              className="text-xs xs:text-base p-2 bg-sky-700 hover:bg-sky-600 active:bg-sky-700 rounded-r-md"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
