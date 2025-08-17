import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ListRenderItemInfo,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Tipe data untuk Produk (TypeScript)
interface Product {
  id: string;
  brand: string;
  name: string;
  color: string;
  size: string;
  price: string;
  rating: number;
  reviewCount: number;
  image: string;
  tag: string | null;
  soldOut: boolean;
  discount: string | null;
}

const categories = ["Summer", "T-Shirts", "Shirts", "Pants", "Dresses"];

const products: Product[] = [
  {
    id: "1",
    brand: "LIME",
    name: "Shirt",
    color: "Blue",
    size: "L",
    price: "32$",
    rating: 4,
    reviewCount: 10,
    image: "https://images.pexels.com/photos/6311652/pexels-photo-6311652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: null,
    soldOut: false,
    discount: null,
  },
  {
    id: "2",
    brand: "Mango",
    name: "Longsleeve Violeta",
    color: "Orange",
    size: "S",
    price: "46$",
    rating: 0,
    reviewCount: 0,
    image: "https://i.pinimg.com/736x/ca/f3/c8/caf3c86e9bfaa8f77fbffbea98d688f9.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: "NEW",
    soldOut: false,
    discount: null,
  },
  {
    id: "3",
    brand: "Olivier",
    name: "Shirt",
    color: "Black",
    size: "L",
    price: "52$",
    rating: 3,
    reviewCount: 3,
    image: "https://i.pinimg.com/736x/38/0f/fe/380ffe23add20a4a765e68554034ebe8.jpg",
    tag: null,
    soldOut: true,
    discount: null,
  },
  {
    id: "4",
    brand: "&Berries",
    name: "T-Shirt",
    color: "Black",
    size: "S",
    price: "30$",
    rating: 5,
    reviewCount: 15,
    image: "https://i.pinimg.com/1200x/d0/6f/f7/d06ff7496e04ff47ab41497a706bf30f.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    tag: null,
    soldOut: false,
    discount: "-30%",
  },
];

type RatingProps = {
  rating: number;
  reviewCount: number;
};

const Rating = ({ rating, reviewCount }: RatingProps) => (
  <View style={styles.ratingContainer}>
    {[...Array(5)].map((_, i) => (
      <Ionicons
        key={i}
        name="star"
        size={16}
        color={i < rating ? "#FFBA49" : "#D4D4D4"}
      />
    ))}
    {reviewCount > 0 && <Text style={styles.reviewCount}>({reviewCount})</Text>}
  </View>
);

type ProductCardProps = {
  item: Product;
};

const ProductCard = ({ item }: ProductCardProps) => (
  <View style={[styles.productCard, item.soldOut && styles.soldOutCard]}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      {item.tag && (
        <View style={[styles.tag, styles.newTag]}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      )}
      {item.discount && (
        <View style={[styles.tag, styles.discountTag]}>
          <Text style={styles.tagText}>{item.discount}</Text>
        </View>
      )}
    </View>

    <View style={styles.productDetails}>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detailsText}>
        Color: {item.color} Size: {item.size}
      </Text>
      <Text style={styles.price}>{item.price}</Text>
      
      {!item.soldOut && (
        <Rating rating={item.rating} reviewCount={item.reviewCount} />
      )}
    </View>

    <TouchableOpacity style={styles.closeButton}>
      <Ionicons name="close" size={20} color="#9B9B9B" />
    </TouchableOpacity>

    {!item.soldOut && (
      <TouchableOpacity style={styles.addToBagButton}>
        <MaterialCommunityIcons name="shopping" size={20} color="white" />
      </TouchableOpacity>
    )}
     {item.soldOut && (
        <Text style={styles.soldOutText}>Sorry, this item is currently sold out</Text>
      )}
  </View>
);

// Komponen Utama
export default function FavoritesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("T-Shirts");
  
  const renderProductItem = ({ item }: ListRenderItemInfo<Product>) => (
    <ProductCard item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <TouchableOpacity>
            <Ionicons name="search-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.activeCategoryChip,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#222" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="swap-vertical" size={22} color="#222" />
          <Text style={styles.filterText}>Price: lowest to high</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="grid" size={20} color="#222" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
  },
  categoryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: "white",
    marginRight: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  activeCategoryChip: {
    backgroundColor: "black",
  },
  categoryText: {
    fontSize: 14,
    color: "black",
  },
  activeCategoryText: {
    color: "white",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#222',
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  soldOutCard: {
    opacity: 0.6,
  },
  imageContainer: {
    width: 104,
    height: 124,
    backgroundColor: '#f0f0f0' 
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  tag: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  newTag: {
    backgroundColor: 'black',
  },
  discountTag: {
    backgroundColor: '#DB3022',
  },
  tagText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  productDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 12,
    color: "#9B9B9B",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  detailsText: {
    fontSize: 12,
    color: "#9B9B9B",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewCount: {
    fontSize: 12,
    color: "#9B9B9B",
    marginLeft: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  addToBagButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DB3022',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  soldOutText: {
    position: 'absolute',
    bottom: 12,
    left: 160,
    fontSize: 12,
    color: '#F01F0E',
    fontWeight: 'bold'
  },
});