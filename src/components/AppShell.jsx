"use client";

import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const authPages = ["/login", "/register"];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const [mounted, setMounted] = useState(false);

  const user = session?.user;
  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!user && !isAuthPage) {
      window.location.replace("/login");
    }

    if (user && isAuthPage) {
      window.location.replace("/");
    }
  }, [mounted, user, isAuthPage]);

  if (!mounted) {
    return null;
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-340px)]">{children}</main>

      <Footer />
    </>
  );
}