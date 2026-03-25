-- =========================
-- DROP DEPENDENT / LOWEST LEVEL TABLES FIRST
-- =========================

DROP TABLE IF EXISTS review_images;
DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS sale_moderation;
DROP TABLE IF EXISTS sale_complaint_images;
DROP TABLE IF EXISTS sale_complaints;

DROP TABLE IF EXISTS sales;

DROP TABLE IF EXISTS reservations;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;

DROP TABLE IF EXISTS product_reviews;
DROP TABLE IF EXISTS product_moderation;
DROP TABLE IF EXISTS product_complaint_images;
DROP TABLE IF EXISTS product_complaints;

DROP TABLE IF EXISTS product_images;

DROP TABLE IF EXISTS inventory_movement;

DROP TABLE IF EXISTS sell_units;

DROP TABLE IF EXISTS product_delivery_schedules;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS delivery_schedules;

DROP TABLE IF EXISTS stores;

DROP TABLE IF EXISTS seller_moderation;
DROP TABLE IF EXISTS buyer_moderation;

DROP TABLE IF EXISTS buyers;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS sellers;

DROP TABLE IF EXISTS addresses;

DROP TABLE IF EXISTS barangays;
DROP TABLE IF EXISTS municipalities_cities;
DROP TABLE IF EXISTS provinces;
DROP TABLE IF EXISTS regions;

DROP TABLE IF EXISTS verification_codes;

DROP TABLE IF EXISTS accounts;

DROP TABLE IF EXISTS outbox;

-- =========================
-- DROP ENUM TYPES
-- =========================

DROP TYPE IF EXISTS verification_type;
