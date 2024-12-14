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
`` json
user - (object):
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
},
Token - JWT_TOKEN ``


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
``json
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


## Logout User

### Endpoint
`POST /user/logout`

### Description
This endpoint allows a user to log out of their account. It clears the authentication token from the user's cookies and adds the token to a blacklist to prevent further use.

### Request
- **Headers**
  - `Content-Type: application/json`
  
- **Cookies**
  - `token`: The JWT token used for authentication.

### Response
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Logged out"
  }


## Endpoint
`POST /captain/register`

## Description
This endpoint allows a new captain to register by providing their details. It validates the input data and creates a new captain in the database if the provided email does not already exist.

## Request Body
The request body must be in JSON format and should contain the following fields:

- `fullname`: An object containing the captain's full name.
  - `firstname`: A string representing the captain's first name (required, minimum 3 characters).
  - `lastname`: A string representing the captain's last name (optional, minimum 3 characters).
- `email`: A string representing the captain's email address (required, must be a valid email format).
- `password`: A string representing the captain's password (required, minimum 6 characters).
- `vehicle`: An object containing the vehicle details.
  - `color`: A string representing the vehicle's color (required, minimum 3 characters).
  - `plate`: A string representing the vehicle's plate number (required, minimum 3 characters).
  - `capacity`: A number representing the vehicle's capacity (required, must be at least 1).
  - `vehicleType`: A string representing the type of vehicle (required, must be one of "car", "motorcycle", or "auto").

### Notes
- Ensure that the email provided is unique and not already registered in the system.
- Passwords are hashed before being stored in the database for security purposes.

### Example Request
``json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "red",
    "plate": "XYZ 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}

### Example Response
{
  "token": "JWT_TOKEN",
  "newCaptain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}

## Endpoint
`POST /captain/login`

### Description
This endpoint allows an existing captain to log in by providing their email and password. It validates the input data and returns a JWT token if the credentials are correct.

### Request Body
The request body must be in JSON format and should contain the following fields:

- `email`: A string representing the captain's email address (required, must be a valid email format).
- `password`: A string representing the captain's password (required, minimum 6 characters).

### Notes
Ensure that the email and password provided match an existing captain in the system. If the credentials are valid, a JWT token will be returned for authentication in subsequent requests.

### Example Request
``json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}

### Example Response
{
  "token": "JWT_TOKEN",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ 1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}

### Endpoint
` GET /captain/profile `

### Description
This endpoint retrieves the profile information of the logged-in captain. It requires authentication via a valid JWT token.

### Example response

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "XYZ 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
} `


### Endpoint
`POST /captain/logout`

### Description
This endpoint allows a captain to log out of their account. It clears the authentication token from the captain's cookies and adds the token to a blacklist to prevent further use.

### Example Response
{
  "message": "Logged out"
}