import "@/styles/globals.css";
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { AppProvider } from "@/context/auth";
import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

const inter = Inter({
  subsets: ["latin"]
});

const Geist = ({ children }) => {
  const { theme } = useTheme()

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
       {children}
    </GeistProvider>
  )
}

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
      <Geist>
        <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </AppProvider>
      </Geist>
      </ThemeProvider>
    </>
  );
}
