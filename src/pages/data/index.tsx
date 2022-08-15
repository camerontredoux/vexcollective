import { useDataStore } from "@/utils/stores";
import { ReactElement } from "react";
import DataLayout from "../../components/layouts/DataLayout";
import { NextPageWithLayout } from "../_app";

const Data: NextPageWithLayout = () => {
  const setValue = useDataStore((store) => store.setValue);

  setValue(null);

  return <></>;
};

Data.getLayout = function getLayout(page: ReactElement) {
  return <DataLayout>{page}</DataLayout>;
};

export default Data;
