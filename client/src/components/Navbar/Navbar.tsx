'use client';
import styles from "./Navbar.module.scss";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUser } from "../../app/actions";
import { CodezealLogo } from "../../ui/codezeal-logo";
import { useUser } from "../../store/AuthProvider";

const Header: React.FC = () => {
  const pathname = usePathname();
  let right = null;
  const user = useUser((state) => state.user);
  console.log('user from zustand', user)
  if (user) {
    right = (
      <div className={styles.loginContainer}>
        {user.email}
      </div>
    )
  } else {
    right = (
      <div className={styles.loginContainer}>
        <Link className={styles.loginButton} href="/login" data-active={pathname === ("/login")}>
          Login
        </Link>
        <Link className={styles.signUpButton} href="/signup" data-active={pathname === ("/signup")}>
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.logoContainer}>
            <CodezealLogo />
          </Link>
          {right}
        </div>
      </div>
    </nav>
  );
};

export default Header;
