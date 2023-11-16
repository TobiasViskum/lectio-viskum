"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export function AnimateWrapper({ children }: Props) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  );
}
