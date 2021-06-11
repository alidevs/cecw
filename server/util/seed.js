const User = require('./../model/user')
const Item = require('./../model/item')

// Permenant seeds
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

// Temporary seed (DELETE BEFORE DEPLOYMENT)
// - Users
const firstUser = {
	name: "Ali Alateyah",
	email: "ali.atyah@gmail.com",
	password: "1231234",
	role: "Manager"
}

const secondUser = {
	name: "Mohammed Alkhabbaz",
	email: "m.khabbaz@gmail.com",
	password: "1231234",
	role: "Vice Manager"
}

const thirdUser = {
	name: "Abdulaziz Alkuwaiti",
	email: "azizQ8@gmail.com",
	password: "1231234",
	role: "Employee"
}

// - Items
const firstItem = {
    name: "iPhone 12 Pro Max",
    description: "A Apple touch-screen phone",
    type: "Phone",
    category: "Electronic Devices"
}

const secondItem = {
    name: "Amazon Basics Wire Mesh Pen Cup, Black",
    description: "Pen cup for neatly containing pens, pencils, scissors, and more ",
    type: "Pen Cup",
    category: "Office Supplies"
}

const thirdItem = {
    name: "Rivet Tool",
    description: "MILWAUKEE'S Electric Tools 2550-20 M12 Rivet Tool (Bare Tool)",
    type: "Drill",
    category: "Management Tools",
	defective: true
}

const seedDatabase = async () => {
	await new User(firstUser).save()
	await new User(secondUser).save()
	await new User(thirdUser).save()

	await new Item(firstItem).save()
	await new Item(secondItem).save()
	await new Item(thirdItem).save()
	console.log("Creating 3 users ..")
}

// seedDatabase()