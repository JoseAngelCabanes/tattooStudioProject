# Backend Project with TypeScript and MySQL

This project is a backend application developed using TypeScript and MySQL. It provides a simple API for managing users, allowing for the creation, updating, deletion, and retrieval of user information.

## Installation

To get started with the project, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install all the necessary dependencies.
3. Configure the MySQL database connection in the `config.ts` file.
4. Run the database migration scripts to set up the required tables.

## Usage

The API provides the following endpoints:

- `POST /users`: Create a new user.
- `GET /users/:id`: Retrieve a user by their ID.
- `PUT /users/:id`: Update an existing user.
- `DELETE /users/:id`: Delete a user by their ID.

Make sure to handle the error cases and validation properly.

## Technologies Used

- TypeScript
- MySQL
- Node.js

## Project Structure

The project structure is organized as follows:

/src
/controllers
/models
/routes
/config
/middlewares
server.ts
/migrations
/tests
/node_modules
package.json
tsconfig.json


## Running the Application

To run the application, use the following command:

npm start

This will start the server and allow you to make requests to the provided endpoints.

## Testing (still in development)

To run the tests, execute the following command:

npm test

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


