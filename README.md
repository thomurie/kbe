#Knobby Bike Exchange Front-End

1. ##Purpose, motivation and description:
   This is the backend portion of Knobby Bike Exchange. This code provides the core functionality to the front end application. This backend project contains everything needed for creating, updating, viewing and removing users, bikes, and photos. This backend handles authentication and manages access based on the relation of the user to the asset they are trying to manage.
   The primary goal in this backend is scalability and readability. This project has lots of room for growth and future development. Months could be spent adding features and functionality to the existing code so it was extremely important throughout the entire development process to create a codebase that is easily scalable and readable. The project is broken into 3 chunks, Models, Resolvers, and Schema.
   This structure allows myself and others to easily add additional features while decreasing the amount of code that would need to be refactored. For example, recently support for Canadian buyers and sellers was added to this site, to add this functionality only 3 documents we modified all other existing code remained untouched.

###Primary Features Include:

- Create users
- Read users
- Update users
- Delete users
- Authenticating users
- Privileged access for users

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
   Knobby Bike Exchange Database (KBEDB) is a relational database built with PostgreSQL. Data is divided into tables based on category. Currently divided into 4 tables the KBEDB collects and stores user input data into an easy to read, and use SQL database.

Although data is divided amongst 4 tables, a combination of One to Many, Many to Many, and Many to One relationships are used to connect data in an intuitive manner.

User input data is collected and stored into Users, Bikes, Favorites, and Photos tables. The table names are self explanatory with each table housing multiple columns of data related to the associated title. A Many to One relationship between the Bikes and Users tables connect a required owner to each input bike. A Many to Many relationship modeled by the Favorites table connects multiple bikes to multiple users allowing multiple users to favorite multiple bikes. Finally a Many to One relationship connects Photos to Bikes allowing Bikes to have multiple photos.

Because KBEDB was built with a focus on scalability, data input into KBEDB is identified by UUID. UUID, combined with enumerators for immutable data , data input limitations on text inputs, remote storage of photos and other fields will allow KBEDB to make efficient use of storage while still allowing the application to be scalable.

For more information please take a look at the KBEDB Schema found in the "project_info" folder

3. ##API design:
   KBEDB uses a GraphQL backend to retrieve data. If you are not familiar with GraphQl, explained briefly, it is a more modern approach to today's API needs. Rather than using a REST API and building multiple unique end points for data retrieval GraphQl was used allowing us to have a single point of entry. Having one endpoint for data retrieval allows you to focus more on the users' experience and customize the data retrieved for each user interaction.

A word about security. In combination with GraphQl KBEDB uses JWT authentication and encryption to authenticate and validate users and their interactions with this API. Upon sign up sensitive user data is encrypted and stored in its hashed form in the database. An encrypted token is returned to the front end. All future interactions between the front end and back end are dealt with using this token. Login, account modifications, asset modifications, and other privileged access is only granted to users who possess a token that authorizes such actions. Invalid tokens or unauthenticated users are notified and access to resources on the front and back end is restricted.

4. Additional Features:

In addition to standard CRUD features this API includes features for favoriting, searching, and sharing bikes. This allows users to find, and share exactly what they are looking for in a used mountain bike.

Additional features are currently under development. Future features aim to increase user experience and improve accessibility and ease of use.

5. Testing:

   This application is co-dependant on the front-end application. Due to this dependency the most import features were tested in end-to-end tests to ensure that user's have a smooth experience with this applicaton. See the testing section of the Knobby Bike Exchange Front-End README.

6. Deployment and next steps: This application is deployed to Heroku. Essential
   This Application has two separately deployed parts, the front-end and back-end. The back-end was deployed using heroku. The front-end was deployed using Surge.
   Heroku provides a number of additional features that make it ideal for hosting the back-end of this project. The objective achieved in the Knobby Bike Exchange Back-End (KBEBE) was scalability and performance. (See the KBEBE README for further details). Given these requirements Heroku provides an ideal environment where developers can deploy a scalable application. In addition to thie code, Environment variables are managed by the Heroku system. Ensuring that nonpublic data stay protected.
