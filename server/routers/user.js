const express = require('express')
const User = require("./../model/user")
const Trace = require('./../model/trace')
const { Item } = require('./../model/item')
const auth = require("./../middleware/authenticate")
const router = new express.Router()


// POST /users
router.post('/users', auth, async (req, res) => {
    if (req.user.role !== "Manager") {
        return res.status(401).send({ error: "Only managers can create accounts" })
    }
    
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// POST /users/login
router.post('/users/login', async (req, res) => {
    try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// POST /users/logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})
// POST /users/logoutAll
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// GET /users/me
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// GET /users/:id/trace
router.get('/users/:id/trace', auth, async (req, res) => {
    try {
		const traces = await Trace.find({ user: req.params.id })
		res.send(traces)
	} catch (e) {
		res.status(500).send(e)
	}
})

// GET /users/:id/custody
router.get('/users/:id/custody', auth, async (req, res) => {
    try {
        const custody = await Item.find({ custodiedBy: req.params.id })
        res.send(custody)
    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
})

module.exports = router