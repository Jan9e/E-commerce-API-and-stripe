const mongoose =require("mongoose");

const orderschema =new mongoose.Schema({
    userid: {type: String, required: true, unique:true},
    product:[
        {
        productid: {type:String},
        quantity : {type: Number, default: 1},
        price: {type: Number},
        },
    ],
    amount: {type: Number, required: true},
    address:{type: Object, required: true},
    status: {type: String, defaut:"pending"}
},
{timestamps: true}
);

module.exports= mongoose.model("order", orderschema);