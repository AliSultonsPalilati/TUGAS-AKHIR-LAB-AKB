import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  // ScrollView dihapus dari sini karena tidak digunakan
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
// MaterialCommunityIcons dihapus dari sini karena tidak digunakan
import { Ionicons, Entypo } from '@expo/vector-icons';

// Tipe Data untuk item di keranjang dan kode promo
interface CartItem {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

interface PromoCode {
  id: string;
  discount: string;
  title: string;
  code: string;
  expiry: string;
  image: string;
}

// Data Awal untuk Keranjang Belanja
const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Pullover',
    color: 'Black',
    size: 'L',
    price: 51,
    image: 'https://i.pinimg.com/736x/ca/f3/c8/caf3c86e9bfaa8f77fbffbea98d688f9.jpg',
    quantity: 1,
  },
  {
    id: '2',
    name: 'T-Shirt',
    color: 'Gray',
    size: 'L',
    price: 30,
    image: 'https://i.pinimg.com/736x/38/0f/fe/380ffe23add20a4a765e68554034ebe8.jpg',
    quantity: 1,
  },
  {
    id: '3',
    name: 'Sport Dress',
    color: 'Black',
    size: 'M',
    price: 43,
    image: 'https://i.pinimg.com/1200x/d0/6f/f7/d06ff7496e04ff47ab41497a706bf30f.jpg',
    quantity: 1,
  },
];

// Data untuk Kode Promo
const promoCodes: PromoCode[] = [
    { id: '1', discount: '10', title: 'Personal offer', code: 'mypromocode2020', expiry: '6 days remaining', image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg' },
    { id: '2', discount: '15', title: 'Summer Sale', code: 'summer2020', expiry: '23 days remaining', image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg' },
    { id: '3', discount: '22', title: 'Personal offer', code: 'mypromocode2020', expiry: '6 days remaining', image: 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg' },
];

// Komponen Utama
export default function BagScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoModalVisible, setPromoModalVisible] = useState(false);

  // Fungsi untuk mengubah jumlah item
  const handleQuantityChange = (id: string, amount: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Menghitung total harga
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  // Render Setiap Item di Keranjang
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>
            Color: {item.color}  Size: {item.size}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, -1)}>
            <Ionicons name="remove" size={20} color="#9B9B9B" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(item.id, 1)}>
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardActions}>
        <Entypo name="dots-three-vertical" size={16} color="#9B9B9B" />
        <Text style={styles.cardPrice}>{item.price}$</Text>
      </View>
    </View>
  );
  
  // Render Setiap Kode Promo di Modal
  const renderPromoCode = ({ item }: { item: PromoCode }) => (
    <View style={styles.promoCard}>
        <View style={styles.promoDiscountContainer}>
            <Text style={styles.promoDiscountValue}>{item.discount}%</Text>
            <Text style={styles.promoDiscountText}>off</Text>
        </View>
        <View style={styles.promoDetails}>
            <Text style={styles.promoTitle}>{item.title}</Text>
            <Text style={styles.promoCodeText}>{item.code}</Text>
        </View>
        <View style={styles.promoAction}>
            <Text style={styles.promoExpiry}>{item.expiry}</Text>
            <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bag</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Daftar Item */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
      
      {/* Footer / Checkout Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.promoInputContainer} onPress={() => setPromoModalVisible(true)}>
            <Text style={styles.promoPlaceholder}>Enter your promo code</Text>
            <View style={styles.promoArrowButton}>
                <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
        </TouchableOpacity>

        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total amount:</Text>
            <Text style={styles.totalAmount}>{totalAmount}$</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>

      {/* Modal untuk Kode Promo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={promoModalVisible}
        onRequestClose={() => setPromoModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setPromoModalVisible(false)}>
            <View style={styles.modalContent}>
                 <View style={styles.promoInputContainerModal}>
                    <TextInput placeholder="Enter your promo code" style={styles.promoPlaceholderModal} />
                    <TouchableOpacity style={styles.promoArrowButton}>
                        <Ionicons name="arrow-forward" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.yourPromoTitle}>Your Promo Codes</Text>
                
                <FlatList
                    data={promoCodes}
                    renderItem={renderPromoCode}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: { fontSize: 34, fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: { width: 104, height: 104, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 },
  cardDetails: { flex: 1, padding: 12, justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 12, color: '#9B9B9B' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quantityText: { fontSize: 16, marginHorizontal: 12 },
  cardActions: {
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardPrice: { fontSize: 16, fontWeight: 'bold' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  promoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingLeft: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  promoPlaceholder: { flex: 1, fontSize: 14, color: '#9B9B9B' },
  promoArrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  totalText: { fontSize: 16, color: '#9B9B9B' },
  totalAmount: { fontSize: 20, fontWeight: 'bold' },
  checkoutButton: {
    backgroundColor: '#DB3022',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 16,
    height: '60%',
  },
  promoInputContainerModal:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingLeft: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20
  },
  promoPlaceholderModal: { flex: 1, fontSize: 14 },
  yourPromoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  promoCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    marginBottom: 16, 
    borderRadius: 8, 
    overflow: 'hidden',
    alignItems: 'center'
  },
  promoDiscountContainer: {
    backgroundColor: '#DB3022',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoDiscountValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  promoDiscountText: {
    color: 'white',
    fontSize: 14,
  },
  promoDetails: {
    flex: 1,
    marginLeft: 16,
  },
  promoTitle: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  promoCodeText: { fontSize: 12, color: '#9B9B9B' },
  promoAction: {
    alignItems: 'center',
    paddingRight: 16
  },
  promoExpiry: { fontSize: 11, color: '#9B9B9B', marginBottom: 8 },
  applyButton: {
    backgroundColor: '#DB3022',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  applyButtonText: { color: 'white', fontWeight: 'bold' },
});