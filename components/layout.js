import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/auth";
import { useTheme } from "next-themes";
import { LogOutIcon, Moon, Sun } from "./Icons";

const Header = () => {
  const { user, loading, logOut } = useContext(AppContext)

  return (
    <header className="z-50 sticky top-0 flex bg-white dark:bg-black justify-between items-center max-w-screen-2xl w-[90%] mx-auto">
      <Link className="flex items-center gap-x-2 py-3" href="/">
        <Image src="/img/logo.png" width={64} height={64} alt="Logo Linx" priority unoptimized/>
      </Link>
      {
        loading?
        undefined
        :
        user?
        <nav className="flex items-center group relative w-max">
          <Image src={user.profile_pic} className="rounded-full" width={48} height={48} alt="User Pic" priority unoptimized/>
          
          <div className="group-hover:flex hidden flex-col absolute top-12 bg-white dark:bg-black border dark:border-white/30 overflow-hidden right-0 rounded-md w-max">
            <Link href="/profile" className="text-sm font-medium hover:bg-black/5 hover:dark:bg-white/20 px-5 py-2 cursor-pointer">Mi Perfil</Link>
            <span className="text-sm font-medium hover:bg-black/5 hover:dark:bg-white/20 px-5 py-2 cursor-pointer">Ajustes</span>
            <span onClick={() => logOut()} className="text-sm font-medium hover:bg-black/5 hover:dark:bg-white/20 px-5 py-2 cursor-pointer">Cerrar Sesion</span>
          </div>

        </nav>
        :
        <div className="flex items-center gap-4">
          <Link href="/login" className="transition font-medium text-black/70 hover:text-black dark:text-gray-300 hover:dark:text-white">
            Ingresar
          </Link>

          <Link href="/register" className="border transition rounded py-1.5 px-4 font-medium bg-black text-white hover:bg-white hover:text-black hover:border-black dark:border-white dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white">
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
      <footer className="flex justify-between max-md:flex-col items-center gap-5 pb-10 max-w-screen-2xl w-[90%] mx-auto">
        <small className="font-semibold opacity-80">Software Development</small>
        <div className="px-2.5 py-1.5 flex gap-2.5 border rounded">
          <button onClick={() => setTheme("light")}><Sun size={16}/></button>
          <button onClick={() => setTheme("dark")}><Moon size={16}/></button>
        </div>
      </footer>
    </>
  );
};

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="w-[90%] max-w-screen-2xl mx-auto mb-16">
      {children}
      </main>
      <Footer />
    </>
  );
}
