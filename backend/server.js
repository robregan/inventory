const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// connect to db and spin up server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(err))
