const mongoose = require('mongoose')
const Trace = require('./trace')
const FKHelper = require('./helper/foregin-key-helper')

const itemSchema = new mongoose.Schema({
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
		enum: ['Electronic Devices', 'Office Supplies', 'Management Tools']
	},

	count: {
		type: Number,
		required: true,
		default: 0
	},

	custodiedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		validator: function (v) {
			return FKHelper(mongoose.model('User', v))
		},
		message: `User does not exist.`
	}
})

itemSchema.virtual('modifiedBy')
itemSchema.virtual('operation')

itemSchema.pre('save', traceIt)

async function traceIt(next) {
	const trace = new Trace({
		user: this.modifiedBy,
		operation: this.operation,
		record: this.toObject(),
	})

	try {
		await trace.save()
	} catch (e) {
		console.log('Error saving trace')
		console.error(e)
	}

	next()
}

const Item = mongoose.model('Item', itemSchema)
const Defective = mongoose.model('Defective', itemSchema)

module.exports = {
	Item,
	Defective,
}