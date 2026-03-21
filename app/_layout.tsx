import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContex";
import "@/global.css";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <WishlistProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </WishlistProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
