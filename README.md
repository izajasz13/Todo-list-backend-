# Todo-list-backend
## General description

Restful API implemented as part of a Coders Camp programming course. 
App uses Express for server request handling, JSON Web Token for login cookie support and MongoDB for data storage: [link](https://salty-meadow-29857.herokuapp.com/api)  

To run server locally download files and use commands:
>npm i  
>npm start

## Routes

### POST /api/user/register

Post with ``email`` , ``username`` and ``password``. If provided data is valid, it will create an account.

### POST /api/user/login

Post with ``email`` and ``password``. If provided data is valid, it will create and respond with ``auth-token``.

### GET /api/tasks/get 

If ``auth-token`` provided in header is correct, it will respond with ``list`` of user's tasks.

### POST /api/tasks/post

Post with ``taskList``. If ``auth-token`` provided in header is correct, it will respond with ``list`` of user's tasks.



