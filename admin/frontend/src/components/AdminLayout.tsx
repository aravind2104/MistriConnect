
import { Outlet } from "react-router-dom";
import { NavBar } from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <NavBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;