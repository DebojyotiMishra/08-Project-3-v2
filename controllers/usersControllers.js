const db = require("../database");

exports.getAllUsers = function (req, res) {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

function isAlphanumeric(str) {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(str)
}

exports.createNewUser = (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName)
    return res
        .status(400)
        .json({ error: "The first name and last name are required !" })
  if (!firstName)
    return res.status(400).json({ msg: "Please provide a first name" });
  if (!lastName)
    return res.status(400).json({ msg: "Please provide a last name" });
  if (!isAlphanumeric(firstName))
    return res.status(400).json({ msg: "First name must be a string" });
  if (!isAlphanumeric(lastName))
    return res.status(400).json({ msg: "Last name must be a string" });


  db.run(
    "INSERT INTO users (firstName,lastName ) VALUES (?, ?)",
    [firstName, lastName],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, firstName });
      }
    }
  );
};

// POST update a user based on its ID
exports.updateUser = (req, res) => {
	const { firstName, lastName } = req.body

	// get the id from the params
	const userId = req.params.id

	// check what fields are sent
	let updateFields = []
	let queryParams = []

	if (firstName) {
		updateFields.push("firstName = ?")
		queryParams.push(firstName)
	}

	if (lastName) {
		updateFields.push("lastName = ?")
		queryParams.push(lastName)
	}

	if (updateFields.length > 0) {
		// Add userId to the query parameters
		queryParams.push(userId)

		// Build the query dynamically
		const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`

		db.run(query, queryParams, function (err) {
			if (err) {
				res.status(500).json({ error: err.message })
			} else if (this.changes === 0) {
				res.status(404).json({ message: "User not found" })
			} else {
				res.json({ msg: "User updated", userId, firstName, lastName })
			}
		})
	} else {
		res.status(400).json({ message: "No fields to update" })
	}
}

exports.deleteUser = (req, res) => {
	// get the id from the params
	const { id } = req.params
	// run the query
	db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
		if (err) {
			res.status(500).json({ error: err.message })
		} else if (this.changes === 0) {
			// if nothing found
			res.status(404).json({ message: "User not found" })
		} else {
			// is successful
			res.status(200).json({ message: "User deleted !" })
		}
	})
}

// GET all users from the database
exports.getAllUsers = function (req, res) {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message })
		}
		{
			// Append new property to each user
			const updatedRows = rows.map((user) => ({
				...user,
				//	profileImg: `https://api.multiavatar.com/${user.firstName}.svg`, // dynamic picture
				// profileImg: `https://robohash.org/${user.firstName}.png`, // dynamic picture
				profileImg: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`,
			}))
			// you can choose whatever profile API you prefer

			res.json(updatedRows)
		}
	})
}