import { CartItemProps } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function CartItem({item, onRemove, onUpdateQuantity} : CartItemProps){

    const imageUrl = item.product.images && item.product.images.length > 0 ? item.product.images[0] : "";
    
    return(
        <View className="flex-row mb-4 bg-white p-3 rounded-2xl shadow-sm">
            <View className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                {imageUrl ? (
                     <Image source={{uri: imageUrl}} className="w-full h-full" resizeMode="cover" />
                ) : null}
            </View>

            <View className="flex-1 ml-3 justify-between py-1">
                {/* Product details */}
                <View className="flex-row justify-between items-start">
                   <View className="flex-1 pr-2">
                       <Text className="text-primary font-bold text-base mb-1" numberOfLines={1}>{item.product.name}</Text>
                       <Text className="text-secondary text-sm">Size: {item.size}</Text>
                   </View>
                   <TouchableOpacity onPress={onRemove} className="p-1">
                       <Ionicons name="trash-outline" size={20} color="#FF4C3B" />
                   </TouchableOpacity>
                </View>
                
                {/* Price and Quantity */}
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-primary font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</Text>
                    
                    <View className="flex-row items-center border border-gray-200 rounded-full">
                        <TouchableOpacity 
                            onPress={() => onUpdateQuantity?.(item.quantity - 1)}
                            className="w-8 h-8 items-center justify-center"
                        >
                            <Ionicons name="remove" size={16} color="black" />
                        </TouchableOpacity>
                        
                        <Text className="px-2 font-medium text-base min-w-[20px] text-center">{item.quantity}</Text>
                        
                        <TouchableOpacity 
                            onPress={() => onUpdateQuantity?.(item.quantity + 1)}
                            className="w-8 h-8 items-center justify-center bg-gray-100 rounded-r-full"
                        >
                            <Ionicons name="add" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
          
        </View>
    )
}