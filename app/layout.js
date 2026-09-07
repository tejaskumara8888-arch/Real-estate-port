import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "MODAEDITZ — Real Estate Video Editing",
  description:
    "Real estate video editing — cinematic listing videos, agent branding reels, and drone edits, cut fast and delivered ready to post.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
