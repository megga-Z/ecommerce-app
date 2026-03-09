import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { COLORS } from "@/constants";
import type { Order, Product } from "@/constants/types";
import { dummyOrders } from "@/assets/assets";

export default function OrderDetails() {
    const { id } = useLocalSearchParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchOrderDetails = async () => {
        setOrder(dummyOrders.find((order) => order._id === id) as any);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-surface justify-center items-center">
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        );
    }

    if (!order) {
        return (
            <SafeAreaView className="flex-1 bg-surface justify-center items-center">
                <Text>Order not found</Text>
            </SafeAreaView>
        );
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const ORDER_STEPS = [
        { title: "Order Placed", date: formatDate(order.createdAt), completed: true },
        { title: "Processing", date: "", completed: ['processing', 'shipped', 'delivered'].includes(order.orderStatus) },
        { title: "Shipped", date: "", completed: ['shipped', 'delivered'].includes(order.orderStatus) },
        { title: "Delivered", date: "", completed: order.orderStatus === 'delivered' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
            <Header title={`Order #${order.orderNumber}`} showBack />

            <ScrollView className="flex-1 px-4 pt-4">
                {/* Order Status */}
                <View className="bg-white p-4 rounded-xl mb-4 border border-gray-100">
                    <Text className="text-lg font-bold text-primary mb-4">Order Status</Text>

                    {ORDER_STEPS.map((step, index) => (
                        <View key={index} className="flex-row mb-4 last:mb-0">
                            <View className="items-center mr-4">
                                <View className={`w-3 h-3 rounded-full ${step.completed ? 'bg-primary' : 'bg-gray-300'}`} />
                                {index !== ORDER_STEPS.length - 1 && (
                                    <View className={`w-0.5 h-full ${step.completed ? 'bg-primary' : 'bg-gray-300'} absolute top-3`} />
                                )}
                            </View>
                            <View className="pb-4">
                                <Text className={`font-bold ${step.completed ? 'text-primary' : 'text-gray-400'}`}>{step.title}</Text>
                                {step.date ? <Text className="text-secondary text-xs">{step.date}</Text> : null}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Items */}
                <View className="bg-white p-4 rounded-xl mb-4 border border-gray-100">
                    <Text className="text-lg font-bold text-primary mb-4">Products</Text>
                    {order.items.map((item: any, index: number) => {

                        const productData = item.product as Product;
                        const image = productData?.images?.[0];

                        return (
                            <View key={index} className={`flex-row ${index !== order.items.length - 1 && 'border-b border-gray-100 pb-4 mb-4'}`}>
                                {image && <Image source={{ uri: image }} className="w-16 h-16 rounded-lg bg-gray-100" resizeMode="contain" />}
                                <View className="flex-1 ml-3 justify-center">
                                    <Text className="text-primary font-medium" numberOfLines={1}>{item.name}</Text>
                                    <Text className="text-secondary text-xs">Size: {item.size}</Text>
                                    <View className="flex-row justify-between items-center mt-2">
                                        <Text className="text-primary font-bold">${item.price}</Text>
                                        <Text className="text-secondary text-xs">Qty: {item.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>

                {/* Shipping Details */}
                <View className="bg-white p-4 rounded-xl mb-4 border border-gray-100">
                    <Text className="text-lg font-bold text-primary mb-2">Shipping Details</Text>
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="location-outline" size={20} color={COLORS.secondary} />
                        <Text className="text-secondary ml-2 flex-1">
                            {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.zipCode}, {order.shippingAddress?.country}
                        </Text>
                    </View>
                </View>

                {/* Payment Summary */}
                <View className="bg-white p-4 rounded-xl mb-8 border border-gray-100">
                    <Text className="text-lg font-bold text-primary mb-4">Payment Summary</Text>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-secondary">Payment Method</Text>
                        <Text className="text-primary font-medium capitalize">{order.paymentMethod}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-secondary">Payment Status</Text>
                        <Text className={`font-medium capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : order.paymentStatus === 'failed' ? 'text-red-600' : 'text-orange-500'}`}>
                            {order.paymentStatus}
                        </Text>
                    </View>
                    <View className="h-px bg-gray-100 my-2" />
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-secondary">Subtotal</Text>
                        <Text className="text-primary font-medium">${order.subtotal.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-secondary">Shipping</Text>
                        <Text className="text-primary font-medium">${order.shippingCost.toFixed(2)}</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-secondary">Tax</Text>
                        <Text className="text-primary font-medium">${order.tax.toFixed(2)}</Text>
                    </View>
                    <View className="h-px bg-gray-100 my-2" />
                    <View className="flex-row justify-between">
                        <Text className="text-primary font-bold text-lg">Total</Text>
                        <Text className="text-primary font-bold text-lg">${order.totalAmount.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
