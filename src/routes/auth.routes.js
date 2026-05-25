import express from "express";

import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/register",

  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Registrar usuario'

  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Register' }
  } */

  register
);

router.post(
  "/login",

  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Iniciar sesión'

  /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Login' }
  } */

  login
);

export default router;