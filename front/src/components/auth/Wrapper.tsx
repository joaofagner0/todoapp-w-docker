import { ReactNode } from "react";
import { motion } from "framer-motion";
import ToastWrapper from "../ToastContainer";

type WrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const Wrapper = ({ title, description, children }: WrapperProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 px-4">
      <ToastWrapper />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-3xl bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-semibold text-gray-100 mb-4">{title}</h2>
          <p className="text-gray-300 text-lg">{description}</p>
        </div>
        <div className="md:w-1/2">{children}</div>
      </motion.div>
    </div>
  );
};

export default Wrapper;
