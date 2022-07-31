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
      <div className="flex flex-col sm:flex-row m-8">
        <Navbar />
        <div className="bg-black w-full rounded-md p-8 flex-1">
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff Example stuff Example stuff Example stuff Example stuff
          Example stuff
        </div>
      </div>
    </>
  );
};

export default Home;
