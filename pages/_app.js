import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { CartProvider } from "react-use-cart";

export default function App({ Component, pageProps }) {
  return(
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  ) 
  
}
