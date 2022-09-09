import { motion } from "framer-motion";
import Navbar from "../Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col p-8"
    >
      <Navbar />
      <div className="flex flex-grow flex-1 flex-col gap-4">{children}</div>
    </motion.div>
  );
}
