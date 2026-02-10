CREATE TABLE users (
	id UUID PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	role VARCHAR(50) NOT NULL,
	created_at TIMESTAMP DEFAULT(now()),
	updated_at TIMESTAMP DEFAULT(now())
);

CREATE TABLE sellers (
	user_id UUID PRIMARY KEY REFERENCES users(id),
	name VARCHAR(256) NOT NULL,
	rating REAL,
	created_at TIMESTAMPTZ DEFAULT(now()),
	updated_at TIMESTAMPTZ DEFAULT(now())
);


CREATE TABLE products (
	id UUID PRIMARY KEY,
	seller_id UUID REFERENCES sellers(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
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
