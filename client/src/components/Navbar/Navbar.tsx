'use client';
import styles from "./Navbar.module.scss";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUser, logoutUser } from "../../app/actions";
import { CodezealLogo } from "../../ui/codezeal-logo";
import { useUser } from "../../store/ContextProvider";

const Header: React.FC = () => {
  const pathname = usePathname();
  let right = null;
  const user = useUser();
  const handleLogoutUser = async () => {
    await logoutUser();

  }

  if (user) {
    right = (
      <div className={styles.loginContainer}>
        <div>{user.email}</div>
        <button onClick={handleLogoutUser}>Logout</button>
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
