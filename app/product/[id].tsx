import { dummyProducts } from "@/assets/assets";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContex";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, cartItems, itemCount } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchProduct = async () => {
    setProduct(dummyProducts.find((product) => product._id === id) as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 justify-center
            items-center"
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView
        className="flex-1 justify-center
            items-center"
      >
        <Text>Product not Found</Text>
      </SafeAreaView>
    );
  }

  const isLiked = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Toast.show(
        {
          type: 'info',
          text1: 'No Size Selected',
          text2: 'Please Select a Size'
        }
      )
      return;
    }
    addToCart(product, selectedSize || "")
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/**Image Carousel */}
        <View
          className="relative h-[450px]
          bg-gray-100 mb-6"
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const slide = Math.ceil(
                e.nativeEvent.contentOffset.x /
                e.nativeEvent.layoutMeasurement.width,
              );
              setActiveImageIndex(slide);
            }}
          >
            {product.images?.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={{ width: width, height: 450 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          {/**Header Actions */}
          <View
            className="absolute top-12 left-4 right-4
      flex-row justify-between items-center z-10"
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/80 rounded-full 
        items-center justify-center"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleWishlist(product)}
              className="w-10 h-10 bg-white/80 rounded-full 
            items-center justify-center"
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? COLORS.accent : COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          {/**pagination dots */}
          <View
            className="absolute bottom-4 left-0 right-0 
           flex-row justify-center gap-2"
          >
            {product.images?.map((_, index) => (
              <View
                key={index}
                className={` h-2 rounded-full 
              ${index === activeImageIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"}`}
              />
            ))}
          </View>
        </View>
        {/**product info  */}
        <View className="px-5">
          {/**title and rating */}
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-bold text-primary
            flex-1 mr-4"
            >{product.name}</Text>
            <View className="flex-row justify-between items-start mb-2">
              <Ionicons name="star" size={14}
                color='#FFD700' />
              <Text className="text-sm font-bold ml-1">4.6</Text>
              <Text className="text-xs text-secondary ml-1">(85)</Text>
            </View>
          </View>
          {/**price */}
          <Text className="text-2xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}</Text>
          {/**Sizes */}
          {
            product.sizes && product.sizes.length > 0 && (
              <>
                <Text className="text-base font-bold text-primary mb-3">Size</Text>
                <View className="flex-row gap-3 mb-6 flex-wrap ">
                  {
                    product.sizes.map((size) => (
                      <TouchableOpacity key={size} onPress={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full items-center justify-center border 
                          ${selectedSize === size ? 'bg-primary border-primary'
                            : 'bg-white border-gray-100'}`}>
                        <Text className={`text-sm font-medium ${selectedSize === size ? 'text-white' :
                          "text-primary"
                          }`}>{size}</Text>
                      </TouchableOpacity>
                    ))
                  }

                </View>
              </>
            )
          }

          {/**Description */}
          <Text className="text-base font-bold text-primary mb-2">Description</Text>
          <Text className="text-secondary leading-6 mb-6">{product.description}</Text>
        </View>
      </ScrollView>
      {/**footer */}
      <View className="absolute bottom-0 left-0 flex-row
      right-0 p-4 bg-white border-t border-gray-100">
        <TouchableOpacity onPress={handleAddToCart} className="w-3/4 bg-primary py-3 rounded-full items-center
        shadow-lg flex-row justify-center">
          <Ionicons name="bag-outline" size={10} color='white' />
          <Text className="text-white font-bold text-base ml-2">Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} className='w-1/5  py-3 flex-row 
           justify-center relative'>
          <Ionicons name="cart-outline" size={18} />
          <View className='absolute top-2 right-9 size-4 
          z-10 bg-black rounded-full justify-center items-center'>
            <Text className='text-white text-[9px]'>{itemCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
