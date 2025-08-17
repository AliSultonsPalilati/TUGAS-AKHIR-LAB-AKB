import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Switch,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// =================================================================
// INTERFACES & MOCK DATA
// =================================================================
interface OrderItem { id: string; name: string; brand: string; color: string; size: string; units: number; price: number; image: string; }
interface Order { id: string; trackingNumber: string; quantity: number; totalAmount: number; date: string; status: 'Delivered' | 'Processing' | 'Cancelled'; items: OrderItem[]; shippingAddress: string; paymentMethod: string; deliveryMethod: string; discount: string; }
const user = { name: 'Matilda Brown', email: 'matilda.brown@example.com', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', };
const orders: Order[] = [
  { id: '1947034', trackingNumber: 'IW3475453455', quantity: 3, totalAmount: 112, date: '05-12-2019', status: 'Delivered', shippingAddress: '3 Newbridge Court, Chino Hills, CA 91709, United States', paymentMethod: '**** **** **** 3947', deliveryMethod: 'FedEx, 3 days, 15$', discount: '10%, Personal promo code', items: [ { id: '1', name: 'Pullover', brand: 'Mango', color: 'Gray', size: 'L', units: 1, price: 51, image: 'https://i.pinimg.com/564x/e7/87/84/e78784d8525e982ce14603597a47d25e.jpg' }, { id: '2', name: 'Pullover', brand: 'Mango', color: 'Gray', size: 'L', units: 1, price: 51, image: 'https://i.pinimg.com/736x/38/0f/fe/380ffe23add20a4a765e68554034ebe8.jpg' }, { id: '3', name: 'Pullover', brand: 'Mango', color: 'Gray', size: 'L', units: 1, price: 51, image: 'https://i.pinimg.com/736x/ca/f3/c8/caf3c86e9bfaa8f77fbffbea98d688f9.jpg' }, ], },
  { id: '1947035', trackingNumber: 'IW3475453456', quantity: 1, totalAmount: 45, date: '04-12-2019', status: 'Processing', items: [], shippingAddress: '', paymentMethod: '', deliveryMethod: '', discount: '' },
  { id: '1947036', trackingNumber: 'IW3475453457', quantity: 2, totalAmount: 80, date: '03-12-2019', status: 'Cancelled', items: [], shippingAddress: '', paymentMethod: '', deliveryMethod: '', discount: '' },
];

// Komponen Input Kustom untuk Halaman Settings
const CustomInfoInput = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoInputContainer}>
        <Text style={styles.infoInputLabel}>{label}</Text>
        <Text style={styles.infoInputValue}>{value}</Text>
    </View>
);

// =================================================================
// 1. HALAMAN PENGATURAN (SETTINGS)
// =================================================================
const SettingsScreen = ({ onBack }: { onBack: () => void }) => {
    const [notifications, setNotifications] = useState({ sales: true, newArrivals: false, delivery: false });
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={onBack}><Ionicons name="chevron-back" size={28} color="#222" /></TouchableOpacity>
                <TouchableOpacity><Ionicons name="search" size={24} color="#222" /></TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.mainTitle}>Settings</Text>

                <Text style={styles.settingsSectionTitle}>Personal Information</Text>
                <TextInput style={styles.textInput} placeholder="Full name" />
                <CustomInfoInput label="Date of Birth" value="12/12/1989" />

                <View style={styles.passwordHeader}>
                    <Text style={styles.settingsSectionTitle}>Password</Text>
                    <TouchableOpacity onPress={() => setPasswordModalVisible(true)}><Text style={styles.changeText}>Change</Text></TouchableOpacity>
                </View>
                <TextInput style={styles.textInput} secureTextEntry value="************" editable={false} />
                
                <Text style={styles.settingsSectionTitle}>Notifications</Text>
                <View style={styles.notificationItem}>
                    <Text style={styles.notificationLabel}>Sales</Text>
                    <Switch value={notifications.sales} onValueChange={(v) => setNotifications(p => ({ ...p, sales: v }))} trackColor={{ false: "#ABB4BD", true: "#2AA952" }} thumbColor={"#ffffff"} ios_backgroundColor="#ABB4BD" />
                </View>
                <View style={styles.notificationItem}>
                    <Text style={styles.notificationLabel}>New arrivals</Text>
                    <Switch value={notifications.newArrivals} onValueChange={(v) => setNotifications(p => ({ ...p, newArrivals: v }))} trackColor={{ false: "#ABB4BD", true: "#2AA952" }} thumbColor={"#ffffff"} ios_backgroundColor="#ABB4BD" />
                </View>
                <View style={styles.notificationItem}>
                    <Text style={styles.notificationLabel}>Delivery status changes</Text>
                    <Switch value={notifications.delivery} onValueChange={(v) => setNotifications(p => ({ ...p, delivery: v }))} trackColor={{ false: "#ABB4BD", true: "#2AA952" }} thumbColor={"#ffffff"} ios_backgroundColor="#ABB4BD" />
                </View>
            </ScrollView>
             <Modal animationType="slide" transparent={true} visible={passwordModalVisible} onRequestClose={() => setPasswordModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setPasswordModalVisible(false)}>
                    <TouchableOpacity activeOpacity={1} style={styles.passwordModalContent}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Password Change</Text>
                        <TextInput style={styles.modalInput} placeholder="Old Password" />
                        <TouchableOpacity style={{ alignSelf: 'flex-end', paddingRight: 8 }}><Text style={styles.forgotPasswordText}>Forgot Password?</Text></TouchableOpacity>
                        <TextInput style={styles.modalInput} placeholder="New Password" />
                        <TextInput style={styles.modalInput} placeholder="Repeat New Password" />
                        <TouchableOpacity style={styles.saveButton} onPress={() => setPasswordModalVisible(false)}><Text style={styles.saveButtonText}>SAVE PASSWORD</Text></TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

