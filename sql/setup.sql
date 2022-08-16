-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

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
