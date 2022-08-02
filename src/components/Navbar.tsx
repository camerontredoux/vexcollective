import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";

const links = [
  {
    href: "/login",
    text: "Login",
  },
  {
    href: "/api",
    text: "API",
  },
  {
    href: "/about",
    text: "About",
  },
  {
    href: "/discord",
    text: "Discord",
  },
  {
    href: "/github",
    text: "GitHub",
  },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex sm:flex-col justify-between items-center sm:items-start sm:justify-start p-2 rounded-md sm:w-56 text-gray-600">
        <div className="flex items-center sm:mb-8">
          <Logo width={30} />
          <h1 className="ml-2 font-bold uppercase text-gray-500">
            Vex Collective
          </h1>
        </div>
        <ul className="hidden sm:flex sm:flex-col gap-4">
          {links.map((link, index) => (
            <Link key={index} href={link.href} index={index}>
              {link.text}
            </Link>
          ))}
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
              <a className="hover:text-gray-400" href={link.href}>
                {link.text}
              </a>
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

const Link: React.FC<LinkProps> = ({ href, children, index }) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <a className="hover:text-gray-400" href={href}>
        {children}
      </a>
    </motion.li>
  );
};

export default Navbar;
