# New BinusMaya
![topLanguage](https://img.shields.io/github/languages/top/zefryuuko/wads-final-project) [![commit](https://img.shields.io/github/last-commit/getliberated/wads-final-project)](https://github.com/zefryuuko/wads-Final-Project/commits/master) ![size](https://img.shields.io/github/repo-size/zefryuuko/wads-final-project) ![license](https://img.shields.io/github/license/zefryuuko/wads-final-project)

A campus web portal with features aimed at Binusians, designed to be fast and easy to use. Made using the microservices architecture to improve speed and reliability compared to the current portal.

A Web Application Development and Security final project.

## Table of Contents
- [Build Status](#build-status)
- [Services](#services)
  - [Description](#description)
  - [Design Decisions](#design-decisions)
- [Installation](#installation)
- [Technologies USed](#technologies-used)

## Build Status

|Service|Stable|Staging|
|-------|------|-------|
|frontend|![frontend](https://github.com/zefryuuko/wads-final-project/workflows/frontend/badge.svg)|![staging/frontend](https://github.com/zefryuuko/wads-final-project/workflows/staging/frontend/badge.svg?branch=staging)|
|backend/gateway|![backend/gateway](https://github.com/zefryuuko/wads-final-project/workflows/backend/gateway/badge.svg)|![staging/backend/gateway](https://github.com/zefryuuko/wads-final-project/workflows/staging/backend/gateway/badge.svg?branch=staging)|
|backend/auth|![backend/auth](https://github.com/zefryuuko/wads-final-project/workflows/backend/auth/badge.svg)|![staging/backend/auth](https://github.com/zefryuuko/wads-final-project/workflows/staging/backend/auth/badge.svg?branch=staging)|
|backend/user|![backend/user](https://github.com/zefryuuko/wads-final-project/workflows/backend/user/badge.svg)|![staging/backend/user](https://github.com/zefryuuko/wads-final-project/workflows/staging/backend/user/badge.svg?branch=staging)|
|backend/courses|![backend/courses](https://github.com/zefryuuko/wads-final-project/workflows/backend/courses/badge.svg)|![staging/backend/courses](https://github.com/zefryuuko/wads-final-project/workflows/staging/backend/courses/badge.svg?branch=staging)|
|backend/class|![backend/class](https://github.com/zefryuuko/wads-final-project/workflows/backend/class/badge.svg)|![staging/backend/class](https://github.com/zefryuuko/wads-final-project/workflows/staging/backend/class/badge.svg?branch=staging)|


## Services

### Description
#### frontend
The frontend service hosts the user interface of the app. It is made using React and containerized using Docker with nginx as the web server.

#### backend/gateway
The API gateway service serves as an endpoint for the frontend. It handles API authentication before passing the request to the designated service.

#### backend/auth
The authentication service handles the authentication process of the app. It stores the email, hashed password, and session ids. This service is primarily called by the API gateway to make sure every request only goes through if it contains valid session data embedded.

#### backend/user
The user service stores and manages the information that are related to users. Mostly parameters to a specific user such as name, email, and profiles.

#### backend/courses
The courses service manages the database structure for the courses. Primarily used by staffs to manage course templates that will be used as a class. The course service is also used by the class service.

#### backend/class
The class instance manages the database structure for classes data. It is primarily used by the student and lecturer page. It gets and updates the parameters related to a class.

### Design Decisions

#### Service Structure
We chose to create the structure of the services based on its functionality and features. For example while a user service and authentication service can be coupled together, we seperated it just to make sure that the authentication service is robust enough as it is very crucial to the app.

#### Authentication Method
For this app, we implemented a server side session-based authentication. While it is slower and resource hungry compared to something like JSON Web Token (JWT). However, we didn't know that JWT existed when we were creating the project. The use of JWT will heavily improve performance and simplify the system. However, we already have everything set up perfectly in place so we chose to stick with the current setup.

## Installation
There are two ways that you can use to run the services, running it directly or using Docker. The installation setup is similar for both methods. All services needs to run for this to work, especially services that handles authentication, user data, and the gateway.

If you would like to run it directly, make sure that you have `Node.js` installed. To install `Node.js`, Download the binaries from [Node.js' site](https://nodejs.org/en/download/) and install. If you prefer to use a package manager, you can also install [Node.js using package manager](https://nodejs.org/en/download/package-manager/).

Make sure you are in the correct subdirectory while following the guide for each service.

### frontend
This service is built using [create-react-app](https://github.com/facebook/create-react-app). To run it in development mode, run `npm start`. To build the project, run `npm run build`. The compiled file will be stored in the `build` directory. You can use any web server such as `nginx` or `Apache` to serve the files. If you want to use a prebuilt version, you can simply pull the image from the Docker Hub: `zefryuuko/wads-frontend:latest-stable` or `zefryuuko/wads-frontend:latest` for the latest staging build.

### backend/gateway
This service requires specific packages and an environment variable file `.env`. The environment variable file must have the specified variables below
```
EXPRESS_PORT=3000

AUTH_HOST = 127.0.0.1:3001
COURSES_HOST = 127.0.0.1:3002
USER_HOST = 127.0.0.1:3003
CLASS_HOST = 127.0.0.1:3004
```
- `EXPRESS_PORT` is the port that the service will run on.
- `AUTH_HOST` is the hostname or IP address of the auth service.
- `COURSES_HOST` is the hostname or IP address of the courses service.
- `USER_HOST` is the hostname or IP address of the user service.
- `CLASS_HOST` is the hostname or IP address of the class service.

To run it directly, run
```
npm install
node run prod
```

If you want to use a prebuilt version, you can simply pull the image from the Docker Hub: `zefryuuko/wads-gateway:latest-stable` or `zefryuuko/wads-gateway:latest` for the latest staging build. In addition, the `.env` file should be mounted on the container's root directory.

### backend/auth
This service requires specific packages and an environment variable file `.env`. The environment variable file must have the specified variables below
```
MYSQL_HOST=your_mysql_host
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASS=your_mysql_password
MYSQL_DB=bimay_auth
MYSQL_CONNECTION_LIMIT=100
EXPRESS_PORT=3001

CRYPTO_SALT=your_crypto_salt;
```
- `EXPRESS_PORT` is the port that the service will run on.
- `MYSQL_HOST` is the hostname or IP address of the MySQL server.
- `MYSQL_PORT` is the port of the MySQL server.
- `MYSQL_USER` and `MYSQL_PASS` is your credentials to access the MySQL server.
- `MYSQL_DB` is the database name that the service will access.
- `MYSQL_CONNECTION_LIMIT` is the limit of concurrent connections allowed to the MySQL server.
- `CRYPTO_SALT` is the salt that is added before the plaintext password is hashed and stored into the database.

To run it directly, run
```
npm install
node run prod
```

If you want to use a prebuilt version, you can simply pull the image from the Docker Hub: `zefryuuko/wads-auth:latest-stable` or `zefryuuko/wads-auth:latest` for the latest staging build. In addition, the `.env` file should be mounted on the container's root directory.

### backend/user
This service requires specific packages and an environment variable file `.env`. The environment variable file must have the specified variables below
```
MONGO_USER=your_mongodb_username
MONGO_PASS=your_mongodb_password
MONGO_HOST=your_mongodb_host
MONGO_POOL_SIZE=50
EXPRESS_PORT=3003
AUTH_HOST=127.0.0.1:3001
```
- `EXPRESS_PORT` is the port that the service will run on.
- `MONGO_HOST` is the hostname or IP address of the MongoDB server.
- `MONGO_PORT` is then port of the MongoDB server.
- `MONGO_USER` and `MONGO_PASS` is your credentials to access the MongoDB server.
- `MONGO_POOL_SIZE` is the limit of concurrent connections allowed to the MongoDB server.
- `AUTH_HOST` is the hostname or IP address of the auth service.

To run it directly, run
```
npm install
node run prod
```

If you want to use a prebuilt version, you can simply pull the image from the Docker Hub: `zefryuuko/wads-user:latest-stable` or `zefryuuko/wads-user:latest` for the latest staging build. In addition, the `.env` file should be mounted on the container's root directory.

### backend/courses
This service requires specific packages and an environment variable file `.env`. The environment variable file must have the specified variables below
```
MONGO_USER=your_mongodb_username
MONGO_PASS=your_mongodb_password
MONGO_HOST=your_mongodb_host
MONGO_POOL_SIZE=50
EXPRESS_PORT=3003
```
- `EXPRESS_PORT` is the port that the service will run on.
- `MONGO_HOST` is the hostname or IP address of the MongoDB server.
- `MONGO_PORT` is then port of the MongoDB server.
- `MONGO_USER` and `MONGO_PASS` is your credentials to access the MongoDB server.
- `MONGO_POOL_SIZE` is the limit of concurrent connections allowed to the MongoDB server.

To run it directly, run
```
npm install
node run prod
```

If you want to use a prebuilt version, you can simply pull the image from the Docker Hub: `zefryuuko/wads-courses:latest-stable` or `zefryuuko/wads-courses:latest` for the latest staging build. In addition, the `.env` file should be mounted on the container's root directory.

### backend/class
This service requires specific packages and an environment variable file `.env`. The environment variable file must have the specified variables below
```
MONGO_USER=your_mongodb_username
MONGO_PASS=your_mongodb_password
MONGO_HOST=your_mongodb_host
MONGO_POOL_SIZE=50
EXPRESS_PORT=3003
COURSES_HOST=http://127.0.0.1:3002
```
- `EXPRESS_PORT` is the port that the service will run on.
- `MONGO_HOST` is the hostname or IP address of the MongoDB server.
- `MONGO_PORT` is then port of the MongoDB server.
- `MONGO_USER` and `MONGO_PASS` is your credentials to access the MongoDB server.
- `MONGO_POOL_SIZE` is the limit of concurrent connections allowed to the MongoDB server.
- `COURSES_HOST` is the hostname or IP address of the courses service.

To run it directly, run
```
npm install
node run prod
```

If you want to use a prebuilt version, you can simply pull the image from the Docker Hub: `zefryuuko/wads-class:latest-stable` or `zefryuuko/wads-class:latest` for the latest staging build. In addition, the `.env` file should be mounted on the container's root directory.

## Technologies Used
- Node.js
- Express
- MongoDB
- MySQL
- Firebase
- axios
- React
- nginx
- Docker
- watchtower
