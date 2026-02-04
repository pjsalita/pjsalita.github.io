import "./globals.css";
import { AppDock } from "@/components/app-dock";
import { Profile } from "@/components/home/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PJ Salita - Passionate Full-Stack Web Developer",
  description: "Passionate Full-Stack Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
  description?: string;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="bg-background text-foreground relative min-h-screen w-full overflow-hidden lg:flex lg:h-screen">
          <Profile />

          <div className="w-full lg:h-screen lg:w-1/2 lg:overflow-y-auto">{children}</div>

          <AppDock />
        </div>
      </body>
    </html>
  );
}
