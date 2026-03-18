import { COLORS } from "@/constants";
import { ProductCardProps } from "@/constants/types";
import { useWishlist } from "@/context/WishlistContex";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product._id);

  return (
    <Link href={`/product/${product._id}`} asChild>
      <TouchableOpacity
        className="w-[48%] mb-4 bg-white
          rounded-lg overflow-hidden"
      >
        <View className="relative h-56 w-full bg-gray-100">
          <Image
            source={{ uri: product.images[0] }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/**favorite icon */}
          <TouchableOpacity
            className="absolute top-2 
                  right-2 z-10 p-2 bg-white rounded-full
                  shadow-sm "
            onPress={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? COLORS.accent : COLORS.primary}
            />
          </TouchableOpacity>
          {/**is Featured */}
          {product.isFeatured && (
            <View
              className="absolute top-2 left-2 bg-black
                           px-2 py-1 rounded"
            >
              <Text
                className="text-white text-xs font-bold
                              uppercase"
              >
                Featured
              </Text>
            </View>
          )}
        </View>
        {/**product info */}
        <View className="p-3">
          <View className="flex-row items-center mb-1">
            <Ionicons name="star" size={14} color={"#FFD700"} />
            <Text
              className="text-secondary
                       text-xs ml-1"
            >
              4.6
            </Text>
          </View>
          <Text
            className="text-primary font-medium
                  text-sm mb-1"
            numberOfLines={1}
          >
            {product.name}
          </Text>
          <View className="flex-row items-center ">
            <Text className="text-primary font-bold text-base">
              ${product.price.toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
