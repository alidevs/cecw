const mongoose = require('mongoose')

const traceSchema = mongoose.Schema({
	time: {
		type: Date,
		default: Date.now,
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		validator: function (v) {
			return FKHelper(mongoose.model('User', v))
		},
		message: 'User does not exist'
	},

	operation: {
		type: String,
		enum: ['Create', 'Modify', 'Delete', 'Move', 'Accepted', 'Denied']
	},

	record: {
		type: mongoose.Schema.Types.Mixed,
	}
})

const Trace = mongoose.model('Trace', traceSchema)

module.exports = Trace