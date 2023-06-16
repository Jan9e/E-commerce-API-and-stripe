const mongoose =require("mongoose");

const cartschema =new mongoose.Schema({
    userid: {type: String, required: true, unique: true},
    product:[
        {
        productid: {type:String, required: true},
        quantity : {type: Number, default: 1},
        price: {type: Number}
        }
    ]
},
{timestamps: true}
);

module.exports= mongoose.model("cart", cartschema);