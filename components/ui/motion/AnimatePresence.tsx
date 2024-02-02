'use client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

const AnimatePresenceContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AnimatePresence mode='wait'>{children}</AnimatePresence>;
};
export default AnimatePresenceContainer;
