import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hard Hat Mystery",
  description: "A Rylanda Albertina Mystery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-construction-darker text-gray-100">
        {/* Future context providers will go here */}
        {children}
      </body>
    </html>
  );
}
