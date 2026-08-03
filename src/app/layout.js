import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TYPEVERSE",
  description: "TypeVerse",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <nav
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "72px",
    background: "#ffffff",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 60px",
    boxSizing: "border-box",
    zIndex: 1000,
  }}
>
          <Link
            href="/"
            style={{
              color: "#000",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            TYPEVERSE
          </Link>

          <div
            style={{
              display: "flex",
              gap: "30px",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#000",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              TYPING
            </Link>

            <Link
              href="/typeverse"
              style={{
                color: "#000",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              GALLERY
            </Link>
          </div>
        </nav>

       <div style={{ paddingTop: "72px" }}>
  {children}
</div>
      </body>
    </html>
  );
}