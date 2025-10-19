-- Update platform constraint to support all 6 platforms
ALTER TABLE price_data DROP CONSTRAINT IF EXISTS price_data_platform_check;

ALTER TABLE price_data ADD CONSTRAINT price_data_platform_check 
  CHECK (platform IN ('Blinkit', 'Zepto', 'Instamart', 'Flipkart Minutes', 'Amazon Minutes', 'Big Basket'));

-- Add comprehensive sample data for vegetables, fruits, and dairy products across all platforms

-- Insert vegetables
INSERT INTO products (name, category, image_emoji, quantity) VALUES
('Tomato', 'Vegetables', '🍅', '500g'),
('Onion', 'Vegetables', '🧅', '1kg'),
('Potato', 'Vegetables', '🥔', '1kg'),
('Carrot', 'Vegetables', '🥕', '500g'),
('Cauliflower', 'Vegetables', '🥦', '1pc'),
('Capsicum', 'Vegetables', '🫑', '250g'),
('Spinach', 'Vegetables', '🥬', '250g'),
('Broccoli', 'Vegetables', '🥦', '500g')
ON CONFLICT (id) DO NOTHING;

-- Insert fruits
INSERT INTO products (name, category, image_emoji, quantity) VALUES
('Apple', 'Fruits', '🍎', '1kg'),
('Banana', 'Fruits', '🍌', '6pcs'),
('Orange', 'Fruits', '🍊', '1kg'),
('Mango', 'Fruits', '🥭', '1kg'),
('Grapes', 'Fruits', '🍇', '500g'),
('Watermelon', 'Fruits', '🍉', '1pc'),
('Pomegranate', 'Fruits', '🍎', '1kg'),
('Strawberry', 'Fruits', '🍓', '250g')
ON CONFLICT (id) DO NOTHING;

-- Insert dairy products
INSERT INTO products (name, category, image_emoji, quantity) VALUES
('Milk', 'Dairy', '🥛', '1L'),
('Curd', 'Dairy', '🥛', '500g'),
('Paneer', 'Dairy', '🧈', '200g'),
('Butter', 'Dairy', '🧈', '100g'),
('Cheese', 'Dairy', '🧀', '200g'),
('Ghee', 'Dairy', '🥛', '500ml'),
('Buttermilk', 'Dairy', '🥛', '500ml'),
('Cream', 'Dairy', '🥛', '200ml')
ON CONFLICT (id) DO NOTHING;

-- Insert price data for all products across all 6 platforms
-- Vegetables prices
INSERT INTO price_data (product_id, platform, price, available, delivery_time, trend)
SELECT 
  p.id,
  platform,
  CASE platform
    WHEN 'Blinkit' THEN (random() * 50 + 20)::numeric(10,2)
    WHEN 'Zepto' THEN (random() * 50 + 22)::numeric(10,2)
    WHEN 'Instamart' THEN (random() * 50 + 21)::numeric(10,2)
    WHEN 'Flipkart Minutes' THEN (random() * 50 + 23)::numeric(10,2)
    WHEN 'Amazon Minutes' THEN (random() * 50 + 24)::numeric(10,2)
    WHEN 'Big Basket' THEN (random() * 50 + 19)::numeric(10,2)
  END,
  true,
  CASE platform
    WHEN 'Blinkit' THEN '10 mins'
    WHEN 'Zepto' THEN '10 mins'
    WHEN 'Instamart' THEN '15 mins'
    WHEN 'Flipkart Minutes' THEN '12 mins'
    WHEN 'Amazon Minutes' THEN '15 mins'
    WHEN 'Big Basket' THEN '2-3 hrs'
  END,
  CASE (random() * 3)::int
    WHEN 0 THEN 'up'
    WHEN 1 THEN 'down'
    ELSE 'stable'
  END::text
FROM products p
CROSS JOIN (
  SELECT unnest(ARRAY['Blinkit', 'Zepto', 'Instamart', 'Flipkart Minutes', 'Amazon Minutes', 'Big Basket']) AS platform
) platforms
WHERE p.category = 'Vegetables'
ON CONFLICT DO NOTHING;

-- Fruits prices
INSERT INTO price_data (product_id, platform, price, available, delivery_time, trend)
SELECT 
  p.id,
  platform,
  CASE platform
    WHEN 'Blinkit' THEN (random() * 100 + 50)::numeric(10,2)
    WHEN 'Zepto' THEN (random() * 100 + 52)::numeric(10,2)
    WHEN 'Instamart' THEN (random() * 100 + 51)::numeric(10,2)
    WHEN 'Flipkart Minutes' THEN (random() * 100 + 53)::numeric(10,2)
    WHEN 'Amazon Minutes' THEN (random() * 100 + 54)::numeric(10,2)
    WHEN 'Big Basket' THEN (random() * 100 + 48)::numeric(10,2)
  END,
  true,
  CASE platform
    WHEN 'Blinkit' THEN '10 mins'
    WHEN 'Zepto' THEN '10 mins'
    WHEN 'Instamart' THEN '15 mins'
    WHEN 'Flipkart Minutes' THEN '12 mins'
    WHEN 'Amazon Minutes' THEN '15 mins'
    WHEN 'Big Basket' THEN '2-3 hrs'
  END,
  CASE (random() * 3)::int
    WHEN 0 THEN 'up'
    WHEN 1 THEN 'down'
    ELSE 'stable'
  END::text
FROM products p
CROSS JOIN (
  SELECT unnest(ARRAY['Blinkit', 'Zepto', 'Instamart', 'Flipkart Minutes', 'Amazon Minutes', 'Big Basket']) AS platform
) platforms
WHERE p.category = 'Fruits'
ON CONFLICT DO NOTHING;

-- Dairy prices
INSERT INTO price_data (product_id, platform, price, available, delivery_time, trend)
SELECT 
  p.id,
  platform,
  CASE platform
    WHEN 'Blinkit' THEN (random() * 80 + 30)::numeric(10,2)
    WHEN 'Zepto' THEN (random() * 80 + 32)::numeric(10,2)
    WHEN 'Instamart' THEN (random() * 80 + 31)::numeric(10,2)
    WHEN 'Flipkart Minutes' THEN (random() * 80 + 33)::numeric(10,2)
    WHEN 'Amazon Minutes' THEN (random() * 80 + 34)::numeric(10,2)
    WHEN 'Big Basket' THEN (random() * 80 + 29)::numeric(10,2)
  END,
  true,
  CASE platform
    WHEN 'Blinkit' THEN '10 mins'
    WHEN 'Zepto' THEN '10 mins'
    WHEN 'Instamart' THEN '15 mins'
    WHEN 'Flipkart Minutes' THEN '12 mins'
    WHEN 'Amazon Minutes' THEN '15 mins'
    WHEN 'Big Basket' THEN '2-3 hrs'
  END,
  CASE (random() * 3)::int
    WHEN 0 THEN 'up'
    WHEN 1 THEN 'down'
    ELSE 'stable'
  END::text
FROM products p
CROSS JOIN (
  SELECT unnest(ARRAY['Blinkit', 'Zepto', 'Instamart', 'Flipkart Minutes', 'Amazon Minutes', 'Big Basket']) AS platform
) platforms
WHERE p.category = 'Dairy'
ON CONFLICT DO NOTHING;