'use client';
import styles from "./FeedNavbar.module.scss";
import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";


const FeedNavbar: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Posts",
      href: "/feed/posts",
      className: styles.loginButton,
    },
    {
      name: "Articles",
      href: "/feed/articles",
      className: styles.loginButton,
    },
    {
      name: "Categories",
      href: "/feed/categories",
      className: styles.loginButton,
    },
  ];
  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            {navLinks.map((link) => (
              <Link href={link.href} key={link.name} className={pathname.includes(link.href) ? styles.active : '' + link.className}>
                {link.name}
                {pathname.includes(link.href) && (
                  <motion.div
                    layoutId="underline"
                    className={styles.underline} />
                )}
              </Link>
            ))}
          </div>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <CategoriesFilter />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FeedNavbar;
