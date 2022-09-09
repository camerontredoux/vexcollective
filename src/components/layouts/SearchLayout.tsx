import { trpc } from "@/utils/trpc";
import {
  ActionIcon,
  SegmentedControl,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { FaPlaystation } from "@react-icons/all-files/fa/FaPlaystation";
import { FaSteam } from "@react-icons/all-files/fa/FaSteam";
import { FaXbox } from "@react-icons/all-files/fa/FaXbox";
import { IconSend } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SearchLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [account, setAccount] = useState("");
  const searchMutation = trpc.useMutation("destiny.search");
  const theme = useMantineTheme();
  const router = useRouter();
  const [membershipType, setMembershipType] = useState("1");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (account) {
      const [displayName, displayNameCode] = account.split("#");

      if (displayName && displayNameCode) {
        const { json } = await searchMutation.mutateAsync({
          displayNameCode,
          displayName,
          membershipType,
        });

        if (json.Response.length > 0) {
          router.push(
            `/stats/${membershipType}/${json.Response[0].membershipId}`
          );
        }
      }
    }
  };

  const rightSection = (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <SegmentedControl
        size="xs"
        onChange={setMembershipType}
        value={membershipType}
        data={[
          { label: <FaXbox size={18} />, value: "1" },
          { label: <FaPlaystation size={18} />, value: "2" },
          { label: <FaSteam size={18} />, value: "3" },
        ]}
      />
      <ActionIcon color={theme.colors.blue![2]} type="submit">
        {/* <IconSearch size={18} /> */}
        <IconSend size={18} />
      </ActionIcon>
    </div>
  );
  return (
    <>
      <div className="w-full rounded-md">
        <form onSubmit={handleSearch}>
          <TextInput
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setAccount(e.target.value)}
            radius={"sm"}
            size="md"
            placeholder="Cameron#0370"
            rightSectionWidth={145}
            rightSection={rightSection}
          />
        </form>
      </div>
      {children}
    </>
  );
};

export default SearchLayout;
