-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_emoji TEXT,
  quantity TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create price_data table
CREATE TABLE IF NOT EXISTS public.price_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('Blinkit', 'Zepto', 'Instamart')),
  price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT true,
  delivery_time TEXT,
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, platform)
);

-- Create comparison_history table
CREATE TABLE IF NOT EXISTS public.comparison_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query TEXT NOT NULL,
  ai_analysis JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparison_history ENABLE ROW LEVEL SECURITY;

-- Public read access for products and prices (anyone can view)
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view price data"
  ON public.price_data FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view comparison history"
  ON public.comparison_history FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_price_data_product_id ON public.price_data(product_id);
CREATE INDEX idx_price_data_platform ON public.price_data(platform);
CREATE INDEX idx_products_category ON public.products(category);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for products
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.products (name, category, image_emoji, quantity) VALUES
  ('Amul Taaza Toned Milk', 'Dairy', '🥛', '1 Litre'),
  ('White Bread', 'Bakery', '🍞', '400g Pack'),
  ('Fresh Tomatoes', 'Vegetables', '🍅', '500g'),
  ('Basmati Rice', 'Grains', '🍚', '1kg'),
  ('Fresh Avocado', 'Fruits', '🥑', '1 piece'),
  ('Dairy Milk Silk', 'Snacks', '🍫', '150g'),
  ('Organic Apples', 'Fruits', '🍎', '1kg'),
  ('Real Juice Pack', 'Beverages', '🧃', '1 Litre')
ON CONFLICT DO NOTHING;

-- Insert sample price data
INSERT INTO public.price_data (product_id, platform, price, available, delivery_time, trend)
SELECT 
  p.id,
  platform_data.platform,
  platform_data.price,
  platform_data.available,
  platform_data.delivery_time,
  platform_data.trend
FROM public.products p
CROSS JOIN LATERAL (
  VALUES 
    ('Blinkit', 62.00, true, '8 min', 'up'),
    ('Zepto', 60.00, true, '10 min', 'down'),
    ('Instamart', 58.00, true, '15 min', 'stable')
) AS platform_data(platform, price, available, delivery_time, trend)
WHERE p.name = 'Amul Taaza Toned Milk'

UNION ALL

SELECT 
  p.id,
  platform_data.platform,
  platform_data.price,
  platform_data.available,
  platform_data.delivery_time,
  platform_data.trend
FROM public.products p
CROSS JOIN LATERAL (
  VALUES 
    ('Blinkit', 35.00, true, '8 min', 'stable'),
    ('Zepto', 32.00, true, '10 min', 'down'),
    ('Instamart', 34.00, true, '15 min', 'stable')
) AS platform_data(platform, price, available, delivery_time, trend)
WHERE p.name = 'White Bread'

UNION ALL

SELECT 
  p.id,
  platform_data.platform,
  platform_data.price,
  platform_data.available,
  platform_data.delivery_time,
  platform_data.trend
FROM public.products p
CROSS JOIN LATERAL (
  VALUES 
    ('Blinkit', 45.00, true, '8 min', 'up'),
    ('Zepto', 42.00, true, '10 min', 'stable'),
    ('Instamart', 40.00, true, '15 min', 'down')
) AS platform_data(platform, price, available, delivery_time, trend)
WHERE p.name = 'Fresh Tomatoes'
ON CONFLICT (product_id, platform) DO NOTHING;