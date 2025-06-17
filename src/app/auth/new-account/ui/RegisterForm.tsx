"use client";

import { login, registerUser } from "@/action";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormsInputs = {
  name: string;
  email: string;
  password: string;
};
export const RegisterForm = () => {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsInputs>();

  const onSubmit: SubmitHandler<FormsInputs> = async (data) => {
    const { name, email, password } = data;
    
    
    // Server Action
    const resp = await registerUser(name, email, password);
    
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }
    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* {
            errors.name && <span className="text-red-500">* El nombre es requerido</span>
        } */}
      <label htmlFor="email">Nombre Completo</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          errors.name && "border-red-500"
        )}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />
      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          errors.email && "border-red-500"
        )}
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5",
          errors.password && "border-red-500"
        )}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />


        <span className="text-red-500">* {errorMessage}</span>
    

      <button className="btn-primary">Crear Cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
