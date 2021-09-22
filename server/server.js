const express = require("express");
const dotenv = require('dotenv').config();
const cors = require("cors");
const mongoose = require('mongoose');
const Task = require('../models/task');
const app = express();


const PORT = 4011;

mongoose.connect(
    process.env.MONGO_URI,
{   
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result)=>
app.listen(PORT,()=>{
    console.log("Server running on port "+PORT );
})
).catch((err)=>console.log(err))

mongoose.connection.once("open", () => {
    console.log("Mongodb connection established successfully");
  });

  app.use(express.json())
  app.use(cors())

app.post("/",async(req,res)=>{
    
        console.log(req.body);
        const task =await new Task(
           { 
               task:req.body.task,
               completed:req.body.completed,
               date:req.body.date,            
            }
            
            );
            task.save()
            .then(()=>res.json("todo is created"))
            .catch((err)=>console.log(err))      
        
   
});

app.get('/',async(req,res)=>{
    Task.find((err, todos) => {
        if (err) {
          console.log(err);
        } else {
          res.json(todos);
        }
      });
})

app.put('/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const task = await Task.findOneAndUpdate(
            {_id:id},
            req.body
        )
        res.send(task)
    } catch (error) {
        res.send(error)

        
    }
    
})


app.delete('/:id',async(req,res)=>{

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.send(error)
    }

})

