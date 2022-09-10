import { motion } from "framer-motion";
import Navbar from "../Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div className="min-h-screen p-7 flex flex-col gap-2">
      <Navbar />
      <div className="flex flex-col gap-4 mt-4">{children}</div>
    </motion.div>
  );
}
