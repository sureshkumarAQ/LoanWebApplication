const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./server/database/connection.js");

const app = express();
app.use(cors());

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

// Log request Using Morgan
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// Parse request  to body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Load routers
app.use("/user", require("./server/routes/userRoutes.js"));
app.use("/loan", require("./server/routes/loanRoutes.js"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
