const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/firebase.config")

const app = express();

// Set FRONTEND_URL in the API service to the deployed frontend origin.
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.18:5173",
  "http://192.168.1.4:5173",
  "https://styley-e-commerce-website-1.onrender.com",
  process.env.FRONTEND_URL?.replace(/\/$/, "")
].filter(Boolean);

const corsOptions = { origin: allowedOrigins };

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Styley Application." });
});

require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
