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

// --- DATA DUMMY (Sesuai dengan gambar) ---
const categoriesData: CategoriesData = {
  Women: [
    { 
      name: 'New', 
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80',
      subCategories: ['View all items', 'Tops', 'Shirts & Blouses', 'Cardigans & Sweaters', 'Knitwear', 'Blazers', 'Outerwear', 'Pants', 'Jeans', 'Shorts', 'Skirts', 'Dresses']
    },
    { 
      name: 'Clothes', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80',
      subCategories: ['View all items', 'Tops', 'Shirts & Blouses', 'Cardigans & Sweaters', 'Knitwear', 'Blazers', 'Outerwear', 'Pants', 'Jeans', 'Shorts', 'Skirts', 'Dresses']
    },
    { 
      name: 'Shoes', 
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
      subCategories: ['View all items', 'Heels', 'Boots', 'Flats', 'Sneakers', 'Sandals']
    },
    { 
      name: 'Accesories', 
      image: 'https://images.unsplash.com/photo-1611652022417-a55445a6b42d?w=500&q=80',
      subCategories: ['View all items', 'Necklaces', 'Bags', 'Hats', 'Belts', 'Watches', 'Sunglasses']
    },
  ],
  Men: [
    { 
      name: 'New', 
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', 
      subCategories: ['View all items', 'Shirts', 'T-shirts', 'Pants', 'Jeans', 'Jackets'] 
    },
    { 
      name: 'Clothes', 
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500&q=80', 
      subCategories: ['View all items', 'Shirts', 'T-shirts', 'Pants', 'Jeans', 'Jackets', 'Sweaters'] 
    },
    { 
      name: 'Shoes', 
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80', 
      subCategories: ['View all items', 'Sneakers', 'Boots', 'Loafers', 'Sandals'] 
    },
  ],
  Kids: [
    { 
      name: 'New', 
      image: 'https://images.unsplash.com/photo-1519241908597-39316a59b2a7?w=500&q=80', 
      subCategories: ['View all items', 'Boys', 'Girls', 'Baby'] 
    },
    { 
      name: 'Clothes', 
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80', 
      subCategories: ['View all items', 'Boys', 'Girls', 'Baby', 'School Uniforms'] 
    },
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
      <View style={styles.subCategoryContainer}>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>VIEW ALL ITEMS</Text>
        </TouchableOpacity>
        <Text style={styles.chooseCategoryText}>Choose category</Text>
        <View style={styles.subCategoryList}>
          {selectedCategory.subCategories.slice(1).map((sub, index) => (
            <TouchableOpacity key={sub} style={[styles.subCategoryItem, index === selectedCategory.subCategories.length - 2 && styles.lastSubCategoryItem]}>
              <Text style={styles.subCategoryText}>{sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Kustom */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => selectedCategory ? setSelectedCategory(null) : null}
          style={styles.headerButton}
        >
          {selectedCategory && <Ionicons name="chevron-back" size={24} color="#222" />}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Top Tab Navigator Kustom */}
      {!selectedCategory && (
        <View style={styles.tabContainer}>
          {(Object.keys(categoriesData) as (keyof CategoriesData)[]).map((tabName) => (
            <TouchableOpacity key={tabName} style={styles.tabButton} onPress={() => setActiveTab(tabName)}>
              <Text style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>{tabName}</Text>
              {activeTab === tabName && <View style={styles.activeTabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedCategory ? renderSubCategories() : renderMainCategories()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9F9F9' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EFEFEF',
    elevation: 2,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#222',
  },
  tabContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  tabButton: { 
    alignItems: 'center', 
    paddingVertical: 12, 
    flex: 1,
    position: 'relative',
  },
  tabText: { 
    color: '#9B9B9B', 
    fontSize: 16,
    fontWeight: '400',
  },
  activeTabText: { 
    color: '#DB3022', 
    fontWeight: 'bold' 
  },
  activeTabIndicator: { 
    height: 3, 
    width: '80%', 
    backgroundColor: '#DB3022', 
    marginTop: 8,
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
  },
  contentContainer: { 
    paddingBottom: 20 
  },
  
  // Main Categories Styles
  promoBanner: { 
    backgroundColor: '#DB3022', 
    borderRadius: 8, 
    margin: 16, 
    padding: 20, 
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  promoBannerTitle: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  promoBannerSubtitle: { 
    color: 'white', 
    fontSize: 14, 
    marginTop: 4,
    opacity: 0.9,
  },
  categoryCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    marginHorizontal: 16, 
    marginBottom: 8, 
    borderRadius: 8, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    overflow: 'hidden',
  },
  categoryName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    paddingLeft: 24, 
    flex: 1,
    color: '#222',
  },
  categoryImage: { 
    width: 150, 
    height: 100,
    resizeMode: 'cover',
  },
  
  // Sub Categories Styles
  subCategoryContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  viewAllButton: { 
    backgroundColor: '#DB3022', 
    margin: 16, 
    padding: 15, 
    borderRadius: 25, 
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  viewAllButtonText: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  chooseCategoryText: { 
    color: '#9B9B9B', 
    paddingHorizontal: 16, 
    marginBottom: 8,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subCategoryList: {
    backgroundColor: 'white',
  },
  subCategoryItem: { 
    backgroundColor: 'white', 
    paddingVertical: 18, 
    paddingHorizontal: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0',
  },
  lastSubCategoryItem: {
    borderBottomWidth: 0,
  },
  subCategoryText: { 
    fontSize: 16, 
    color: '#222',
    fontWeight: '400',
  },
});