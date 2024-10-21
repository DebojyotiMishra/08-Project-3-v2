
const express = require('express');
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js")

app.use(express.json());

// MIDDLEWARE
app.use("/api/", usersRouter)

// usres endpoint
app.use("/api/", usersRouter)

// GET METHOD
app.get("/", (req, res) => {
    res.json({
        msg: "Welcome to our simple REST API!"
    })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const sqlite3 = require("sqlite3").verbose()

// Open the database connection
const db = new sqlite3.Database("./users.db", (err) => {
	if (err) {
		console.error("Error opening database:", err.message)
	} else {
		console.log("Connected to the SQLite database.")

		// Create the items table if it doesn't exist
		db.run(
			`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL
      )`,
			(err) => {
				if (err) {
					console.error("Error creating table:", err.message)
				}
			}
		)
	}
})

module.exports = db