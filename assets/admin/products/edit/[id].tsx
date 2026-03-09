import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Switch, Image, ActivityIndicator, Platform, Modal, FlatList, TouchableWithoutFeedback } from "react-native";
import Toast from 'react-native-toast-message';
import { COLORS, CATEGORIES } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { dummyProducts } from "@/assets/assets";

export default function EditProduct() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [sizes, setSizes] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);

    // Image State
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product: any = dummyProducts.find((p) => p._id === id);
                setName(product.name);
                setDescription(product.description || "");
                setPrice(product.price.toString());
                setStock(product.stock.toString());
                setCategory(typeof product.category === 'object' ? product.category.name : product.category);
                setIsFeatured(product.isFeatured);

                if (product.sizes) setSizes(Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes);

                if (product.images && Array.isArray(product.images)) {
                    setExistingImages(product.images);
                } else if (product.images) {
                    setExistingImages([product.images]);
                }
            } catch (error: any) {
                console.error("Failed to fetch product:", error);
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Fetch Product',
                    text2: error.response?.data?.message || "Something went wrong"
                });
                router.back();
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 5 - (existingImages.length + newImages.length),
            quality: 0.8,
        });

        if (!result.canceled) {
            const uris = result.assets.map((asset) => asset.uri);
            setNewImages([...newImages, ...uris]);
        }
    };

    const removeExistingImage = (index: number) => {
        const updated = [...existingImages];
        updated.splice(index, 1);
        setExistingImages(updated);
    };

    const removeNewImage = (index: number) => {
        const updated = [...newImages];
        updated.splice(index, 1);
        setNewImages(updated);
    };

    const handleSubmit = async () => {
        if (!name || !price || sizes.length < 1) {
            Toast.show({
                type: 'error',
                text1: 'Missing Fields',
                text2: 'Please fill in all required fields'
            });
            return;
        }

        try {
            setSubmitting(true);
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("category", category);
            formData.append("isFeatured", String(isFeatured));
            formData.append("sizes", sizes);

            // Append existing images
            existingImages.forEach((img) => {
                formData.append("existingImages", img);
            });

            // Append new images
            for (const [i, uri] of newImages.entries()) {
                const filename = `new-image-${i}.jpg`;
                if (Platform.OS === "web") {
                    const blob = await (await fetch(uri)).blob();
                    formData.append("images", new File([blob], filename, { type: "image/jpeg" }));
                } else {
                    formData.append("images", { uri, name: filename, type: "image/jpeg" } as any);
                }
            }
            router.back();
        } catch (error: any) {
            console.error("Failed to update product:", error);
            Toast.show({
                type: 'error',
                text1: 'Failed to Update Product',
                text2: error.response?.data?.message || "Something went wrong"
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-surface">
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-surface p-4">
            <View className="bg-white p-4 rounded-xl border border-gray-100 mb-20">
                <Text className="text-secondary text-xs font-bold mb-1 uppercase">Product Name *</Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    value={name}
                    onChangeText={setName}
                />

                <Text className="text-secondary text-xs font-bold mb-1 uppercase">Price ($) *</Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    keyboardType="decimal-pad"
                    value={price}
                    onChangeText={setPrice}
                />

                <Text className="text-secondary text-xs font-bold mb-1 uppercase">Stock Level</Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    keyboardType="number-pad"
                    value={stock}
                    onChangeText={setStock}
                />

                <Text className="text-secondary text-xs font-bold mb-1 uppercase">Sizes (comma separated)</Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-4 text-primary"
                    placeholder="e.g. S, M, L"
                    value={sizes}
                    onChangeText={setSizes}
                />

                <Text className="text-secondary text-xs font-bold mb-1 uppercase">
                    Category
                </Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="bg-surface p-3 rounded-lg mb-4 flex-row justify-between items-center"
                >
                    <Text className="text-primary">{category || "Select Category"}</Text>
                    <Ionicons name="chevron-down" size={20} color={COLORS.secondary} />
                </TouchableOpacity>

                <Modal visible={modalVisible} animationType="slide" transparent>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View className="flex-1 justify-end bg-black/50">
                            <View className="bg-white rounded-t-2xl p-4 max-h-[50%]">
                                <Text className="text-lg font-bold text-center mb-4">Select Category</Text>
                                <FlatList
                                    data={CATEGORIES}
                                    keyExtractor={(item) => String(item.id)}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className={`p-4 border-b ${category === item.name ? "bg-primary/5" : ""}`}
                                            onPress={() => {
                                                setCategory(item.name);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <View className="flex-row justify-between">
                                                <Text className={`${category === item.name ? "font-bold text-primary" : ""}`}>{item.name}</Text>
                                                {category === item.name && <Ionicons name="checkmark" size={20} color={COLORS.primary} />}
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Text className="text-secondary text-xs font-bold mb-1 uppercase">Images</Text>
                <View className="mb-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {existingImages.map((uri, index) => (
                            <View key={`existing-${index}`} className="relative mr-2">
                                <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
                                <TouchableOpacity
                                    onPress={() => removeExistingImage(index)}
                                    className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                                >
                                    <Ionicons name="close" size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {newImages.map((uri, index) => (
                            <View key={`new-${index}`} className="relative mr-2">
                                <Image source={{ uri }} className="w-24 h-24 rounded-lg border-2 border-primary" />
                                <TouchableOpacity
                                    onPress={() => removeNewImage(index)}
                                    className="absolute top-1 right-1 bg-primary rounded-full p-1"
                                >
                                    <Ionicons name="close" size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {(existingImages.length + newImages.length) < 5 && (
                            <TouchableOpacity
                                onPress={pickImages}
                                className="w-24 h-24 rounded-lg bg-gray-100 justify-center items-center border border-dashed border-gray-300"
                            >
                                <Ionicons name="add" size={24} color={COLORS.secondary} />
                                <Text className="text-xs text-secondary mt-1">Add</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                <Text className="text-secondary text-xs font-bold mb-1 uppercase">Description</Text>
                <TextInput
                    className="bg-surface p-3 rounded-lg mb-6 text-primary h-24"
                    multiline
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />

                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-primary font-bold">Featured Product</Text>
                    <Switch
                        value={isFeatured}
                        onValueChange={setIsFeatured}
                        trackColor={{ false: "#eee", true: COLORS.primary }}
                    />
                </View>

                <TouchableOpacity
                    className={`bg-primary p-4 rounded-xl items-center ${submitting ? 'opacity-70' : ''}`}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-medium text-lg">Update Product</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
