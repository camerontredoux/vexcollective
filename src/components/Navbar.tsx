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
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex sm:flex-col justify-between items-center sm:items-start sm:justify-start p-2 rounded-md sm:w-60 text-gray-600">
        <div className="flex items-center sm:mb-8">
          <Logo width={40} />
          <h1 className="ml-2 font-bold uppercase text-gray-500">
            Vex Collective
          </h1>
        </div>
        <motion.ul layoutId="list" className="hidden xs:flex sm:flex-col gap-4">
          {links.map((link, index) => (
            <Link key={index} href={link.href} index={index}>
              {link.text}
            </Link>
          ))}
        </motion.ul>
        <button
          className="xs:hidden bg-zinc-800 drop-shadow-lg p-1 rounded-sm text-gray-600"
          onClick={() => setOpen(!open)}
        >
          <AiOutlineMenu />
        </button>
      </div>
      {open && (
        <motion.ul
          layoutId="list-mobile"
          className="xs:hidden flex sm:flex-col gap-8 text-gray-600 mt-3 ml-1"
        >
          {links.map((link, index) => (
            <Link key={index} href={link.href} index={index}>
              {link.text}
            </Link>
          ))}
        </motion.ul>
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
      transition={{ delay: index * 0.3, duration: 1 }}
    >
      <a className="hover:text-gray-400" href={href}>
        {children}
      </a>
    </motion.li>
  );
};

export default Navbar;
