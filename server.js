// Import necessary modules and packages
const express = require("express");
const exphbs = require("express-handlebars");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require('dotenv').config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Import models
const { User, Blog, Comment } = require("./models");

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
const sess = {
  secret: "super secret secret",
  cookie: {
    // Session duration: half an hour
    maxAge: 0.5 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Configure Handlebars as the view engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define routes
app.use("/", allRoutes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});