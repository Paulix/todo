const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

// import databse connect
const connect = require("./util/connect");

// configure dotenv
dotenv.config("./config");

const PORT = process.env.PORT || 4000;

// use post data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// set up cors policy
app.use(cors());

// import routes
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

// use routes
app.use("/api/user", userRoute); // user routes
app.use("/api/task", taskRoute); // task routes

app.listen(PORT, () => {
  console.log(`🚀 server up and runnign at port ${PORT}`);

  connect();
});
