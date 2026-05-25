import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";
dotenv.config();

const doc = {
  info: {
    title: "API TechLab",
    description: "Documentación automática de la API REST de TechLab",
    version: "1.0.0",
  },

  servers: [
    {
      url: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000",
      description: "Servidor API",
    },
  ],

  tags: [
    {
      name: "Auth",
      description: "Autenticación de usuarios",
    },
    {
      name: "Products",
      description: "Gestión de productos",
    },
  ],

  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Ingrese el token con formato: Bearer TOKEN",
    },
  },

  definitions: {
    Product: {
      name: "Mouse Gamer",
      price: 25000,
      stock: 10,
      category: "Periféricos",
    },

    Register: {
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    },

    Login: {
      email: "admin@gmail.com",
      password: "123456",
    },
  },
};

const outputFile = "./swagger-output.json";

const endpointsFiles = [
  "./src/routes/products.routes.js",
  "./src/routes/auth.routes.js"
];

swaggerAutogen()(outputFile, endpointsFiles, doc);