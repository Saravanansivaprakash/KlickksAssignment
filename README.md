# MERN Stack Authentication Project

A full-stack MERN application with session-based authentication, where:

✅ Backend provides APIs for user authentication (login, register, logout) using express-session

✅ Sessions are stored in SQLite via connect-sqlite3

✅ Frontend is built with React and consumes backend APIs

✅ Frontend deployed on Netlify, backend deployed on Render


## Backend (Express.js + SQLite)
### Features

POST /register – Create new user

POST /login – Login with session stored via express-session

POST /logout – Destroy session

GET /me – Protected route, returns user data if session is valid

## Tech Stack

- Express.js

- express-session + connect-sqlite3

- SQLite (sqlite3)

- bcryptjs (for password hashing)

- CORS configured for frontend

#### Sample Valid User Credentials for backend API's

```
{
  "email":"srn@gmail.com",
  "password":"srn@123"
}
```

<Section id="section1" >

### API 1

#### Path: `https://klickksassignment.onrender.com/api/auth/register`

#### Method: `POST`

**Request**

```
{
  "name": "adam_richard",
  "password": "richard_567",
  "email": "Adam@gmail.com"
}
```

- **Scenario 1**

  - **Description**:

    If the username already exists

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      User already exists
      ```

- **Scenario 2**

  - **Description**:

    If the registrant provides a password with less than 6 characters

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Password is too short
      ```

- **Scenario 3**

  - **Description**:

    Successful registration of the registrant

  - **Response**

    - **Status code**

      ```
      200
      ```

    - **Body**
      ```
      user created successfully
      ```
</Section>

<Section id="section2">

### API 2

#### Path: `https://klickksassignment.onrender.com/api/auth/login/`

#### Method: `POST`

**Request**

```
{
  "email":"srn@gmail.com",
  "password":"srn@123"
}
```

- **Scenario 1**

  - **Description**:

    If the user doesn't have an account

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid user
      ```

- **Scenario 2**

  - **Description**:

    If the user provides an incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid password
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**

    ```
    { "message": "Logged in successfully" }
    ```
### API 3

#### Path: `https://klickksassignment.onrender.com/api/auth/logout`

#### Method: `POST`


- **Scenario 1**

  - **Description**:

    If the username does not authorized 

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
    - 
      ```
       {"error": "Unauthorized" }
    
      ```

      - **Scenario 2**

  - **Description**:

    If the username is authorized 

  - **Response**
    - **Status code**
      ```
        200
      ```
    - **Body**
      
      ``` 
       {"message": "Logged out successfully" }
      ```
**Setup Instructions**

- Navigate to the backend/ folder:
```
  cd backend
```
- Install dependencies:
```
  npm install
```
- Run locally:
```
  node server.js
```

- For Render Deployment:
  Add environment variable: SESSION_SECRET=your-secret
  SQLite for demo purposes (non-persistent)
  Use web service for Render, set build command as npm install, start command as node server.js    

## Frontend (React)
### Features

  - Register & Login forms
  - Calls backend APIs
  - Stores session via browser cookies
  - Handles authentication status


### Setup Instructions

Navigate to the frontend/ folder:
```
  cd frontend
```

Install dependencies:
```
  npm install
```

Run locally:
```
  npm start
```

Replace with your actual backend URL

Deploy to Netlify:

Connect repo to Netlify
Build command: npm run build
Publish directory: build

### Live Demo Links
#### Backend API 
[https://klickksassignment.onrender.com](https://klickksassignment.onrender.com) 
#### Frontend UI
[https://simpleauthen.netlify.app](https://simpleauthen.netlify.app) 





### Notes for Demo

- Sessions are stored using SQLite via connect-sqlite3

- This works for demos and interview purposes but is not suitable for production

- In production, session storage should use persistent databases like MongoDB (connect-mongo) 

- This design choice is deliberate to simplify deployment for interviews (e.g. Render + Netlify)

 ### Future Improvements

- Switch to connect-mongo for session persistence in production
- Move to JWT-based stateless authentication if needed
- Use persistent storage (e.g. MongoDB Atlas )

