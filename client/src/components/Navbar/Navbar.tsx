'use client';
import styles from "./Navbar.module.scss";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "../../app/actions";
import { CodezealLogo } from "../../ui/codezeal-logo";
import { User } from "../../types/User";
import { useUser } from "../../app/provider";

const Header: React.FC = () => {
  const pathname = usePathname();
  const user = useUser();
  let right: JSX.Element | null = null;

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
          <Link className={styles.loginButton} href="/feed/posts" data-active={pathname === ("/feed/posts")}>
            Feed
          </Link>
          {right}
        </div>
      </div>
    </nav>
  );
};

export default Header;
