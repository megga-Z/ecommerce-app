import { COLORS } from "@/constants";
import { HeaderProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "@/context/CartContext";

export default function Header({
  title,
  showBack,
  showSearch,
  showCart,
  showMenu,
  showLogo,
}: HeaderProps) {
  const router = useRouter();
  
  // Conditionally hook useCart, preventing errors if header is used outside context safely.
  let itemCount = 0;
  try {
     const cart = useCart();
     itemCount = cart.itemCount;
  } catch(e) { }

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      {/* left side view  */}
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3 p-1">
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showMenu && (
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)} className="mr-3 p-1">
            <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showLogo ? (
          <TouchableOpacity onPress={() => router.push('/')} className="flex-1">
            <Image
              source={require("@/assets/logo.png")}
              style={{ width: 120, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          title && <Text className="text-xl font-bold text-primary">{title}</Text>
        )}

        {!title && !showSearch && <View className="flex-1" />}
      </View>
      
      {/* right side view  */}
      <View className="flex-row items-center gap-4">
        {showSearch && (
          <TouchableOpacity onPress={() => router.push("/shop")} className="p-1">
            <Ionicons name="search-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        {showCart && (
          <TouchableOpacity onPress={() => router.push("/(tabs)/cart")} className="p-1">
            <View className="relative">
              <Ionicons name="bag-outline" size={26} color={COLORS.primary} />
              {itemCount > 0 && (
                <View
                  className="absolute -top-1 -right-2 
              bg-accent min-w-[20px] h-[20px] rounded-full items-center justify-center px-1"
                >
                  <Text className="text-white text-[11px] font-bold">
                    {itemCount > 99 ? '99+' : itemCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
