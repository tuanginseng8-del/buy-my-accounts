import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Clock, Monitor } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-secondary border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
      <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 mb-2 flex items-center justify-center">
            <img 
              src={`https://www.google.com/s2/favicons?sz=64&domain=${product.domain}`}
              alt={`${product.name} logo`}
              className="w-8 h-8"
              onError={(e) => {
                e.currentTarget.src = 'https://www.google.com/s2/favicons?sz=64&domain=google.com';
              }}
            />
          </div>
          <Badge variant={product.is_available ? "default" : "secondary"}>
            {product.is_available ? "Có sẵn" : "Hết hàng"}
          </Badge>
        </div>
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary-glow transition-colors">
          {product.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{product.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Monitor className="w-4 h-4" />
          <span>{product.devices}</span>
        </div>
        <div className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </div>
      </CardContent>

      <CardFooter className="relative">
        <Button
          onClick={() => onAddToCart(product)}
          disabled={!product.is_available}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Thêm vào giỏ
        </Button>
      </CardFooter>
    </Card>
  );
};