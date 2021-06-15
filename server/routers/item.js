const express = require('express')
const _ = require('lodash')
const { Item, Defective } = require('../model/item')
const Trace = require('../model/trace')
const auth = require('../middleware/authenticate')
const router = new express.Router()

router.get('/item/list', auth, async (req, res) => {
	if (req.user.role === 'Employee') {
		res.status(401).send({ error: "Employees cannot add items to the item" })
	}

	try {
		const items = await Item.find({  })
		res.send(items)
	} catch (e) {
		res.status(500).send(e)
	}

})

// POST /item/add
router.post('/item/add', auth, async (req, res) => {
	if (req.user.role === "Employee") {
		res.status(401).send({ error: "Employees cannot add items to the item" })
	}

	const item = new Item(req.body)
	item.modifiedBy = req.user._id
	item.operation = 'Create'

	try {
		await item.save()
		res.status(201).send({ item })
	} catch (e) {
		res.status(400).send(e)
	}
})

// PATCH /item/update/:id
router.patch('/item/update/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body)

	try {
		const item = await Item.findOne({ _id: req.params.id })

		if (!item) {
			return res.status(404).send({ error: `No item found with id ${req.params.id}` })
		}

		item.modifiedBy = req.user._id
		item.operation = 'Modify'

		updates.forEach((update) => item[update] = req.body[update])
		await item.save()
		res.send(item)
	} catch (e) {
		res.status(400).send(e)
	}
})

// DELETE /item/delete/:id
router.delete('/item/delete/:id', auth, async (req, res) => {
	try {
		const item = await Item.findOneAndDelete({ _id: req.params.id })

		if (!item) {
			res.status(404).send({ error: `No item found with id ${req.params.id}` })
		}

		const trace = new Trace({
			user: req.user._id,
			operation: 'Delete',
			record: item,
		})
	
		try {
			await trace.save()
			res.send(item)
		} catch (e) {
			console.log('Error saving trace')
			console.error(e)
		}
	} catch (e) {
		console.error(e)
		res.status(500).send(e)
	}
})

router.copy('/item/defective/:id', auth, async (req, res) => {
	try {
		const item = await Item.findOne({ _id: req.params.id })

		if (!item) {
			res.status(404).send({ error: `No item found with id ${req.params.id}` })
		}

		const defective = new Defective(item.toJSON())

		defective.modifiedBy = req.user._id
		defective.operation = 'Move'

		await defective.save()
		await item.delete()

		res.status(301).send(defective)
	} catch (e) {
		console.error(e)
		res.status(500).send(e)
	}
})
module.exports = router