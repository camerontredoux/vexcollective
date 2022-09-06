import {
  Burger,
  Drawer,
  MediaQuery,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  {
    href: "/data",
    text: "Data Explorer",
  },
  {
    href: "/authorize",
    text: "Authorize",
  },
];

const more = [
  {
    href: "/about",
    text: "About",
  },
  {
    href: "https://github.com/camerontredoux/vexcollective",
    text: "GitHub",
  },
];

const Navbar: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <>
      <div className="flex sm:flex-col justify-between items-center sm:items-start sm:justify-start py-2 sm:w-56 text-gray-600">
        <Link href="/">
          <a className="flex items-center sm:mb-8">
            <Logo width={27} />
            <h1 className="ml-2 font-bold uppercase text-gray-500">
              Vex Collective
            </h1>
          </a>
        </Link>
        <ul className="hidden sm:flex sm:flex-col gap-4">
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white"
          >
            Getting Started
          </motion.li>
          {links.map((link, index) => (
            <NavLink key={index} href={link.href} index={index}>
              <div
                className={`${
                  link.text === "Data Explorer"
                    ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-125"
                    : ""
                }`}
              >
                {link.text}
              </div>
            </NavLink>
          ))}
        </ul>
        <ul className="mt-9 hidden sm:flex sm:flex-col gap-4">
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white"
          >
            More
          </motion.li>
          {more.map((link, index) => (
            <NavLink key={index} href={link.href} index={index}>
              {link.text}
            </NavLink>
          ))}
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
            {links.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  <UnstyledButton
                    onClick={() => setOpened(false)}
                    className="unstyled-btn"
                  >
                    <a>{link.text}</a>
                  </UnstyledButton>
                </Link>
              </li>
            ))}
            {more.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  <UnstyledButton
                    onClick={() => setOpened(false)}
                    className="unstyled-btn"
                  >
                    <a target={link.text === "GitHub" ? "_blank" : undefined}>
                      {link.text}
                    </a>
                  </UnstyledButton>
                </Link>
              </li>
            ))}
          </ul>
        </Drawer>
      </MediaQuery>
    </>
  );
};

interface LinkProps {
  href: string;
  children: React.ReactNode;
  index: number;
}

const NavLink: React.FC<LinkProps> = ({ href, children, index }) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.25, duration: 0.5 }}
    >
      <Link href={href}>
        <a
          target={children === "GitHub" ? "_blank" : undefined}
          className="cursor-pointer"
        >
          {children}
        </a>
      </Link>
    </motion.li>
  );
};

export default Navbar;
