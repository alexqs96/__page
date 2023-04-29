import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { AppProvider } from "@/context/auth";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"]
});

export default function App({ Component, ...pageProps}) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        :root {
          --inter: ${inter.style.fontFamily};
        }
      `}</style>
      <ThemeProvider attribute="class">
        <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
