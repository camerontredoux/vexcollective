import DataTreeView from "@/components/DataTreeView";
import { useManifestStore } from "@/utils/stores";
import { NextPageWithLayout } from "./_app";

const Example: NextPageWithLayout = () => {
  const manifest = useManifestStore((state) => state.manifest);
  return (
    <div className="flex flex-col gap-2">
      <DataTreeView data={manifest} expand={false} />
    </div>
  );
};

export default Example;
