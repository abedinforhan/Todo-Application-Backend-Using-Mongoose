const express= require('express');
const router=express.Router();

//get all the todos
router.get('/api/v1',async(req,res)=> {

})

//post a todo
router.post('api/v1',async(req,res)=> {

})


//get a todo by ID
router.get('api/v1/:id',async(req,res)=> {

})



//post multiple todos

router.post('api/v1/all',async(req,res)=>{

})

//update  a todo by ID

router.put('api/v1/:id',async(req,res)=>{

})

//delete a todo by ID

router.delete('api/v1/:id',async(req,res)=>{

})

module.exports=router;