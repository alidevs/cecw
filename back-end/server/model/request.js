const mongoose = require('mongoose')
const Trace = require('./trace')

const requestSchema = mongoose.Schema({
	requestee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		validator: function (v) {
			return FKHelper(mongoose.model('User', v))
		},
		message: `User does not exist.`
	},

	itemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item',
		message: `Item does not exist.`
	},

	quantity: {
		type: Number,
		default: 1
	},

	type: {
		type: String,
		enum: ['Request', 'Transfer', 'Return']
	},

	status: {
		type: String,
		enum: ['Accepted', 'Denied', 'Pending'],
		default: 'Pending'
	},

	time: {
		type: Date,
		default: Date.now,
	},

	handledBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		validator: function (v) {
			return FKHelper(mongoose.model('User', v))
		},
		message: `User does not exist.`
	}
})

requestSchema.virtual('modifiedBy')
requestSchema.virtual('operation')

requestSchema.pre('save', traceIt)

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

const Request = mongoose.model('Request', requestSchema)

module.exports = Request