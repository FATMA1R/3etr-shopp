const express = require("express");
const orderRoute = express.Router();
//Import our model
const Order = require("../models/Order");

//ALL routes--------------------------------------------------------

//*******************  GET :  RETURN ALL ORDERS *******************//
orderRoute.get("/", async (req , res)=>{
    try{
        const orders = await  Order.find({});
        res.status(201).send({orders: orders});
    }catch(error){
        res.status(500).send({error, message: "cannot get orders"});
    }
});

//******************* POST :  ADD A NEW ORDER TO THE DATABASE *******************//
orderRoute.post("/add", async (req, res) => {
        
        try {
            const newOrder = new Order(req.body);
            let result = await newOrder.save();
            res.send({ orders : result , message: "success" });
        } catch (error) {
           console.log(error);
        }
    });
//*******************    PUT : EDIT AN ORDER BY ID *******************//
orderRoute.put("/:id",async (req,res)=>{
    try{
        const updateOrder = await Order.findOneAndUpdate(
            {_id: req.params.id},
            { $set: {...req.body}}
        );
        if(!updateOrder){
            res.status(404).send("not found");
        }
        res.status(201).send({message: "order is updated"});

    }catch(error){
        res.status(500).send(error);
    }
});
//******************* DELETE : REMOVE AN ORDER BY ID *******************//
orderRoute.delete("/:id",async (req,res)=>{
    try{
        await Order.findOneAndDelete({_id:req.params.id})
    res.status(201).send("success");}
    catch(error){
        res.status(500).send(error);
    }
});


module.exports = orderRoute;