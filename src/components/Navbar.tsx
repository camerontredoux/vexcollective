import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  createEndpoints,
  destinyAPISchema,
  OpenAPIKeys,
} from "../utils/endpoints";
import Logo from "./Logo";

const links = [
  {
    href: "/login",
    text: "Login",
  },
  {
    href: "/data",
    text: "Data",
  },
  {
    href: "/about",
    text: "About",
  },
];

const socials = [
  {
    href: "https://",
    text: "Discord",
  },
  {
    href: "https://github.com/camerontredoux/vexcollective",
    text: "GitHub",
  },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const Destiny2Endpoints = createEndpoints("Destiny2");

  return (
    <>
      <div className="flex sm:flex-col justify-between items-center sm:items-start sm:justify-start p-2 sm:w-56 text-gray-600">
        <Link href="/">
          <a className="flex items-center sm:mb-8">
            <Logo width={30} />
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
              {link.text}
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
            Socials
          </motion.li>
          {socials.map((link, index) => (
            <NavLink key={index} href={link.href} index={index}>
              {link.text}
            </NavLink>
          ))}
          {Destiny2Endpoints.map((path, index) => {
            return (
              <NavLink key={index} href={path} index={index}>
                {destinyAPISchema.paths[path as OpenAPIKeys].summary}
              </NavLink>
            );
          })}
        </ul>
        <button
          className="sm:hidden bg-zinc-800 drop-shadow-lg p-1 rounded-sm text-white"
          onClick={() => setOpen(!open)}
        >
          <AiOutlineMenu />
        </button>
      </div>
      {open && (
        <ul className="sm:hidden flex sm:flex-col gap-8 text-gray-600 mt-3 ml-1">
          {links.map((link, index) => (
            <li key={index}>
              <motion.a
                whileHover={{ color: "rgb(115,125,139)" }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                href={link.href}
              >
                {link.text}
              </motion.a>
            </li>
          ))}
          {socials.map((link, index) => (
            <li key={index}>
              <motion.a
                whileHover={{ color: "rgb(115,125,139)" }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                href={link.href}
              >
                {link.text}
              </motion.a>
            </li>
          ))}
        </ul>
      )}
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
        <motion.a
          whileHover={{ color: "rgb(115,125,139)" }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="cursor-pointer"
        >
          {children}
        </motion.a>
      </Link>
    </motion.li>
  );
};

export default Navbar;
