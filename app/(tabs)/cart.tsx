import CartItem from "@/components/CartItem";
import Header from "@/components/header";
import { COLORS } from "@/constants";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    router.push('/checkout' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="My Cart" />

      {cartItems.length > 0 ? (
        <>
          <ScrollView className="flex-1 px-4 mt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={() => removeFromCart(item.id, item.size)}
                onUpdateQuantity={(q) => updateQuantity(item.product, q, item.size)} />
            ))}
          </ScrollView>

          {/* Checkout Footer */}
          <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 pb-8">
            <View className="flex-row justify-between mb-4">
              <Text className="text-lg font-medium text-secondary">Total Amount:</Text>
              <Text className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              onPress={handleCheckout} 
              className="w-full bg-primary py-4 rounded-full items-center shadow-lg flex-row justify-center"
            >
              <Text className="text-white font-bold text-lg mr-2">Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center mt-20">
          <Text className="text-secondary text-lg">Your cart is empty</Text>
          <TouchableOpacity onPress={() => router.push('/')} className="mt-4">
            <Text className="text-primary font-bold text-lg">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}