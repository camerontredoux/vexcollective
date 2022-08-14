import { useDataStore } from "@/utils/stores";
import DataTreeView from "src/components/DataTreeView";
import DataLayout from "../../components/layouts/DataLayout";
import { NextPageWithLayout } from "../_app";

const Endpoint: NextPageWithLayout = () => {
  const data = useDataStore((state) => state.data);

  return <>{data ? <DataTreeView data={data} /> : null}</>;
};

Endpoint.getLayout = (page) => {
  return <DataLayout>{page}</DataLayout>;
};

export default Endpoint;
