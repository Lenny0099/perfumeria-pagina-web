import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar"; // <-- Importamos tu nuevo carrito flotante
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos actualizados para SEO de tu tienda
export const metadata: Metadata = {
  title: "Esencia_Galan | Fragancias Exclusivas",
  description: "Descubre tu esencia perfecta con nuestra colección de perfumes de diseñador y nicho en República Dominicana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Idioma ajustado a español
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-stone-900 selection:bg-stone-900 selection:text-white">
        <Navbar />
        
        {/* Componente del Carrito Lateral Flotante */}
        <CartSidebar /> 
        
        {/* Contenedor principal que empujará el footer hacia abajo */}
        <main className="flex-1 w-full bg-white">
          {children}
        </main>
        
        <Footer />
        
        {/* Notificaciones flotantes con diseño Premium */}
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1c1917', // Ajustado a stone-900 real para verdadero contraste premium
              color: '#fafaf9',      // stone-50 (Texto claro)
              borderRadius: '0px',   // Cambiado a 0px para mantener la línea recta minimalista de tu marca
              fontSize: '12px',
              letterSpacing: '0.05em',
              fontWeight: '400',
              border: '1px solid #292524' // Borde sutil stone-800
            }
          }} 
        />
      </body>
    </html>
  );
}