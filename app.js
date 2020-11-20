const express = require('express')

// Routes
const userRouter = require('./src/routes/users')
const stateRouter = require('./src/routes/states')
const districtRouter = require('./src/routes/districts')
const childRouter = require('./src/routes/childs')

// DB
require('./src/db/db')

const app = express();
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(stateRouter)
app.use(districtRouter)
app.use(childRouter)

app.listen(port, () => {
  console.log('Server is running on: '+ port)
})
