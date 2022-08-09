import Layout from "../../components/layouts/Layout";
import { NextPageWithLayout } from "../_app";

const Endpoint: NextPageWithLayout = () => {
  return <></>;
};

Endpoint.getLayout = (page) => <Layout>{page}</Layout>;

export default Endpoint;
