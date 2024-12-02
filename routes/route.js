import express from "express"
import getProducts, { addProduct, getProductById, login, signup } from "../controller/controller.js"

const router=express.Router()




router.get("api/getProducts",getProducts)
router.post("/api/addproducts",addProduct)
router.get("/api/getProducts/:id",getProductById)
router.post("/api/signup",signup)
router.post("/api/login",login)
// router.post("/api/cart",cart)
export default router