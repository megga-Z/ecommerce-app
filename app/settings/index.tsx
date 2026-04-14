import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/header";
import { COLORS } from "@/constants";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="Settings" showBack />
      <ScrollView className="flex-1 px-4 pt-4 mb-10" showsVerticalScrollIndicator={false}>
        
        {/* Account Group */}
        <View className="mb-6">
          <Text className="text-secondary font-bold text-sm uppercase mb-2 ml-1">Account</Text>
          <View className="bg-white rounded-2xl p-2 shadow-sm border border-gray-50">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <Text className="text-base text-primary">Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <Text className="text-base text-primary">Change Password</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <Text className="text-base text-primary">Privacy Settings</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Group */}
        <View className="mb-6">
          <Text className="text-secondary font-bold text-sm uppercase mb-2 ml-1">Preferences</Text>
          <View className="bg-white rounded-2xl p-2 shadow-sm border border-gray-50">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <Text className="text-base text-primary">Order Notifications</Text>
              <Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: "#E5E7EB", true: COLORS.primary }} />
            </View>
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <Text className="text-base text-primary">Promotional Emails</Text>
              <Switch value={promotions} onValueChange={setPromotions} trackColor={{ false: "#E5E7EB", true: COLORS.primary }} />
            </View>
            <View className="flex-row items-center justify-between p-4">
              <Text className="text-base text-primary">Dark Mode</Text>
              <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ false: "#E5E7EB", true: COLORS.primary }} />
            </View>
          </View>
        </View>

        {/* About Group */}
        <View className="mb-8">
          <Text className="text-secondary font-bold text-sm uppercase mb-2 ml-1">About</Text>
          <View className="bg-white rounded-2xl p-2 shadow-sm border border-gray-50">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <Text className="text-base text-primary">Terms & Conditions</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <Text className="text-base text-primary">Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
            <View className="flex-row items-center justify-between p-4">
              <Text className="text-base text-secondary">App Version</Text>
              <Text className="text-base text-primary font-bold">1.0.0</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
