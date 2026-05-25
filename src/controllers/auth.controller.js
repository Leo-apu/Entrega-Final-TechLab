import { validateUser, registerUserService } from "../services/auth.service.js";

import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const user = await registerUserService(email, password, role);

    if (!user) {
      return res.status(409).json({
        message: "El usuario ya existe",
      });
    }

    res.status(201).json({
      message: "Usuario registrado",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password);

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
