import { validateUser, registerUserService } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Todos los campos (email, password, role) son obligatorios",
      });
    }

    const user = await registerUserService(email, password, role);

    if (!user) {
      return res.status(409).json({
        message: "El usuario ya existe",
      });
    }

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "El email y la contraseña son obligatorios",
      });
    }

    const user = await validateUser(email, password);

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
