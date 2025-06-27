import Link from "next/link";
import { IoPeopleOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";


interface Props {
  closeSideMenu: () => void
}


export const AdminSidebar = ( { closeSideMenu }: Props ) => {
  return (
    <>
      <Link
        href="/"
        onClick={() => closeSideMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoShirtOutline size={30} />
        <span className="ml-3 text-xl">Gestor de Productos</span>
      </Link>

      <Link
        href="/admin/orders"
        onClick={() => closeSideMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoTicketOutline size={30} />
        <span className="ml-3 text-xl">Todas las Ordenes</span>
      </Link>

      <Link
        href="/admin/users"
        onClick={() => closeSideMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoPeopleOutline size={30} />
        <span className="ml-3 text-xl">Administra Usuarios</span>
      </Link>
    </>
  );
};
