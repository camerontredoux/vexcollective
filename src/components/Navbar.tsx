import { useAuthStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import {
  Burger,
  Drawer,
  MediaQuery,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLAttributeAnchorTarget, useEffect, useState } from "react";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const context = trpc.useContext();

  const theme = useMantineTheme();

  const [state, setState] = useState("");

  const { authorized, setAuthorized } = useAuthStore();

  useEffect(() => {
    setState(window.sessionStorage.getItem("state") ?? "");
  }, []);

  return (
    <>
      <div className="flex justify-between text-gray-600">
        <Link href="/">
          <a className="flex items-center">
            <Logo width={27} />
            <h1 className="ml-2 font-bold uppercase text-gray-500">
              Vex Collective
            </h1>
          </a>
        </Link>
        <ul className="hidden sm:flex gap-4 items-center">
          <NavLink href="/data">
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-150">
              Data Explorer
            </div>
          </NavLink>
          {authorized ? (
            <li
              className="cursor-pointer"
              onClick={() => {
                window.localStorage.removeItem("token");
                setAuthorized(false);
                context.invalidateQueries();
                router.push("/");
              }}
            >
              Logout
            </li>
          ) : (
            <NavLink
              href={`https://www.bungie.net/en/OAuth/Authorize?client_id=40971&response_type=code&state=${state}`}
            >
              <span className="hover:text-gray-200">Authorize</span>
            </NavLink>
          )}
          <NavLink
            href="https://github.com/camerontredoux/vexcollective"
            target="_blank"
          >
            <span className="hover:text-gray-200">
              <IconBrandGithub size={20} />
            </span>
          </NavLink>
        </ul>
        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Burger
            color={theme.colors.gray![5]}
            size={14}
            opened={opened}
            onClick={() => setOpened(true)}
          />
        </MediaQuery>
      </div>

      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Drawer
          title={
            <Link href="/">
              <a
                className="flex items-center sm:mb-8"
                onClick={() => setOpened(false)}
              >
                <Logo width={27} />
                <h1 className="ml-2 font-bold uppercase text-gray-500">
                  Vex Collective
                </h1>
              </a>
            </Link>
          }
          overlayBlur={3}
          padding="lg"
          size="md"
          opened={opened}
          onClose={() => setOpened(false)}
        >
          <ul className="flex flex-col gap-1">
            <NavLink href="/data">
              <UnstyledButton
                onClick={() => setOpened(false)}
                className="unstyled-btn"
              >
                Data Explorer
              </UnstyledButton>
            </NavLink>
            <NavLink
              href={`https://www.bungie.net/en/OAuth/Authorize?client_id=40971&response_type=code&state=${state}`}
              target="_blank"
            >
              <UnstyledButton
                onClick={() => setOpened(false)}
                className="unstyled-btn"
              >
                {authorized ? "Logout" : "Authorize"}
              </UnstyledButton>
            </NavLink>
            <NavLink
              href="https://github.com/camerontredoux/vexcollective"
              target="_blank"
            >
              <UnstyledButton
                onClick={() => setOpened(false)}
                className="unstyled-btn"
              >
                GitHub
              </UnstyledButton>
            </NavLink>
          </ul>
        </Drawer>
      </MediaQuery>
    </>
  );
};

interface LinkProps {
  href: string;
  children: React.ReactNode;
  target?: HTMLAttributeAnchorTarget;
}

const NavLink: React.FC<LinkProps> = ({ href, children, target }) => {
  return (
    <li>
      <Link href={href}>
        <a rel="noreferrer" target={target} className="cursor-pointer">
          {children}
        </a>
      </Link>
    </li>
  );
};

export default Navbar;
