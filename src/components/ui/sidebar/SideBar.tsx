"use client";
import { logout } from "@/action";
import { useUiStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { AdminSidebar } from "./AdminSidebar";

export const SideBar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user.role === "admin";

  const handleLogout = async () => {
    await logout();
    window.location.replace("/");
    closeSideMenu();
  };

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Background blur */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeSideMenu()}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-sm backdrop-filter"
        />
      )}

      {/*  SideMenu */}
      <nav
        key={`${isAuthenticated}-${isAdmin}`}
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-auto",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}

        {isAuthenticated && (
          <>
          
            <Link
              href="/profile"
              onClick={() => closeSideMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => closeSideMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Órdenes</span>
            </Link>

            <button
              onClick={() => handleLogout()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all w-full"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Salir</span>
            </button>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={() => closeSideMenu()}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {/* Line separator */}

        {isAuthenticated && isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />
            <AdminSidebar closeSideMenu={closeSideMenu} />
          </>
        )}
      </nav>
    </div>
  );
};
