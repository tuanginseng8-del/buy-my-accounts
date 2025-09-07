import { ShoppingCart, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              🛒 IAMHIEUSENSEI
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Tài khoản Premium
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-2 hover:text-primary"
              asChild
            >
              <a href="tel:0949443268">
                <Phone className="w-4 h-4" />
                0949443268
              </a>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-2 hover:text-primary"
              asChild
            >
              <a href="https://t.me/iamhieusensei" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Telegram
              </a>
            </Button>
            
            <Button
              onClick={onCartClick}
              variant="outline"
              size="sm"
              className="relative hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[20px] h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};