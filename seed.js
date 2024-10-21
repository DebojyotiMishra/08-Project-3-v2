const db = require("./database")

// Data to insert
const users = [
	{ firstName: "John", lastName: "Doe" },
	{ firstName: "Jane", lastName: "Smith" },
	{ firstName: "Emily", lastName: "Johnson" },
	{ firstName: "Michael", lastName: "Brown" },
	{ firstName: "Sarah", lastName: "Davis" },
	{ firstName: "David", lastName: "Wilson" },
	{ firstName: "Laura", lastName: "Miller" },
	{ firstName: "James", lastName: "Moore" },
	{ firstName: "Olivia", lastName: "Taylor" },
	{ firstName: "Daniel", lastName: "Anderson" },
	{ firstName: "Sophia", lastName: "Thomas" },
	{ firstName: "Christopher", lastName: "Jackson" },
]

// Function to insert users
function insertUsers() {
	users.forEach((user) => {
		db.run(
			`INSERT INTO users (firstName, lastName) VALUES (?, ?)`,
			[user.firstName, user.lastName],
			(err) => {
				if (err) {
					console.error("Error inserting user:", err.message)
				} else {
					console.log(`Inserted user: ${user.firstName} ${user.lastName}`)
				}
			}
		)
	})
}

// Run the insert function
insertUsers()