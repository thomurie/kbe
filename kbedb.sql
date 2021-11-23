-- feed this to psql with psql < kbedb.sql

DROP DATABASE IF EXISTS knobby;

CREATE DATABASE knobby;

\c knobby;

CREATE EXTENSION IF NOT EXISTS 'pgcrypto';

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bikes;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS photos;

CREATE TYPE country AS ENUM('CAN', 'USA');
CREATE TYPE region AS ENUM('AB', 'AL', 'AR', 'AZ', 'BC', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'MA', 'MB', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NB', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NL', 'NM', 'NS', 'NT', 'NU', 'NV','NY', 'OH', 'OK', 'ON', 'OR', 'PA', 'PE', 'QC', 'RI', 'SC', 'SD', 'SK', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'YT');
CREATE TYPE size AS ENUM('S', 'M', 'L', 'XL');
CREATE TYPE color AS ENUM('Black', 'Blue', 'Brown', 'Green', 'Grey', 'Orange', 'Purple', 'Red', 'Silver', 'White', 'Yellow', 'Other');
CREATE TYPE suspension AS ENUM('None', 'Front', 'Full');
CREATE TYPE wheel_size as ENUM('26', '27.5', '29', 'Other');

CREATE TABLE users (
    email VARCHAR(255) UNIQUE PRIMARY KEY,
    password VARCHAR(64) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    country country DEFAULT 'USA',
    region region NOT NULL,
    phone VARCHAR(20),
    sms BOOLEAN DEFAULT TRUE,
    bio VARCHAR(255),
    createdat DATE,
    updatedat DATE
);

CREATE TABLE bikes (
    bike_id UUID DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users (email) ON DELETE CASCADE,
    make VARCHAR(64) NOT NULL,
    model VARCHAR(64) NOT NULL,
    year SMALLINT NOT NULL,
    price SMALLINT NOT NULL,
    country country DEFAULT 'USA',
    region region NOT NULL,
    size size,
    about VARCHAR(255),
    color color,
    wheel_size wheel_size,
    suspension suspension,
    front INTEGER,
    rear INTEGER,
    upgrades VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    createdAt DATE NOT NULL,
    updatedAt DATE,
    PRIMARY KEY (bike_id)
);

CREATE TABLE favorites (
    favorite_id UUID DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) REFERENCES users (email) ON DELETE CASCADE, 
    bike_id UUID REFERENCES bikes (bike_id) ON DELETE CASCADE,
    createdat DATE,
    updatedat DATE,
    PRIMARY KEY (favorite_id)
);

CREATE TABLE photos (
    url TEXT NOT NULL PRIMARY KEY,
    bike_id UUID REFERENCES bikes (bike_id) ON DELETE CASCADE,
    createdAt DATE,
    updatedAt DATE
);