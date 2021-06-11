const express = require('express')
const User = require("./../model/user")
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

// DELETE /usrs/me
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// GET /test
router.get('/test', (req, res) => {
    const newMessage = {
        name: "Ali",
        major: "CIS"
    }

    if (true) {
        return res.send(newMessage)
    }

    console.log(newMessage)
})

module.exports = router