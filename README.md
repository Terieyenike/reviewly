# ReviewLy, reviews about apartments

This API allows you to sign up with your basic information and post reviews about apartments you've previously lived in.

The API is available at [https://immense-eyrie-79700.herokuapp.com/](https://immense-eyrie-79700.herokuapp.com/)

**POSSIBLE SCHEMA for ReviewLy**

```js
/*

--> res = displays the messaage and success msg, home route.
--> /register --> POST = user
--> /signin --> POST = user
--> /reviews/:id --> GET = single user
--> /reviews --> GET = list all reviews from users
--> /reviews --> POST = info about apartment reviews from users.
*/
```

### Endpoints

**Status**
GET /
Returns the status of the API displaying the message and success, OK.

**List of Reviews**
GET /reviews
Returns the status of all the reviews by the user.

**Get a single review by a user**
GET /reviews/:id
Retrieve detailed information about the review

**Post a review**
POST /reviews
Allows you to submit apartment based reviews
The request body needs to be in JSON format and include the following properties:

- name
- email - required
- apartment_lived_in - required
- landlord - required
- apartment situated - required
- rating - Integer - required

Example

```json
{
  "name": "nelson",
  "email": "nelson@gmail.com",
  "apartment_lived_in": "Plot 5 Asaba road Rumuigbo",
  "landlord": "Mrs Green",
  "apartment_situated": "Rivers",
  "rating": 4
}
```

**Submit a registered user, sign up**
POST /register
Allows you to submit your details for registration to the database.
The request body needs to be in JSON format and include the following properties:

- name
- email
- password

Example

```json
{
  "name": "nelson",
  "email": "nelson@gmail.com",
  "password": "nelson123"
}
```

**Sign in a user**
POST /signin
Allows the user to enter the login details to authenticate the user.
The request body needs to be in JSON format and include the following properties:

- email
- password

Example

```json
{
  "email": "nelson@gmail.com",
  "password": "nelson123"
}
```
