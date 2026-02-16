INSERT INTO users (
    id,
    email,
    password_hash,
    created_at,
    updated_at
) VALUES (
    '11111111-1111-1111-1111-111111111111',
    'seller@example.com',
    '$2b$12$examplehashedpasswordstring',
    now(),
    now()
);

INSERT INTO users (
    id,
    email,
    password_hash,
    created_at,
    updated_at
) VALUES (
    '22222222-2222-2222-2222-222222222222',
    'buyer@example.com',
    '$2b$12$examplehashedpasswordstring',
    now(),
    now()
);

INSERT INTO sellers (
    id,
    store_name,
    store_slug,
    description,
    rating,
    total_sales,
    is_verified,
    is_active,
    support_email,
    support_phone,
    created_at,
    updated_at
) VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Demo Store',
    'demo-store',
    'Demo seller account for development',
    4.7,
    0,
    TRUE,
    TRUE,
    'support@demostore.com',
    '+1234567890',
    now(),
    now()
);

INSERT INTO buyers (
    id,
    username,
    is_verified,
    is_active,
    created_at,
    updated_at
) VALUES (
    '22222222-2222-2222-2222-222222222222',
    'demo_buyer',
    TRUE,
    TRUE,
    now(),
    now()
);
