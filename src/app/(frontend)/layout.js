import "../globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  description: "Discover history and culture from our traditional fabrics",
  title: "Archives of Rivers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
