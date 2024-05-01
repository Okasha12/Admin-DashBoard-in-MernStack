import { Router } from "express";
import {addProduct, singleProduct,getProduct,deleteProduct,updateProduct} from "../controllers/product.controller.js"

const router = Router()

router.route("/addproduct").post(addProduct)
router.route("/getProduct").get(getProduct)
router.route("/singleProduct/:id").get(singleProduct)
router.route("/deleteProduct/:id").delete(deleteProduct) 
router.route("/updatedProduct/:id").put(updateProduct)   

export default router;