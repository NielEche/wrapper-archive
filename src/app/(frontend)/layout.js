import "../globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'leaflet/dist/leaflet.css';

export const metadata = {
  description: "Discover history and culture from our traditional fabrics",
  title: "Wrappers of Rivers Archive",
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
