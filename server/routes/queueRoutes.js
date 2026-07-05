const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');

router.get('/', async (req, res) => {
  try {
    const list = await Queue.find().sort({ createdAt: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/join', async (req, res) => {
  try {
    const { customerName, phone } = req.body;

    const existing = await Queue.findOne({ phone, status: 'waiting' });
    if (existing) {
      return res.status(400).json({ error: 'Active ticket already exists for this number.' });
    }

    const tokenNumber = `A-${Math.floor(Math.random() * 1000)}`;
    const newEntry = new Queue({ customerName, phone, tokenNumber });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clear/all', async (req, res) => {
  try {
    await Queue.deleteMany({});
    res.json({ message: 'Queue cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updated = await Queue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Queue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;