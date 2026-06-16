import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  deleteProductService,
  updateProductService,
  updatePatchProductService,
  getProductByCategoryService,
} from "../services/products.service.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const category = req.query.category;

    if (category) {
      const products = await getProductByCategoryService(category);
      return res.status(200).json(products);
    }

    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await getProductByIdService(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, category } = req.body;

    if (!name || price === undefined || stock === undefined || !category) {
      return res.status(400).json({
        message:
          "Todos los campos (name, price, stock, category) son obligatorios",
      });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "El precio debe ser un número válido igual o mayor a 0",
      });
    }

    if (typeof stock !== "number" || stock < 0) {
      return res.status(400).json({
        message: "El stock debe ser un número válido igual o mayor a 0",
      });
    }

    const id = await createProductService({ name, price, stock, category });

    res.status(201).json({
      message: "Producto creado",
      id,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await deleteProductService(req.params.id);

    res.status(200).json({
      message: "Producto eliminado",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;

    if (!name || price === undefined || stock === undefined || !category) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const updated = await updateProductService(id, req.body);

    if (!updated) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      id: updated.id,
      name: updated.name,
      message: "Producto actualizado",
    });
  } catch (error) {
    next(error);
  }
};

export const updatePatchProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = {};
    if (req.body.name !== undefined) data.name = req.body.name;
    if (req.body.category !== undefined) data.category = req.body.category;

    if (req.body.price !== undefined && typeof req.body.price === "number") {
      data.price = req.body.price;
    }

    if (req.body.stock !== undefined && typeof req.body.stock === "number") {
      data.stock = req.body.stock;
    }

    if (Object.keys(data).length === 0) {
      return res.status(422).json({
        message: "No se proporcionaron campos válidos para actualizar",
      });
    }

    const updated = await updatePatchProductService(id, data);

    if (!updated) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        message: "El campo 'name' es obligatorio",
      });
    }

    const products = await getAllProductsService();

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase()),
    );

    if (filteredProducts.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(filteredProducts);
  } catch (error) {
    next(error);
  }
};
