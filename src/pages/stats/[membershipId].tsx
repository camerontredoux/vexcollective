import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Report: React.FC = () => {
  const router = useRouter();

  const [membershipId, setMembershipId] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const { membershipId } = router.query;

    setMembershipId(membershipId as string);
  }, [router.isReady, router.query]);

  return <>{membershipId && membershipId}</>;
};

export default Report;
