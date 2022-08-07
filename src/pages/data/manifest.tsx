import { ReactElement } from "react";
import useSWR from "swr";
import DataLayout from "../../components/data/DataLayout";
import Layout from "../../components/layouts/Layout";
import { NextPageWithLayout } from "../_app";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const endpoints = {
  manifest: {
    title: "Manifest",
    description:
      "This is the external-facing contract for just the properties needed by those calling the Destiny Platform.",
  },
};

const Endpoint: NextPageWithLayout = () => {
  const { data, isValidating, error } = useSWR(`/api/manifest`, fetcher, {
    revalidateOnFocus: false,
  });

  if (isValidating) {
    return (
      <DataLayout
        data={null}
        title={"Manifest"}
        description={endpoints.manifest.description}
      />
    );
  }

  if (data) {
    return (
      <DataLayout
        data={data}
        title={"Manifest"}
        description={endpoints.manifest.description}
      />
    );
  }

  return (
    <DataLayout
      data={null}
      title={"Error"}
      description={"Could not locate the API endpoint"}
    />
  );
};

Endpoint.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Endpoint;
