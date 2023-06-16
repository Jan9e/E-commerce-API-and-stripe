const Cart= require("../models/cart");
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

const router= require("express").Router();

//CREATE

router.post("/", verifytoken, async (req, res) => {
    const newCart = new Cart(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE

router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const updatedCart =await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        return res.status(200).json(updatedCart);
    }catch(err){
       return res.status(500).json(err);
    }
})

// //DELETE

router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json("cart is deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
})

// //GET USER CART

router.get("/find/:userid", verifyTokenAndAuthorization, async(req, res)=>{
    try{
       const cart= await Cart.findOne({userId:req.params.userid});
        return res.status(200).json(cart);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    try{
      const carts =await Cart.find();
      return res.status(200).json(carts);
    }catch(err){
        return res.status(500).json(err);
    }
});

module.exports =router