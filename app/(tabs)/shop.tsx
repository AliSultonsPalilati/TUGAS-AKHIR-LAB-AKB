import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// DITAMBAHKAN: Mendefinisikan tipe data untuk satu kategori
type Category = {
  name: string;
  image: string;
  subCategories: string[];
};

// DITAMBAHKAN: Mendefinisikan tipe data untuk seluruh objek kategori
type CategoriesData = {
  Women: Category[];
  Men: Category[];
  Kids: Category[];
};

// --- DATA DUMMY (Nantinya diganti dari API) ---
const categoriesData: CategoriesData = {
  Women: [
    { 
      name: 'New', 
      image: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500&q=80',
      subCategories: ['View all items', 'Tops', 'Shirts', 'Dresses', 'Pants', 'Jeans']
    },
    { 
      name: 'Clothes', 
      image: 'https://images.unsplash.com/photo-1499939667766-4afceb292d0b?w=500&q=80',
      subCategories: ['View all items', 'Tops', 'Shirts & Blouses', 'Cardigans & Sweaters', 'Knitwear', 'Blazers', 'Outerwear', 'Pants', 'Jeans', 'Shorts', 'Skirts', 'Dresses']
    },
    { 
      name: 'Shoes', 
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
      subCategories: ['View all items', 'Heels', 'Boots', 'Flats', 'Sneakers']
    },
    { 
      name: 'Accesories', 
      image: 'https://images.unsplash.com/photo-1611652022417-a55445a6b42d?w=500&q=80',
      subCategories: ['View all items', 'Necklaces', 'Bags', 'Hats', 'Belts']
    },
  ],
  Men: [
    { name: 'New', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', subCategories: [] },
  ],
  Kids: [
    { name: 'New', image: 'https://images.unsplash.com/photo-1519241908597-39316a59b2a7?w=500&q=80', subCategories: [] },
  ],
};
// --- END OF DATA DUMMY ---

export default function ShopScreen() {
  // DIUBAH: Memberi tipe yang spesifik pada state
  const [activeTab, setActiveTab] = useState<keyof CategoriesData>('Women');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const renderMainCategories = () => (
    <>
      <TouchableOpacity style={styles.promoBanner}>
        <Text style={styles.promoBannerTitle}>SUMMER SALES</Text>
        <Text style={styles.promoBannerSubtitle}>Up to 50% off</Text>
      </TouchableOpacity>
      {categoriesData[activeTab].map((category) => (
        <TouchableOpacity key={category.name} style={styles.categoryCard} onPress={() => setSelectedCategory(category)}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Image source={{ uri: category.image }} style={styles.categoryImage} />
        </TouchableOpacity>
      ))}
    </>
  );

  const renderSubCategories = () => {
    // DITAMBAHKAN: Pengecekan untuk memastikan selectedCategory tidak null
    if (!selectedCategory) {
      return null;
    }

    return (
      <>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>VIEW ALL ITEMS</Text>
        </TouchableOpacity>
        <Text style={styles.chooseCategoryText}>Choose category</Text>
        {selectedCategory.subCategories.slice(1).map((sub) => (
          <TouchableOpacity key={sub} style={styles.subCategoryItem}>
            <Text style={styles.subCategoryText}>{sub}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Kustom */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => selectedCategory ? setSelectedCategory(null) : null}>
          {selectedCategory && <Ionicons name="chevron-back" size={24} color="#222" />}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Top Tab Navigator Kustom */}
      <View style={styles.tabContainer}>
        {(Object.keys(categoriesData) as (keyof CategoriesData)[]).map((tabName) => (
          <TouchableOpacity key={tabName} style={styles.tabButton} onPress={() => setActiveTab(tabName)}>
            <Text style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>{tabName}</Text>
            {activeTab === tabName && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {selectedCategory ? renderSubCategories() : renderMainCategories()}
      </ScrollView>
    </SafeAreaView>
  );
}

// Stylesheet tidak perlu diubah
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    tabContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFFFFF' },
    tabButton: { alignItems: 'center', paddingVertical: 12, flex: 1 },
    tabText: { color: '#9B9B9B', fontSize: 16 },
    activeTabText: { color: '#DB3022', fontWeight: 'bold' },
    activeTabIndicator: { height: 3, width: '60%', backgroundColor: '#DB3022', marginTop: 8 },
    contentContainer: { paddingBottom: 20 },
    promoBanner: { backgroundColor: '#DB3022', borderRadius: 8, margin: 16, padding: 20, alignItems: 'center' },
    promoBannerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    promoBannerSubtitle: { color: 'white', fontSize: 14, marginTop: 4 },
    categoryCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', marginHorizontal: 16, marginBottom: 8, borderRadius: 8, elevation: 2, overflow: 'hidden' },
    categoryName: { fontSize: 18, fontWeight: 'bold', paddingLeft: 24, flex: 1 },
    categoryImage: { width: 150, height: 100 },
    viewAllButton: { backgroundColor: '#DB3022', margin: 16, padding: 15, borderRadius: 25, alignItems: 'center' },
    viewAllButtonText: { color: 'white', fontSize: 14, fontWeight: '500' },
    chooseCategoryText: { color: '#9B9B9B', paddingHorizontal: 16, marginBottom: 10 },
    subCategoryItem: { backgroundColor: 'white', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
    subCategoryText: { fontSize: 16, color: '#222' },
});