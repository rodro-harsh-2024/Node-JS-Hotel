const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem')

//POST method to add menu to database

router.post('/',async(req,res)=>{

    try {
        const data = req.body;
         
        //Create new menu using menuitem schema
        const newMenu = MenuItem(data);
        const response = await newMenu.save();
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

    // GET method to fetch the menu item details
    router.get('/',async (req,res)=>{

        try {
            const response = await MenuItem.find();
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


})

module.exports = router;