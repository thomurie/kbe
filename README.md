## Knobby Bike Exchange Back-End

Live site: http://knobbybe.surge.sh/

### Purpose, motivation and description:

This is the backend portion of Knobby Bike Exchange. This code provides the core database and API endpoint for Knobby Bike Exchange Front-End ([KBEFE](https://github.com/thomurie/kbe_fe)). This backend project contains everything needed for managing users, bikes, and photos.
The primary goal is to create a backend that is scalable and readable.

The project is broken into 3 primary chunks, Models, Resolvers, and Schema. This structure facilitates a codebase that is easy to add additional features and maintain existing features. For example, recently support for Canadian users was added to this site, to add this functionality only 3 documents we modified all other existing code remained untouched.

### Data model:

KBE uses a relational [PostgreSQL](https://www.postgresql.org/) database. User input data is collected and sorted into tables. The database is currently composed of 4 tables. All tables are connected through an array of many to one, one to many, and many to many relationships. For further information please consult the [schema](https://github.com/thomurie/kbe/blob/main/project_info/kbedb_schema.png).

In accordance with the goal to be scalable, multiple types of databases were considered. A strong argument could be made to use a nonrelational database. In terms of adding fields to a table or collection it is significantly easier to modify a document on a nonrelational database than it is to modify a table on a relational database. A strong consideration was given to using a nonrelational database given the major scalability advantages. Considering the [schema](https://github.com/thomurie/kbe/blob/main/project_info/kbedb_schema.png) and relationships of the data it is important to note that the removal of a user and/or a bike has a large cascading effect that has the potential to affect all other users. This requires a dependence on referential integrity. After doing extensive research into using a popular Nonrelational database that supports referential integrity. Lauren Shaufer from MongoDB advised against the use of a nonrelational database that relies on heavy transactions [here](https://www.mongodb.com/blog/post/mongodb-qa-whats-the-deal-with-data-integrity-in-relational-databases-vs-mongodb).

After deciding to use a relational database several open source databases were considered. Ultimately PostgreSQL was used given it is highly expandable, supports JSON, and offers flexible full text search features. PostgreSQL has a comparatively low reading speed compared to other open source databases but the advantages of PostgreSQL outweigh this negative.

In my opinion PostgreSQL is a relational database that offers some of the benefits of a non relational database. Storing JSON is very similar to the data storage of a non relational database allowing the client to access entire objects and arrays of data from a single column in the database.

The advantage of a full text search allows KBE to obtain a wide range of data based on a simple text query from the user. Oftentimes bike names are an assortment of letters and numbers or an uncommonly used word. If a database with strict text searching was used the data retrieved would be incomplete or simply not found leading to a poor user experience. Given the goal to make KBE as easy to use as possible, the flexible full text search allows us to retrieve data that is even remotely close to what the user is looking for.

The advantage of being highly expandable is that the mountainbike industry is a growing industry. The Mountain Bike market in the U.S. is estimated at [11.9 Million Units](https://www.globenewswire.com/news-release/2020/10/16/2109772/28124/en/Global-Mountain-Bike-Industry-2020-to-2027-Market-Trajectory-Analytics.html) in the year 2020. For KBE that means the potential to host millions of listings every year. This amount of data requires that KBE be highly scalable, and expandable necessitating the use of a database like PostgreSQL. Additionally because KBEDB was built with a focus on scalability, data input into KBEDB is identified by UUID. UUID, combined with enumerators for immutable data, data input limitations on text inputs, remote storage of photos and other fields will allow KBEDB to make efficient use of storage while still allowing the application to be scalable.

### API or routing design:

[GraphQL](https://graphql.org/) is used as the query language for this API. GraphQL offers many benefits over REST APIs.

To start with, GraphQL is client driven. The server only has one endpoint. This endpoint is used by the client, in our case [Apollo](https://www.apollographql.com/) Client to retrieve specific data in one call. This single API call decreases load times, decreases code required for formating/destructuring data. Additionally GraphQL is significantly less error prone. Type checking, variable requirements, and requested data are all checked by the client before a call is made to the server. This creates a more dynamic app with better user feedback and user experience.

Because clients have the ability to dictate exactly what they need from the server, they receive that data in a predictable way. This is advantageous because every part of KBE requires different data. If a REST API was used multiple endpoints would need to be created causing multiple calls to the API, increased load times, decreased user experience and increased the amount of code required to sort through the retrieved data.

A word about security. In combination with GraphQl KBEDB uses JWT authentication and encryption to authenticate and validate users and their interactions with this API. Upon sign up sensitive user data is encrypted and stored in its hashed form in the database. An encrypted token is returned to the front end. All future interactions between the front end and back end are dealt with using this token. Login, account modifications, asset modifications, and other privileged access is only granted to users who possess a token that authorizes such actions. Invalid tokens or unauthenticated users are notified and access to resources on the front and back end is restricted.

### Front-end:

KBE is built using [React](https://reactjs.org/) a declarative component based library.

React was used for a number of reasons. First in accordance with our goal to be scalable, React is a great library for expanding on existing code because it uses reusable components. Reusable components means less code needs to be written and maintained. while still facilitating the ability to scale. New features can be created and integrated with ease.

For further information please see [Knobby Bike Exchange (Front-End)](https://github.com/thomurie/kbe_fe).

### Additional Features:

- User Features: create user profile, view user profile, update user profiles, and delete user profiles. Additional user features: authenticating user profiles, and privileged access and features,,

- Bike Features: create bikes, view bikes, update bikes, delete bikes, favorite bikes, view favorite bikes, and remove favorite bikes.

- Photos Features: create photos, view photos, and remove photos.

In addition to standard CRUD features this API includes features for favoriting, searching, and sharing bikes. This allows users to find, and share exactly what they are looking for in a used mountain bike.

Additional features are currently under development. Future features aim to increase user experience and improve accessibility and ease of use.

### Styling:

KBE uses [Chakra UI](https://chakra-ui.com/) to style the components. Chakra UI is a simple, modular and accessible component library that strictly follows WAI-ARIA standards for all components. Chakra UI allows KBE to be accessible, efficient, and easy to use. Additional accessibility features and tools are currently under development.

For further information please see [Knobby Bike Exchange (Front-End)](https://github.com/thomurie/kbe_fe).

### Testing:

Testing on the KBEFE consists of several different types of testing. 95% of data displayed on the front end relies on the back-end being operational. Coincidentally a working back-end isn't worth much if the front-end cannot access the data. Because of this focus a large emphasis was placed on End-to-End testing for the entire application. CRUD functionality for users, bikes, and photos is tested end-to-end. Authentication plays a large role in permission differences between guest and authorized users. Authorized users should have access to public data, their assets, and additional features. Public users should have access to only publically available data. Due to this difference in permissions additional tests were implemented to test these differences in permissions in order to ensure that secure data is secure and that public data is public.

### Deployment and next steps:

This Application has two separately deployed parts, the front-end and back-end. The back-end was deployed using Heroku. The front-end was deployed using Surge.
Heroku provides a number of additional features that make it ideal for hosting the back-end of this project. The primary objective achieved in the Knobby Bike Exchange Back-End (KBEBE) was scalability and performance. Given these requirements Heroku provides an ideal environment where developers can deploy a scalable application.
The primary objective achieved in the Knobby Bike Exchange Front-End ([KBEFE](https://github.com/thomurie/kbe_fe))was accessibility, user experience and performance. Surge was used for the front-end given its extreme ease in building and deploying React projects. Implementation and deployment of future features and performance enhancements can easily be implemented without requiring any rigorous changes to existing production builds.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br />

### `npm test`

Launches the test runner in the interactive watch mode.<br />
