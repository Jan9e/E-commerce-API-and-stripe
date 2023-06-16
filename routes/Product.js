const product= require("../models/product");
const { verifytoken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

const router= require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new product(req.body);
  
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
        const updatedProduct =await product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        return res.status(200).json(updatedProduct);
    }catch(err){
       return res.status(500).json(err);
    }
})

// //DELETE

router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
        await product.findByIdAndDelete(req.params.id);
        return res.status(200).json("product is deleted...");
    }catch(err){
        return res.status(500).json(err);
    }
})

// //GET PRODUCT

router.get("/find/:id", async(req, res)=>{
    try{
       const Product= await product.findById(req.params.id);
        return res.status(200).json(Product);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL PRODUCTS
router.get("/", async(req, res)=>{
    const qnew=req.query.new;
    const qcategory=req.query.categories;
    try{
       let products;
       if(qnew){
        products=await product.find().sort({createdAt: -1}).limit(1);
       }else if(qcategory){
        products=await product.find({
            categories:{
                $in: [qcategory],
            },
        });
       }else{
        products =await product.find();
       }
       return res.status(200).json(products);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports =router