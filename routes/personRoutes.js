const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// POST method to. save a person

router.post('/',async (req,res)=>{
   
    try {
          const data = req.body; // Assuming the request body contains the person data
      
          //Create a new person documnet using mongoose model
          const newPerson = new Person(data);
      
          //Save the new Person in databse
          const response =  await newPerson.save();
          res.status(200).json({message:'Data Saved Successfully',
           response:response});
          console.log('Data saved successfully');
          
    } catch (error) {
       if (error.name === "ValidationError" || error.code === 11000) {
           // Client-side errors (validation or duplicate key)
           res.status(400).json({ error: error.message, details: error });
         } else {
           // Server-side errors (unexpected issues)
           res.status(500).json({ error: "Internal server error", details: error.message });
         }
    }
   
   })
   
   // GET method to get the person
   
   router.get('/',async (req,res)=>{
       try {
           
           const response = await Person.find();
           res.status(200).json({response});
           console.log('Data fetched successfully');
   
       } catch (error) {
           if (error.name === "ValidationError" || error.code === 11000) {
               // Client-side errors (validation or duplicate key)
               res.status(400).json({ error: error.message, details: error });
             } else {
               // Server-side errors (unexpected issues)
               res.status(500).json({ error: "Internal server error", details: error.message });
             }
       }
   })
   
   //GET method to fetch person as per work type
   
   router.get('/:workType',async (req,res)=>{
     
       try {
       const worktype = req.params.workType;
       if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager'){
            const response = await Person.find({work:worktype})
            res.status(200).json({response});
       }else{
           res.status(404).json({error : 'Invalid work type'})  
       }
     } catch (error) {
       if (error.name === "ValidationError" || error.code === 11000) {
           // Client-side errors (validation or duplicate key)
           res.status(400).json({ error: error.message, details: error });
         } else {
           // Server-side errors (unexpected issues)
           res.status(500).json({ error: "Internal server error", details: error.message });
         }
     }
   })

   //PUT method to update person document
   router.put('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidator:true
        });
        if(!updatedPersonData){
            return res.status(404).json({error:'Person Not found'});
        }
        res.status(200).json(response);
    } catch (error) {
        if (error.name === "ValidationError" || error.code === 11000) {
            // Client-side errors (validation or duplicate key)
            res.status(400).json({ error: error.message, details: error });
          } else {
            // Server-side errors (unexpected issues)
            res.status(500).json({ error: "Internal server error", details: error.message });
          }
    }
   })

   // DELETE method to delete the data
   router.delete('/:id',async (req,res)=>{
   try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person Not found'});
        }
        res.status(200).json({message:`Person data with if ${personId} deleted successfully!!!`});

   } catch (error) {
        if (error.name === "ValidationError" || error.code === 11000) {
            // Client-side errors (validation or duplicate key)
            res.status(400).json({ error: error.message, details: error });
        } else {
            // Server-side errors (unexpected issues)
            res.status(500).json({ error: "Internal server error", details: error.message });
        }
   }
   })

   module.exports = router;