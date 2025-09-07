-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  duration TEXT NOT NULL,
  devices TEXT NOT NULL,
  category TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  domain TEXT NOT NULL, -- For favicon API
  product_key TEXT NOT NULL, -- For grouping variants like capcut-1m, capcut-12m
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (no auth required for product viewing)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert all products from the current data
INSERT INTO public.products (name, description, price, duration, devices, category, is_available, domain, product_key) VALUES
('Capcut Pro', '2 thiết bị, 12 tháng (Acc cấp)', 279000, '12 tháng', '2 thiết bị', 'Video Editing', true, 'capcut.com', 'capcut-pro-12m'),
('Capcut Pro', '3 thiết bị, 1 tháng (Acc cấp)', 30000, '1 tháng', '3 thiết bị', 'Video Editing', true, 'capcut.com', 'capcut-pro-1m'),
('Youtube Premium', 'Mail chính chủ, 12 tháng (Add family)', 299000, '12 tháng', 'Family', 'Entertainment', true, 'youtube.com', 'youtube-premium-12m'),
('Youtube Premium', 'Mail chính chủ, 6 tháng (Add family)', 189000, '6 tháng', 'Family', 'Entertainment', true, 'youtube.com', 'youtube-premium-6m'),
('Youtube Premium', 'Mail chính chủ, 1 tháng (Add family)', 30000, '1 tháng', 'Family', 'Entertainment', true, 'youtube.com', 'youtube-premium-1m'),
('Canva (Slot EDU)', '1 tháng', 19000, '1 tháng', '1 thiết bị', 'Design', true, 'canva.com', 'canva-edu-1m'),
('Canva (Slot EDU)', '12 tháng', 99000, '12 tháng', '1 thiết bị', 'Design', true, 'canva.com', 'canva-edu-12m'),
('Canva Pro', '12 tháng', 199000, '12 tháng', '1 thiết bị', 'Design', true, 'canva.com', 'canva-pro-12m'),
('Spotify Premium', '12 tháng (Acc cấp)', 339000, '12 tháng', '1 thiết bị', 'Music', true, 'spotify.com', 'spotify-12m-acc'),
('Spotify Premium', '12 tháng (Chính chủ)', 629000, '12 tháng', '1 thiết bị', 'Music', true, 'spotify.com', 'spotify-12m-owner'),
('Spotify Premium', '6 tháng (Acc cấp)', 239000, '6 tháng', '1 thiết bị', 'Music', true, 'spotify.com', 'spotify-6m-acc'),
('Spotify Premium', '1 tháng (Chính chủ)', 49000, '1 tháng', '1 thiết bị', 'Music', true, 'spotify.com', 'spotify-1m-owner');