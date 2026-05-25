import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API TechLab",
    description: "Documentación automática de la API REST de TechLab",
    version: "1.0.0",
  },

  host: "localhost:3000",
  schemes: ["http"],

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

const endpointsFiles = ["./src/index.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);