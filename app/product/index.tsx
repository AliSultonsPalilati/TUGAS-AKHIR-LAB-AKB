import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { 
    id: '1', 
    name: 'Short dress', 
    brand: 'H&M', 
    price: '$19.99',
    rating: 4,
    reviews: 10,
    image: 'https://i.pinimg.com/564x/ef/c5/c2/efc5c24597a731f1b25de355106f22c4.jpg'
  },
  { 
    id: '2', 
    name: 'Elegant Blouse', 
    brand: 'Zara', 
    price: '$24.99',
    rating: 5,
    reviews: 15,
    image: 'https://i.pinimg.com/564x/8e/9c/0c/8e9c0c3a817a02733b8a135be4816c14.jpg'
  },
  { 
    id: '5', 
    name: 'Casual T-Shirt', 
    brand: 'Uniqlo', 
    price: '$12.99',
    rating: 4,
    reviews: 25,
    image: 'https://i.pinimg.com/564x/42/69/34/426934651331405103f572f497368a00.jpg'
  },
  { 
    id: '3', 
    name: 'Summer Dress', 
    brand: 'Forever 21', 
    price: '$29.99',
    rating: 4,
    reviews: 18,
    image: 'https://i.pinimg.com/564x/ef/c5/c2/efc5c24597a731f1b25de355106f22c4.jpg'
  },
  { 
    id: '4', 
    name: 'Denim Jacket', 
    brand: 'Levi\'s', 
    price: '$89.99',
    rating: 5,
    reviews: 32,
    image: 'https://i.pinimg.com/564x/8e/9c/0c/8e9c0c3a817a02733b8a135be4816c14.jpg'
  },
  { 
    id: '6', 
    name: 'Wool Sweater', 
    brand: 'Gap', 
    price: '$45.99',
    rating: 4,
    reviews: 12,
    image: 'https://i.pinimg.com/564x/42/69/34/426934651331405103f572f497368a00.jpg'
  },
];

export default function ProductListScreen() {
  const navigateToProduct = (id: string) => {
    console.log('Navigating to product:', id);
    router.push(`/product/${id}`);
  };

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigateToProduct(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#9B9B9B" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons 
              key={i} 
              name="star" 
              size={12} 
              color={i < item.rating ? "#FFBA49" : "#D3D3D3"} 
            />
          ))}
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
        
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  productList: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCard: { 
    flex: 1,
    maxWidth: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: { 
    width: '100%', 
    height: 200, 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productInfo: {
    padding: 12,
  },
  productBrand: { 
    fontSize: 12, 
    color: '#9B9B9B',
    marginBottom: 4,
  },
  productName: { 
    fontSize: 14, 
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewsText: {
    fontSize: 10,
    color: '#9B9B9B',
    marginLeft: 4,
  },
  productPrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#DB3022' 
  },
});