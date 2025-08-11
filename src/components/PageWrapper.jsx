// src/components/PageWrapper.jsx

import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20, // Começa 20px para baixo
  },
  in: {
    opacity: 1,
    y: 0, // Move para a posição original
  },
  out: {
    opacity: 0,
    y: -20, // Sai 20px para cima
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate', // Uma suavização que "antecipa" o movimento
  duration: 0.5,
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export default PageWrapper;