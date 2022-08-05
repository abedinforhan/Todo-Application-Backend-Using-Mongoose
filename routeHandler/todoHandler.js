const express= require('express');
const mongoose=require('mongoose')
const router=express.Router();

const todoSchema=require('../schemas/todoSchema')
const Todo=new mongoose.model('Todo',todoSchema)


//get all the todos
router.get('/',async(req,res)=> {

})

//post a todo
router.post('/',async(req,res)=> {
  try{
    const newTodo=new Todo(req.body)
    const data= await newTodo.save()
     res.status(200).json({
        result: data,
        message:"Todo is inserted successfully"
    });
} catch(err){
     res.status(500).json({
        error: err.message})
  }
 })


//get a todo by ID
router.get('/:id',async(req,res)=> {

})



//post multiple todos

router.post('/all',async(req,res)=>{
  await Todo.insertMany(req.body,)
})

//update  a todo by ID

router.put(':id',async(req,res)=>{

})

//delete a todo by ID

router.delete('/:id',async(req,res)=>{

})

module.exports=router;