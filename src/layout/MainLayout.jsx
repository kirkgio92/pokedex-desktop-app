import React from "react";
import styles from "./index.module.scss";
import logo from "../../public/pokeball.png";
import Image from "next/image";

const MainLayout = ({ children }) => {
  return (
    <>
      <nav className={styles.MainLayout}>
        <div className={styles.logoWrapper}>
          <Image src={logo} width={60} height={60} alt="logo" />
          <h1>PokeWiki</h1>
        </div>
      </nav>
      {children}
    </>
  );
};

export default MainLayout;
