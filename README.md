# Car Wash Booking System

Welcome to the Car Wash Booking System, a comprehensive backend solution designed to streamline the operations of a car wash service. This project aims to provide a seamless and efficient experience for users booking car wash services while ensuring robust management and security on the backend.

## Precondition

Before running the server locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and npm
- [Mongoose](https://mongoosejs.com/) database

### Installation

1. Clone the repository:

open your command prompt and clone the repository
git clone https://github.com/brcshakil1/cw-booking.git

2. Navigate to the project directory:

   ```sh
   cd your-repo-name
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Create a .env file in the root directory and add your environment variables.

   ```
   NODE_ENV='development'
   PORT=5000
   DATABASE_URL=your_database_url
   BCRYPT_SALT_ROUNDS=15
   JWT_ACCESS_SECRET=add_a_secret_code
   JWT_ACCESS_EXPIRES_IN=add_access_expire_date
   JWT_REFRESH_SECRET=add_a_secret_code
   JWT_REFRESH_EXPIRES_IN=add_refresh_expire_date
   ```

### Running the Application

1. Now you can run the application by applying following command:

   ```sh
   npm run start:dev
   ```

# Endpoints

## Auth

### 1. Create a New User

- Endpoint: /api/auth/signup

- Method: POST

- Request Body:

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin",
  "address": "123 Main Street, City, Country"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### 2. Login user

- Endpoint: /api/auth/login
- Method: POST

- Request Body:

```json
{
  "email": "web@programming-hero.com",
  "password": "ph-password"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

## Service

### 3. Create Service (Only Accessible by Admin)

- Endpoint: /api/services

- Method: POST

- Request Headers:

```
Authorization: Bearer JWT_TOKEN
```

```json
{
  "name": "Car Wash",
  "description": "Professional car washing service",
  "price": 50,
  "duration": 60, // Duration in minutes
  "isDeleted": false
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### 4. Get a service

- Endpoint:/api/services/:id

- Method: GET

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service retrieved successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

### 5. Get All Services

- Endpoint: /api/services

- Method: GET

- Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Services retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Car Wash",
      "description": "Professional car washing service",
      "price": 50,
      "duration": 60,
      "isDeleted": false,
      "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
      "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "name": "Oil Change",
      "description": "Regular engine oil change service",
      "price": 30,
      "duration": 30,
      "isDeleted": false,
      "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
      "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "name": "Tire Rotation",
      "description": "Rotation of vehicle tires",
      "price": 20,
      "duration": 45,
      "isDeleted": false,
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
```

### 6. Update Services (Only Accessible by Admin)

- Endpoint: /api/services/:id

- Method: PUT

- Request Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Request Body:

```json
{
  "price": 700 // You can include any attribute(s) of the service collection that you want to update, one or more.
}
```

-Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 700,
    "duration": 60,
    "isDeleted": false,
    "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
    "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
  }
}
```

### 7. Delete a Service (Only Accessible by Admin)

- Endpoint: /api/services/:id

- Method: DELETE [SOFT DELETE]

Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Service deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60,
    "isDeleted": true,
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z"
  }
}
```

## Slot

### 8.Create Slot (Only Accessible by Admin)

- Endpoint: /api/bookings

- Method: POST

- Request Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Request body:

```json
{
  "service": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "14:00"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Slots created successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00", //look at the starting point
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
      "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
      "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "11:00",
      "endTime": "12:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
      "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "12:00",
      "endTime": "13:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
      "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "14:00", //look at the ending point
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
      "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
    }
  ]
}
```

### 9. Get available slots

- Endpoint: /api/slots/availability

- Method: GET

Request Example:

```
  GET /api/slots/availability?date=2024-06-15&serviceId=60d9c4e4f3b4b544b8b8d1c5
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Available slots retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 700,
        "duration": 60,
        "isDeleted": false,
        "createdAt": "2024-06-15T12:00:00Z",
        "updatedAt": "2024-06-15T12:00:00Z"
      },
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": "available",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 700,
        "duration": 60,
        "isDeleted": false,
        "createdAt": "2024-06-15T12:00:00Z",
        "updatedAt": "2024-06-15T12:00:00Z"
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": "canceled",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
```

### 10. Book a Service (Only Accessible by User)

- Endpoint: /api/bookings

- Method: POST

- Request Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Request Body:

```json
{
  "serviceId": "60d9c4e4f3b4b544b8b8d1c5",
  "slotId": "60d9c4e4f3b4b544b8b8d1c6",
  "vehicleType": "car",
  "vehicleBrand": "Toyota",
  "vehicleModel": "Camry",
  "manufacturingYear": 2020,
  "registrationPlate": "ABC123"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking successful",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c7",
    "customer": {
      "_id": "123456789012345678901234",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890",
      "address": "123 Main Street, City, Country"
    },
    "service": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Car Wash",
      "description": "Exterior and interior car cleaning",
      "price": 50,
      "duration": 30,
      "isDeleted": false
    },
    "slot": {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "service": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": "booked" // Updated to "booked"
    },
    "vehicleType": "car",
    "vehicleBrand": "Toyota",
    "vehicleModel": "Camry",
    "manufacturingYear": 2020,
    "registrationPlate": "ABC123",
    "createdAt": "2024-06-15T12:00:00Z", // For this, ensure that your model includes the option to enable timestamps
    "updatedAt": "2024-06-15T12:00:00Z" // For this, ensure that your model includes the option to enable timestamps
  }
}
```

### 11. Get All Bookings (Only Accessible by Admin)

- Endpoint: /api/bookings

- Method: GET

- Request Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "customer": {
        "_id": "123456789012345678901234",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "1234567890",
        "address": "123 Main Street, City, Country"
      },
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Exterior and interior car cleaning",
        "price": 50,
        "duration": 30,
        "isDeleted": false
      },
      "slot": {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "service": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "09:30",
        "isBooked": "booked"
      },
      "vehicleType": "car",
      "vehicleBrand": "Toyota",
      "vehicleModel": "Camry",
      "manufacturingYear": 2020,
      "registrationPlate": "ABC123",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c8",
      "customer": {
        "_id": "234567890123456789012345",
        "name": "Jane Smith",
        "email": "janesmith@example.com",
        "phone": "0987654321",
        "address": "456 Oak Street, City, Country"
      },
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Exterior and interior car cleaning",
        "price": 50,
        "duration": 30,
        "isDeleted": false
      },
      "slot": {
        "_id": "60d9c4e4f3b4b544b8b8d1c9",
        "service": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "10:30",
        "isBooked": "canceled"
      },
      "vehicleType": "car",
      "vehicleBrand": "Honda",
      "vehicleModel": "Accord",
      "manufacturingYear": 2018,
      "registrationPlate": "XYZ456",
      "createdAt": "2024-06-15T13:00:00Z",
      "updatedAt": "2024-06-15T13:30:00Z"
    }
  ]
}
```

### 12. Get User's Bookings (Only Accessible by User)

- Endpoint: /api/my-bookings

- Method: GET

- Request Headers:

```
Authorization: Bearer JWT_TOKEN
```

- Response Body:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "service": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Exterior and interior car cleaning",
        "price": 50,
        "duration": 30,
        "isDeleted": false
      },
      "slot": {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "service": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "09:30",
        "isBooked": "booked"
      },
      "vehicleType": "car",
      "vehicleBrand": "Toyota",
      "vehicleModel": "Camry",
      "manufacturingYear": 2020,
      "registrationPlate": "ABC123",
      "createdAt": "2024-06-15T12:00:00Z",
      "updatedAt": "2024-06-15T12:00:00Z"
    }
  ]
}
```
