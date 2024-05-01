import { asyncHandlder } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const addProduct = asyncHandlder(async (req, res) => {

const {name, price, description, category } = req.body;

if (
    [name, price, description].some(
        (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
const newProduct = await Product.create({
    name, price, description, category
})
if (!newProduct) {
    throw new ApiError(500, "product not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, newProduct, "Product Successfully created"));
});

// console.log(name, price, description, category)

const getProduct = asyncHandlder( async (req, res)=>{

    const product = await  Product.find({});
    // console.log(product);
    if (!product) {
        // If the product with the given ID is not found, return a 404 Not Found response
        return res.status(404).send('Product not found.');
      }
      return res
      .status(201)
      .json(new ApiResponse(200, product,"product find successfully"));

    
});

const singleProduct = asyncHandlder(async (req, res) => {
    const prodId = req.params.id;
  
      const product = await Product.findById(prodId); // Search for the space by its ID
  
      if (!product) {
        throw new ApiError(500, "Something went wrong while Edit place");
      }
      res.status(200).json({ product });
});

const updateProduct = asyncHandlder(async (req, res) => {

    const {name, price, description, category } = req.body;
        console.log(name, price, category);
    if (
        [name, price, description].some(
            (field) => field?.trim() === ""
        )
      ) {
        throw new ApiError(400, "All fields are required");
      }
    const newProduct = await Product.updateOne({
        name, price, description, category
    })
    if (!newProduct) {
        throw new ApiError(500, "product not found");
      }
      return res
        .status(201)
        .json(new ApiResponse(200, newProduct, "Product Successfully update"));
    });

const deleteProduct = asyncHandlder(async(req,res)=>{
    
        
        const id = req.params.id;
    // console.log(id);
    
        // Delete the product by its ID
        const deletedProduct = await Product.findByIdAndDelete(id);
    // console.log(deletedProduct);
     
    
    return res
    .status(201)
    .json(new ApiResponse(200, deletedProduct,"product delete successfully"));
     
});










export {addProduct,getProduct, singleProduct,deleteProduct,updateProduct};