const connectToMongo = require('./db');

const express = require('express')

connectToMongo();

//const express = require('express')
const app = express()
const port = 5000
app.use(express.json())
app.use('/api/auth',require('./signup/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})