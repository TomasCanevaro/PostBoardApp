import "./globals.css";
import Navbar from "./components/NavBar";

export const metadata = { title: "PostBoard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="max-w-2xl mx-auto mt-6">{children}</main>
      </body>
    </html>
  );
}