import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, MapPin, Phone, ChevronRight, Clock, Star, ArrowRight, Camera, Leaf, Trophy, Award, Heart, Sparkles, Gift, TrendingUp, Utensils, Wind, Globe, Mail, CheckCircle, ChefHat, Flame, BookOpen, Zap, Share2, Cake, Send, Calendar, Scan, MessageCircle } from 'lucide-react';

// Data produk
const products = [
  { id: 1, name: 'Eclair Matcha', price: 22000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Krim matcha premium Jepang dengan taburan pistachio panggang.' },
  { id: 2, name: 'Eclair Caramel', price: 20000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Gaya klasik dengan lapisan karamel mentega yang kaya dan renyah.' },
  { id: 3, name: 'Eclair Hazelnut', price: 24000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1604423043492-4138e5158b15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Cokelat susu praline dengan taburan kacang hazelnut karamel.' },
  { id: 4, name: 'Eclair Chocolate', price: 20000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1599785209707-33306dbab675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Dark chocolate ganache 70% yang intens dan mengkilap sempurna.' },
  { id: 5, name: 'Éclair Tiramisu', price: 22000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1571115177098-24c42de1bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Perpaduan kopi espresso mascarpone dan taburan bubuk kakao.' },
  { id: 6, name: 'Eclair Vanilla', price: 18000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Krim vanilla beans asli Madagaskar dengan glasir gading yang elegan.' },
  { id: 7, name: 'Fruits Eclair', price: 25000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Diplomat cream segar dengan hiasan buah beri, kiwi, dan jeruk.' },
  { id: 8, name: 'Eclair Cappucino', price: 20000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1571115177098-24c42de1bd15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Krim rasa cappucino yang harum dengan aksen hati cokelat putih.' },
  { id: 9, name: 'Eclair Red Velvet', price: 22000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1616541823729-00fe0aa423eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Red velvet khas dengan isian cream cheese yang lembut.' },
  { id: 10, name: 'Eclair Oreo', price: 20000, category: 'Eclair', image: 'https://images.unsplash.com/photo-1599785209707-33306dbab675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Krim vanilla cookies & cream dengan taburan remah biskuit hitam.' },
  { id: 11, name: 'Crispy Puff Chocolate', price: 15000, category: 'Choux & Puff', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Kue sus craquelin renyah dengan isian dark chocolate melimpah.' },
  { id: 12, name: 'Crispy Puff Vanilla', price: 15000, category: 'Choux & Puff', image: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Craquelin puff keemasan dengan fla vanilla beans yang manis.' },
  { id: 13, name: 'Triple Choco', price: 25000, category: 'Tart', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Tartlet kakao dengan paduan tiga tekstur cokelat dan almond.' },
  { id: 14, name: 'Soes Buah', price: 18000, category: 'Tart', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Mangkuk sus klasik, diisi custard vanilla dan buah-buahan segar.' },
];

const categories = ['Semua Menu', 'Eclair', 'Choux & Puff', 'Tart'];

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua Menu');
  const [scrolled, setScrolled] = useState(false);
  
  // Custom Toast Notification State
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000); // Hilang otomatis setelah 4 detik
  };
  
  // Feedback States
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3); // Menampilkan max 3 ulasan di awal

  // -- REAL-TIME DATABASE SIMULATION VIA LOCAL STORAGE --
  const [feedbackList, setFeedbackList] = useState(() => {
    const savedFeedbacks = localStorage.getItem('eclat_feedbacks');
    if (savedFeedbacks) {
      return JSON.parse(savedFeedbacks);
    }
    // Default dummy data if empty
    return [
      { id: 1, name: 'Sinta Wijaya', rating: 5, comment: 'Sistem PO-nya sangat teratur, Eclair matcha sampai di rumah masih sangat fresh dan dingin! Rasanya benar-benar premium.', timestamp: new Date('2026-05-08').toISOString() },
      { id: 2, name: 'Rudi & Rina', rating: 5, comment: 'Pesanan PO kue untuk pernikahan kami sempurna! Tim Éclat sangat profesional dalam menangani detail acara kami.', timestamp: new Date('2026-05-07').toISOString() },
      { id: 3, name: 'Andika Kusuma', rating: 5, comment: 'Kualitas bahan dan rasa yang konsisten. Rela ikut PO demi pastry seenak ini. Puff cokelatnya juara!', timestamp: new Date('2026-05-06').toISOString() },
      { id: 4, name: 'Nadia Puspita', rating: 4, comment: 'Kemasannya sangat eksklusif, cocok banget buat dikirim sebagai hampers. Rasa buahnya juga sangat fresh.', timestamp: new Date('2026-05-05').toISOString() },
    ];
  });

  // Filter khusus ulasan positif (Bintang 4 & 5)
  const positiveFeedbacks = feedbackList.filter(feedback => feedback.rating >= 4);

  const [newFeedback, setNewFeedback] = useState({ name: '', rating: 5, comment: '' });
  
  // Payment States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'scanning', 'paid'
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // Sync feedbacks across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'eclat_feedbacks') {
        setFeedbackList(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check if coming from checkout
  useEffect(() => {
    const isFromCheckout = sessionStorage.getItem('fromCheckout');
    if (isFromCheckout) {
      setShowFeedbackModal(true);
      sessionStorage.removeItem('fromCheckout');
    }
  }, []);

  // Efek transisi navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = activeCategory === 'Semua Menu' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // LOGIKA PENGIRIMAN ULASAN & FILTER BAYANGAN (SHADOW BAN)
  const handleSubmitFeedback = () => {
    if (newFeedback.name.trim() && newFeedback.comment.trim()) {
      const feedback = {
        id: Date.now(),
        name: newFeedback.name,
        rating: newFeedback.rating,
        comment: newFeedback.comment,
        timestamp: new Date().toISOString(),
      };
      
      const updatedFeedbacks = [feedback, ...feedbackList];
      
      // Tetap simpan ke database lokal agar data historis tidak hilang
      setFeedbackList(updatedFeedbacks);
      localStorage.setItem('eclat_feedbacks', JSON.stringify(updatedFeedbacks)); 
      
      setShowFeedbackModal(false);
      setNewFeedback({ name: '', rating: 5, comment: '' });
      
      // Jika ulasan negatif/rendah (1-3 bintang), tampilkan pesan apresiasi berbeda 
      // dan tidak akan dirender di halaman (karena ada filter positiveFeedbacks)
      if (feedback.rating <= 3) {
        triggerToast("Terima kasih atas masukannya. Kami akan mengevaluasi untuk pelayanan yang lebih baik.");
      } else {
        triggerToast("Terima kasih! Ulasan Anda telah dipublikasikan.");
        // Arahkan ke bagian ulasan agar mereka melihat ulasannya terpampang
        document.getElementById('ulasan-pelanggan').scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
    if (method === 'cash') {
      handleCashCheckout();
    } else if (method === 'qris') {
      setPaymentStatus('pending');
    }
  };

  // LOGIKA SIMULASI SCAN QRIS AUTO-CONFIRM
  const simulateQRScan = () => {
    setPaymentStatus('scanning');
    
    // Simulasi jeda waktu sistem bank
    setTimeout(() => {
      setPaymentStatus('paid');
      const txnId = 'PO-ECL-' + Math.floor(Math.random() * 1000000);
      setTransactionId(txnId);
      setShowSuccessMessage(true);
      
      // Kirim pesan otomatis ke WA
      sendPaymentConfirmationToWA(txnId, 'QRIS');
      
      // Tutup modal, munculkan notif JS, buka ulasan
      setTimeout(() => {
        setShowPaymentModal(false);
        setCart([]); // Kosongkan keranjang
        triggerToast("Terima kasih telah mempercayakan Pre-Order Anda pada Éclat Bakery! ✨");
        
        setTimeout(() => {
          setShowFeedbackModal(true);
        }, 800);
      }, 3000);
    }, 1500);
  };

  const handleCashCheckout = () => {
    const phoneNumber = "6289699437888";
    const txnId = 'PO-ECL-' + Math.floor(Math.random() * 1000000);
    setTransactionId(txnId);
    
    let message = "Bonjour Éclat Bakery, saya ingin ikut *Pre-Order (PO)* dari menu website:\n\n";
    message += "📋 *Rincian Pesanan PO:*\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n   └ ${item.quantity} x ${formatRupiah(item.price)} = ${formatRupiah(item.price * item.quantity)}\n`;
    });
    
    message += `\n========================\n`;
    message += `*Total Estimasi: ${formatRupiah(cartTotal)}*\n`;
    message += `*ID Transaksi: ${txnId}*\n`;
    message += `*Metode Pembayaran: Manual Transfer/DP*\n`;
    message += `========================\n\n`;
    message += `Mohon info ketersediaan slot PO untuk pesanan ini dan jadwal pengirimannya. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    setIsCartOpen(false);
    setCart([]);
    
    // Munculkan notifikasi dan modal ulasan
    setTimeout(() => {
      triggerToast("Terima kasih telah mempercayakan Pre-Order Anda pada Éclat Bakery! ✨");
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 1000);
    }, 500);
  };

  const sendPaymentConfirmationToWA = (txnId, method) => {
    const phoneNumber = "6289699437888";
    
    let message = "Bonjour Éclat Bakery, pembayaran untuk *Pre-Order (PO)* sudah saya lakukan!\n\n";
    message += "📋 *Rincian Pesanan PO:*\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n   └ ${item.quantity} x ${formatRupiah(item.price)} = ${formatRupiah(item.price * item.quantity)}\n`;
    });
    
    message += `\n========================\n`;
    message += `*Total Pembayaran: ${formatRupiah(cartTotal)}*\n`;
    message += `*ID Transaksi: ${txnId}*\n`;
    message += `*Metode Pembayaran: ${method === 'QRIS' ? '✅ QRIS' : 'Manual'}*\n`;
    message += `*Status: ✅ SUDAH DIBAYAR LUNAS*\n`;
    message += `========================\n\n`;
    message += `Mohon diproses untuk antrian PO-nya. Ditunggu konfirmasi jadwal pengirimannya!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2D2A26] font-sans selection:bg-[#C5A059] selection:text-white pb-0 relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* GLOBAL TOAST NOTIFICATION UI */}
      <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 ease-out ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#2D2A26] text-white px-6 py-4 rounded-md shadow-2xl flex items-center gap-3 border-l-4 border-[#C5A059]">
          <CheckCircle className="w-5 h-5 text-[#C5A059]" />
          <p className="font-light text-sm tracking-wide">{toastMessage}</p>
        </div>
      </div>

      {/* Top Notification Bar - PO Disclaimer */}
      <div className="bg-[#C5A059] text-white text-xs py-2.5 text-center tracking-widest uppercase font-bold shadow-md relative z-50">
        <span className="flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          SISTEM PRE-ORDER (PO) • Dibuat segar khusus untuk pesanan Anda
        </span>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'top-0 bg-white/95 backdrop-blur-md shadow-sm py-3' : 'top-10 bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <div className="flex flex-col items-start cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <span className={`font-serif font-bold text-2xl tracking-wide ${scrolled ? 'text-[#2D2A26]' : 'text-[#2D2A26]'} flex items-center gap-2`}>
                Éclat Bakery
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] mt-0.5 font-bold">Artisan Pâtisserie PO</span>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative group flex items-center gap-2"
              >
                <span className={`text-sm tracking-wider uppercase font-semibold hidden md:block ${scrolled ? 'text-[#2D2A26]' : 'text-[#2D2A26]'} group-hover:text-[#C5A059] transition-colors`}>
                  Keranjang PO
                </span>
                <div className="relative">
                  <ShoppingBag className={`h-6 w-6 ${scrolled ? 'text-[#2D2A26]' : 'text-[#2D2A26]'} group-hover:text-[#C5A059] transition-colors`} strokeWidth={1.5} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-[10px] font-bold text-white bg-[#C5A059] rounded-full ring-2 ring-[#F9F8F6]">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[85vh] w-full flex items-center justify-center bg-[#2D2A26]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Bakery Showcase" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/90 via-[#2D2A26]/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <span className="inline-block px-4 py-1 border border-[#C5A059] text-[#C5A059] text-xs tracking-widest uppercase mb-6 font-bold bg-[#1A1816]/50 backdrop-blur-sm">
            Open Pre-Order
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
            Eksklusivitas dalam <br/><span className="italic text-[#EBE5D9]">Setiap Gigitan</span>
          </h1>
          <p className="text-[#EBE5D9] text-base md:text-lg mb-10 font-light tracking-wide max-w-xl mx-auto">
            Untuk menjaga kualitas premium dan rasa yang otentik, seluruh pastry kami buat khusus berdasarkan sistem **Pre-Order (PO)**. Pesan sekarang, nikmati kesegarannya esok hari.
          </p>
          <button 
            onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold tracking-widest text-white uppercase bg-[#C5A059] rounded-none overflow-hidden transition-all hover:bg-[#b08b49]"
          >
            Ikut Antrian PO
          </button>
        </div>
      </div>

      {/* Main Menu Section */}
      <main id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-serif text-4xl text-[#2D2A26] mb-3">Katalog Pre-Order</h2>
          <p className="text-[#666] italic font-serif">Pilih hidangan untuk PO Anda selanjutnya</p>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-4 mb-12 justify-start md:justify-center pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category
                  ? 'bg-[#2D2A26] text-white border border-[#2D2A26]'
                  : 'bg-transparent text-[#2D2A26] border border-[#E0Dcd0] hover:border-[#C5A059] hover:text-[#C5A059]'
              }`}
            >
              {category === 'Eclair' && <Sparkles className="w-4 h-4" />}
              {category === 'Choux & Puff' && <Wind className="w-4 h-4" />}
              {category === 'Tart' && <Cake className="w-4 h-4" />}
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col bg-transparent relative">
              {/* PO Badge on product */}
              <div className="absolute top-3 left-3 z-10 bg-[#2D2A26] text-[#C5A059] text-[10px] font-bold tracking-widest px-2 py-1 uppercase shadow-md">
                Bisa di-PO
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-[#f0eee9] mb-5 rounded-sm">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                <div className="absolute inset-0 bg-[#2D2A26]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => addToCart(product)}
                    className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-[#2D2A26] px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-[#C5A059] hover:text-white flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Ikut PO
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow text-center">
                <span className="text-xs uppercase tracking-widest text-[#999] mb-1 flex items-center justify-center gap-1">
                  {product.category === 'Eclair' && <Sparkles className="w-3 h-3 text-[#C5A059]" />}
                  {product.category === 'Choux & Puff' && <Wind className="w-3 h-3 text-[#C5A059]" />}
                  {product.category === 'Tart' && <Cake className="w-3 h-3 text-[#C5A059]" />}
                  {product.category}
                </span>
                <h3 className="font-serif text-xl font-medium text-[#2D2A26] mb-2">{product.name}</h3>
                <p className="text-sm text-[#666] line-clamp-2 mb-4 font-light flex-grow px-2">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-center gap-2">
                  <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                  <span className="text-lg text-[#C5A059] font-medium">{formatRupiah(product.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bagian Ulasan Pelanggan (Real-time & Positive Filter) di Halaman Utama */}
      <section id="ulasan-pelanggan" className="py-24 bg-white border-t border-[#E0DCD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#2D2A26] mb-4">Ulasan Pelanggan</h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mb-6"></div>
            <p className="text-[#666] font-light italic mb-8 max-w-2xl mx-auto">
              Menjaga kualitas adalah komitmen utama kami. Berikut adalah pengalaman tulus dari para pelanggan yang telah mempercayakan momen manisnya kepada Éclat Bakery.
            </p>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="inline-flex items-center justify-center gap-2 border border-[#2D2A26] text-[#2D2A26] hover:bg-[#2D2A26] hover:text-white px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Tulis Ulasan Anda
            </button>
          </div>

          {/* Grid Daftar Ulasan - Hanya merender ulasan bintang 4 & 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positiveFeedbacks.slice(0, visibleReviews).map((feedback) => (
              <div key={feedback.id} className="bg-[#FFF8F0] p-8 rounded-sm border border-[#E0DCD0] flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < feedback.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E0DCD0]'}`} 
                    />
                  ))}
                </div>
                <p className="text-[#666] font-light mb-6 italic flex-grow">"{feedback.comment}"</p>
                
                <div className="flex items-center justify-between border-t border-[#E0DCD0]/60 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2D2A26] rounded-full flex items-center justify-center text-white font-serif font-bold">
                      {feedback.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2D2A26]">{feedback.name}</p>
                      <p className="text-xs text-[#999] tracking-wider">Pelanggan Terverifikasi</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#999]">
                    {new Date(feedback.timestamp).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Lihat Lebih Banyak jika ulasan positif lebih dari batas yang terlihat */}
          {positiveFeedbacks.length > visibleReviews && (
            <div className="text-center mt-12 animate-slide-in-right">
              <button 
                onClick={() => setVisibleReviews(prev => prev + 3)}
                className="text-[#2D2A26] border-b border-[#2D2A26] pb-1 font-medium hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
              >
                Lihat Lebih Banyak Ulasan
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Corporate Pre-Footer */}
      <section className="bg-[#2D2A26] text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Gift className="w-12 h-12 text-[#C5A059] mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Pesanan Khusus & Korporat</h2>
          <p className="text-[#EBE5D9] font-light mb-3 text-sm tracking-wide">PERNIKAHAN • RAPAT KANTOR • PERAYAAN BESAR</p>
          <p className="text-[#EBE5D9] font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Kami siap menciptakan kreasi pastry istimewa yang disesuaikan dengan tema acara Anda. Konsultasikan kebutuhan Anda bersama tim profesional kami.
          </p>
          <button 
             onClick={() => window.open('https://wa.me/6289699437888?text=Halo%20%C3%89clat%20Bakery%2C%20saya%20ingin%20bertanya%20tentang%20pesanan%20khusus%20untuk%20acara.', '_blank')}
             className="group border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-colors px-10 py-4 tracking-widest uppercase text-sm font-bold flex items-center gap-2 mx-auto"
          >
            <Utensils className="w-4 h-4" />
            Konsultasi Sekarang
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer Profesional dengan Link Aktif */}
      <footer className="bg-[#1A1816] text-[#A39E93] py-16 border-t border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif font-bold text-2xl text-white block mb-2">Éclat Bakery</span>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Seni pembuatan pastry tradisional Prancis dengan sentuhan modern. Kami berkomitmen menyajikan karya kuliner yang *fresh*, elegan, dan dibuat dengan dedikasi tinggi khusus untuk Anda melalui sistem Pre-Order.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/eclat.bakery" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#A39E93] hover:text-white rounded-full transition-all" title="Instagram">
                <Camera className="w-5 h-5" />
              </a>
              <a href="https://wa.me/6289699437888" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#A39E93] hover:text-white rounded-full transition-all" title="WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:hello@eclatbakery.com" className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#A39E93] hover:text-white rounded-full transition-all" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-5 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#C5A059]" />
              Hubungi Kami
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" /> 
                <span>Jl. Citarum No. 45<br/>Bandung, Jawa Barat 40175</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" /> 
                <a href="https://wa.me/6289699437888" target="_blank" rel="noreferrer" className="group-hover:text-[#C5A059] transition-colors">
                  0896-9943-7888
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:hello@eclatbakery.com" className="group-hover:text-[#C5A059] transition-colors">
                  hello@eclatbakery.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C5A059]" />
              Operasional Admin
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" /> 
                <div>
                  <p className="text-white font-medium">Senin - Jumat</p>
                  <p>08.00 - 18.00 WIB</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" />
                <div>
                  <p className="text-white font-medium">Sabtu - Minggu</p>
                  <p>09.00 - 16.00 WIB</p>
                </div>
              </li>
              <li className="mt-4 pt-4 border-t border-white/10 text-[#C5A059] text-xs italic">
                *Pesanan di luar jam operasional akan diproses keesokan harinya.
              </li>
            </ul>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-[#333] text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 Éclat Bakery. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <span className="text-[#333]">|</span>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-[#1A1816]/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          <div className="absolute inset-y-0 right-0 flex max-w-full w-full sm:w-[450px]">
            <div className="h-full w-full bg-[#FDFBF7] shadow-2xl flex flex-col animate-slide-in-right">
              
              <div className="px-6 py-6 border-b border-[#E0DCD0] flex items-center justify-between bg-white">
                <h2 className="font-serif text-2xl text-[#2D2A26] flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-[#C5A059]" />
                  Daftar Pesanan PO
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#999] hover:text-[#2D2A26] transition-colors rounded-full hover:bg-[#F5F3F0]"
                >
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Calendar className="h-16 w-16 mb-6 text-[#E0DCD0]" strokeWidth={1} />
                    <p className="font-serif text-2xl text-[#2D2A26] mb-2">Belum Ada PO</p>
                    <p className="text-[#666] mb-8 font-light">Keranjang Pre-Order Anda masih kosong.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="border border-[#2D2A26] text-[#2D2A26] px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-[#2D2A26] hover:text-white transition-colors"
                    >
                      Mulai Pilih Menu
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-2 border-b border-[#E0DCD0] pb-6 last:border-0">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-[#f0eee9] relative">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="ml-5 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-serif font-medium text-[#2D2A26]">
                              <h3>{item.name}</h3>
                              <p className="ml-4 text-[#C5A059] whitespace-nowrap">{formatRupiah(item.price * item.quantity)}</p>
                            </div>
                            <p className="mt-1 text-sm text-[#999] font-light">{formatRupiah(item.price)} / pcs</p>
                          </div>
                          
                          <div className="flex flex-1 items-end justify-between mt-4">
                            <div className="flex items-center border border-[#E0DCD0] bg-white">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 text-[#666] hover:text-[#C5A059] transition-colors"><Minus className="h-4 w-4" /></button>
                              <span className="px-4 text-sm font-medium text-[#2D2A26] min-w-[2.5rem] text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 text-[#666] hover:text-[#C5A059] transition-colors"><Plus className="h-4 w-4" /></button>
                            </div>
                            <button type="button" onClick={() => updateQuantity(item.id, -item.quantity)} className="text-xs tracking-widest uppercase text-[#999] hover:text-red-500 font-medium">Hapus</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-[#E0DCD0] px-6 py-8 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between text-lg font-serif mb-6 text-[#2D2A26]">
                    <p>Total Estimasi PO</p>
                    <p className="font-bold">{formatRupiah(cartTotal)}</p>
                  </div>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full flex items-center justify-center bg-[#2D2A26] px-6 py-4 text-sm font-bold tracking-widest uppercase text-white hover:bg-[#C5A059] transition-colors duration-300 gap-2"
                  >
                    Lanjut Pembayaran PO <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal - WITH QR DUMMY LOGIC */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[#1A1816]/70 backdrop-blur-sm transition-opacity" onClick={() => setShowPaymentModal(false)}></div>
          
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 px-6 py-6 border-b border-[#E0DCD0] bg-white flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#2D2A26]">Metode Pembayaran</h2>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 text-[#999] hover:text-[#2D2A26] transition-colors rounded-full hover:bg-[#F5F3F0]">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6">
              {showSuccessMessage && (
                <div className="mb-6 p-6 bg-[#F0FDF4] border border-[#BBF7D0] rounded-sm text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-green-800 mb-2">PO Berhasil Diantrikan!</h3>
                  <p className="text-sm text-green-700 mb-4 font-light">
                    Sistem mendeteksi dana masuk via QRIS. Antrian Anda sedang diproses.
                  </p>
                  <p className="text-xs text-green-800 font-mono bg-white px-3 py-2 rounded-md border border-green-200 shadow-sm inline-block">
                    ID Transaksi: {transactionId}
                  </p>
                </div>
              )}

              {!showSuccessMessage && (
                <>
                  <button
                    onClick={() => handlePaymentMethodSelection('qris')}
                    className={`w-full p-6 mb-4 border-2 rounded-sm transition-all text-left ${paymentMethod === 'qris' ? 'border-[#C5A059] bg-[#FFF8F0]' : 'border-[#E0DCD0] hover:border-[#C5A059]'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#C5A059]/10 rounded-full"><Scan className="w-5 h-5 text-[#C5A059]" /></div>
                      <h3 className="font-serif text-lg text-[#2D2A26]">Pembayaran QRIS Otomatis</h3>
                    </div>
                    <p className="text-sm text-[#666] font-light pl-10">Scan kode menggunakan aplikasi M-Banking atau E-Wallet.</p>
                  </button>

                  <button
                    onClick={() => handlePaymentMethodSelection('cash')}
                    className={`w-full p-6 mb-6 border-2 rounded-sm transition-all text-left ${paymentMethod === 'cash' ? 'border-[#C5A059] bg-[#FFF8F0]' : 'border-[#E0DCD0] hover:border-[#C5A059]'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#C5A059]/10 rounded-full"><Zap className="w-5 h-5 text-[#C5A059]" /></div>
                      <h3 className="font-serif text-lg text-[#2D2A26]">Konfirmasi Manual Admin</h3>
                    </div>
                    <p className="text-sm text-[#666] font-light pl-10">Lakukan pembayaran via Transfer Bank / DP (Direct WA).</p>
                  </button>
                </>
              )}

              {/* QRIS DUMMY SIMULATION SECTION */}
              {paymentMethod === 'qris' && !showSuccessMessage && (
                <div className="border-t border-[#E0DCD0] pt-6 animate-slide-in-right">
                  <h3 className="font-serif text-lg text-[#2D2A26] mb-4 text-center">Pindai QRIS Berikut</h3>
                  
                  <div className="bg-white border-2 border-[#E0DCD0] p-4 rounded-sm mb-6 flex justify-center">
                    <img src="/QR DUMMY.png" alt="QRIS Eclat Bakery" className="w-48 h-48 object-contain" />
                  </div>

                  <div className="bg-[#FFF8F0] p-4 rounded-sm mb-6 border border-[#E0DCD0] text-center">
                    <p className="text-sm text-[#666] font-light mb-1">Total PO yang harus dibayar</p>
                    <p className="font-serif text-3xl text-[#C5A059] font-bold">{formatRupiah(cartTotal)}</p>
                  </div>

                  {paymentStatus === 'scanning' ? (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-sm text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-yellow-700 font-bold tracking-wide">
                          Menunggu sistem memverifikasi saldo...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={simulateQRScan}
                      className="w-full py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 bg-[#C5A059] text-white hover:bg-[#b08b49] transition-all rounded-sm shadow-md"
                    >
                      <Scan className="w-4 h-4" />
                      Simulasikan Pembayaran Selesai
                    </button>
                  )}
                  
                </div>
              )}

              {paymentMethod === 'cash' && !showSuccessMessage && (
                <div className="space-y-4 pt-4 border-t border-[#E0DCD0]">
                  <p className="text-sm text-[#666] font-light text-center">
                    Anda akan dialihkan ke WhatsApp Admin kami untuk proses verifikasi DP atau Transfer Bank manual.
                  </p>
                </div>
              )}

              {/* SUCCESS ACTION BUTTON */}
              {showSuccessMessage && (
                <div className="mt-6 pt-6 border-t border-[#E0DCD0]">
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setShowFeedbackModal(true);
                    }}
                    className="w-full bg-[#2D2A26] text-white px-6 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#C5A059] transition-colors flex items-center justify-center gap-2 rounded-sm shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" /> Bagikan Pengalaman Belanja
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Formulir Modal Ulasan Pelanggan */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[#1A1816]/70 backdrop-blur-sm transition-opacity" onClick={() => setShowFeedbackModal(false)}></div>
          
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-slide-in-right">
            <div className="px-6 py-6 border-b border-[#E0DCD0] bg-white flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#2D2A26] flex items-center gap-3">
                <Star className="w-6 h-6 text-[#C5A059]" /> Tulis Ulasan Anda
              </h2>
              <button onClick={() => setShowFeedbackModal(false)} className="p-2 text-[#999] hover:text-[#2D2A26] transition-colors rounded-full hover:bg-[#F5F3F0]">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-[#666] font-light mb-6 text-center text-sm">
                Bantu kami menjadi lebih baik dengan membagikan pengalaman Anda menikmati kreasi Pâtisserie kami.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#2D2A26] mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    value={newFeedback.name}
                    onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 border border-[#E0DCD0] rounded-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2A26] mb-2">Penilaian Pelayanan & Rasa</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setNewFeedback({...newFeedback, rating: star})} className="transition-transform hover:scale-110">
                        <Star className={`w-8 h-8 ${star <= newFeedback.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E0DCD0]'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D2A26] mb-2">Ulasan Anda</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    placeholder="Ceritakan pengalaman Anda yang luar biasa..."
                    rows="4"
                    className="w-full px-4 py-3 border border-[#E0DCD0] rounded-sm focus:outline-none focus:border-[#C5A059] resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmitFeedback}
                disabled={!newFeedback.name || !newFeedback.comment}
                className="w-full flex items-center justify-center bg-[#2D2A26] px-6 py-4 text-sm font-bold tracking-widest uppercase text-white hover:bg-[#C5A059] transition-colors duration-300 gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> Publikasikan Ulasan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}