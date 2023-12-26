'use client';
import { motion } from 'framer-motion';
import styles from './Toggle.module.scss';
import React from 'react';

type ToggleProps = {
 text: string;
 isOn: boolean;
};

export const Toggle = ({ text, isOn }: ToggleProps) => (
 <div className={styles.option}>
  <div className={`${styles.text} ${isOn ? styles.active : ""}`}>{text}</div>

  {isOn && (
   <motion.div
    className={styles.handle}
    layoutId="handle"
    animate={{ borderRadius: "36px" }}
    transition={{
     type: "spring",
     stiffness: 600,
     damping: 50,
    }}
   />
  )}
 </div>
)