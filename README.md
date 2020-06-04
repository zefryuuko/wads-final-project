# Binusmaya
![topLanguage](https://img.shields.io/github/languages/top/zefryuuko/wads-final-project) [![commit](https://img.shields.io/github/last-commit/getliberated/wads-final-project)](https://github.com/zefryuuko/wads-Final-Project/commits/master) ![size](https://img.shields.io/github/repo-size/zefryuuko/wads-final-project) ![license](https://img.shields.io/github/license/zefryuuko/wads-final-project)

A campus web portal with features aimed at Binusians, designed to be fast and easy to use. Made using the microservices architecture to improve speed and reliability compared to the current portal.

A Web Application Development and Security final project.

## Build Status

|Service|Status|
|-------|------|
|frontend|![frontend](https://github.com/zefryuuko/wads-final-project/workflows/frontend/badge.svg)|
|backend/gateway|![backend/gateway](https://github.com/zefryuuko/wads-final-project/workflows/backend/gateway/badge.svg)|
|backend/auth|![backend/auth](https://github.com/zefryuuko/wads-final-project/workflows/backend/auth/badge.svg)|
|backend/user|![backend/user](https://github.com/zefryuuko/wads-final-project/workflows/backend/user/badge.svg)|
|backend/courses|![backend/courses](https://github.com/zefryuuko/wads-final-project/workflows/backend/courses/badge.svg)|
|backend/class|![backend/class](https://github.com/zefryuuko/wads-final-project/workflows/backend/class/badge.svg)|


## Services

### Description
#### frontend
The frontend service hosts the user interface of the app. It is made using React and containerized using Docker with nginx as the web server.

#### backend/gateway
The API gateway service serves as an endpoint for the frontend. It handles API authentication before passing the request to the designated service.

#### backend/auth
The authentication service handles the authentication process of the app. It stores the email, hashed password, and session ids. This service is primarily called by the API gateway to make sure every request only went through if it contains valid session data embedded.

#### backend/user
The user service stores and manages the information that are related to users. Mostly parameters to a specific user such as name, email, and profiles.

#### backend/courses
The courses service manages the database structure for the courses. Primarily used by staffs to manage course templates that will be used as a class. The course service is also used by the class service.

#### backend/class
The class instance manages the database structure for classes data. It is primarity used by the student and lecturer page. It gets and updates the parameters related to a class.

### Design Decisions

#### Service Structure
We chose to create the structure of the services based on its functionality and features. For example while a user service and authentication service can be coupled together, we seperated it just to make sure that the authentication service is robust enough as it is very crucial to the app.

#### Authentication Method
For this app, we implemented a server side session-based authentication. While it is slower and resource hungry compared to something like JSON Web Token (JWT), we didn't know that JWT exists. The use of JWT will heavily improve performance and simplify the system. We already have everything set up perfectly in place so we chose to stick with the current setup.

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
