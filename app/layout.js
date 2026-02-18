import "./globals.css";
import NavBar from "@/components/NavBar";
import { Germania_One, Vend_Sans } from "next/font/google";

export const germania = Germania_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-germania",
});

export const vendSans = Vend_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-vendsans",
});

export const metadata = {
  title: "QuestLog",
  description:
    "QuestLog es una plataforma que transforma el estudio en una experiencia RPG",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${germania.variable} ${vendSans.variable} scroll-smooth`}
    >
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
