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

router.get(
  "/",

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Obtener todos los productos'
  // #swagger.description = 'Retorna una lista completa de productos'

  getAllProducts
);

router.get(
  "/search/name",

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Buscar producto por nombre'

  searchProduct
);

router.get(
  "/:id",

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Obtener producto por ID'

  getProductById
);

router.post(
  "/create",

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Crear producto'
  // #swagger.description = 'Crea un nuevo producto (solo admin)'

  // #swagger.security = [{
  //   "bearerAuth": []
  // }]

  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Product' }
  } */

  verifyToken,
  verifyAdmin,
  createProduct
);

router.delete(
  "/:id",

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Eliminar producto'

  // #swagger.security = [{
  //   "bearerAuth": []
  // }]

  verifyToken,
  verifyAdmin,
  deleteProduct
);

router.put(
  "/:id",

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Actualizar producto completo'

  // #swagger.security = [{
  //   "bearerAuth": []
  // }]

  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Product' }
  } */

  verifyToken,
  verifyAdmin,
  updateProduct
);

router.patch(
  "/:id",

  // #swagger.tags = ['Products']
  // #swagger.summary = 'Actualizar parcialmente un producto'

  // #swagger.security = [{
  //   "bearerAuth": []
  // }]

  verifyToken,
  verifyAdmin,
  updatePatchProduct
);

export default router;