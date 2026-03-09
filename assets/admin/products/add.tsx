import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Switch, Image, ActivityIndicator, Modal, FlatList, TouchableWithoutFeedback, Platform, } from "react-native";
import Toast from 'react-native-toast-message';
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { CATEGORIES } from "@/constants";

export default function AddProduct() {

    const [submitting, setSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Men");
    const [sizes, setSizes] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [isFeatured, setIsFeatured] = useState(false);

    // PICK MULTIPLE IMAGES (MAX 5)
    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 5,
            quality: 0.8,
        });

        if (!result.canceled) {
            const uris = result.assets.map((asset) => asset.uri);
            setImages(uris.slice(0, 5));
        }
    };

    // Add Product
    const handleSubmit = async () => {
        if (!name || !price || !category || sizes.length < 1) {
            Toast.show({
                type: 'error',
                text1: 'Missing Fields',
                text2: 'Please fill in all required fields'
            });
            return;
        }
    };

    return (
        <ScrollView className="flex-1 bg-surface p-4">
            <View className="bg-white p-4 rounded-xl shadow-sm mb-20">
                {/* NAME */}
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Product Name *
                </Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    placeholder="e.g. Wireless Headphones"
                    value={name}
                    onChangeText={setName}
                />

                {/* PRICE */}
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Price ($) *
                </Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    value={price}
                    onChangeText={setPrice}
                />

                {/* CATEGORY */}
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Category
                </Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="bg-surface p-3 rounded-lg mb-4 flex-row justify-between items-center"
                >
                    <Text className="text-primary">{category}</Text>
                    <Ionicons name="chevron-down" size={20} color={COLORS.secondary} />
                </TouchableOpacity>

                {/* CATEGORY MODAL */}
                <Modal visible={modalVisible} animationType="slide" transparent>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View className="flex-1 justify-end bg-black/50">
                            <View className="bg-white rounded-t-2xl p-4 max-h-[50%]">
                                <Text className="text-lg font-bold text-center mb-4">
                                    Select Category
                                </Text>

                                <FlatList
                                    data={CATEGORIES}
                                    keyExtractor={(item) => String(item.id)}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className={`p-4 border-b ${category === item.name ? "bg-primary/5" : ""
                                                }`}
                                            onPress={() => {
                                                setCategory(item.name);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <View className="flex-row justify-between">
                                                <Text
                                                    className={`${category === item.name ? "font-bold text-primary" : ""
                                                        }`}
                                                >
                                                    {item.name}
                                                </Text>
                                                {category === item.name && (
                                                    <Ionicons
                                                        name="checkmark"
                                                        size={20}
                                                        color={COLORS.primary}
                                                    />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* STOCK */}
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Stock Level
                </Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    placeholder="0"
                    keyboardType="number-pad"
                    value={stock}
                    onChangeText={setStock}
                />

                {/* SIZES */}
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Sizes (comma separated)
                </Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    placeholder="e.g. S, M, L, XL"
                    value={sizes}
                    onChangeText={setSizes}
                />

                {/* IMAGE PICKER */}
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Product Images (max 5)
                </Text>

                <TouchableOpacity onPress={pickImages} className="mb-4">
                    {images.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {images.map((uri, i) => (
                                <Image
                                    key={i}
                                    source={{ uri }}
                                    className="w-32 h-32 rounded-lg mr-2"
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <View className="w-full h-32 rounded-lg bg-gray-100 justify-center items-center border border-dashed border-gray-300">
                            <Ionicons
                                name="cloud-upload-outline"
                                size={32}
                                color={COLORS.secondary}
                            />
                            <Text className="text-secondary text-xs mt-2">
                                Tap to upload images
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* DESCRIPTION */}
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Description
                </Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-6 text-primary h-24"
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />

                {/* FEATURED */}
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-primary font-bold">Featured Product</Text>
                    <Switch
                        value={isFeatured}
                        onValueChange={setIsFeatured}
                        trackColor={{ false: "#eee", true: COLORS.primary }}
                    />
                </View>

                {/* SUBMIT */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={submitting}
                    className={`bg-primary p-4 rounded-xl items-center ${submitting ? "opacity-70" : ""
                        }`}
                >
                    {submitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-bold text-lg">
                            Create Product
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
