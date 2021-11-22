-- feed this to psql with psql < kbedb_seed.sql

\c knobby;

INSERT INTO users (email, password, first_name,last_name, area, phone, text, state)
VALUES 
('test0user@aol.com', 'password', 'Test0', 'User' ,555, 1112222, TRUE, 'OR'),
('test1user@aol.com', 'password', 'Test1', 'User' ,555, 1112222, FALSE, 'CA'),
('test2user@aol.com', 'password', 'Test2', 'User' ,555, 1112222, TRUE, 'CO'),
('test3user@aol.com', 'password', 'Test3', 'User' ,555, 1112222, FALSE, 'NY');

INSERT INTO bikes ( user_id, make, model, year, price, state, size, color, wheel_size, suspension, front, rear, about, upgrades, is_active, createdAt)
VALUES
('test0user@aol.com', 'Santa Cruz', 'Chameleon', 2010, 2000, 'OR', 'M', 'Yellow', '29', 'Front', 120, 0, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test0user@aol.com', 'Santa Cruz', 'Hightower', 2010, 4000, 'OR', 'L', 'Black', '27.5', 'Full', 150, 145, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test0user@aol.com', 'Santa Cruz', 'Nomad', 2010, 6000, 'OR', 'XL', 'Green', '27.5', 'Full', 170, 170, 'bicycle', 'Carbon', FALSE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Scalpel', 2011, 10000,  'CA', 'L', 'Black', '26', 'Full', 100, 100, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Jekyll', 2011, 4000,  'CA', 'M', 'Grey', '29', 'Full', 170, 165, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Habit', 2011, 3500,  'CA', 'S', 'Brown', '29', 'Full', 140, 130, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Stumpjumper', 2012, 6000, 'CO', 'XL', 'Black', '29', 'Full', 150, 150, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Turbo Levo', 2012, 1000, 'CO', 'L', 'Blue', '27.5', 'Full', 160, 150, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Rockhopper', 2012, 1000, 'CO', 'M', 'Green', '26', 'Front', 110, 0, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'Firebird', 2013, 7000, 'NY', 'XL', 'Orange', '29', 'Full', 160, 165, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'MAch 6', 2013, 7000, 'NY', 'M', 'White', '29', 'Full', 140, 120, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'Trail 429', 2013, 9000, 'NY', 'S', 'Blue', '27.5', 'Full', 160, 150, 'bicycle', 'Carbon', FALSE, '2021-11-01');