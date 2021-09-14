const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.listen(process.env.API_PORT);

// middlewares
app.use(express.json()); // json parser
app.use(cors()); // cross site


// route middlewares
app.use("/api/unsplash", require("./routes/unsplash"));

// connect to database and run server
const run = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("connected to database")
    );

    console.log(`app server running on port: ${process.env.API_PORT}`);
  } catch (err) {
    console.log(err.message);
  }
};
run();
