INSERT INTO users (username, email, password, first_name, last_name)
VALUES
    -- password = "password"
    ('jdoe',    'jdoe@example.com',    '5f4dcc3b5aa765d61d8327deb882cf99',  'John',    'Doe'),

    -- password = "123456"
    ('asmith',  'asmith@example.com',  'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',  'Alice',   'Smith'),

    -- password = "letmein"
    ('mmiller', 'mmiller@example.com', '2b2e12a25f96f5a15f21fbe898f7e9bcb7d8d3bfa7e2f3b7cdab853b22a3a28e', 'Michael', 'Miller'),

    -- password = "secret"
    ('kbravo',  'kbravo@example.com',  '3a1c993e6ab7a1d457d45b00c0cb1ccdd2e54c4039b78dc4c6c83a45a77f9e0a', 'Kara',    'Bravo');
