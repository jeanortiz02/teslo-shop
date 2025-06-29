import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/action";
import { auth } from "@/auth.config";

export default async function AddresPage() {

  const countries = await getCountries();
  const session = await auth();


  if (!session?.user) {
   return (
    <h3 className="text-5xl">No estas logueado</h3>
   )
  }
  const userAddress = await getUserAddress(session!.user.id) ?? undefined;
  // console.log(userAddress);


  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} useStoredAddress={userAddress} />
      </div>
    </div>
  );
}
