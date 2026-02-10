-- Insert one seller user
INSERT INTO users (
    id,
    email,
    password_hash,
    user_type,
    created_at,
    updated_at
) VALUES (
    '11111111-1111-1111-1111-111111111111',
    'seller@example.com',
    '$2b$12$examplehashedpasswordstring',
    'seller',
    NOW(),
    NOW()
);

-- Insert seller profile
INSERT INTO sellers (
    user_id,
    name,
    rating
) VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Demo Seller',
    4.7
);
