# Backend API Documentation

## Endpoint
`POST /user/register`

## Description
This endpoint allows a new user to register by providing their details. It validates the input data and creates a new user in the database if the provided email does not already exist.

## Request Body
The request body must be in JSON format and should contain the following fields:

- `fullname`: An object containing the user's full name.
  - `firstname`: A string representing the user's first name (required, minimum 3 characters).
  - `lastname`: A string representing the user's last name (optional, minimum 3 characters).
- `email`: A string representing the user's email address (required, must be a valid email format).
- `password`: A string representing the user's password (required, minimum 6 characters).

### Notes
Ensure that the email provided is unique and not already registered in the system.
Passwords are hashed before being stored in the database for security purposes.

### Example Request
```json
user - (object):
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
},
Token - JWT_TOKEN



## Endpoint
`POST /user/login`

## Description
This endpoint allows an existing user to log in by providing their email and password. It validates the input data and returns a JWT token if the credentials are correct.

## Request Body
The request body must be in JSON format and should contain the following fields:

- `email`: A string representing the user's email address (required, must be a valid email format).
- `password`: A string representing the user's password (required, minimum 6 characters).

### Notes
Ensure that the email and password provided match an existing user in the system. If the credentials are valid, a JWT token will be returned for authentication in subsequent requests.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}

### Example Response
{
  "token": "JWT_TOKEN",
  "user": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  }
}