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
      <div className="flex m-8">
        <Navbar />
        <div className="bg-black w-full">Example stuff</div>
      </div>
    </>
  );
};

export default Home;
