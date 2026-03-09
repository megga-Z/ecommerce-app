import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl, Alert, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import { COLORS, getStatusColor } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { dummyOrders, dummyUser } from "@/assets/assets";

export default function AdminOrders() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [orders, setOrders] = useState([]);

    // Status Modal State
    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [updating, setUpdating] = useState(false);

    const STATUSES = ["placed", "processing", "shipped", "delivered", "cancelled"];

    const fetchOrders = async () => {
        setOrders(dummyOrders.map((order: any) => ({
            ...order,
            user: dummyUser
        })) as any);
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders();
    };

    const openStatusModal = (order: any) => {
        setSelectedOrder(order);
        setStatusModalVisible(true);
    };

    const updateStatus = async (newStatus: string) => {
        if (!selectedOrder) return;
        setOrders(orders.map((order: any) => order._id === selectedOrder._id ? { ...order, orderStatus: newStatus } : order) as any);
        setStatusModalVisible(false);
        setUpdating(false);
    };

    if (loading && !refreshing) {
        return (
            <View className="flex-1 justify-center items-center bg-surface">
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-surface">
            <ScrollView
                className="flex-1 p-4"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {orders.length === 0 ? (
                    <View className="flex-1 justify-center items-center mt-20">
                        <Text className="text-secondary">No orders found</Text>
                    </View>
                ) : (
                    orders.map((order: any) => (
                        <View key={order._id} className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-gray-100">
                            <View className="flex-row justify-between mb-2">
                                <Text className="font-medium text-sm text-gray-400 ">Order ID : #{order._id}</Text>
                                <Text className="text-secondary text-xs">{new Date(order.createdAt).toLocaleDateString()}</Text>
                            </View>

                            <View className="mb-3 bg-gray-50 p-3 rounded-lg">
                                <Text className="text-xs text-secondary font-bold mb-1">CUSTOMER</Text>
                                <Text className="text-primary font-medium">{order.user?.name || 'Unknown User'}</Text>
                                <Text className="text-secondary text-xs">{order.user?.email || 'No email'}</Text>
                                {!order.user && <Text className="text-xs text-gray-400 mt-1">ID: {order.user?._id || 'N/A'}</Text>}
                            </View>

                            <View className="mb-3 bg-gray-50 p-3 rounded-lg">
                                <Text className="text-xs text-secondary font-bold mb-1">SHIPPING ADDRESS</Text>
                                <Text className="text-primary text-xs">
                                    {order.shippingAddress?.street}, {order.shippingAddress?.city}
                                </Text>
                                <Text className="text-primary text-xs">
                                    {order.shippingAddress?.state}, {order.shippingAddress?.zipCode}, {order.shippingAddress?.country}
                                </Text>
                            </View>

                            <View className="mb-3">
                                <Text className="text-xs text-secondary font-bold mb-2">ITEMS</Text>
                                {order.items.map((item: any) => (
                                    <View key={item._id} className="flex-row justify-between mb-1">
                                        <Text className="text-secondary text-xs flex-1">
                                            {item.quantity}x {item.product?.name || item.name}
                                            {(item.size) && (
                                                <Text className="text-gray-400">
                                                    {" "}({item.size || '-'})
                                                </Text>
                                            )}
                                        </Text>
                                        <Text className="text-secondary text-xs font-bold">
                                            ${item.price.toFixed(2)}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View className="flex-row justify-between items-center mt-2 pt-3 border-t border-gray-100">
                                <Text className="text-primary font-bold text-lg">${order.totalAmount.toFixed(2)}</Text>

                                <TouchableOpacity
                                    onPress={() => openStatusModal(order)}
                                    className={`flex-row items-center px-4 py-2 rounded-full ${getStatusColor(order.orderStatus)}`}
                                >
                                    <Text className="text-xs font-bold mr-2 uppercase tracking-wide">{order.orderStatus}</Text>
                                    <Ionicons name="pencil" size={12} color="black" style={{ opacity: 0.5 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* STATUS MODAL */}
            <Modal visible={statusModalVisible} animationType="fade" transparent>
                <TouchableWithoutFeedback onPress={() => setStatusModalVisible(false)}>
                    <View className="flex-1 justify-end bg-black/50">
                        <View className="bg-white rounded-t-2xl p-4 max-h-[60%]">
                            <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                <Text className="text-lg font-bold text-primary">
                                    Update Order Status
                                </Text>
                                <TouchableOpacity onPress={() => setStatusModalVisible(false)}>
                                    <Ionicons name="close" size={24} color={COLORS.secondary} />
                                </TouchableOpacity>
                            </View>

                            {updating ? (
                                <View className="py-8">
                                    <ActivityIndicator size="large" color={COLORS.primary} />
                                    <Text className="text-center text-secondary mt-2">Updating status...</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={STATUSES}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className={`p-4 rounded-xl mb-2 flex-row justify-between items-center ${selectedOrder?.orderStatus === item ? "bg-primary/10" : "bg-gray-50"
                                                }`}
                                            onPress={() => updateStatus(item)}
                                        >
                                            <Text className={`font-medium capitalize ${selectedOrder?.orderStatus === item ? "text-primary font-bold" : "text-secondary"
                                                }`}>
                                                {item}
                                            </Text>
                                            {selectedOrder?.orderStatus === item && (
                                                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
