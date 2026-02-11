CREATE TABLE users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMPTZ NOT NULL,
	updated_at TIMESTAMPTZ NOT NULL,
	banned_at TIMESTAMPTZ 
);

CREATE TABLE sellers (
	id UUID PRIMARY KEY REFERENCES users(id),

	store_name VARCHAR(256) NOT NULL,
	store_slug VARCHAR(256) UNIQUE NOT NULL,
	description TEXT,
	rating REAL CHECK (rating BETWEEN 0 AND 5),

	total_sales BIGINT NOT NULL DEFAULT 0,
	total_orders BIGINT NOT NULL DEFAULT 0,

	is_verified BOOLEAN NOT NULL DEFAULT FALSE,
	is_active BOOLEAN NOT NULL DEFAULT TRUE,

	support_email VARCHAR(255),
	support_phone VARCHAR(32),

	created_at TIMESTAMPTZ NOT NULL,
	updated_at TIMESTAMPTZ NOT NULL

);

CREATE TABLE buyers (
	id UUID PRIMARY KEY REFERENCES users(id),
	username VARCHAR(256) NOT NULL,
	is_verified BOOLEAN NOT NULL DEFAULT FALSE,
	total_orders BIGINT NOT NULL DEFAULT 0
);


CREATE TABLE products (
	id UUID PRIMARY KEY,
	seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE ON UPDATE CASCADE,
	name VARCHAR(255) NOT NULL,
	description TEXT,
	stock NUMERIC(10,3) NOT NULL,
	unit_of_measure VARCHAR(5) NOT NULL,
	unit_value NUMERIC(10,3) NOT NULL,
	price_per_unit NUMERIC(12,2) NOT NULL,
	rating REAL,
	created_at TIMESTAMPTZ DEFAULT(now()),
	updated_at TIMESTAMPTZ DEFAULT(now()),
	deleted_at TIMESTAMPTZ DEFAULT(NULL)
);

CREATE TABLE orders (
	id UUID PRIMARY KEY
);

CREATE TABLE order_items (
	id UUID PRIMARY KEY
);

-- CREATE TABLE addresses (
-- 	id UUID PRIMARY KEY,
-- 	user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--
-- 	label VARCHAR(50),
-- 	recipient_name VARCHAR(255) NOT NULL,
--
-- 	line1 VARCHAR(255) NOT NULL,
-- 	line2 VARCHAR(255),
-- 	city VARCHAR(100) NOT NULL,
-- 	state VARCHAR(100),
-- 	postal_code VARCHAR(20) NOT NULL,
-- 	country_code CHAR(2) NOT NULL,
--
-- 	phone VARCHAR(32),
-- 	instructions TEXT,
--
-- 	is_pickup_location BOOLEAN NOT NULL DEFAULT FALSE,
--
-- 	created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
-- 	updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

CREATE TABLE reviews(
	id UUID PRIMARY KEY,
	buyer_id  UUID REFERENCES buyers(id) ON DELETE CASCADE ON UPDATE CASCADE,
	product_id UUID REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
	content TEXT,
);

-- CREATE TABLE payments(
-- 	id UUID PRIMARY KEY
-- );
