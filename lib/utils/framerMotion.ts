export const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
      delayChildren: 0.5,
    },
  },
  exit: { opacity: 0 },
};

export const itemVariants = {
  hidden: {
    y: 80,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.4,
    },
  },
};
