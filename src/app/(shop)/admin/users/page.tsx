export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from "@/action";
import { Title } from "@/components";

import { redirect } from "next/navigation";
import { UserTable } from "./ui/UserTable";
import { Pagination } from "@/components";


export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Gestion de usuarios" />

      <div className="mb-10">
          <UserTable users={ users } />
          <Pagination totalPages={3}/>
      </div>
    </>
  );
}
