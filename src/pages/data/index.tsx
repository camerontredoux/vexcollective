import { ReactElement } from "react";
import DataLayout from "../../components/layouts/DataLayout";
import Layout from "../../components/layouts/Layout";
import { NextPageWithLayout } from "../_app";

const Data: NextPageWithLayout = () => {
  return <></>;
};

Data.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DataLayout>{page}</DataLayout>
    </Layout>
  );
};

export default Data;
