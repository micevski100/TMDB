import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/Header/MainNavigation";
import classes from "./Root.module.css";
import Footer from "../../components/Header/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
