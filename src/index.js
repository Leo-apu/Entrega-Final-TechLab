import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";

import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import swaggerUi from "swagger-ui-express";
import fs from "fs";

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL("../swagger-output.json", import.meta.url))
);

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css";
const JS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "TechLab API funcionando correctamente",
    docs: "/api/docs"
  });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument , { customCssUrl: CSS_URL, customJsUrl: JS_URL }));

app.use("/api/products", productsRoutes);

app.use("/auth", authRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
}

export default app;
