import { useState } from 'react';
import { CartItem } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, CreditCard, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  total: number;
  onOrderComplete: (customerInfo: any) => void;
}

export const CheckoutModal = ({
  isOpen,
  onOpenChange,
  items,
  total,
  onOrderComplete,
}: CheckoutModalProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const bankInfo = {
    bank: 'Techcombank',
    accountNumber: '19036201234567',
    accountName: 'NGUYEN VAN HIEU',
    content: `DH${Date.now().toString().slice(-6)}`,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  const copyBankInfo = () => {
    const info = `${bankInfo.bank}\nSố TK: ${bankInfo.accountNumber}\nChủ TK: ${bankInfo.accountName}\nSố tiền: ${formatPrice(total)}\nNội dung: ${bankInfo.content}`;
    navigator.clipboard.writeText(info);
    setCopied(true);
    toast({
      title: "Đã sao chép!",
      description: "Thông tin chuyển khoản đã được sao chép",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    onOrderComplete(customerInfo);
    toast({
      title: "Đặt hàng thành công!",
      description: "Chúng tôi sẽ liên hệ sau khi nhận được thanh toán",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Thanh toán đơn hàng
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold">Tóm tắt đơn hàng</h3>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-border/50">
                <div className="flex-1">
                  <div className="font-medium">{item.product.name}</div>
                  <div className="text-sm text-muted-foreground">{item.product.description}</div>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{item.product.duration}</Badge>
                    <Badge variant="outline" className="text-xs">{item.product.devices}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatPrice(item.product.price * item.quantity)}</div>
                  <div className="text-sm text-muted-foreground">x{item.quantity}</div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold">Tổng cộng:</span>
              <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
            </div>
          </div>

          <Separator />

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-semibold">Thông tin khách hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="0xxxxxxxxx"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Bank Transfer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Thông tin chuyển khoản</h3>
              <div className="bg-gradient-secondary rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Ngân hàng:</span>
                  <span>{bankInfo.bank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Số tài khoản:</span>
                  <span className="font-mono">{bankInfo.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Chủ tài khoản:</span>
                  <span>{bankInfo.accountName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Số tiền:</span>
                  <span className="font-bold text-primary">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Nội dung:</span>
                  <span className="font-mono bg-accent px-2 py-1 rounded">{bankInfo.content}</span>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={copyBankInfo}
                  className="w-full mt-3"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Đã sao chép' : 'Sao chép thông tin'}
                </Button>
              </div>
              
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <p className="text-sm text-warning-foreground">
                  <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng nội dung để được xử lý nhanh chóng. 
                  Sau khi chuyển khoản, chúng tôi sẽ gửi tài khoản qua email trong vòng 5-10 phút.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300" size="lg">
              Xác nhận đặt hàng
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};