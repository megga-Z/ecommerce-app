import Header from "@/components/header";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const PROFILE_MENU = [
  { id: '1', title: 'My Orders', icon: 'cube-outline', route: '/orders' },
  { id: '2', title: 'Shipping Addresses', icon: 'location-outline', route: '/addresses' },
  { id: '3', title: 'Payment Methods', icon: 'card-outline', route: '/payment-methods' },
  { id: '4', title: 'Settings', icon: 'settings-outline', route: '/settings' },
  { id: '5', title: 'Help & Support', icon: 'help-circle-outline', route: '/support' },
];

export default function Profile() {
  const router = useRouter();

  const handleMenuPress = (route?: string) => {
    if (route) {
      router.push(route as any);
    } else {
      Toast.show({ type: 'info', text1: 'Coming Soon!' });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="Profile" showBack={false} showMenu={true} />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View className="items-center mt-6 mb-8">
          <View className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden border-2 border-primary">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop' }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-2xl font-bold text-primary">Mega Gech</Text>
          <Text className="text-sm text-secondary mt-1">Mega@example.com</Text>
        </View>

        {/* Menu Items */}
        <View className="bg-white rounded-2xl p-2 mb-6">
          {PROFILE_MENU.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleMenuPress(item.route)}
              className={`flex-row items-center justify-between p-4 ${index !== PROFILE_MENU.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-3">
                  <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
                </View>
                <Text className="text-base font-medium text-primary">{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity onPress={() => { Toast.show({ type: 'success', text1: 'Logged Out Successfully' }); router.replace('/') }} className="flex-row items-center justify-center p-4 bg-primary/10 rounded-2xl mb-10">
          <Ionicons name="log-out-outline" size={20} color={COLORS.primary} className="mr-2" />
          <Text className="text-primary font-bold text-base ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}