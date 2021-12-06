-- feed this to psql with psql < kbedb_seed.sql
-- \c knobbytest;
\c knobby;

INSERT INTO users (email, password, first_name, last_name, country, region, phone)
VALUES 
('test0user@aol.com', 'password', 'Test0', 'U', 'USA', 'OR', '5551112222'),
('test1user@aol.com', 'password', 'Test1', 'U', 'USA', 'CA', '5551112222'),
('test2user@aol.com', 'password', 'Test2', 'U', 'CAN', 'BC', '5551112222'),
('test3user@aol.com', 'password', 'Test3', 'U', 'CAN', 'BC', '5551112222');

INSERT INTO bikes ( user_id, make, model, year, price, country, region, size, color, wheel_size, suspension, front, rear, about, upgrades, is_active, createdat)
VALUES
('test0user@aol.com', 'Santa Cruz', 'Chameleon', 2010, 2000, 'USA', 'OR', 'M', 'yellow', '29', 'front', 120, 0, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test0user@aol.com', 'Santa Cruz', 'Hightower', 2010, 4000, 'USA', 'OR', 'L', 'black', '27.5', 'full', 150, 145, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test0user@aol.com', 'Santa Cruz', 'Nomad', 2010, 6000, 'USA', 'OR', 'XL', 'green', '27.5', 'full', 170, 170, 'bicycle', 'Carbon', FALSE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Scalpel', 2011, 10000, 'USA', 'CA', 'L', 'black', '26', 'full', 100, 100, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Jekyll', 2011, 4000, 'USA', 'CA', 'M', 'grey', '29', 'full', 170, 165, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Habit', 2011, 3500, 'USA', 'CA', 'S', 'brown', '29', 'full', 140, 130, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Stumpjumper', 2012, 6000, 'CAN', 'BC', 'XL', 'black', '29', 'full', 150, 150, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Turbo Levo', 2012, 1000, 'CAN', 'BC', 'L', 'blue', '27.5', 'full', 160, 150, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Rockhopper', 2012, 1000, 'CAN', 'BC', 'M', 'green', '26', 'front', 110, 0, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'Firebird', 2013, 7000, 'CAN', 'BC', 'XL', 'orange', '29', 'full', 160, 165, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'MAch 6', 2013, 7000, 'CAN', 'BC', 'M', 'white', '29', 'full', 140, 120, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'Trail 429', 2013, 9000, 'CAN', 'BC', 'S', 'blue', '27.5', 'full', 160, 150, 'bicycle', 'Carbon', FALSE, '2021-11-01'),
('test0user@aol.com', 'Santa Cruz', 'Chameleon', 2010, 2000, 'USA', 'OR', 'M', 'yellow', '29', 'front', 120, 0, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test0user@aol.com', 'Santa Cruz', 'Hightower', 2010, 4000, 'USA', 'OR', 'L', 'black', '27.5', 'full', 150, 145, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test0user@aol.com', 'Santa Cruz', 'Nomad', 2010, 6000, 'USA', 'OR', 'XL', 'green', '27.5', 'full', 170, 170, 'bicycle', 'Carbon', FALSE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Scalpel', 2011, 10000, 'USA', 'CA', 'L', 'black', '26', 'full', 100, 100, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Jekyll', 2011, 4000, 'USA', 'CA', 'M', 'grey', '29', 'full', 170, 165, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test1user@aol.com', 'Cannondale', 'Habit', 2011, 3500, 'USA', 'CA', 'S', 'brown', '29', 'full', 140, 130, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Stumpjumper', 2012, 6000, 'CAN', 'BC', 'XL', 'black', '29', 'full', 150, 150, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Turbo Levo', 2012, 1000, 'CAN', 'BC', 'L', 'blue', '27.5', 'full', 160, 150, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'Specialized', 'Rockhopper', 2012, 1000, 'CAN', 'BC', 'M', 'green', '26', 'front', 110, 0, 'bicycle', 'Aluminum', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'Firebird', 2013, 7000, 'CAN', 'BC', 'XL', 'orange', '29', 'full', 160, 165, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'MAch 6', 2013, 7000, 'CAN', 'BC', 'M', 'white', '29', 'full', 140, 120, 'bicycle', 'Carbon', TRUE, '2021-11-01'),
('test3user@aol.com', 'PIVOT', 'Trail 429', 2013, 9000, 'CAN', 'BC', 'S', 'blue', '27.5', 'full', 160, 150, 'bicycle', 'Carbon', FALSE, '2021-11-01');