
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

