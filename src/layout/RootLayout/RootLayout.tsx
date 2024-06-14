import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import MainNavigation from "../../components/Header/MainNavigation";
import Footer from "../../components/Footer/Footer";

const RootLayout = () => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(location.pathname === "/");

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  return (
    <>
      <MainNavigation />
      <main className={isHomePage ? "main__full__panel" : "main__default"}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
