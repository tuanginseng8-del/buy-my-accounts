import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProductFilter } from '@/components/ProductFilter';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const { products, loading, error } = useProducts();
  
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  } = useCart();

  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Đã thêm vào giỏ hàng!",
      description: `${product.name} đã được thêm vào giỏ hàng`,
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (customerInfo: any) => {
    // Here you would normally send the order to your backend
    console.log('Order completed:', {
      items,
      customerInfo,
      total: getTotal(),
    });
    
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={getItemCount()} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Tài Khoản Premium
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mua tài khoản premium các ứng dụng phổ biến với giá tốt nhất. 
            Giao hàng nhanh chóng, uy tín và chất lượng.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-secondary rounded-lg p-6 mb-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              📞 <span className="font-medium">Zalo:</span> 
              <a href="tel:0949443268" className="text-primary hover:text-primary-glow">0949443268</a>
            </div>
            <div className="flex items-center gap-2">
              💬 <span className="font-medium">Telegram:</span> 
              <a href="https://t.me/iamhieusensei" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow">
                @iamhieusensei
              </a>
            </div>
          </div>
        </div>

        {/* Product Filter */}
        <ProductFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Đang tải sản phẩm...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Lỗi khi tải sản phẩm: {error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Không có sản phẩm nào trong danh mục này.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        total={getTotal()}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
        items={items}
        total={getTotal()}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};

export default Index;
