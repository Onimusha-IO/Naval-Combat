import styles from "./Layouts.module.scss";

const Layout = ({ children }: any) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
