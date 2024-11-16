import { motion } from "framer-motion";

export const BackgroundMove = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <motion.div
        className="absolute left-1/4 top-1/4 size-[300px] rounded-full bg-blue-500 opacity-20 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/3 top-1/2 size-[200px] rounded-full bg-cyan-400 opacity-30 blur-3xl"
        animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/2 size-[150px] rounded-full bg-indigo-400 opacity-25 blur-xl"
        animate={{ y: [0, 25, 0], x: [0, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
