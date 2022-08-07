import { ReactElement } from "react";
import useSWR from "swr";
import DataLayout from "../../components/data/DataLayout";
import Layout from "../../components/layouts/Layout";
import {
  createEndpoints,
  destinyAPISchema,
  OpenAPIKeys,
} from "../../utils/endpoints";
import { NextPageWithLayout } from "../_app";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const destiny2Endpoints = createEndpoints("Destiny2");

const destiny2Data = destiny2Endpoints.map((endpoint) => ({
  label: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  value: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  group: "Destiny2",
}));

const userEndpoints = createEndpoints("User");

const userData = userEndpoints.map((endpoint) => ({
  label: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  value: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  group: "User",
}));

const contentEndpoints = createEndpoints("Content");

const contentData = contentEndpoints.map((endpoint) => ({
  label: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  value: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  group: "Content",
}));

const groupV2Endpoints = createEndpoints("GroupV2");

const groupV2Data = groupV2Endpoints.map((endpoint) => ({
  label: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  value: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  group: "GroupV2",
}));

const trendingEndpoints = createEndpoints("Trending");

const trendingData = trendingEndpoints.map((endpoint) => ({
  label: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  value: destinyAPISchema.paths[endpoint as OpenAPIKeys].summary,
  group: "Trending",
}));

const endpoints = [
  ...destiny2Data,
  ...userData,
  ...contentData,
  ...groupV2Data,
  ...trendingData,
];

const Endpoint: NextPageWithLayout = () => {
  const { data, isValidating, error } = useSWR(`/api/manifest`, fetcher, {
    revalidateOnFocus: false,
  });

  if (isValidating) {
    return (
      <DataLayout
        endpoints={endpoints}
        data={null}
        title="Loading..."
        description="Loading..."
      />
    );
  }

  if (data) {
    return (
      <DataLayout
        endpoints={endpoints}
        data={data}
        title={"Manifest"}
        description={"Example"}
      />
    );
  }

  return (
    <DataLayout
      endpoints={endpoints}
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
