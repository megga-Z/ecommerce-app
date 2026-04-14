import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Header from "@/components/header";
import { COLORS } from "@/constants";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Example breakdown parameters
  const shippingFee = 15;
  const taxRate = 0.08;
  const tax = cartTotal * taxRate;
  const totalAmount = cartTotal + shippingFee + tax;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate a secure payment API resolution process delay
    setTimeout(() => {
      setIsProcessing(false);
      
      Toast.show({
        type: 'success',
        text1: 'Order Placed!',
        text2: 'Your order has been successfully placed.',
      });
      
      clearCart();
      router.push('/');
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="Checkout" showBack />
      
      <ScrollView className="flex-1 px-4 pt-4 mb-[120px]" showsVerticalScrollIndicator={false}>
        
        {/* Shipping Address Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
             <Text className="text-secondary font-bold text-sm uppercase ml-1">Shipping Address</Text>
             <TouchableOpacity onPress={() => router.push('/addresses' as any)}>
                 <Text className="text-primary font-bold text-sm">Edit</Text>
             </TouchableOpacity>
          </View>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex-row items-center justify-between">
            <View className="flex-row items-start flex-1 pr-2">
                <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3 mt-1">
                    <Ionicons name="location" size={20} color={COLORS.primary} />
                </View>
                <View>
                    <Text className="text-base font-bold text-primary mb-1">Home</Text>
                    <Text className="text-secondary leading-5">2927 Avenue Ave, New York City{"\n"}NY, 10001, USA</Text>
                </View>
            </View>
          </View>
        </View>

        {/* Payment Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
             <Text className="text-secondary font-bold text-sm uppercase ml-1">Payment Method</Text>
             <TouchableOpacity onPress={() => router.push('/payment-methods' as any)}>
                 <Text className="text-primary font-bold text-sm">Edit</Text>
             </TouchableOpacity>
          </View>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex-row items-center justify-between">
            <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-50 rounded-lg items-center justify-center mr-3">
                    <Ionicons name="card" size={24} color={COLORS.primary} />
                </View>
                <View>
                    <Text className="text-base font-bold text-primary">Visa</Text>
                    <Text className="text-secondary text-sm">•••• 4242</Text>
                </View>
            </View>
          </View>
        </View>

        {/* Order Details Breakdown */}
        <View className="mb-2">
          <Text className="text-secondary font-bold text-sm uppercase ml-1 mb-2">Order Summary</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
             <View className="flex-row justify-between mb-3 border-b border-gray-100 pb-3">
                 <Text className="text-secondary text-base">Items ({cartItems.length}):</Text>
                 <Text className="text-primary font-medium text-base">${cartTotal.toFixed(2)}</Text>
             </View>
             <View className="flex-row justify-between mb-3 border-b border-gray-100 pb-3">
                 <Text className="text-secondary text-base">Shipping & Handling:</Text>
                 <Text className="text-primary font-medium text-base">${shippingFee.toFixed(2)}</Text>
             </View>
             <View className="flex-row justify-between mb-4 border-b border-gray-100 pb-4">
                 <Text className="text-secondary text-base">Estimated Tax:</Text>
                 <Text className="text-primary font-medium text-base">${tax.toFixed(2)}</Text>
             </View>
             <View className="flex-row justify-between">
                 <Text className="text-primary font-bold text-lg">Total Amount:</Text>
                 <Text className="text-primary font-bold text-xl">${totalAmount.toFixed(2)}</Text>
             </View>
          </View>
        </View>

      </ScrollView>

      {/* Sticky Place Order Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 pb-8">
        <TouchableOpacity 
          onPress={handlePlaceOrder} 
          disabled={isProcessing}
          className={`w-full py-4 rounded-full items-center shadow-lg flex-row justify-center ${isProcessing ? 'bg-primary/70' : 'bg-primary'}`}
        >
          {isProcessing ? (
             <ActivityIndicator color="white" />
          ) : (
             <>
               <Text className="text-white font-bold text-lg mr-2">Place Order</Text>
               <Ionicons name="checkmark-circle-outline" size={20} color="white" />
             </>
          )}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
