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

Each Project should have an about page on the portfolio that explains the following

1. ##Purpose, motivation and description:
   This is the backend portion of Knobby Bike Exchange. This code provides the core functionality to the front end application. This backend project contains everything needed for creating, updating, viewing and removing users, bikes, and photos. This backend handles authentication and manages access based on relation of user to the asset they are trying to manage.
   The primary goal in this backend is scalability and readability. This project has lots of room for growth and future development. Months could be spent adding features and functionality to the existing code so it was extremely important throughout the entire development process to create a codebase that is easily scalable and readable. The project is broken into 3 chunks, Models, Resolvers, and Schema.
   This structure allows myself and others to easily add additional features while decreasing the amount of code that would need to be refactored. For example recently support for Canadian buyers and sellers was added to this site, to add this functionality only 3 documents we modified all other existing code remained untouched.

###Primary Features Include:

- Create users
- Read users
- Update users
- Delete users
- Authenticating users
- Priviliged access for users

- Create bikes
- Read bikes
- Update bikes
- Delete bikes

- Create favorite
- Read favorite
- Delete favorite

- Create photos
- Read photos
- Delete photos

2. ##Data model:
   Knobby Bike Echange Database (KBEDB) is a relational database built with PostgreSQL. Data is divided into tables based on category. Currently divided into 4 tables the KBEDB collects and stores user input data into an easy to read, and use SQL database.

   Although data is divided amongst 4 tables, a combination of One to Many, Many to Many, and Many to One relationships are used to connect data in an intuitive manner.

   User input data is collected and stored into Users, Bikes, Favorites, and Photos tables. The table names are self explanitory with each table housing multiple columns of data related to the associated title. A Many to One belationship between the Bikes and Users tables connect a required owner to each input bike. A Many to Many relationship modeled by the Favorites table connects multiple bikes to multiple users allowing multiple users to favorite multiple bikes. Finally a Many to One relationship connects Photos to Bikes allowing Bikes to have multiple photos.

   Because KBEDB was built with a focus on scalability data input into KBEDB is identified by UUID. UUID, combined with enumerators for immutible data , data input limitations on text inputs, remote storage of photos and other fields will allow KBEDB to make efficient use of storage while still allowing the application to be scalable.

   For more information please take a look at the KBEDB Schema found in the "project_info" folder

3. ##API design: If there is an API built or routing set up on the backend, are RESTful routing conventions followed? How is the backend structured and how are routes declared? Are the correct HTTP verbs being used for each of the routes? The interviewer will ask follow-up questions to probe the your depth of understanding. Some examples:
   KBEDB uses a GraphQL backend to retrieve data. If your are not familiar with GraphQl, explained breifly, it is a more modern approach to todays API needs. Rather than using a REST API and building multiple unique end points for data retrieval GraphQl was used allowing us to have a single point of entry. Having one endpoint for data retrieval allows you to focus more on the users' experience and customize the data retrieved for each user interaction.

   A word about security. In combination with GraphQl KBEDB uses JWT authetication and encryption to authenticate and validate users and their interactions with this API. Upon sign up sensitive user data is encrypted and stored in its hashed form in the database. An encrypted token is returned to the front end. All future interactions between the front end and back end are dealt with using this token. Login, account modifications, asset modifications, and other privileged access is only granted to users who posses a token that authorizes such actions. Invalid tokens or unauthenticated users are notified and access to resources on the front and back end is restricted.

4. Additional Features: You should be able to discuss what makes this project
   different from a standard CRUD app. The candidate should also be able to describe any interesting features and pieces of functionality that make this app interesting. Here are some sample questions:

   In addition to standard CRUD features this API includes features for favoriting, searching, and sharing bikes. This allows users to find, and share exactly what they are looking for in a used mountain bike.

   Additional features are currently under development. Future features aim to increase user experience and improve accessibility and ease of use.

5. Testing: You should describe what parts of the application are tested either by coverage or explaining the test suite. Testing is essential in projects so you should discuss your testing philosophies, what parts of the application are tested and whether unit, integration, and/or end-to-end tests are used.
   Some sample questions:

   This application is co-dependant on the front-end application. Due to this dependency the most import features were tested in end-to-end tests to ensure that user's have a smooth experience with this applicaton.

6. Deployment and next steps: This phase is overlooked by many candidates, especially those who don’t have industry experience. The goal of this final section of the walkthrough is to see how the project migrated to a production environment with a URL that can be visited from any browser. Here are some sample questions: This application is deployed to Heroku. Essential
   (1) How did you deploy the application? Is this one app or two apps deployed separately?
   (2) How are you handling environment variables?
   (3) Are there any performance or scaling considerations for this application?
