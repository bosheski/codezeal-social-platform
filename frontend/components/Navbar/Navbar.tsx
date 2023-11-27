'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";
import { getUser } from "../../app/actions";

const Header: React.FC = () => {
  const pathname = usePathname();
  let right = null;
  useEffect(() => {
    const user = getUser();
    if (user) {
      console.log(user);
    }
  }, [])

  return (
    <nav>
      <div className={styles.navbarContainer}>
        <Link className="bold" href="/" data-active={pathname === ("/")}>
          Feed
        </Link>
        <div>
          <Link className="bold" href="/login" data-active={pathname === ("/login")}>
            Login
          </Link>
          <Link className="bold" href="/signup" data-active={pathname === ("/signup")}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
