const order= require("../models/order");
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

const router= require("express").Router();

//CREATE

router.post("/", verifytoken, async (req, res) => {
    const newOrder = new order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE

router.put("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
        const updatedOrder =await order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        return res.status(200).json(updatedOrder);
    }catch(err){
       return res.status(500).json(err);
    }
})

// //DELETE

router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
        await order.findByIdAndDelete(req.params.id);
        return res.status(200).json("order is deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
})

// //GET USER OREDRS

router.get("/find/:userid", verifyTokenAndAuthorization, async(req, res)=>{
    try{
       const orders= await order.find({userId:req.params.userid});
        return res.status(200).json(orders);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    try{
      const orders =await order.find();
      return res.status(200).json(orders);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async(req , res) =>{
    const date=new Date();
    const lastmonth= new Date(date.getMonth(date.getMonth()-1));
    const previousMonth = new Date(date.getMonth(lastmonth.getMonth()-1));

    try{
         const income=await order.aggregate([
            {$match : {createdAt : {$gte : previousMonth}}},
            {
                $project:{
                    month:{$month: "$createdAt"},
                    sales:"$amount",
                },
            },
            {
                $group:{
                    _id : "$month",
                    total : {$sum : "$sales"},
                },
            },
         ]);
         return res.status(200).json(income);
        }catch(err){
        return res.status(500).json(err);
    }
});

module.exports =router