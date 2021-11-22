-- feed this to psql with psql < kbedb.sql

DROP DATABASE IF EXISTS knobby;

CREATE DATABASE knobby;

\c knobby;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bikes;
DROP TABLE IF EXISTS favorites;

CREATE TYPE state AS ENUM('AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');
CREATE TYPE size AS ENUM('S', 'M', 'L', 'XL');
CREATE TYPE color AS ENUM('Black', 'Blue', 'Brown', 'Green', 'Grey', 'Orange', 'Other', 'Purple', 'Red', 'Silver', 'White', 'Yellow');
CREATE TYPE suspension AS ENUM('None', 'Front', 'Full');
CREATE TYPE wheel_size as ENUM('26', '27.5', '29', 'Other');

CREATE TABLE users(
    email VARCHAR(255) UNIQUE PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    area INTEGER,
    phone INTEGER,
    text BOOLEAN DEFAULT TRUE,
    state state NOT NULL,
    createdAt DATE,
    updatedAt DATE
);

CREATE TABLE bikes (
    bike_id uuid DEFAULT uuid_generate_v4 (),
    user_id text REFERENCES users (email) ON DELETE CASCADE,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year integer NOT NULL,
    price integer NOT NULL,
    state state NOT NULL,
    size size,
    color color,
    wheel_size wheel_size,
    suspension suspension,
    front integer,
    rear integer,
    about VARCHAR(255),
    upgrades VARCHAR(255),
    is_active boolean DEFAULT TRUE,
    createdAt DATE,
    updatedAt DATE,
    PRIMARY KEY (bike_id)
    
);

CREATE TABLE favorites (
    favorite_id uuid DEFAULT uuid_generate_v4 (),
    bike_id uuid REFERENCES bikes (bike_id) ON DELETE CASCADE,
    user_id text REFERENCES users (email) ON DELETE CASCADE, 
    createdat DATE,
    updatedat DATE,
    PRIMARY KEY (favorite_id)
);

CREATE TABLE photos (
    photo_id uuid DEFAULT uuid_generate_v4 (),
    url text NOT NULL,
    bike_id uuid REFERENCES bikes (bike_id) ON DELETE CASCADE,
    createdAt DATE,
    updatedAt DATE,
    PRIMARY KEY (photo_id)
);