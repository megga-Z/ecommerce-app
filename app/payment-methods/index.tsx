import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/header";
import { COLORS } from "@/constants";

export default function PaymentMethods() {
  const paymentMethods = [
    { id: '1', type: 'Visa', last4: '4242', expires: '12/26', isDefault: true, icon: 'card-outline' },
    { id: '2', type: 'Mastercard', last4: '5555', expires: '08/25', isDefault: false, icon: 'card-outline' },
    { id: '3', type: 'Apple Pay', last4: '', expires: '', isDefault: false, icon: 'logo-apple' }
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="Payment Methods" showBack />
      <ScrollView className="flex-1 px-4 pt-4 mb-20" showsVerticalScrollIndicator={false}>
        {/* Saved Cards */}
        <Text className="text-primary font-bold text-lg mb-4">Saved Payment Methods</Text>
        
        {paymentMethods.map((method) => (
          <View key={method.id} className="bg-white p-4 rounded-xl mb-4 shadow-sm border border-gray-50 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-gray-50 rounded-lg items-center justify-center mr-4">
                <Ionicons name={method.icon as any} size={28} color={COLORS.primary} />
              </View>
              <View>
                <Text className="text-base font-bold text-primary">{method.type} {method.last4 ? `•••• ${method.last4}` : ''}</Text>
                {method.expires ? (
                  <Text className="text-secondary text-sm mt-1">Expires {method.expires}</Text>
                ) : null}
              </View>
            </View>
            <View className="items-end gap-2">
                 <TouchableOpacity>
                   <Ionicons name="trash-outline" size={20} color={COLORS.error || '#ff4444'} />
                 </TouchableOpacity>
                 {method.isDefault && (
                    <View className="bg-primary/10 px-2 py-1 rounded">
                        <Text className="text-primary text-xs font-bold">Default</Text>
                    </View>
                 )}
            </View>
          </View>
        ))}

        {/* Add New Button */}
        <TouchableOpacity className="flex-row items-center justify-center p-4 border border-dashed border-gray-300 rounded-xl mt-4 mb-8">
            <Ionicons name="add" size={24} color={COLORS.secondary} />
            <Text className="text-secondary font-medium ml-2">Add New Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
