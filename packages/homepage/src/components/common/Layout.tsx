import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
