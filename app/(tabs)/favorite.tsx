import Header from "@/components/header";
import ProductCard from "@/components/ProductCard";
import { COLORS } from "@/constants";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorite() {
  const { wishlist, loading } = useWishlist();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="My Favorites" />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-secondary text-lg">Your wishlist is empty</Text>
              <TouchableOpacity onPress={() => router.push('/')} className="mt-4">
                <Text className="text-primary font-bold text-lg">Start Shopping</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}