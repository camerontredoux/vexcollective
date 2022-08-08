import { ReactElement } from "react";
import useSWR from "swr";
import DataLayout from "../../components/data/DataLayout";
import Layout from "../../components/layouts/Layout";
import { EndpointNames } from "../../utils/endpoints";
import { NextPageWithLayout } from "../_app";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Endpoint: NextPageWithLayout = () => {
  const { data, isValidating, error } = useSWR(`/api/manifest`, fetcher, {
    revalidateOnFocus: false,
  });

  if (isValidating) {
    return <DataLayout endpointNames={EndpointNames} data={null} />;
  }

  if (data) {
    return <DataLayout endpointNames={EndpointNames} data={data} />;
  }

  return <DataLayout endpointNames={EndpointNames} data={null} />;
};

Endpoint.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Endpoint;
