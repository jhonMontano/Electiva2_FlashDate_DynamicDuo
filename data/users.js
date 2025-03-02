const { use } = require("../src/routes/users")

const users = [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "address": "123 Main Street, New York, NY",
      "phone": "+1-555-1234"
    },
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "janesmith@example.com",
      "address": "456 Elm Street, Los Angeles, CA",
      "phone": "+1-555-5678"
    },
    {
      "firstName": "Nataly",
      "lastName": "Mejia",
      "email": "nataly@example.com",
      "address": "789 Oak Avenue, Chicago, IL",
      "phone": "+1-555-9012"
    },
    {
        "firstName": "Andy",
        "lastName": "Smith",
        "email": "andy@example.com",
        "address": "456 Elm Street, Los Angeles, CA",
        "phone": "+1-555-5678"
      },
      {
        "firstName": "Michael",
        "lastName": "Johnson",
        "email": "michaeljohnson@example.com",
        "address": "789 Oak Avenue, Chicago, IL",
        "phone": "+1-555-9012"
      }
  ]

  module.exports = {
    users
  }