const express = require("express")
const bodyParser = require("body-parser")

var {
	create_new_user,
	authenticate_user,
	user_login,
	user_logout,
} = require('./controller/userController')
const { authenticate } = require("./middleware/authenticate")

var app = express()
var port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))

app.route("/user")
	.post(create_new_user)

app.route('/user/me')
	.get(authenticate, authenticate_user)

app.route('/user/login')
	.post(user_login)

app.route('/user/me/token')
	.delete(authenticate, user_logout)

app.listen(port, () => console.log(`Server running on port ${port}`))