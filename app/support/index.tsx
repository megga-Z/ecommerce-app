import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/header";
import { COLORS } from "@/constants";

const FAQS = [
  { id: '1', q: 'How do I track my order?', a: 'You can easily track your order in the "My Orders" interface on your Profile tab, which provides real-time status updates.' },
  { id: '2', q: 'What is your return policy?', a: 'We accept returns within 30 days of the item delivery. Make sure the items are unused and in original packaging.' },
  { id: '3', q: 'How can I change my shipping address?', a: 'You can update your default shipping address in the Profile tab under "Shipping Addresses".' },
  { id: '4', q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. Additional shipping fees may apply during checkout.' },
];

export default function Support() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <Header title="Help & Support" showBack />
      
      <ScrollView className="flex-1 px-4 pt-4 mb-10" showsVerticalScrollIndicator={false}>
        
        {/* Contact Strip */}
        <View className="flex-row gap-4 mb-8">
            <TouchableOpacity className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-50 items-center justify-center">
                <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="chatbubbles-outline" size={24} color={COLORS.primary} />
                </View>
                <Text className="font-bold text-primary">Live Chat</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-50 items-center justify-center">
                <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
                </View>
                <Text className="font-bold text-primary">Email Us</Text>
            </TouchableOpacity>
        </View>

        {/* FAQs */}
        <Text className="text-primary font-bold text-xl mb-4 ml-1">Frequently Asked Questions</Text>
        
        <View className="bg-white rounded-2xl p-2 shadow-sm border border-gray-50">
          {FAQS.map((faq, index) => (
            <View key={faq.id} className={`${index !== FAQS.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <TouchableOpacity 
                className="flex-row items-center justify-between p-4"
                onPress={() => toggleExpand(faq.id)}
              >
                <Text className="text-base text-primary font-medium flex-1 mr-4 leading-6">{faq.q}</Text>
                <Ionicons 
                    name={expandedId === faq.id ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={COLORS.secondary} 
                />
              </TouchableOpacity>
              
              {expandedId === faq.id && (
                  <View className="px-4 pb-4">
                      <Text className="text-secondary leading-5">{faq.a}</Text>
                  </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity className="w-full bg-primary/10 py-4 rounded-full items-center mt-8 mb-10">
            <Text className="text-primary font-bold text-lg">Still need help? Call us</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
