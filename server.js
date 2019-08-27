//DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes/index");
const db = require("./config/keys").mongoURI;
const path = require("path")

//START EXPRESS
const app = express();

//PORT
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// MONGOOSE
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


// PASSPORT
app.use(passport.initialize());
require("./config/passport")(passport);

//ROUTES
app.use(routes);
app.use("/api/users", require("./routes/api/users"));
app.use("/api/story", require("./routes/api/story"))

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

