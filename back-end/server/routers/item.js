const express = require('express')
const _ = require('lodash')
const { Item, Defective } = require('../model/item')
const Trace = require('../model/trace')
const Request = require('../model/request')
const auth = require('../middleware/authenticate')
const { request } = require('express')
const router = new express.Router()

// GET /item/list
// - Get a list of all items in inventory (Manager & Vice Manager only)
router.get('/item/list', auth, async (req, res) => {
	if (req.user.role === 'Employee') {
		return res.status(401).send({ error: "Employees cannot add items to the item" })
	}

	try {
		const items = await Item.find({  })
		res.send(items)
	} catch (e) {
		res.status(500).send(e)
	}

})

// POST /item/add
// - Add items into inventory (Manager & Vice Manager only)
router.post('/item/add', auth, async (req, res) => {
	if (req.user.role === "Employee") {
		return res.status(401).send({ error: "Employees cannot add items to the item" })
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
// - Modify item info (All)
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
// - Delete item from inventory (All)
router.delete('/item/delete/:id', auth, async (req, res) => {
	try {
		const item = await Item.findOneAndDelete({ _id: req.params.id })

		if (!item) {
			return res.status(404).send({ error: `No item found with id ${req.params.id}` })
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

// POST /item/request
// - Make a request to take custody of an item (All)
router.post('/item/request', auth, async (req, res) => {
	const request = new Request({
		...req.body, 
		requestee: req.user._id
	})

	try {
		await request.save()
		res.send(request)
	} catch (e) {
		console.error(e)
		res.status(500).send(e)
	}
})

// PATCH /item/request/:id
// - Accept or deny requests (Manager & Vice Manager)
router.patch('/item/request/:id', auth, async (req, res) => {
	if (req.user.role === 'Employee') {
		return res.status(401).send({ error: "Employees cannot add items to the item" })
	}

	const updates = Object.keys(req.body)
    const allowedUpdates = ['status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const request = await Request.findOne({ _id: req.params.id })

        if (!request) {
            return res.status(404).send()
        }

		if (req.body.status === 'Accepted') {
			if (request.type === 'Request') {
				await Item.findOneAndUpdate({ _id: request.itemId }, { 
					$set: { custodiedBy: request.requestee }
				})
			} else if (request.type === 'Return') {
				await Item.findOneAndUpdate({ _id: request.itemId }, { 
					$set: { custodiedBy: undefined }
				})
			}
		}
		
		request.operation = req.body.status
		request.modifiedBy = req.user._id

        updates.forEach((update) => request[update] = req.body[update])
        await request.save()
        res.send(request)
    } catch (e) {
		console.error(e)
        res.status(400).send(e)
    }
})

// GET /item/request/list
// - List all pending requests (Manager & Vice Manager)
router.get('/item/request/list', auth, async (req, res) => {
	if (req.user.role === 'Employee') {
		return res.status(401).send({ error: "Employees cannot access this page" })
	}

	try {
		const requests = await Request.find({ status: 'Pending' })
		res.send(requests)
	} catch (e) {
		res.status(500).send(e)
	}
})
router.get('/item/History', auth, async (req, res) => {
	

	try {
		
		const requests = await Request.find({ requestee: req.user._id })
		
		res.send(requests)
	} catch (e) {
		res.status(500).send(e)
	}
})

// COPY /item/defective/:id
// - Mark item as defective (All)
router.copy('/item/defective/:id', auth, async (req, res) => {
	try {
		const item = await Item.findOne({ _id: req.params.id })

		if (!item) {
			return res.status(404).send({ error: `No item found with id ${req.params.id}` })
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

 // DELETE /item/defective/:id
 // - Delete defective item
router.delete('/item/defective/:id', auth, async (req, res) => {
	try {
		const defective = await Defective.findOneAndDelete({ _id: req.params.id })

		if (!defective) {
			return res.status(404).send({ error: `No defective found with id ${req.params.id}` })
		}

		const trace = new Trace({
			user: req.user._id,
			operation: 'Delete',
			record: defective,
		})
	
		try {
			await trace.save()
			res.send(defective)
		} catch (e) {
			console.log('Error saving trace')
			console.error(e)
		}
	} catch (e) {
		console.error(e)
		res.staus(500).send(e)
	}
})

module.exports = router