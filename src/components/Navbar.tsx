import { motion } from "framer-motion";
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
  return (
    <div className="flex sm:flex-col justify-between sm:justify-start p-2 rounded-md sm:w-64 text-gray-600">
      <div className="flex items-center mb-8">
        <Logo width={40} />
        <h1 className="ml-2 font-bold uppercase">Vex Collective</h1>
      </div>
      <motion.ul layoutId="list" className="flex sm:flex-col gap-2">
        {links.map((link, index) => (
          <Link key={index} href={link.href} index={index}>
            {link.text}
          </Link>
        ))}
      </motion.ul>
    </div>
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
      <a href={href}>{children}</a>
    </motion.li>
  );
};

export default Navbar;
