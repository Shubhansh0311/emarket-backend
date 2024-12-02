import express from "express"
import getProducts, { addProduct, getProductById, login, signup } from "../controller/controller.js"

const router=express.Router()




router.get("/getproducts",getProducts)
router.post("/addproducts",addProduct)
router.get("/getProducts/:id",getProductById)
router.post("/signup",signup)
router.post("/login",login)
// router.post("/api/cart",cart)
export default router