const _ = require("lodash")
const jwt = require("jsonwebtoken")

var { mongoose } = require("./../db/mongoose")
var User = require("./../model/user")

// POST /user
var create_new_user = (req, res) => {
	var body = _.pick(req.body, ['email', 'password'])
	var user = new User(body)

	user.save().then(() => {
		return user.generateAuthToken()
	})
	.then((token) => res.header('x-auth', token).send(user))
	.catch((e) => res.status(400).send(e))
}

// GET /user/me
var authenticate_user = (req, res) => {
	res.send(req.user)
}

// POST /user/login
var user_login = (req, res) => {
	var body = _.pick(req.body, ['email', 'password'])
	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user)
		})
	}).catch((e) => res.status(400).send())
}

// POST /user/me/token
var user_logout = (req, res) => {
	req.user.removeToken(req.token).then(() => res.status(200).send(), () => res.status(400).send())
}

// Exports
module.exports = {
	create_new_user, 
	authenticate_user,
	user_login,
	user_logout,
}