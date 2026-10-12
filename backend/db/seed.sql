-- Fake data so the API has something to return. Safe to skip.
INSERT INTO users (username, email, password_hash)
VALUES ('testowner', 'owner@example.com', 'not-a-real-hash');

INSERT INTO stores (owner_id, store_name, description)
VALUES (1, 'Test Store', 'A placeholder store');

INSERT INTO products (store_id, product_name, description, price, inventory_count)
VALUES
  (1, 'Test Item', 'First placeholder product', 9.99, 10),
  (1, 'Other Item', 'Second placeholder product', 19.99, 5);