// =================================================================
// 2. HALAMAN DETAIL PESANAN (ORDER DETAILS)
// =================================================================
const OrderDetailsScreen = ({ order, onBack }: { order: Order; onBack: () => void }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={onBack}><Ionicons name="chevron-back" size={28} color="#222" /></TouchableOpacity>
                <Text style={styles.headerNavTitle}>Order Details</Text>
                <TouchableOpacity><Ionicons name="search" size={24} color="#222" /></TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.orderDetailsHeader}>
                    <Text style={styles.orderNumberBig}>Order №{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                 <View style={styles.orderDetailsSubHeader}>
                    <Text style={styles.subHeaderText}>Tracking number: <Text style={styles.subHeaderValue}>{order.trackingNumber}</Text></Text>
                    <Text style={styles.deliveredText}>{order.status}</Text>
                </View>
                <Text style={styles.itemsCount}>{order.items.length} items</Text>
                {order.items.map(item => (
                    <View key={item.id} style={styles.itemCard}>
                        <Image source={{uri: item.image}} style={styles.itemCardImage} />
                        <View style={styles.itemCardDetails}>
                           <Text style={styles.itemCardTitle}>{item.name}</Text>
                           <Text style={styles.itemCardSubtitle}>{item.brand}</Text>
                           <View style={{flexDirection: 'row', marginTop: 4}}><Text style={styles.itemCardSubtitle}>Color: {item.color}</Text><Text style={[styles.itemCardSubtitle, {marginLeft: 16}]}>Size: {item.size}</Text></View>
                           <View style={styles.unitsPriceContainer}><Text style={styles.itemCardSubtitle}>Units: {item.units}</Text><Text style={styles.itemCardPrice}>{item.price}$</Text></View>
                        </View>
                    </View>
                ))}
                <Text style={styles.sectionTitle}>Order information</Text>
                <View style={styles.infoRow}><Text style={styles.infoLabel}>Shipping Address:</Text><Text style={styles.infoValue} numberOfLines={2}>{order.shippingAddress}</Text></View>
                 <View style={styles.infoRow}><Text style={styles.infoLabel}>Payment method:</Text><Text style={styles.infoValue}>**** {order.paymentMethod.slice(-4)}</Text></View>
                 <View style={styles.infoRow}><Text style={styles.infoLabel}>Delivery method:</Text><Text style={styles.infoValue}>{order.deliveryMethod}</Text></View>
                 <View style={styles.infoRow}><Text style={styles.infoLabel}>Discount:</Text><Text style={styles.infoValue}>{order.discount}</Text></View>
                 <View style={styles.infoRow}><Text style={styles.infoLabel}>Total Amount:</Text><Text style={[styles.infoValue, {color: '#222222', fontWeight: 'bold'}]}>{order.totalAmount}$</Text></View>
                <View style={styles.actionButtonsContainer}><TouchableOpacity style={styles.reorderButton}><Text style={styles.reorderButtonText}>Reorder</Text></TouchableOpacity><TouchableOpacity style={styles.feedbackButton}><Text style={styles.feedbackButtonText}>Leave feedback</Text></TouchableOpacity></View>
            </ScrollView>
        </View>
    );
};

