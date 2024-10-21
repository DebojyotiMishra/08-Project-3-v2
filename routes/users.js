const express = require("express")
const router = express.Router()

const userArray = []

// GET METHOD
router.get("/users", (req, res) => {
	res.json({
		msg: "this is a test from the router",
	})
})

// POST METHOD
router.post("/", (req, res) => {
	const { firstName, lastName } = req.body

	res.status(201).json({
		msg: "This the message from POST ",
		firstName,
		lastName,
	})
})

// PUT METHOD
router.put("/:id", (req, res) => {
	const { firstName, lastName } = req.body

	// get the id from the params
	const userId = req.params.id

	// find the user with this ID, if the user is not found we need to send a 404 status code
    // you need to write the logic here
    if (!user) {
        res.status(404).json({
            msg: "User not found"
        })

	// // check what data was sent
	if (firstName) {
    	user.firstName = firstName	
	}

		res.json({
			msg: "This the message from PUT ",
			userId,
			firstName,
			lastName,
		})
}})

// DELETE METHOD
router.delete("/:id", (req, res) => {
	res.json({
		msg: "This the message from DELETE ",
	})
})

module.exports = router