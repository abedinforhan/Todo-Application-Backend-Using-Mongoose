const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler= require("./routeHandler/userHandler");

const app = express();
const PORT = 4000;

app.use(express.json());


//database connection with mongoose

mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Database connection  successful"))
  .catch((err) => console.log(err));

//application routes
app.use("/api/v1/user",userHandler);
app.use("/api/v1/todo", todoHandler);


//deafult error handlers

const errorHandler=(err, req, res, next)=> {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});




