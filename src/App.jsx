import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, MapPin, Phone, ChevronRight, Clock, Star, ArrowRight, Camera, Leaf, Trophy, Award, Heart, Sparkles, Gift, TrendingUp, Utensils, Wind, Globe, Mail, CheckCircle, ChefHat, Flame, BookOpen, Zap, Share2, Cake, Send } from 'lucide-react';

// Data produk yang disesuaikan dari gambar
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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, name: 'Sinta Wijaya', rating: 5, comment: 'Eclair matcha terbaik yang pernah kami coba. Rasa authentic dan penampilan sangat elegan!', timestamp: new Date('2026-05-08') },
    { id: 2, name: 'Rudi & Rina', rating: 5, comment: 'Pesanan kue untuk pernikahan kami sempurna! Tim Éclat sangat profesional dan detail.', timestamp: new Date('2026-05-07') },
    { id: 3, name: 'Andika Kusuma', rating: 5, comment: 'Kualitas bahan dan rasa yang konsisten. Tempat favorit untuk membeli pastry berkualitas.', timestamp: new Date('2026-05-06') },
  ]);
  const [newFeedback, setNewFeedback] = useState({ name: '', rating: 5, comment: '' });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'paid', 'confirmed'
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

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
    // Buka keranjang otomatis setelah menambahkan (opsional, bisa dihilangkan)
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

  // Fungsi Checkout WhatsApp (dengan nomor spesifik)
  const handleCheckoutWA = () => {
    const phoneNumber = "6289699437888"; // Nomor WA yang Anda minta
    
    let message = "Bonjour Éclat Bakery, saya tertarik untuk melakukan pemesanan dari menu website:\n\n";
    message += "📋 *Rincian Pesanan:*\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n   └ ${item.quantity} x ${formatRupiah(item.price)} = ${formatRupiah(item.price * item.quantity)}\n`;
    });
    
    message += `\n========================\n`;
    message += `*Total Pembayaran: ${formatRupiah(cartTotal)}*\n`;
    message += `========================\n\n`;
    message += `Mohon informasi selanjutnya mengenai ketersediaan stok, metode pembayaran, dan opsi pengiriman. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    // Set flag for feedback modal to show on return
    sessionStorage.setItem('fromCheckout', 'true');
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleSubmitFeedback = () => {
    if (newFeedback.name.trim() && newFeedback.comment.trim()) {
      const feedback = {
        id: feedbackList.length + 1,
        name: newFeedback.name,
        rating: newFeedback.rating,
        comment: newFeedback.comment,
        timestamp: new Date(),
      };
      setFeedbackList([feedback, ...feedbackList]);
      setNewFeedback({ name: '', rating: 5, comment: '' });
      setShowFeedbackModal(false);
      // Show success message
      alert('Terima kasih atas feedback Anda! 🙏');
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

  const handleQRISPaymentConfirm = () => {
    setPaymentStatus('paid');
    setTimeout(() => {
      // Generate transaction ID
      const txnId = 'ECL-' + Date.now();
      setTransactionId(txnId);
      setShowSuccessMessage(true);
      
      // Send payment confirmation to WhatsApp
      sendPaymentConfirmationToWA(txnId, 'QRIS');
      
      // Close payment modal and show feedback
      setShowPaymentModal(false);
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 2000);
    }, 1500);
  };

  const handleCashCheckout = () => {
    const phoneNumber = "6289699437888";
    const txnId = 'ECL-' + Date.now();
    setTransactionId(txnId);
    
    let message = "Bonjour Éclat Bakery, saya tertarik untuk melakukan pemesanan dari menu website:\n\n";
    message += "📋 *Rincian Pesanan:*\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n   └ ${item.quantity} x ${formatRupiah(item.price)} = ${formatRupiah(item.price * item.quantity)}\n`;
    });
    
    message += `\n========================\n`;
    message += `*Total Pembayaran: ${formatRupiah(cartTotal)}*\n`;
    message += `*ID Transaksi: ${txnId}*\n`;
    message += `*Metode Pembayaran: CASH*\n`;
    message += `========================\n\n`;
    message += `Mohon informasi selanjutnya mengenai ketersediaan stok, metode pembayaran, dan opsi pengiriman. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    sessionStorage.setItem('fromCheckout', 'true');
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Close cart and show feedback after delay
    setIsCartOpen(false);
    setTimeout(() => {
      setShowFeedbackModal(true);
    }, 1000);
  };

  const sendPaymentConfirmationToWA = (txnId, method) => {
    const phoneNumber = "6289699437888";
    
    let message = "Bonjour Éclat Bakery, pembayaran sudah saya lakukan!\n\n";
    message += "📋 *Rincian Pesanan:*\n";
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n   └ ${item.quantity} x ${formatRupiah(item.price)} = ${formatRupiah(item.price * item.quantity)}\n`;
    });
    
    message += `\n========================\n`;
    message += `*Total Pembayaran: ${formatRupiah(cartTotal)}*\n`;
    message += `*ID Transaksi: ${txnId}*\n`;
    message += `*Metode Pembayaran: ${method === 'QRIS' ? '✅ QRIS' : 'CASH'}*\n`;
    message += `*Status: ✅ SUDAH DIBAYAR*\n`;
    message += `========================\n\n`;
    message += `Mohon informasi selanjutnya mengenai konfirmasi pesanan dan jadwal pengiriman. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2D2A26] font-sans selection:bg-[#C5A059] selection:text-white">
      
      {/* Import Google Fonts for authentic bakery feel */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

      {/* Top Notification Bar (Optional professional touch) */}
      <div className="bg-[#2D2A26] text-[#EBE5D9] text-xs py-2 text-center tracking-widest uppercase font-semibold">
        Dibuat segar setiap hari • 100% Bahan Premium
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex flex-col items-start cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <span className={`font-serif font-bold text-2xl tracking-wide ${scrolled ? 'text-[#2D2A26]' : 'text-[#2D2A26]'} flex items-center gap-2`}>
                Éclat Bakery
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] mt-0.5 font-bold">Artisan Pâtisserie</span>
            </div>
            
            {/* Nav Actions */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative group flex items-center gap-2"
              >
                <span className={`text-sm tracking-wider uppercase font-semibold hidden md:block ${scrolled ? 'text-[#2D2A26]' : 'text-[#2D2A26]'} group-hover:text-[#C5A059] transition-colors`}>
                  Keranjang
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
        {/* Menggunakan gambar toko roti estetis dari Unsplash */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Bakery Showcase" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/80 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <Star className="w-6 h-6 text-[#C5A059] mx-auto mb-6" />
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
            Seni dalam <br/><span className="italic text-[#EBE5D9]">Setiap Gigitan</span>
          </h1>
          <p className="text-[#EBE5D9] text-base md:text-lg mb-10 font-light tracking-wide max-w-xl mx-auto">
            Rasakan keautentikan rasa Éclair dan Pastry klasik. Dibuat dengan penuh dedikasi menggunakan bahan-bahan impor pilihan dan resep turun-temurun.
          </p>
          <button 
            onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold tracking-widest text-white uppercase bg-[#C5A059] rounded-none overflow-hidden transition-all hover:bg-[#b08b49]"
          >
            Jelajahi Menu Kami
          </button>
        </div>
      </div>

      {/* Our Story / Authenticity Section with Features */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2D2A26] mb-6">Dedikasi Pada Kualitas</h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-[#666] leading-relaxed max-w-3xl mx-auto text-lg font-light mb-16">
            Kami percaya bahwa pastry yang sempurna berawal dari bahan baku terbaik. Mulai dari mentega Eropa, krim vanila Madagaskar, hingga cokelat Belgia murni, setiap Eclair dan Puff yang keluar dari dapur kami adalah mahakarya kecil yang siap memanjakan hari Anda.
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 bg-[#FFF8F0] rounded-full">
                <Leaf className="w-8 h-8 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-xl text-[#2D2A26] mb-2">100% Bahan Premium</h3>
              <p className="text-[#666] text-sm leading-relaxed font-light">
                Dipilih langsung dari petani dan produsen terbaik di Eropa
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 bg-[#FFF8F0] rounded-full">
                <ChefHat className="w-8 h-8 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-xl text-[#2D2A26] mb-2">Resep Tradisional</h3>
              <p className="text-[#666] text-sm leading-relaxed font-light">
                Formula turun-temurun dari chef pâtissier berpengalaman
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-4 p-4 bg-[#FFF8F0] rounded-full">
                <Sparkles className="w-8 h-8 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-xl text-[#2D2A26] mb-2">Segar Setiap Hari</h3>
              <p className="text-[#666] text-sm leading-relaxed font-light">
                Diproduksi fresh daily tanpa pengawet buatan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-[#F9F8F6] to-[#FFF8F0] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#2D2A26] mb-4">Mengapa Memilih Kami?</h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quality */}
            <div className="text-center p-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <Award className="w-8 h-8 text-[#C5A059]" />
                </div>
              </div>
              <h3 className="font-serif text-lg text-[#2D2A26] mb-3">Kualitas Terjamin</h3>
              <p className="text-sm text-[#666] font-light">Sertifikasi internasional dan kontrol kualitas ketat</p>
            </div>
            
            {/* Experience */}
            <div className="text-center p-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <BookOpen className="w-8 h-8 text-[#C5A059]" />
                </div>
              </div>
              <h3 className="font-serif text-lg text-[#2D2A26] mb-3">Pengalaman 15+ Tahun</h3>
              <p className="text-sm text-[#666] font-light">Tim profesional dengan keahlian internasional</p>
            </div>
            
            {/* Passion */}
            <div className="text-center p-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <Flame className="w-8 h-8 text-[#C5A059]" />
                </div>
              </div>
              <h3 className="font-serif text-lg text-[#2D2A26] mb-3">Passion untuk Detail</h3>
              <p className="text-sm text-[#666] font-light">Setiap produk adalah karya seni yang dibuat dengan cinta</p>
            </div>
            
            {/* Innovation */}
            <div className="text-center p-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <Zap className="w-8 h-8 text-[#C5A059]" />
                </div>
              </div>
              <h3 className="font-serif text-lg text-[#2D2A26] mb-3">Inovasi Berkelanjutan</h3>
              <p className="text-sm text-[#666] font-light">Terus mengembangkan rasa baru yang menggugah selera</p>
            </div>
          </div>
        </div>
      </section>
      <main id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-serif text-4xl text-[#2D2A26] mb-3">Koleksi Pâtisserie</h2>
          <p className="text-[#666] italic font-serif">Pilih kelezatan favorit Anda hari ini</p>
        </div>

        {/* Categories (Elegant Pills) */}
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

        {/* Product Grid - Minimalist & Professional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col bg-transparent">
              
              {/* Image Container with elegant crop */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f0eee9] mb-5 rounded-sm">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Hover Add to Cart Overlay */}
                <div className="absolute inset-0 bg-[#2D2A26]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => addToCart(product)}
                    className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-[#2D2A26] px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-[#C5A059] hover:text-white flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Tambah
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
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
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#666] text-lg italic font-serif">Belum ada hidangan di kategori ini.</p>
          </div>
        )}
      </main>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-[#2D2A26] mb-4">Kepuasan Pelanggan</h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mb-2"></div>
            <p className="text-[#666] font-light italic">Dengarkan apa kata mereka tentang kami</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#FFF8F0] p-8 rounded-sm border border-[#E0DCD0]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                ))}
              </div>
              <p className="text-[#666] font-light mb-6 italic">"Eclair matcha terbaik yang pernah kami coba. Rasa authentic dan penampilan sangat elegan!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059] rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D2A26]">Sinta Wijaya</p>
                  <p className="text-xs text-[#999]">Bandung</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-[#FFF8F0] p-8 rounded-sm border border-[#E0DCD0]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                ))}
              </div>
              <p className="text-[#666] font-light mb-6 italic">"Pesanan kue untuk pernikahan kami sempurna! Tim Éclat sangat profesional dan detail."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059] rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D2A26]">Rudi & Rina</p>
                  <p className="text-xs text-[#999]">Jakarta</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-[#FFF8F0] p-8 rounded-sm border border-[#E0DCD0]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                ))}
              </div>
              <p className="text-[#666] font-light mb-6 italic">"Kualitas bahan dan rasa yang konsisten. Tempat favorit untuk membeli pastry berkualitas."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A059] rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2D2A26]">Andika Kusuma</p>
                  <p className="text-xs text-[#999]">Bandung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#2D2A26] text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Gift className="w-12 h-12 text-[#C5A059] mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Butuh Pesanan Khusus?</h2>
          <p className="text-[#EBE5D9] font-light mb-3 text-sm tracking-wide">CORPORATE • PERNIKAHAN • ACARA</p>
          <p className="text-[#EBE5D9] font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Kami menerima pesanan dalam jumlah besar untuk acara pernikahan, rapat kantor, maupun perayaan istimewa Anda. Tim kami siap menciptakan kreasi pastry yang tak terlupakan.
          </p>
          <button 
             onClick={() => window.open('https://wa.me/6289699437888?text=Halo%20%C3%89clat%20Bakery%2C%20saya%20ingin%20bertanya%20tentang%20pesanan%20khusus%2Facara.', '_blank')}
             className="group border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-colors px-10 py-4 tracking-widest uppercase text-sm font-bold flex items-center gap-2 mx-auto"
          >
            <Utensils className="w-4 h-4" />
            Hubungi Kami
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1816] text-[#A39E93] py-16 border-t border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif font-bold text-2xl text-white block mb-2">Éclat Bakery</span>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Menghadirkan seni pembuatan pastry tradisional Prancis dengan sentuhan modern. Kami berkomitmen memberikan pengalaman kuliner yang elegan dalam setiap sajian.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#A39E93] hover:text-white rounded-full transition-all" title="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" opacity="0.1" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              </a>
              <a href="mailto:info@eclatbakery.com" className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#A39E93] hover:text-white rounded-full transition-all">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:0896994378888" className="p-2 bg-white/5 hover:bg-[#C5A059] text-[#A39E93] hover:text-white rounded-full transition-all" title="Hubungi Kami">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-5 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#C5A059]" />
              Kontak
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" /> 
                <span>Jl. Citarum No. 45<br/>Bandung, Jawa Barat 40175</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" /> 
                <a href="tel:0896994378888" className="hover:text-[#C5A059] transition-colors">0896-9943-7888</a>
              </li>
              <li className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:info@eclatbakery.com" className="hover:text-[#C5A059] transition-colors">info@eclatbakery.com</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-5 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C5A059]" />
              Jam Buka
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" /> 
                <div>
                  <p className="text-white font-medium">Senin - Jumat</p>
                  <p>07.00 - 20.00 WIB</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#C5A059] mt-1 shrink-0" />
                <div>
                  <p className="text-white font-medium">Sabtu - Minggu</p>
                  <p>08.00 - 21.00 WIB</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-[#333] text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 Éclat Bakery. Semua hak dilindungi. ✨</p>
          <p className="italic text-[#C5A059]">Baked with passion • Made with love</p>
        </div>
      </footer>

      {/* Refined Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1A1816]/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 flex max-w-full w-full sm:w-[450px]">
            <div className="h-full w-full bg-[#FDFBF7] shadow-2xl flex flex-col animate-slide-in-right">
              
              {/* Header */}
              <div className="px-6 py-6 border-b border-[#E0DCD0] flex items-center justify-between bg-white">
                <h2 className="font-serif text-2xl text-[#2D2A26] flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-[#C5A059]" />
                  Keranjang Belanja
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#999] hover:text-[#2D2A26] transition-colors rounded-full hover:bg-[#F5F3F0]"
                >
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-16 w-16 mb-6 text-[#E0DCD0]" strokeWidth={1} />
                    <p className="font-serif text-2xl text-[#2D2A26] mb-2">Keranjang Kosong</p>
                    <p className="text-[#666] mb-8 font-light">Belum ada hidangan yang Anda pilih.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="border border-[#2D2A26] text-[#2D2A26] px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-[#2D2A26] hover:text-white transition-colors"
                    >
                      Mulai Memilih
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {cart.map((item) => (
                      <li key={item.id} className="flex py-2 border-b border-[#E0DCD0] pb-6 last:border-0">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-[#f0eee9]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
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
                            {/* Quantity Control */}
                            <div className="flex items-center border border-[#E0DCD0] bg-white">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1.5 text-[#666] hover:text-[#C5A059] transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 text-sm font-medium text-[#2D2A26] min-w-[2.5rem] text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1.5 text-[#666] hover:text-[#C5A059] transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -item.quantity)}
                              className="text-xs tracking-widest uppercase text-[#999] hover:text-red-500 font-medium"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="border-t border-[#E0DCD0] px-6 py-8 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between text-lg font-serif mb-6 text-[#2D2A26]">
                    <p>Subtotal</p>
                    <p className="font-bold">{formatRupiah(cartTotal)}</p>
                  </div>
                  <p className="text-xs text-[#999] mb-6 font-light">
                    Biaya pengiriman akan dikalkulasi saat konfirmasi via WhatsApp.
                  </p>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full flex items-center justify-center bg-[#2D2A26] px-6 py-4 text-sm font-bold tracking-widest uppercase text-white hover:bg-[#C5A059] transition-colors duration-300 gap-2"
                  >
                    Pilih Metode Pembayaran <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm text-[#666] hover:text-[#2D2A26] underline font-light"
                    >
                      Lanjut Memilih Hidangan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1A1816]/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowPaymentModal(false)}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-slide-in-right">
            {/* Header */}
            <div className="sticky top-0 px-6 py-6 border-b border-[#E0DCD0] bg-white flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#2D2A26]">
                Metode Pembayaran
              </h2>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-2 text-[#999] hover:text-[#2D2A26] transition-colors rounded-full hover:bg-[#F5F3F0]"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Payment Status Messages */}
              {showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium text-green-800">Transaksi Berhasil!</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-2">
                    Pembayaran Anda telah diterima dan dikonfirmasi.
                  </p>
                  <p className="text-xs text-green-600 font-mono bg-white px-3 py-2 rounded border border-green-200">
                    ID: {transactionId}
                  </p>
                </div>
              )}

              {/* CASH Method */}
              <button
                onClick={() => handlePaymentMethodSelection('cash')}
                className={`w-full p-6 mb-4 border-2 rounded-sm transition-all text-left ${
                  paymentMethod === 'cash' 
                    ? 'border-[#C5A059] bg-[#FFF8F0]' 
                    : 'border-[#E0DCD0] hover:border-[#C5A059]'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#C5A059]/10 rounded-full">
                    <Zap className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#2D2A26]">Pembayaran CASH</h3>
                </div>
                <p className="text-sm text-[#666] font-light pl-10">
                  Pesan sekarang, bayar saat pengiriman atau pickup di toko
                </p>
              </button>

              {/* QRIS Method */}
              <button
                onClick={() => handlePaymentMethodSelection('qris')}
                className={`w-full p-6 mb-6 border-2 rounded-sm transition-all text-left ${
                  paymentMethod === 'qris' 
                    ? 'border-[#C5A059] bg-[#FFF8F0]' 
                    : 'border-[#E0DCD0] hover:border-[#C5A059]'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#C5A059]/10 rounded-full">
                    <Gift className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#2D2A26]">Pembayaran QRIS</h3>
                </div>
                <p className="text-sm text-[#666] font-light pl-10">
                  Bayar sekarang dengan scan QR Code menggunakan e-wallet Anda
                </p>
              </button>

              {/* QRIS Payment Section */}
              {paymentMethod === 'qris' && (
                <div className="border-t border-[#E0DCD0] pt-6">
                  <h3 className="font-serif text-lg text-[#2D2A26] mb-4 text-center">
                    Scan QRIS untuk Pembayaran
                  </h3>
                  
                  {/* QR Code Display */}
                  <div className="bg-white border-2 border-[#E0DCD0] p-4 rounded-sm mb-6 flex justify-center">
                    <svg width="200" height="200" viewBox="0 0 200 200" className="bg-white">
                      {/* Placeholder QR Code */}
                      <rect width="200" height="200" fill="white" stroke="#E0DCD0" strokeWidth="2"/>
                      <rect x="10" y="10" width="40" height="40" fill="black"/>
                      <rect x="20" y="20" width="20" height="20" fill="white"/>
                      <rect x="150" y="10" width="40" height="40" fill="black"/>
                      <rect x="160" y="20" width="20" height="20" fill="white"/>
                      <rect x="10" y="150" width="40" height="40" fill="black"/>
                      <rect x="20" y="160" width="20" height="20" fill="white"/>
                      <circle cx="100" cy="100" r="30" fill="none" stroke="#2D2A26" strokeWidth="2"/>
                      <circle cx="100" cy="100" r="20" fill="none" stroke="#C5A059" strokeWidth="2"/>
                      <circle cx="100" cy="100" r="10" fill="#C5A059"/>
                      {/* Random pattern */}
                      <g opacity="0.3">
                        {[...Array(20)].map((_, i) => (
                          <rect key={i} x={Math.random() * 160 + 20} y={Math.random() * 160 + 20} width="8" height="8" fill="black"/>
                        ))}
                      </g>
                      <text x="100" y="195" fontSize="10" textAnchor="middle" fill="#666">
                        ECBKRY2026
                      </text>
                    </svg>
                  </div>

                  {/* Total Amount */}
                  <div className="bg-[#FFF8F0] p-4 rounded-sm mb-6 border border-[#E0DCD0]">
                    <p className="text-sm text-[#666] font-light mb-2">Total Pembayaran</p>
                    <p className="font-serif text-3xl text-[#C5A059] font-bold">{formatRupiah(cartTotal)}</p>
                  </div>

                  {/* Payment Status */}
                  {paymentStatus === 'pending' && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
                        <p className="text-sm text-yellow-700 font-light">
                          Menunggu pembayaran Anda...
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Confirm Payment Button */}
                  <button
                    onClick={handleQRISPaymentConfirm}
                    disabled={paymentStatus === 'paid'}
                    className={`w-full py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
                      paymentStatus === 'paid'
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-[#2D2A26] text-white hover:bg-[#C5A059]'
                    }`}
                  >
                    {paymentStatus === 'paid' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Pembayaran Dikonfirmasi
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4" />
                        Konfirmasi Pembayaran
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[#999] text-center mt-4 font-light">
                    Setelah pembayaran dikonfirmasi, Anda dapat memberikan feedback pesanan Anda.
                  </p>
                </div>
              )}

              {/* CASH Confirmation */}
              {paymentMethod === 'cash' && !showSuccessMessage && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-sm border border-blue-200">
                    <p className="text-sm text-blue-700 font-light">
                      Anda akan dihubungi via WhatsApp untuk konfirmasi pesanan dan metode pembayaran CASH.
                    </p>
                  </div>
                  <p className="text-lg font-serif text-[#2D2A26] text-center py-4">
                    Total: {formatRupiah(cartTotal)}
                  </p>
                </div>
              )}

              {/* Footer Buttons */}
              {!showSuccessMessage && (
                <div className="mt-6 pt-6 border-t border-[#E0DCD0]">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full px-6 py-3 text-sm font-light text-[#666] hover:text-[#2D2A26] underline"
                  >
                    Kembali ke Keranjang
                  </button>
                </div>
              )}

              {/* Success Next Steps */}
              {showSuccessMessage && (
                <div className="mt-6 pt-6 border-t border-[#E0DCD0]">
                  <button
                    onClick={() => {
                      setShowPaymentModal(false);
                      setShowFeedbackModal(true);
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-[#C5A059] text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-[#2D2A26] transition-colors"
                  >
                    Berikan Feedback & Lanjut
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1A1816]/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowFeedbackModal(false)}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-slide-in-right">
            {/* Header */}
            <div className="sticky top-0 px-6 py-6 border-b border-[#E0DCD0] bg-white flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#2D2A26] flex items-center gap-3">
                <Star className="w-6 h-6 text-[#C5A059]" />
                Kepuasan Anda
              </h2>
              <button 
                onClick={() => setShowFeedbackModal(false)}
                className="p-2 text-[#999] hover:text-[#2D2A26] transition-colors rounded-full hover:bg-[#F5F3F0]"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-[#666] font-light mb-6 text-center">Berikan komentar Anda tentang pengalaman berbelanja di Éclat Bakery</p>
              
              {/* Feedback Form */}
              <div className="space-y-4 mb-8">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-[#2D2A26] mb-2">Nama Anda</label>
                  <input
                    type="text"
                    value={newFeedback.name}
                    onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 border border-[#E0DCD0] rounded-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-[#2D2A26] mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewFeedback({...newFeedback, rating: star})}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-8 h-8 ${star <= newFeedback.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E0DCD0]'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-[#2D2A26] mb-2">Komentar</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                    placeholder="Bagikan pengalaman Anda..."
                    rows="4"
                    className="w-full px-4 py-3 border border-[#E0DCD0] rounded-sm focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitFeedback}
                className="w-full flex items-center justify-center bg-[#2D2A26] px-6 py-4 text-sm font-bold tracking-widest uppercase text-white hover:bg-[#C5A059] transition-colors duration-300 gap-2 mb-4"
              >
                <Send className="w-4 h-4" />
                Kirim Komentar
              </button>

              <button
                onClick={() => setShowFeedbackModal(false)}
                className="w-full text-sm text-[#666] hover:text-[#2D2A26] underline font-light"
              >
                Mungkin nanti
              </button>
            </div>

            {/* Recent Feedback */}
            <div className="border-t border-[#E0DCD0] px-6 py-6 bg-[#FFF8F0]">
              <h3 className="font-serif text-lg text-[#2D2A26] mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#C5A059]" />
                Komentar Terbaru
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {feedbackList.slice(0, 5).map((feedback) => (
                  <div key={feedback.id} className="bg-white p-4 rounded-sm border border-[#E0DCD0]">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-[#2D2A26] text-sm">{feedback.name}</p>
                      <div className="flex gap-0.5">
                        {[...Array(feedback.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#666] line-clamp-2 font-light">{feedback.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}