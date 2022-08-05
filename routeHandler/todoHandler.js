const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//get all the todos
router.get("/", async (req, res) => {
    try {
        const data = await Todo.find({});
        console.log(data);
        res.status(200).json({ data: data });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

//post a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const data = await newTodo.save();
    res.status(200).json({
      result: data,
      message: "Todo is inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//get a todo by ID
router.get("/:id", async (req, res) => {
    try{
        const id=req.params.id
       console.log(id);
        const data=await  Todo.find({_id:id}).select('-date -__v')   .//excluding date __v
         res.status(200).json({
            data:data,
            message:{success:true,}
        })
    }catch(error){

    }
});

//post multiple todos
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todos are inserted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    console.log(updatedData);
    res.status(200).json({ message: "Todo is updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete a todo by ID

router.delete("/:id", async (req, res) => {

    try{
        const id=req.params.id;
        const data= await Todo.findOneAndDelete({_id:id})
        res.status(200).json({
            data: data,
            message:"deleted successfully"
        })

    }catch(err){
        res.status(500).json({error: err.message})
    }
  

});

module.exports = router;
