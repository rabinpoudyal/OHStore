# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Security approaches used in the application:
1. Passwords are stored in the database as a hash of the password.
2. All user input is sanitized before being used in the application.
3. Auth tokens are changed on every login.
4. IDs are used as UUIDs instead of sequential integers.
5. Rate limiting is used to prevent brute force attacks.
6. Routes are protected by auth tokens.
7. Roles are used to restrict access to certain routes.
8. CORS is used to restrict access to the API.
9. CSRF tokens are used to prevent CSRF attacks.
10. CSP is used to prevent XSS attacks.
11. Input validation is used to prevent SQL injection attacks.
12. Input sanitization is used to prevent XSS attacks.
13. Strong passwords are enforced.
14. Strong parameters are used to prevent mass assignment attacks.

## Tech Stack

* [Ruby on Rails](http://rubyonrails.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)

## Installation

* Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* Install [PostgreSQL](https://www.postgresql.org/download/)
* Install [Node.js](https://nodejs.org/en/download/)