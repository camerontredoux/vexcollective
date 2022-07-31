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
        <div className="bg-black w-full rounded-md p-8 flex-1">
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
        </div>
      </motion.div>
    </>
  );
};

export default Home;
