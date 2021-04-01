const express = require("express");
const router = express.Router();
const monk = require("monk");
require("dotenv/config");
const Joi = require("@hapi/joi");

//Connecting to my database
const database = monk(process.env.MONGO_DB);
const collection = database.get(process.env.DB_COLLECTION);

//database schema
const schema = Joi.object({
  message: Joi.string().trim().required()
});

//Read all
router.get("/", async (req,res,next) => {
   try {
      const items = await collection.find({});
      res.json(items);
   } catch(err) {
     next(err);
   }
});


//Read one data
router.get("/:id", async (req,res,next) => {
   try {
      const { id } = req.params;
      const item = await collection.findOne({
         _id: id
      });
      res.json(item);
      
   } catch(err) {
     next(err);
   }
});


//Add data

router.post("/", async (req,res,next) => {
   try {
      const value = await schema.validateAsync(req.body);
      const item = await collection.insert(value);
      res.json(item);
   } catch(err) {
     next(err);
   }
});

//Update one

router.put("/:id", async(req,res,next) => {
   try {
     const { id } = req.params;
     const value = await schema.validateAsync(req.body);
     const item = await collection.findOne({
       _id: id
     });
     
     if(!item) return next();
     const updated = await collection.update({
        _id: id
     },{
       $set: value
     });
     
     res.json(updated);
   } catch(err) {
     next(err);
   }
});

//Delete one

router.delete("/:id", async (req,res,next) => {
   try {
     const { id } = req.params;
     
     //if(!item) return next();
     const updated = await collection.remove({
        _id: id
     });
     
     res.json(updated);
   } catch(err) {
     next(err);
   }
});


//Delete all


router.delete("/", async (req,res,next) => {
   try {
      const items = await collection.remove({});
      res.json({
         msg: "Deleted"
      });
   } catch(err) {
     next(err);
   }
});






module.exports = router;
