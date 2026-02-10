CREATE TABLE users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT(now()),
	updated_at TIMESTAMPTZ DEFAULT(now()),
	banned_at TIMESTAMPTZ 
);

CREATE TABLE sellers (
	id UUID PRIMARY KEY REFERENCES users(id),
	store_name VARCHAR(256) NOT NULL,
	rating REAL,
	total_sales BIGINT NOT NULL
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
