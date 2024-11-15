import express from 'express';
import Customer from '../models/Customer.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send(customers);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log("HELEO");
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.status(200).send(customer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
