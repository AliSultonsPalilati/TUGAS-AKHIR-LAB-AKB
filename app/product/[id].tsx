import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Modal, FlatList, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

// --- UPDATED PRODUCT DATABASE (Sesuai dengan data dari home.tsx) ---
const productDatabase = {
  '1': {
    id: '1',
    name: 'Evening Dress',
    brand: 'Dorothy Perkins',
    price: '$12',
    priceOld: '$15',
    discount: '-20%',
    rating: 4,
    reviews: 10,
    description: 'Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed.',
    images: [
      'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Red'],
  },
  '2': {
    id: '2',
    name: 'Hoodie',
    brand: 'Sitlly',
    price: '$19',
    priceOld: '$22',
    discount: '-15%',
    rating: 5,
    reviews: 10,
    description: 'Comfortable hoodie made from premium cotton blend with modern fit and cozy interior.',
    images: [
      'https://i.pinimg.com/736x/46/6e/ba/466ebad10178c9ca10b7c20e622ed5e1.jpg',
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Navy'],
  },
  '3': {
    id: '3',
    name: 'Sport Dress',
    brand: 'Dorothy Perkins',
    price: '$12',
    priceOld: '$14',
    discount: '-20%',
    rating: 4,
    reviews: 8,
    description: 'Sporty dress perfect for active lifestyle with moisture-wicking fabric and comfortable fit.',
    images: [
      'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Pink'],
  },
  '4': {
    id: '4',
    name: 'New Collection Item',
    brand: 'H&M',
    price: '$25',
    priceOld: '$30',
    discount: '-17%',
    rating: 4,
    reviews: 12,
    description: 'Latest addition to our new collection featuring modern design and premium materials.',
    images: [
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Beige'],
  },
  '5': {
    id: '5',
    name: 'Trendy Outfit',
    brand: 'Zara',
    price: '$28',
    priceOld: '$35',
    discount: '-20%',
    rating: 5,
    reviews: 18,
    description: 'Trendy and stylish outfit perfect for casual and semi-formal occasions.',
    images: [
      'https://i.pinimg.com/1200x/49/f7/ff/49f7ff41618df13a3657c530ce7916fb.jpg',
      'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White', 'Black'],
  },
  '6': {
    id: '6',
    name: 'Fashion Statement',
    brand: 'Mango',
    price: '$32',
    priceOld: '$40',
    discount: '-20%',
    rating: 4,
    reviews: 15,
    description: 'Make a fashion statement with this unique piece featuring contemporary design.',
    images: [
      'https://i.pinimg.com/736x/c2/e6/86/c2e686afce6088f6d96a1ac17109aa11.jpg',
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White', 'Black'],
  },
};
// --- END OF UPDATED DATA ---

const { width: screenWidth } = Dimensions.get('window');

// Helper function untuk mendapatkan hex color dari nama warna
const getColorHex = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#FF0000',
    'Blue': '#0000FF',
    'Gray': '#808080',
    'Grey': '#808080',
    'Navy': '#000080',
    'Pink': '#FFC0CB',
    'Green': '#008000',
    'Yellow': '#FFFF00',
    'Purple': '#800080',
    'Orange': '#FFA500',
    'Brown': '#A52A2A',
    'Beige': '#F5F5DC',
  };
  
  return colorMap[colorName] || '#CCCCCC'; // Default gray jika warna tidak ditemukan
};

// Function untuk mendapatkan produk rekomendasi
const getRecommendedProducts = (currentProductId: string) => {
  // Ambil semua produk kecuali produk yang sedang dilihat
  const allProducts = Object.values(productDatabase).filter(product => product.id !== currentProductId);
  
  // Tambahkan flag untuk NEW dan shuffle array
  const productsWithFlags = allProducts.map(product => ({
    ...product,
    isNew: ['4', '5', '6'].includes(product.id), // Produk 4, 5, 6 adalah NEW items
  }));
  
  // Shuffle dan ambil 3 produk pertama
  return productsWithFlags.sort(() => Math.random() - 0.5).slice(0, 3);
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSizeModalVisible, setSizeModalVisible] = useState(false);
  const [isColorModalVisible, setColorModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    console.log('Product ID from params:', id);
    
    // Simulate loading and fetch product data
    const fetchProduct = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        if (id && productDatabase[id as keyof typeof productDatabase]) {
          const product = productDatabase[id as keyof typeof productDatabase];
          setProductData(product);
          setSelectedColor(product.colors[0]); // Set default color
          console.log('Product found:', product);
        } else {
          console.log('Product not found for ID:', id);
          setProductData(null);
        }
        setLoading(false);
      }, 300);
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.loadingText}>Loading product...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Product not found state
  if (!productData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Not Found</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={[styles.container, styles.centerContent]}>
          <Ionicons name="sad-outline" size={64} color="#9B9B9B" />
          <Text style={styles.notFoundTitle}>Product Not Found</Text>
          <Text style={styles.notFoundMessage}>
            The product with ID &quot;{id}&quot; could not be found.
          </Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Main product display
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
          <View style={styles.imageCarouselContainer}>
            <FlatList
              horizontal
              data={productData.images}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.imageWrapper}>
                  <Image 
                    source={{ uri: item }} 
                    style={styles.productImage}
                    resizeMode="cover"
                    onError={(error) => {
                      console.log('Image load error:', error);
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', item);
                    }}
                  />
                </View>
              )}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              snapToInterval={screenWidth}
              snapToAlignment="center"
            />
          </View>

          {/* Info Produk */}
          <View style={styles.infoContainer}>
            <View style={styles.selectionRow}>
              <TouchableOpacity style={styles.selectionButton} onPress={() => setSizeModalVisible(true)}>
                <Text style={styles.selectionText}>
                  {selectedSize || 'Size'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#9B9B9B" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectionButton} onPress={() => setColorModalVisible(true)}>
                <Text style={styles.selectionText}>{selectedColor}</Text>
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
                <View>
                  {productData.priceOld && (
                    <Text style={styles.priceOldText}>{productData.priceOld}</Text>
                  )}
                  <Text style={styles.priceText}>{productData.price}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i} 
                    name="star" 
                    size={14} 
                    color={i < productData.rating ? "#FFBA49" : "#D3D3D3"} 
                  />
                ))}
                <Text style={styles.ratingText}>({productData.reviews})</Text>
            </View>
            <Text style={styles.descriptionText}>{productData.description}</Text>
            
            {/* Additional sections */}
            <TouchableOpacity style={styles.infoSection}>
              <Text style={styles.infoSectionText}>Shipping info</Text>
              <Ionicons name="chevron-forward" size={16} color="#9B9B9B" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.infoSection}>
              <Text style={styles.infoSectionText}>Support</Text>
              <Ionicons name="chevron-forward" size={16} color="#9B9B9B" />
            </TouchableOpacity>
          </View>

          {/* You can also like this section */}
          <View style={styles.recommendationSection}>
            <View style={styles.recommendationHeader}>
              <Text style={styles.recommendationTitle}>You can also like this</Text>
              <Text style={styles.recommendationCount}>{getRecommendedProducts(productData.id).length} items</Text>
            </View>
            
            <FlatList
              horizontal
              data={getRecommendedProducts(productData.id)}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.recommendationCard}
                  onPress={() => {
                    // Navigate to another product
                    router.push(`/product/${item.id}`);
                  }}
                >
                  <View style={styles.recommendationImageContainer}>
                    <Image source={{ uri: item.images[0] }} style={styles.recommendationImage} />
                    {item.discount && (
                      <View style={styles.recommendationDiscountTag}>
                        <Text style={styles.recommendationDiscountText}>{item.discount}</Text>
                      </View>
                    )}
                    {item.isNew && !item.discount && (
                      <View style={styles.recommendationNewTag}>
                        <Text style={styles.recommendationNewText}>NEW</Text>
                      </View>
                    )}
                    <TouchableOpacity style={styles.recommendationFavoriteButton}>
                      <Ionicons name="heart-outline" size={18} color="#9B9B9B" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.recommendationInfo}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons 
                          key={i} 
                          name="star" 
                          size={12} 
                          color={i < item.rating ? "#FFBA49" : "#D3D3D3"} 
                        />
                      ))}
                      <Text style={styles.recommendationRatingText}>({item.reviews})</Text>
                    </View>
                    <Text style={styles.recommendationBrand}>{item.brand}</Text>
                    <Text style={styles.recommendationName}>{item.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
                      {item.priceOld && (
                        <Text style={styles.recommendationPriceOld}>{item.priceOld}</Text>
                      )}
                      <Text style={styles.recommendationPrice}>{item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </View>

      {/* Tombol Add to Cart (Sticky) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => Alert.alert('Added to Cart', `${productData.name} has been added to your cart!${selectedSize ? ` Size: ${selectedSize}` : ''}${selectedColor ? ` Color: ${selectedColor}` : ''}`)}
        >
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
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setSizeModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalTitle}>Select size</Text>
            <View style={styles.sizeGrid}>
              {productData.sizes.map((size: string) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.sizeButtonText, selectedSize === size && styles.selectedSizeButtonText]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.sizeInfoRow}>
                <Text style={styles.sizeInfoText}>Size info</Text>
                <Ionicons name="chevron-forward" size={16} color="#9B9B9B" />
            </TouchableOpacity>
             <TouchableOpacity 
               style={styles.addToCartButtonModal} 
               onPress={() => {
                 setSizeModalVisible(false);
                 Alert.alert('Added to Cart', `${productData.name} (Size: ${selectedSize || 'Not selected'}) has been added to your cart!`);
               }}
             >
                <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal untuk Pilih Warna */}
      <Modal
        visible={isColorModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setColorModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setColorModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalTitle}>Select color</Text>
            <View style={styles.colorGrid}>
              {productData.colors.map((color: string) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton, 
                    selectedColor === color && styles.selectedColorButton,
                    { backgroundColor: getColorHex(color) }
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Ionicons name="checkmark" size={20} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.selectedColorInfo}>
              <Text style={styles.selectedColorText}>Selected: {selectedColor}</Text>
            </View>
             <TouchableOpacity 
               style={styles.addToCartButtonModal} 
               onPress={() => {
                 setColorModalVisible(false);
                 Alert.alert('Added to Cart', `${productData.name} (Color: ${selectedColor}) has been added to your cart!`);
               }}
             >
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#9B9B9B',
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  imageCarouselContainer: {
    height: 450,
    backgroundColor: '#F8F8F8',
  },
  imageWrapper: {
    width: screenWidth,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  productImage: { 
    width: screenWidth - 32, 
    height: 400,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  infoContainer: { padding: 16 },
  selectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  selectionButton: { 
    flexDirection: 'row', 
    flex: 1, 
    height: 40, 
    borderWidth: 1, 
    borderColor: '#DDD', 
    borderRadius: 8, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    marginRight: 10 
  },
  selectionText: { fontSize: 14 },
  favButton: { 
    width: 40, 
    height: 40, 
    borderWidth: 1, 
    borderColor: '#DDD', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginVertical: 8 },
  brandText: { fontSize: 24, fontWeight: 'bold' },
  nameText: { fontSize: 11, color: '#9B9B9B' },
  priceText: { fontSize: 24, fontWeight: 'bold' },
  priceOldText: { 
    fontSize: 14, 
    color: '#9B9B9B', 
    textDecorationLine: 'line-through', 
    textAlign: 'right' 
  },
  ratingText: { color: '#9B9B9B', fontSize: 11, marginLeft: 2 },
  descriptionText: { fontSize: 14, color: '#222', lineHeight: 22, marginTop: 12, marginBottom: 20 },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  infoSectionText: {
    fontSize: 16,
    color: '#222',
  },
  bottomBar: { padding: 16, backgroundColor: 'white' },
  addToCartButton: { backgroundColor: '#DB3022', padding: 15, borderRadius: 25, alignItems: 'center' },
  addToCartButtonText: { color: 'white', fontSize: 14, fontWeight: '500' },
  
  // Not Found Styles
  notFoundTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundMessage: {
    fontSize: 16,
    color: '#9B9B9B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#DB3022',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  
  // Modal Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { 
    backgroundColor: 'white', 
    borderTopLeftRadius: 34, 
    borderTopRightRadius: 34, 
    paddingHorizontal: 16, 
    paddingBottom: 30, 
    alignItems: 'center' 
  },
  dragHandle: { width: 60, height: 6, backgroundColor: '#9B9B9B', borderRadius: 3, marginVertical: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  sizeGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 16 
  },
  sizeButton: { 
    width: '30%', 
    height: 40, 
    borderWidth: 1, 
    borderColor: '#DDD', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  sizeButtonText: { color: '#222' },
  selectedSizeButton: { backgroundColor: '#DB3022', borderColor: '#DB3022' },
  selectedSizeButtonText: { color: 'white' },
  sizeInfoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    paddingVertical: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#F0F0F0' 
  },
  sizeInfoText: {
    fontSize: 16,
    color: '#222',
  },
  addToCartButtonModal: { 
    backgroundColor: '#DB3022', 
    padding: 15, 
    borderRadius: 25, 
    alignItems: 'center', 
    width: '100%', 
    marginTop: 20 
  },
  
  // Color Modal Styles
  colorGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start', 
    width: '100%', 
    marginBottom: 16 
  },
  colorButton: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 16, 
    marginBottom: 16, 
    borderWidth: 2, 
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorButton: { 
    borderColor: '#DB3022',
    borderWidth: 3,
  },
  selectedColorInfo: {
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
  },
  selectedColorText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  
  // Recommendation Section Styles
  recommendationSection: {
    marginTop: 20,
    paddingBottom: 20,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  recommendationCount: {
    fontSize: 11,
    color: '#9B9B9B',
  },
  recommendationCard: {
    marginRight: 16,
    width: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },
  recommendationImageContainer: {
    position: 'relative',
  },
  recommendationImage: {
    width: 150,
    height: 184,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  recommendationDiscountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#DB3022',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendationDiscountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recommendationNewTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#222',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendationNewText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recommendationFavoriteButton: {
    position: 'absolute',
    bottom: -15,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recommendationInfo: {
    padding: 8,
    backgroundColor: 'white',
  },
  recommendationRatingText: {
    color: '#9B9B9B',
    fontSize: 9,
    marginLeft: 2,
  },
  recommendationBrand: {
    fontSize: 11,
    color: '#9B9B9B',
    marginTop: 2,
  },
  recommendationName: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
    marginTop: 1,
  },
  recommendationPriceOld: {
    fontSize: 12,
    color: '#9B9B9B',
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  recommendationPrice: {
    fontSize: 14,
    color: '#DB3022',
    fontWeight: 'bold',
  },
});