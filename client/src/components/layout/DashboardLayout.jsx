import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import Sidebar from "../ui/Sidebar";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  const handleLogout = () => {
    setIsProfileOpen(false);
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isProfileOpen]);

  return (
    <div className="h-screen w-full bg-neutral-100 flex overflow-hidden font-['Open_Sans']">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={`flex-grow flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-[80px]" : "ml-[240px]"
        }`}>
        <header className="h-14 bg-white border-b border-zinc-100 flex items-center justify-end px-6 sticky top-0 z-50 w-full">
          <div
            ref={profileMenuRef}
            className="relative py-2"
            onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                className="w-8 h-8 rounded-full border border-zinc-100"
                src="/src/assets/image.svg"
                alt="Profile"
              />
            </div>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-zinc-100 rounded-lg shadow-lg z-[60] overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-left">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-grow overflow-hidden flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
