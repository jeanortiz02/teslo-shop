import Link from "next/link";
import { IoPeopleOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

export const AdminSidebar = () => {
  return (
    <>
      <Link
        href="/"
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoShirtOutline size={30} />
        <span className="ml-3 text-xl">Productos</span>
      </Link>

      <Link
        href="/"
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoTicketOutline size={30} />
        <span className="ml-3 text-xl">Órdenes</span>
      </Link>

      <Link
        href="/"
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoPeopleOutline size={30} />
        <span className="ml-3 text-xl">Usuarios</span>
      </Link>
    </>
  );
};
