# Backend

## Stack: node js, express, jwt-tocken, mongodb, mongoose


# API Documentation

This document provides an overview of the API endpoints available for user and event management. 

## Base URL

http://localhost:5000/api/


## User Management

- GET /get  
  Fetch all users.
  
- GET /getUser  
  Retrieve a specific user by their ID.

- POST /registration  
  Register a new user.

- POST /login  
  Log in an existing user.

- POST /logout  
  Log out the current user.


## Event Management

- GET /events  
  Retrieve a list of all events.

- GET /event/:id  
  Fetch details of a specific event by its ID.

- GET /myevents  
  Get a list of events created by the logged-in user.

- POST /event  
  Create a new event.

- PUT /event/:id  
  Edit an existing event by its ID.

- DELETE /event/:id  
  Delete an event by its ID.


## Saved Events

- POST /saved/:id  
  Save an event by its ID.

- GET /saved  
  Retrieve a list of saved events.


## Comments

- GET /comment/:eventId  
  Fetch comments for a specific event.

- POST /comment/:eventId  
  Create a comment for a specific event.

- PUT /comment/:commentId  
  Update an existing comment by its ID.

- DELETE /comment/:commentId  
  Delete a comment by its ID.
