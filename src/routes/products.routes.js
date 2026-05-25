import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  updatePatchProduct,
  searchProduct,
} from "../controllers/products.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

import { verifyAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/search/name", searchProduct);

router.get("/:id", getProductById);

router.post("/create", verifyToken, verifyAdmin, createProduct);

router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

router.put("/:id", verifyToken, verifyAdmin, updateProduct);

router.patch("/:id", verifyToken, verifyAdmin, updatePatchProduct);

export default router;
