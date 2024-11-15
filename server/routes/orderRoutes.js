import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  try {
    console.log("HELEO");

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
