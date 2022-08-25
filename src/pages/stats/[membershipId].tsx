import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";

const Report: NextPageWithLayout = () => {
  const router = useRouter();

  const [membershipId, setMembershipId] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const { membershipId } = router.query;

    setMembershipId(membershipId as string);
  }, [router.isReady, router.query]);

  return (
    <>
      <div className="drop-shadow-md bg-gray-mantine-light border border-gray-mantine-dark rounded-md">
        <div className="backdrop-brightness-75 p-8 rounded-md">
          <h1 className="text-4xl font-bold">Features</h1>
          <p className="text-xl mt-1">Click each one to see an example</p>

          <ul className="mt-6 flex gap-2 flex-wrap select-none"></ul>
        </div>
      </div>
      <div className="drop-shadow-md bg-gray-mantine-light border rounded-md border-gray-mantine-dark">
        <div className="backdrop-brightness-75 p-8 rounded-md">
          <h1 className="text-4xl font-bold">{}</h1>
          <p className="text-xl mt-1">Tools at your disposal</p>
        </div>
      </div>
    </>
  );
};

export default Report;
