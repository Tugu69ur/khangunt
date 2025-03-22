import productModel from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  } = req.body;
  const product = new productModel({
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  const { name, description, price, countInStock } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.countInStock = countInStock || product.countInStock;
  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  await product.remove();
  res.json({ message: "Product removed" });
});

export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    return res.status(400).json({ error: "Product already reviewed" });
  }
  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save();
  res.status(201).json({ message: "Review added" });
});

export const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
  } catch (error) {
    console.error("Error getting top products:", error);
    res.status(500).json({
      error: "Error fetching top products",
      message: error.message,
    });
  }
});

export const getProductsByName = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  const products = await productModel.find({ name: { $regex: keyword, $options: "i" } });
  res.json(products);
});