USE jewadb;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

INSERT INTO users (username, password_hash, first_name, last_name)
VALUES 
  -- password = "password"
  ('jdoe',   '5f4dcc3b5aa765d61d8327deb882cf99', 'John',  'Doe'),

  -- password = "123456"
  ('asmith', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'Alice', 'Smith'),

  -- password = "letmein"
  ('mmiller','2b2e12a25f96f5a15f21fbe898f7e9bcb7d8d3bfa7e2f3b7cdab853b22a3a28e', 'Michael','Miller'),

  -- password = "secret"
  ('kbravo', '3a1c993e6ab7a1d457d45b00c0cb1ccdd2e54c4039b78dc4c6c83a45a77f9e0a', 'Kara',   'Bravo');


