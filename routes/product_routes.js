import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getProductsByName,
} from "../controller/product_controller.js";

const router = express.Router();

router.get("/top", getTopProducts);
router.get("/list", getAllProducts);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getProductById);
router.get("/", getProductsByName);


export default router;
