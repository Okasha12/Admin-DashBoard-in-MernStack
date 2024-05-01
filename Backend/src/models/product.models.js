import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
{
name:{
type:String,
required:true,
unique:true,
lowercase:true
},
price:{ 
type:String,
required:true,

},
description:{
    type:String,
   required:true
},
category:{
 type:String,
//  required:true
},
image:{
    type: String,
    // required:true
}



},
{timestamps:true}

)
export const Product = mongoose.model("Product",productSchema)