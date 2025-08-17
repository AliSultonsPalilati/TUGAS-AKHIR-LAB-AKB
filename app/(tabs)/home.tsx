import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

// --- DATA DUMMY (Sesuai Desain Figma) ---
const saleItems = [
  { id: '1', brand: 'Dorothy Perkins', name: 'Evening Dress', priceOld: '15$', priceNew: '12$', discount: '-20%', rating: 4, reviews: 10, image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: '2', brand: 'Sitlly', name: 'Hoodie ', priceOld: '22$', priceNew: '19$', discount: '-15%', rating: 5, reviews: 10, image: 'https://i.pinimg.com/736x/46/6e/ba/466ebad10178c9ca10b7c20e622ed5e1.jpg?auto=compress&cs=tinysrgb&w=600' },
  { id: '3', brand: 'Dorothy Perkins', name: 'Sport Dress', priceOld: '14$', priceNew: '12$', discount: '-20%', rating: 4, reviews: 8, image: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

const newArrivals = [
  { id: '4', image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: '5', image: 'https://i.pinimg.com/1200x/49/f7/ff/49f7ff41618df13a3657c530ce7916fb.jpg?auto=compress&cs=tinysrgb&w=600' },
  { id: '6', image: 'https://i.pinimg.com/736x/c2/e6/86/c2e686afce6088f6d96a1ac17109aa11.jpg?auto=compress&cs=tinysrgb&w=600' },
];
// --- END OF DATA DUMMY ---

type SectionHeaderProps = {
  title: string;
  subtitle: string;
  onViewAllPress: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, onViewAllPress }) => (
  <View style={styles.sectionHeader}>
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
    <TouchableOpacity onPress={onViewAllPress}>
      <Text style={styles.viewAllText}>View all</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* === BAGIAN 1: FASHION SALE BANNER === */}
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/896293/pexels-photo-896293.jpeg' }}
          style={styles.heroBanner}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>Fashion sale</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Check</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* === BAGIAN 1: NEW ARRIVALS === */}
        <SectionHeader title="New" subtitle="You've never seen it before!" onViewAllPress={() => console.log('View all New')} />
        <FlatList
          horizontal
          data={newArrivals}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
          renderItem={({ item }) => (
            <Link href={`/product/${item.id}`} asChild>
              <TouchableOpacity style={styles.newCard}>
                <Image source={{ uri: item.image }} style={styles.newCardImage} />
                <View style={styles.newTag}>
                  <Text style={styles.newTagText}>NEW</Text>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />

        {/* === BAGIAN 2: STREET CLOTHES BANNER === */}
        <ImageBackground
          source={{ uri: 'https://amacisalon.com/wp-content/uploads/2018/12/What-Is-Purple-Shampoo-And-Why-It-Is-A-Must-Have-For-Blonde-Hair-1450x774.jpg' }}
          style={styles.streetBanner}
        >
          <Text style={styles.streetBannerText}>Street clothes</Text>
        </ImageBackground>

        {/* === BAGIAN 2: SALE SECTION === */}
        <SectionHeader title="Sale" subtitle="Super summer sale" onViewAllPress={() => console.log('View all Sale')} />
        <FlatList
          horizontal
          data={saleItems}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
          renderItem={({ item }) => (
            <Link href={`/product/${item.id}`} asChild>
              <TouchableOpacity style={styles.saleCard}>
                <ImageBackground source={{ uri: item.image }} style={styles.saleCardImage}>
                  <View style={styles.discountTag}>
                    <Text style={styles.discountTagText}>{item.discount}</Text>
                  </View>
                  <TouchableOpacity style={styles.favoriteButton}>
                      <Ionicons name="heart-outline" size={18} color="#9B9B9B" />
                  </TouchableOpacity>
                </ImageBackground>
                <View style={styles.saleCardInfo}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {[...Array(5)].map((_, i) => <Ionicons key={i} name="star" size={14} color={i < item.rating ? "#FFBA49" : "#D3D3D3"} />)}
                    <Text style={styles.ratingText}>({item.reviews})</Text>
                  </View>
                  <Text style={styles.brandText}>{item.brand}</Text>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.priceOld}>{item.priceOld}</Text>
                    <Text style={styles.priceNew}>{item.priceNew}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}
        />

        {/* === BAGIAN 3: NEW COLLECTION & GRID === */}
        <ImageBackground
          source={{ uri: 'https://c0.wallpaperflare.com/preview/909/934/483/adult-attractive-beautiful-beauty.jpg' }}
          style={styles.collectionBanner}
        >
          <Text style={styles.collectionBannerText}>New collection</Text>
        </ImageBackground>

        <View style={styles.gridContainer}>
          <View style={styles.gridLeft}>
            <View style={styles.summerSaleBox}>
              <Text style={styles.summerSaleText}>Summer sale</Text>
            </View>
            <ImageBackground source={{ uri: 'https://themepalacedemo.com/swingpress-shop/wp-content/uploads/sites/612/2020/07/pexels-photo-1689731.jpeg' }} style={styles.gridImageSmall}>
                <Text style={styles.gridText}>Black</Text>
            </ImageBackground>
          </View>
          <ImageBackground source={{ uri: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} style={styles.gridRight}>
             <Text style={styles.gridText}>Men hoodies</Text>
          </ImageBackground>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  // Bagian 1 Styles
  heroBanner: { height: 536, justifyContent: 'flex-end' },
  heroOverlay: { paddingBottom: 32, paddingLeft: 15 },
  heroText: { color: 'white', fontSize: 48, fontWeight: '900', lineHeight: 48 },
  // DIUBAH: Memastikan properti 'borderRadius' ditulis dengan benar
  heroButton: { backgroundColor: '#DB3022', paddingVertical: 12, paddingHorizontal: 36, borderRadius: 25, alignSelf: 'flex-start', marginTop: 18 },
  heroButtonText: { color: 'white', fontSize: 14, fontWeight: '500' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 30, marginBottom: 10 },
  sectionTitle: { fontSize: 34, fontWeight: 'bold', color: '#222' },
  sectionSubtitle: { fontSize: 11, color: '#9B9B9B' },
  viewAllText: { fontSize: 11, color: '#2D2D2D' },
  newCard: { marginRight: 16, width: 150 },
  newCardImage: { width: '100%', height: 184, borderRadius: 8 },
  newTag: { position: 'absolute', top: 8, left: 8, backgroundColor: '#222', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  newTagText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  // Bagian 2 Styles
  streetBanner: { height: 366, justifyContent: 'flex-end', alignItems: 'flex-start', paddingLeft: 20, paddingBottom: 20, marginTop: 20 },
  streetBannerText: { color: 'white', fontSize: 34, fontWeight: 'bold' },
  saleCard: { marginRight: 16, width: 150, borderRadius: 8, overflow: 'hidden' },
  saleCardImage: { width: '100%', height: 184, alignItems: 'flex-start', justifyContent: 'space-between' },
  discountTag: { position: 'absolute', top: 8, left: 8, backgroundColor: '#DB3022', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  discountTagText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  favoriteButton: { position: 'absolute', bottom: -15, right: 0, width: 36, height: 36, borderRadius: 18, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', elevation: 3 },
  saleCardInfo: { padding: 8, backgroundColor: '#F9F9F9' },
  ratingText: { color: '#9B9B9B', fontSize: 10, marginLeft: 2 },
  brandText: { fontSize: 11, color: '#9B9B9B', marginTop: 4 },
  nameText: { fontSize: 16, color: '#222', fontWeight: 'bold', marginTop: 2 },
  priceOld: { fontSize: 14, color: '#9B9B9B', textDecorationLine: 'line-through' },
  priceNew: { fontSize: 14, color: '#DB3022', fontWeight: 'bold', marginLeft: 4 },
  // Bagian 3 Styles
  collectionBanner: { height: 366, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  collectionBannerText: { color: 'white', fontSize: 34, fontWeight: 'bold' },
  gridContainer: { flexDirection: 'row', padding: 16, height: 306 },
  gridLeft: { flex: 1, marginRight: 8 },
  summerSaleBox: { flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderRadius: 8, elevation: 2 },
  summerSaleText: { color: '#DB3022', fontSize: 24, fontWeight: 'bold' },
  gridImageSmall: { flex: 1, borderRadius: 8, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  gridRight: { flex: 1, marginLeft: 8, borderRadius: 8, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  gridText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});
