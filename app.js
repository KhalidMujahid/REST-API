const express = require("express");
const cors = require("cors");
const router = require("./index");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/",router);

app.listen(process.env.PORT,(err) => {
   try{
     if(!err){
        throw `Server running on port ${process.env.PORT}`;
        
     } else {
        throw err;
     }
   } catch(e) {
      console.log(e);
   }
})





