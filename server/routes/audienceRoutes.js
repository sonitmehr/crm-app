import express from 'express';
import Audience from '../models/Audience.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const audience = new Audience(req.body);
    await audience.save();
    res.status(201).send(audience);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const audiences = await Audience.find();
    res.status(200).send(audiences);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log("HELEO");

    const audience = await Audience.findById(req.params.id);
    if (!audience) {
      return res.status(404).send('Audience not found');
    }
    res.status(200).send(audience);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
