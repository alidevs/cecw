const mongoose = require('mongoose')
const User = require('./user')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const FKHelper = require('./helper/foregin-key-helper')

const itemSchema = new mongoose.Schema({
	_id: Number,

	name: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		default: '-'
	},

	type: {
		type: String
	},

	category: {
		type: String,
		required: true,
		enum: ['Electronic Devices', 'Office Supplies', 'Management Tools', 'Defectives']
	},

	count: {
		type: Number,
		required: true,
		default: 0
	},

	defective: {
		type: Boolean,
		required: true,
		default: false
	},

	custodiedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		validator: function (v) {
			return FKHelper(mongoose.model('User', v))
		},
		message: `User does not exist.`
	}
}, {
	_id: false
})

itemSchema.plugin(AutoIncrement)

const Item = mongoose.model('Item', itemSchema)

module.exports = Item