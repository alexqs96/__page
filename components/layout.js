import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/auth";
import { Page, Popover, Button } from "@geist-ui/core";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@geist-ui/icons";

const Header = () => {
  const { user, loading, logOut } = useContext(AppContext)
  const { theme, setTheme } = useTheme();

  return (
    <Page.Header className="flex items-center justify-between">
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
        <Popover
          enterDelay={150}
          content={
          <div className="w-[180px] !-my-2">
            <Popover.Item className="hover:bg-black/5 hover:dark:bg-white/20 group">
              <Link href="/profile" className="text-sm -my-2 py-2 font-medium text-gray-500 w-full transition group-hover:text-black group-hover:dark:text-white">Mi Perfil</Link>
            </Popover.Item>
            
            <Popover.Item line />

            <Popover.Item className="hover:bg-black/5 hover:dark:bg-white/20 group">
              <Link href="/settings" className="text-sm -my-2 py-2 font-medium text-gray-500 w-full transition group-hover:text-black group-hover:dark:text-white">Ajustes</Link>
            </Popover.Item>
            
            <Popover.Item disableAutoClose={true}>
              <div className="flex justify-between items-center -my-1.5 w-full group">
              <span className="text-gray-500 transition font-medium group-hover:text-black group-hover:dark:text-white">Tema</span>
              
              <Button className="!min-w-[50px] !max-w-[100px] !px-3.5">
              <span className="flex items-center w-fit !-mb-[2.45rem]">
                {
                  theme === "dark"?
                  <Moon size={16}/>
                  :
                  <Sun size={16}/>
                }
                <select value={theme} onChange={e => setTheme(e.target.value)} className="cursor-pointer bg-transparent">
                  <option value="light">
                    Light
                  </option>
                  <option value="dark">
                    Dark
                  </option>
                </select>
                </span>            
              </Button>
              </div>
            </Popover.Item>
            <Popover.Item line />
            <span onClick={() => logOut()} className="cursor-pointer text-sm font-medium block text-center w-full py-2 text-gray-500 transition hover:text-black hover:dark:text-white">Cerrar Sesión</span>
          </div>
        }>
          <Image
            className="rounded-full cursor-pointer"
            src="/img/apu_profile.png"
            width={50}
            height={50}
            alt="Apu"
          />
        </Popover>
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
    </Page.Header>
  );
};

const Footer = () => {
  return (
    <>
      <Page.Footer>
        @2023
      </Page.Footer>
    </>
  );
};

export default function Layout({ children }) {
  return (
    <Page>
      <Header />
      <Page.Content>
      {children}
      </Page.Content>
      <Footer />
    </Page>
  );
}
