const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//schemas
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//get all the todos
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find({});
    console.log(data);
    res.status(200).json({
      success: true,
      result: data,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//post a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const data = await newTodo.save();
    res.status(200).json({
      success: true,
      message: "Todo is inserted successfully",
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//get a todo by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Todo.find({ _id: id })
      .select("-date -__v") //excluding date & __v
      .res.status(200)
      .json({
        success: true,
        result: data,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//post multiple todos
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      success: true,
      message: "Todos are inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//update  a todo by ID

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, status, date } = req.body || {};

    const updatedData = await Todo.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          description,
          status,
          date,
        },
      },
      { new: true } // for getting the new document
    );
    res.status(200).json({
      success: true,
      message: "Todo is updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findOneAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//delete multiple documents by ID
router.delete("/", async (req, res) => {
  try {
    const idToBeDeleted = req.body.idToBeDeleted;
    await Todo.deleteMany({ _id: idToBeDeleted });
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "There is an error deleting the documents",
    });
  }
});

module.exports = router;
