-- owner_id = 1 (musi istnieć w tabeli _user lub users)
INSERT INTO offers (id, title, description, price_per_day, created_at, vehicle_id, owner_id)
VALUES (1, 'Ekonomiczna Toyota', 'Idealna na miasto, mało pali.', 120.00, NOW(), 1, 1),
        (2, 'Luksusowe BMW', 'Pełne wyposażenie, skóra.', 450.50, DATE_SUB(NOW(), INTERVAL 1 DAY), 2, 1),
        (3, 'Bestia Mustang', 'Tylko dla doświadczonych kierowców.', 600.00, DATE_SUB(NOW(), INTERVAL 2 DAY), 3, 1);