const User = require('./../model/user')

const admin = {
	name: "admin",
	email: "admin@admin.com",
	password: "admin10",
	role: "Manager"
}

User.findOne({email: admin.email}).then((result) => {
	if (result == null) {
		User.create(admin, function (e) {
			console.error(`Error creating admin user: ${e}`)
		})
	}
})
