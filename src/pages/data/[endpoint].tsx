import { useRouter } from "next/router";
import { NextPage } from "next/types";
import useSWR from "swr";
import DataLayout from "../../components/data/DataLayout";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const endpoints = {
  manifest: {
    title: "Manifest",
    description:
      "This is the external-facing contract for just the properties needed by those calling the Destiny Platform.",
  },
};

const Endpoint: NextPage = () => {
  const router = useRouter();

  const endpoint = router.query["endpoint"];

  const { data, isValidating, error } = useSWR(`/api/${endpoint}`, fetcher, {
    revalidateOnFocus: false,
  });

  if (isValidating) {
    return (
      <DataLayout
        data={null}
        title={endpoint as string}
        description={"Loading..."}
      />
    );
  }

  if (data) {
    return (
      <DataLayout
        data={data}
        title={endpoints[endpoint].title}
        description={endpoints[endpoint].description}
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

export default Endpoint;
