import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { AppProvider } from "@/context/auth";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from 'swr'

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
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            refreshWhenOffline: false,
            refreshWhenHidden: false,
            refreshInterval: 0,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          </AppProvider>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}