// =================================================================
// 3. HALAMAN DAFTAR PESANAN (MY ORDERS)
// =================================================================
const MyOrdersScreen = ({ onBack, onViewDetails }: { onBack: () => void; onViewDetails: (order: Order) => void }) => {
    const [activeTab, setActiveTab] = useState<'Delivered' | 'Processing' | 'Cancelled'>('Delivered');
    const filteredOrders = orders.filter(o => o.status === activeTab);
    return (
        <View style={styles.container}>
             <View style={styles.headerNav}><TouchableOpacity onPress={onBack}><Ionicons name="chevron-back" size={28} color="#222" /></TouchableOpacity><TouchableOpacity><Ionicons name="search" size={24} color="#222" /></TouchableOpacity></View>
            <Text style={styles.mainTitle}>My Orders</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Delivered')} style={[styles.tabButton, activeTab === 'Delivered' && styles.activeTabButton]}><Text style={[styles.tabText, activeTab === 'Delivered' && styles.activeTabText]}>Delivered</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Processing')} style={[styles.tabButton]}><Text style={[styles.tabText, activeTab === 'Processing' && styles.activeTabText]}>Processing</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Cancelled')} style={[styles.tabButton]}><Text style={[styles.tabText, activeTab === 'Cancelled' && styles.activeTabText]}>Cancelled</Text></TouchableOpacity>
            </View>
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <View style={styles.orderCardHeader}><Text style={styles.orderNumber}>Order №{item.id}</Text><Text style={styles.orderDate}>{item.date}</Text></View>
                        <View style={styles.orderCardRow}><Text style={styles.subHeaderText}>Tracking number: </Text><Text style={styles.subHeaderValue}>{item.trackingNumber}</Text></View>
                        <View style={styles.orderCardRow}><Text style={styles.subHeaderText}>Quantity: <Text style={styles.subHeaderValue}>{item.quantity}</Text></Text><Text style={styles.subHeaderText}>Total Amount: <Text style={styles.subHeaderValue}>{item.totalAmount}$</Text></Text></View>
                        <View style={styles.orderCardActions}><TouchableOpacity style={styles.detailsButton} onPress={() => onViewDetails(item)}><Text style={styles.detailsButtonText}>Details</Text></TouchableOpacity><Text style={styles.deliveredText}>{item.status}</Text></View>
                    </View>
                )}
            />
        </View>
    );
};

// =================================================================
// 4. HALAMAN PROFIL UTAMA (MAIN)
// =================================================================
const MainProfileView = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.mainTitle}>My Profile</Text>
            <View style={styles.profileHeader}><Image source={{ uri: user.avatar }} style={styles.avatar} /><View><Text style={styles.profileName}>{user.name}</Text><Text style={styles.profileEmail}>{user.email}</Text></View></View>
            <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate('orders')}><View><Text style={styles.menuItemText}>My orders</Text><Text style={styles.menuItemSubText}>Already have {orders.length} orders</Text></View><Ionicons name="chevron-forward" size={24} color="#9B9B9B"/></TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}><View><Text style={styles.menuItemText}>Shipping addresses</Text><Text style={styles.menuItemSubText}>3 addresses</Text></View><Ionicons name="chevron-forward" size={24} color="#9B9B9B" /></TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onNavigate('settings')}><View><Text style={styles.menuItemText}>Settings</Text><Text style={styles.menuItemSubText}>Notifications, password</Text></View><Ionicons name="chevron-forward" size={24} color="#9B9B9B"/></TouchableOpacity>
        </ScrollView>
    </View>
  );
};


// =================================================================
// KOMPONEN UTAMA YANG MENGATUR TAMPILAN
// =================================================================
export default function ProfileScreen() {
    const [activeView, setActiveView] = useState('main'); // main, orders, orderDetails, settings
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const handleViewDetails = (order: Order) => { setSelectedOrder(order); setActiveView('orderDetails'); };
    const handleBack = () => { if (activeView === 'orderDetails') setActiveView('orders'); else setActiveView('main'); };
    const renderContent = () => {
        switch (activeView) {
            case 'orders': return <MyOrdersScreen onBack={handleBack} onViewDetails={handleViewDetails} />;
            case 'orderDetails': return selectedOrder ? <OrderDetailsScreen order={selectedOrder} onBack={handleBack} /> : null;
            case 'settings': return <SettingsScreen onBack={handleBack} />;
            default: return <MainProfileView onNavigate={setActiveView} />;
        }
    };
    return (<SafeAreaView style={styles.safeArea}><StatusBar barStyle="dark-content" />{renderContent()}</SafeAreaView>);
}

