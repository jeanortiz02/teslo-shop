"use client";

import { authenticate } from "@/action";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  // const [state, dispatch] = useActionState(authenticate, undefined);
  // const [state, dispatch, errorMessage, ] = useActionState(authenticate, undefined);
  const router = useRouter();
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined); 

  console.log({ errorMessage});
    useEffect(() => {
      if (errorMessage === 'success') {
        // Redireccionar
        window.location.replace('/');
      }
    }, [errorMessage]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {errorMessage == 'CredentialsSignin' && (
        <div className="mb-2 flex flex-row">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Credenciales incorrectas</p>
        </div>
      )}


      {/* <LoginButton/> */}


      <button
        type="submit"
        className={clsx({
          "btn-primary": !isPending,
          "btn-disabled": isPending,
        })}
        disabled={isPending}
      >
        Ingresar
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      className={ clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={ pending }
      >
      Ingresar
    </button>
  );
}
