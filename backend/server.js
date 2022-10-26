const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute.js')
const errorHandler = require('./middleware/errorMiddleware.js')

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/users', userRoute) // route middleware

app.get('/', (req, res) => {
  res.send('homepage')
})

// error middleware
app.use(errorHandler)

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
