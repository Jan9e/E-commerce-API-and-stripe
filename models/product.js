const mongoose =require("mongoose");

const productschema = new mongoose.Schema({
    title:{type: String, required: true, unique:true},
    description: {type: String, required:true},
    img:{type:String, requird:true, unique:true},
    categories:{type:Array},
    size:{type: String},
    color:{type: String},
    price:{type: Number, required: true},
},
{timestamps: true}
);

module.exports= mongoose.model("product", productschema);