import express from 'express';
import CommunicationLog from '../models/CommunicationLog.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const communicationLog = new CommunicationLog(req.body);
    await communicationLog.save();
    res.status(201).send(communicationLog);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const logs = await CommunicationLog.find();
    res.status(200).send(logs);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log("HELEO");
    const log = await CommunicationLog.findById(req.params.id);
    if (!log) {
      return res.status(404).send('Communication log not found');
    }
    res.status(200).send(log);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
