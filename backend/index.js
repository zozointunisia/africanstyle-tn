import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB - OPTIONS OBSOLÈTES SUPPRIMÉES
mongoose.connect('mongodb+srv://mohamedzorkot2004_db_user:1nmiiPCaFoJ4yxWI@africanstyle.abghtwj.mongodb.net/ecommerce?retryWrites=true&w=majority')
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  sizes: [String],
});
const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  customer: Object,
  items: Array,
  total: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

// In-memory cart (pour la démo)
let cart = [];

// ============= PRODUCTS ENDPOINTS =============

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, category, description, image, sizes } = req.body;
    const newProduct = new Product({ name, price, category, description, image, sizes });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, price, category, description, image, sizes } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description, image, sizes },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= CART ENDPOINTS =============

// Get cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity, product });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart item quantity
app.put('/api/cart/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cartItem = cart.find(item => item.productId === productId);
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    cartItem.quantity = quantity;
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
app.delete('/api/cart/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    cart = cart.filter(item => item.productId !== productId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json(cart);
});

// ============= ORDERS ENDPOINTS =============

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    const newOrder = new Order({ customer, items, total });
    await newOrder.save();
    
    // Clear cart after order
    cart = [];
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= START SERVER =============
// CORRECTION : app.listen DOIT ÊTRE ICI, PAS À L'INTÉRIEUR DES ROUTES
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
