-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS yawp_users;

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