// =================================================================
// STYLESHEET (DIRAPIKAN DAN DISEMPURNAKAN)
// =================================================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9F9F9' },
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, },
  headerNavTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  mainTitle: { fontSize: 34, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 18, marginTop: 4, },
  
  // --- Main Profile Styles ---
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 18 },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#222222' },
  profileEmail: { fontSize: 14, color: '#9B9B9B', marginTop: 4 },
  menuItem: { backgroundColor: 'white', padding: 16, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, elevation: 2, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 4, },
  menuItemText: { fontSize: 16, fontWeight: 'bold', color: '#222222' },
  menuItemSubText: { fontSize: 11, color: '#9B9B9B', marginTop: 2 },
  
  // --- My Orders Styles ---
  tabContainer: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12 },
  tabButton: { marginRight: 20, paddingVertical: 8 },
  activeTabButton: { backgroundColor: '#222222', borderRadius: 20, paddingHorizontal: 24, },
  tabText: { fontSize: 14, color: '#9B9B9B' },
  activeTabText: { color: 'white', fontWeight: '500' },
  orderCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 24, elevation: 3, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 5, },
  orderCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  orderNumber: { fontSize: 16, fontWeight: 'bold', color: '#222222' },
  orderDate: { fontSize: 14, color: '#9B9B9B' },
  orderCardRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  subHeaderText: { fontSize: 14, color: '#9B9B9B' },
  subHeaderValue: { fontWeight: '600', color: '#222222' },
  orderCardActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  detailsButton: { borderColor: '#222222', borderWidth: 1, borderRadius: 24, paddingVertical: 8, paddingHorizontal: 28, },
  detailsButtonText: { fontSize: 14, color: '#222222' },
  deliveredText: { fontSize: 14, color: '#2AA952', fontWeight: '500' },
  
  // --- Order Details Styles ---
  orderDetailsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  orderNumberBig: { fontSize: 16, fontWeight: 'bold', color: '#222222' },
  orderDetailsSubHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 16 },
  itemsCount: { fontSize: 16, fontWeight: 'bold', marginBottom: 18, color: '#222222' },
  itemCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, marginBottom: 16, overflow: 'hidden', elevation: 2, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 4, },
  itemCardImage: { width: 104, height: 124 },
  itemCardDetails: { flex: 1, padding: 12, justifyContent: 'center' },
  itemCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#222222' },
  itemCardSubtitle: { fontSize: 12, color: '#9B9B9B', marginTop: 2 },
  unitsPriceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  itemCardPrice: { fontSize: 16, fontWeight: 'bold', color: '#222222' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20, marginTop: 10, color: '#222222' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  infoLabel: { fontSize: 14, color: '#9B9B9B' },
  infoValue: { fontSize: 14, fontWeight: '500', color: '#222222', textAlign: 'right', flexShrink: 1, marginLeft: 16, },
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, marginBottom: 20 },
  reorderButton: { flex: 1, borderWidth: 1, borderColor: '#222222', borderRadius: 25, paddingVertical: 14, alignItems: 'center', marginRight: 10, },
  reorderButtonText: { fontSize: 14, color: '#222222' },
  feedbackButton: { flex: 1, backgroundColor: '#DB3022', borderRadius: 25, paddingVertical: 14, alignItems: 'center', marginLeft: 10, },
  feedbackButtonText: { fontSize: 14, color: 'white' },

  // --- Settings Styles ---
  settingsSectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 12, color: '#222222' },
  textInput: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 4, fontSize: 14, color: '#222222', elevation: 1, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2, marginBottom: 20, },
  infoInputContainer: { backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 4, elevation: 1, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2, marginBottom: 20, },
  infoInputLabel: { fontSize: 11, color: '#9B9B9B' },
  infoInputValue: { fontSize: 14, color: '#222222', marginTop: 2 },
  passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  changeText: { color: '#9B9B9B', fontSize: 14 },
  notificationItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, },
  notificationLabel: { fontSize: 16, fontWeight: '500' },

  // --- Password Change Modal Styles ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  passwordModalContent: { backgroundColor: '#F9F9F9', borderTopLeftRadius: 34, borderTopRightRadius: 34, padding: 16, paddingTop: 8, alignItems: 'center' },
  modalHandle: { width: 60, height: 6, backgroundColor: '#9B9B9B', borderRadius: 3, marginVertical: 10, },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 18, color: '#222222' },
  modalInput: { width: '100%', backgroundColor: 'white', padding: 16, borderRadius: 4, fontSize: 14, marginBottom: 8, elevation: 1, shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 2, },
  forgotPasswordText: { color: '#9B9B9B', marginBottom: 16, fontSize: 14, },
  saveButton: { width: '100%', backgroundColor: '#DB3022', paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginTop: 24 },
  saveButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
});