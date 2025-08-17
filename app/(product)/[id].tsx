import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Modal, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

// --- DATA DUMMY (Nantinya diganti dari API berdasarkan ID) ---
const productData = {
  id: '1',
  name: 'Short dress',
  brand: 'H&M',
  price: '$19.99',
  rating: 4,
  reviews: 10,
  description: 'Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed.',
  images: [
    'https://i.pinimg.com/564x/ef/c5/c2/efc5c24597a731f1b25de355106f22c4.jpg',
    'https://i.pinimg.com/564x/8e/9c/0c/8e9c0c3a817a02733b8a135be4816c14.jpg',
    'https://i.pinimg.com/564x/42/69/34/426934651331405103f572f497368a00.jpg',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Black', 'White', 'Red'],
};
// --- END OF DATA DUMMY ---

const { width: screenWidth } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isSizeModalVisible, setSizeModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  console.log('Displaying product with ID:', id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* Header Kustom */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{productData.name}</Text>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="#222" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Carousel */}
          <FlatList
            horizontal
            data={productData.images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.productImage} />}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />

          {/* Info Produk */}
          <View style={styles.infoContainer}>
            <View style={styles.selectionRow}>
              <TouchableOpacity style={styles.selectionButton} onPress={() => setSizeModalVisible(true)}>
                <Text style={styles.selectionText}>Size</Text>
                <Ionicons name="chevron-down" size={16} color="#9B9B9B" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectionButton}>
                <Text style={styles.selectionText}>Black</Text>
                <Ionicons name="chevron-down" size={16} color="#9B9B9B" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.favButton} onPress={() => setIsFavorited(!isFavorited)}>
                <Ionicons name={isFavorited ? "heart" : "heart-outline"} size={24} color={isFavorited ? "#DB3022" : "#9B9B9B"} />
              </TouchableOpacity>
            </View>

            <View style={styles.titleRow}>
                <View>
                    <Text style={styles.brandText}>{productData.brand}</Text>
                    <Text style={styles.nameText}>{productData.name}</Text>
                </View>
                <Text style={styles.priceText}>{productData.price}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                {[...Array(5)].map((_, i) => <Ionicons key={i} name="star" size={14} color={i < productData.rating ? "#FFBA49" : "#D3D3D3"} />)}
                <Text style={styles.ratingText}>({productData.reviews})</Text>
            </View>
            <Text style={styles.descriptionText}>{productData.description}</Text>
          </View>

        </ScrollView>
      </View>

      {/* Tombol Add to Cart (Sticky) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>

      {/* Modal untuk Pilih Ukuran */}
      <Modal
        visible={isSizeModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSizeModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setSizeModalVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalTitle}>Select size</Text>
            <View style={styles.sizeGrid}>
              {productData.sizes.map(size => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeButtonText, selectedSize === size && styles.selectedSizeButtonText]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.sizeInfoRow}>
                <Text>Size info</Text>
                <Ionicons name="chevron-forward" size={16} color="#9B9B9B" />
            </View>
             <TouchableOpacity style={styles.addToCartButtonModal} onPress={() => setSizeModalVisible(false)}>
                <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  productImage: { width: screenWidth, height: 450, resizeMode: 'cover' },
  infoContainer: { padding: 16 },
  selectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  selectionButton: { flexDirection: 'row', flex: 1, height: 40, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, marginRight: 10 },
  selectionText: { fontSize: 14 },
  favButton: { width: 40, height: 40, borderWidth: 1, borderColor: '#DDD', borderRadius: 20, justifyContent: 'center', alignItems: 'center'},
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginVertical: 8 },
  brandText: { fontSize: 24, fontWeight: 'bold' },
  nameText: { fontSize: 11, color: '#9B9B9B' },
  priceText: { fontSize: 24, fontWeight: 'bold' },
  ratingText: { color: '#9B9B9B', fontSize: 11, marginLeft: 2 },
  descriptionText: { fontSize: 14, color: '#222', lineHeight: 22, marginTop: 12 },
  bottomBar: { padding: 16, backgroundColor: 'white' },
  addToCartButton: { backgroundColor: '#DB3022', padding: 15, borderRadius: 25, alignItems: 'center' },
  addToCartButtonText: { color: 'white', fontSize: 14, fontWeight: '500' },
  // Modal Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 34, borderTopRightRadius: 34, paddingHorizontal: 16, paddingBottom: 30, alignItems: 'center' },
  dragHandle: { width: 60, height: 6, backgroundColor: '#9B9B9B', borderRadius: 3, marginVertical: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginBottom: 16 },
  sizeButton: { width: '30%', height: 40, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  sizeButtonText: { color: '#222' },
  selectedSizeButton: { backgroundColor: '#DB3022', borderColor: '#DB3022' },
  selectedSizeButtonText: { color: 'white' },
  sizeInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  addToCartButtonModal: { backgroundColor: '#DB3022', padding: 15, borderRadius: 25, alignItems: 'center', width: '100%', marginTop: 20 },
});
