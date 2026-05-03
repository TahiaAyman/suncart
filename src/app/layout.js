import "./globals.css";
import { Toaster } from "react-hot-toast";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description:
    "A modern summer eCommerce platform for seasonal products, skincare, outfits, and beach essentials.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "14px",
              background: "#1f2937",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}