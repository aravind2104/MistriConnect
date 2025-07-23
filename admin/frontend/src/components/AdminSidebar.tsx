import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  MenuIcon, 
  X,
  LogOut 
} from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

interface SidebarProps {
  className?: string;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 lg:static",
        collapsed ? "w-[70px]" : "w-64",
        className
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto border-r bg-sidebar py-4 shadow-sm">
        <div className="px-3 py-2">
          <div className="flex h-16 items-center justify-between">
            <NavLink
              to="/"
              className="flex items-center justify-center"
            >
              {!collapsed && (
                <span className="text-xl font-semibold">
                  Mistri<span className="text-primary">Connect</span>
                </span>
              )}
              {collapsed && <span className="text-xl font-bold text-primary">M</span>}
            </NavLink>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full"
            >
              {collapsed ? (
                <MenuIcon className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
        </div>

        <div className="mt-5 flex flex-1 flex-col px-3">
          <div className="space-y-1">
            <SidebarLink
              to="/"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Dashboard"
              collapsed={collapsed}
            />
            <SidebarLink
              to="/workers"
              icon={<Users className="h-5 w-5" />}
              label="Workers"
              collapsed={collapsed}
            />
            <SidebarLink
              to="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              collapsed={collapsed}
            />
          </div>
        </div>

        <div className="mt-auto border-t px-3 py-4">
          <div className="flex items-center justify-between">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="rounded-full"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  label,
  collapsed,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )
      }
    >
      <span className="mr-3">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};
