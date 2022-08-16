-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS yawp_reviews;
DROP TABLE IF EXISTS yawp_users;
DROP TABLE IF EXISTS yawp_restaurants;


CREATE TABLE yawp_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

INSERT INTO yawp_users (first_name, last_name, email, password_hash) VALUES 
('ambrose', 'beaumont', 'ambrose@test.com', 'notarealpasswordhash'),
('hildegarde', 'gibbons', 'hilde@test.com', 'notarealpasswordhash');


CREATE TABLE yawp_restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  location TEXT NOT NULL
);

INSERT INTO yawp_restaurants (name, type, location) VALUES 
('Creepy''s', 'Bar', 'Portland'),
('Pad Thai Kitchen', 'Thai', 'Portland'),
('El Burrito Azteca', 'Mexican', 'Portland'),
('Stumptown', 'Café', 'Portland');

CREATE TABLE yawp_reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  restaurant_id BIGINT,
  user_id BIGINT,
  stars INT,
  content VARCHAR NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES yawp_restaurants(id),
  FOREIGN KEY (user_id) REFERENCES yawp_users(id)
);

INSERT INTO yawp_reviews (restaurant_id, user_id, stars, content) VALUES 
(1, 1, 4, 'there are creepy dolls and it is creepy and creepy is good and also creepy and there is beer'),
(2, 1, 5, 'just get three orders of pad thai with tofu and eat it all do it'),
(3, 2, 4, 'veggie fajita burrito add chipotle and pico de gallo, if you forget to ask for extra salsa verde you will be wrong'),
(4, 2, 4, 'coffee is good but kat used to work here and she is just okay');
