import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/auth";
import { useTheme } from "next-themes";

const Header = () => {
  const { user, loading, logOut } = useContext(AppContext)

  return (
    <header className="flex items-center justify-between">
      <Link className="flex items-center gap-x-2 py-4" href="/">
        <Image src="/img/logo.png" width={60} height={60} alt="Logo Linx" priority unoptimized/>
      </Link>
      {
        loading?
        undefined
        :
        user?
        <>
        <span className="ml-auto mr-4 font-semibold">Hola {user.name}</span>
        <Link href="/profile"><Image src={user.profile_pic} className="rounded-full" width={60} height={60} alt="User Pic" priority unoptimized/></Link>
        <span onClick={() => logOut()} className="cursor-pointer text-sm font-medium block text-center w-full py-2 text-gray-500 transition hover:text-black hover:dark:text-white">Cerrar Sesión</span>
        </>
        :
        <div className="flex items-center gap-4">
          <Link href="/login" className="transition font-medium text-black/70 hover:text-black dark:text-gray-300 hover:dark:text-white">
            Ingresar
          </Link>

          <Link href="/register" className="border transition rounded py-1 px-4 font-medium bg-black text-white hover:bg-white hover:text-black hover:border-black dark:border-white dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white">
            Unirme
          </Link>
        </div>
      }
    </header>
  );
};

const Footer = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <footer className="flex justify-between flex-wrap p-2">
        @2023
        <div className="px-3 py-2 flex gap-2">
          Modo:
          <button onClick={() => setTheme("light")}>Claro</button>
          <button onClick={() => setTheme("dark")}>Oscuro</button>
        </div>
      </footer>
    </>
  );
};

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
      {children}
      </main>
      <Footer />
    </>
  );
}
