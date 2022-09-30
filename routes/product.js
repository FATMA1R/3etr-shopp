const express = require("express");
const productRoute = express.Router();
//Import our model
const Product = require("../models/Product");

//ALL routes--------------------------------------------------------

//*******************  GET :  RETURN ALL Products *******************//
productRoute.get("/", async (req , res)=>{
    try{
        const Products = await  Product.find({});
        res.status(201).send({Products: Products});
    }catch(error){
        res.status(500).send({error, message: "cannot get Products"});
    }
});

//******************* POST :  ADD A NEW PRODUCT TO THE DATABASE *******************//
productRoute.post("/add", async (req, res) => {
        
        try {
            const newProduct = new Product(req.body);
            let result = await newProduct.save();
            res.send({ Products : result , message: "success" });
        } catch (error) {
           console.log(error);
        }
    });
//*******************    PUT : EDIT PRODUCT BY ID *******************//
productRoute.put("/:id",async (req,res)=>{
    try{
        const updateProduct = await Product.findOneAndUpdate(
            {_id: req.params.id},
            { $set: {...req.body}}
        );
        if(!updateProduct){
            res.status(404).send("not found");
        }
        res.status(201).send({message: "Product is updated"});

    }catch(error){
        res.status(500).send(error);
    }
});
//******************* DELETE : REMOVE A product BY ID *******************//
productRoute.delete("/:id",async (req,res)=>{
    try{
        await Product.findOneAndDelete({_id:req.params.id})
    res.status(201).send("success");}
    catch(error){
        res.status(500).send(error);
    }
});


module.exports = productRoute;