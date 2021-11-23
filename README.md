Knobby Bike Exchange (KBE)

BACKEND
The KBE backend is built using Postgres, Sequelize, Apollo, and GraphQL.

Postgres manges the database tables and relationships
Sequelize is the ORM being used for communication with the database
GraphQL / Apollo is the router that allows create, read, update, and delete (CRUD) requests to be made to the server as well as manage the response from the sever to the client.

The KBE backend manages the CRUD for user profiles, bike listings, user favorites, and bike photos.
The KBE backend also manages authentication for the site. 
Bcrypt is used to hash plaintext passwords.
JSON Web Tokens is used create tokens for user authentication for making privileged requests. 

The sever can be cloned and started by:
cloning this repo.
running npm install
run psql < kbedb.sql in your terminal
create a .env file in the root directory of the project
in the .env file add DATABASE_URL= location of your PostgreSQL Database and SECRET= a unique code for creating your tokens
run npm start to start the database
use the Apollo Sandbox to test your database. 
