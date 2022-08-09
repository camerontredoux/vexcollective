import { useDataStore } from "@/utils/stores";
import DataTreeView from "src/components/DataTreeView";
import DataLayout from "../../components/layouts/DataLayout";
import Layout from "../../components/layouts/Layout";
import { NextPageWithLayout } from "../_app";

const Endpoint: NextPageWithLayout = () => {
  const data = useDataStore((state) => state.data);

  return <>{data ? <DataTreeView data={data} /> : null}</>;
};

Endpoint.getLayout = (page) => {
  return (
    <Layout>
      <DataLayout>{page}</DataLayout>
    </Layout>
  );
};

export default Endpoint;
