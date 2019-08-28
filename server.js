//DEPENDENCIES
const express = require("express");
const connectDB = require("./config/db")
const passport = require("passport");
const path = require("path")

const users = require("./routes/api/users");
const story = require("./routes/api/story");
//START EXPRESS
const app = express();

// CONNECT DATABASE
connectDB();

//PORT
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// PASSPORT
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//ROUTES
app.use("/api/users", users);
app.use("/api/story", story);

// HEROKU
// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}


// START SERVER WITH PORT
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

