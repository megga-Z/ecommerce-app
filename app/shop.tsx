import { dummyProducts } from "@/assets/assets";
import Header from "@/components/header";
import ProductCard from "@/components/ProductCard";
import { COLORS } from "@/constants";
import { Product } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Shop(){

const { category } = useLocalSearchParams<{ category?: string }>();
const [searchQuery, setSearchQuery] = useState("");
const [products, setPoducts] = useState<Product[]>([])
const [loading, setLoading] = useState(true)
const [loadingMore, setLoadingMore] = useState(false)
const [page, setPage] =  useState(1)
const [hasMore, setHasMore] = useState(true)

const fetchProducts = async (pageNumber = 1)=>{
    if (pageNumber === 1){
        setLoading(true)
    } else {
        setLoadingMore(true)
    }
    try {
        let filteredProducts = dummyProducts;
        if (category && category.toLowerCase() !== "all") {
            filteredProducts = filteredProducts.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        }
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        const start = (pageNumber-1)*10;
        const end = start + 10;
        const paginatedData = filteredProducts.slice(start, end)
        if (pageNumber === 1){
            setPoducts(paginatedData)
        }else{
            setPoducts(prev=> [...prev, ...paginatedData])
        }
        setHasMore(end < filteredProducts.length)
        setPage(pageNumber)

    } catch (error) {
        console.error("pagination:" , error)
    }finally{
        setLoading(false)
        setLoadingMore(false)
    }
}

const loadMore = ()=>{
    if(!loadingMore && !loading && hasMore){
        fetchProducts(page + 1)
    }
}

useEffect(()=>{
    fetchProducts(1)
},[category, searchQuery])

    return(
        <SafeAreaView className="flex-1 bg-surface"
        edges={['top']}>
             <Header title="Shop" showBack showCart />

             <View className="flex-row gap-2 mb-3 mx-4 my-2">
                {/**search bar */}
                <View className="flex-1 flex-row items-center
                bg-white rounded-xl ">
                    <Ionicons name="search" className="ml-4" size={20}
                    color={COLORS.secondary} />
                    <TextInput className="flex-1 ml-2 text-primary
                    px-4 py-3 border-0 outline-none " placeholder="Search products..." 
                    returnKeyType="search" placeholderTextColor={COLORS.secondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}/>
                </View>
                {/**filter icon */}
                <Pressable className="bg-grey-100 w-12 h-12
                items-center justify-center rounded-xl">
                    <Ionicons name = "options-outline" size={24}
                    color='black'/>
                </Pressable>
             </View>

             {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size='large'
                     color={COLORS.primary} />
                </View>
             ) : (
                <FlatList
                 data={products}
                 keyExtractor={(item) => item._id}
                 numColumns={2}
                 contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                 columnWrapperStyle={{ justifyContent: 'space-between' }}

                 renderItem={({ item }) => (
                  <ProductCard product={item} />
                  )}

                  onEndReached={loadMore}
                  onEndReachedThreshold={0.5}

                  ListFooterComponent={
                  loadingMore ? (
                    <ActivityIndicator
                     size="small"
                     color={COLORS.primary}
                     style={{ marginVertical: 20 }}
                     />
                      ) : null
                        }

                      ListEmptyComponent={
                        !loading && (
                           <View style={{ alignItems: "center", marginTop: 20 }}>
                               <Text className="text-seecondary">No products found</Text>
                             </View>
                                      )
                                      }
                                        />
                                    )}
        </SafeAreaView>
    )
}
