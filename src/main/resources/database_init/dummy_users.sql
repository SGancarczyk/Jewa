INSERT INTO users (username, email, password, first_name, last_name, role)
VALUES
    -- password = "password"
    ('jdoe',    'jdoe@example.com',    '$2a$10$n1s3kmArDA1/knTVrWhzcOhcyJtsths.gmMk6Zt/os5NBlkClSUPq',  'John',    'Doe',     'USER'),

    -- password = "password"
    ('asmith',  'asmith@example.com',  '$2a$10$n1s3kmArDA1/knTVrWhzcOhcyJtsths.gmMk6Zt/os5NBlkClSUPq',  'Alice',   'Smith',   'USER'),

    -- password = "password"
    ('mmiller', 'mmiller@example.com', '$2a$10$n1s3kmArDA1/knTVrWhzcOhcyJtsths.gmMk6Zt/os5NBlkClSUPq', 'Michael', 'Miller',  'USER'),

    -- password = "password"
    ('test',  'test@example.com',  '1234', 'test',    'test',    'USER');
