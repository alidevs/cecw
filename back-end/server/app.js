require('dotenv').config();
const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const itemRouter = require("./routers/item")
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
app.use(userRouter)
app.use(itemRouter)

require('./util/seed')

module.exports = app