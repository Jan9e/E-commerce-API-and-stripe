const users = require("../models/users");
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

const router= require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    if(req.body.password){
        req.body.password= CryptoJS.AES.encrypt(
            req.body.password, process.env.PASS_SEC).toString();
    }

    try{
        const updateduser =await users.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        return res.status(200).json(updateduser);
    }catch(err){
       return res.status(500).json(err);
    }
})

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await users.findByIdAndDelete(req.params.id);
        return res.status(200).json("User is deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET USER

router.get("/find/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
       const user= await users.findById(req.params.id);
       const {password, ...others}= user._doc;
        return res.status(200).json(others);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    const query=req.query.new;
    try{
       const user= query? await users.find().sort({_id:-1}).limit(2): await users.find();
    //    const {password, ...others}= user._doc;
        return res.status(200).json(user);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET STATS

router.get("/stats", verifyTokenAndAdmin, async(req, res)=>{
    const date=new Date();
    const lastYear= new Date(date.setFullYear(date.getFullYear()-1));

    try{
        const data=await users.aggregate([
            {$match : {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month : {$month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",
                    total: {$sum:1},
                },
            },
        ]);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports =router;