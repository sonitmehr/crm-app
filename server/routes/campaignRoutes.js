import express from 'express';
import Campaign from '../models/Campaign.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).send(campaign);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).send(campaigns);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log("HELEO");

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }
    res.status(200).send(campaign);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
