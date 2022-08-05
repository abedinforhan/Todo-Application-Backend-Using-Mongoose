const express=require('express')

const app=express()
const PORT=4000;


app.use(express.json())


//database connection with mongoose


//application routes


//deafult error handlers

function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({error:err})
}

app.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
})