const express = require('express')
const Item = require('../model/item')
const auth = require('../middleware/authenticate')
const { update } = require('../model/item')
const router = new express.Router()

// POST /item/add
router.post('/item/add', auth, async (req, res) => {
	if (req.user.role === "Employee") {
		res.status(401).send({ error: "Employees cannot add items to the item" })
	}

	const item = new Item(req.body)
	
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

		res.send(item)
	} catch (e) {
		res.status(500).send(e)
	}
})
module.exports = router