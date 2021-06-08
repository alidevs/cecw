require('dotenv').config();
const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")

const app = express()

app.use(express.json())
app.use(userRouter)

require('./util/seed')

module.exports = app