![cf](https://i.imgur.com/7v5ASc8.png) 11: Express and Babel
======
<img src="https://travis-ci.com/mrebb/11-express.svg?branch=madhu">

## TRAVIS: https://travis-ci.com/mrebb/11-express 

## HEROKU: https://restapilab.herokuapp.com 

## Express module

* Handles GET, POST, DELETE methods 
* GET handles 'api/v1/notes' when queryString has valid or empty ID
* POST handles 'api/v1/notes' with request body passed . 
* DELETE handles 'api/v1/notes' when queryString has valid or empty ID 
* Errors are handled when there is a bad request

## Tests
* Test for api that returns a status code of 404 for routes that have not been registered
* `GET`: test for 404: Responds with 'not found' for valid requests made with an id that was not found
* `GET`: test for 400: Respond with 'bad request' if no id was provided in the request
* `GET`: test for 200: Responds with response body for a request made with a valid id
* `POST`: test for 400: Responds with 'bad request' if no request body was provided or the body was invalid
* `POST`: test for 200: Responds with the body content for a post request with a valid body
* `DELETE`: test for 400: Respond with 'bad request' if no id was provided in the request
* `DELETE`: test for 204: Responds with provided id for a request made with a valid id