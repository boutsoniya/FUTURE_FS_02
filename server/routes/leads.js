const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Lead = require('../models/Lead');

router.post('/', async (req, res) => {
  const { name, email, source, notes } = req.body;
  try {
    const newLead = new Lead({ name, email, source, notes });
    const lead = await newLead.save();
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { status, notes } = req.body;
  const leadFields = {};
  if (status) leadFields.status = status;
  if (notes !== undefined) leadFields.notes = notes;

  try {
    let lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });
    lead = await Lead.findByIdAndUpdate(req.params.id, { $set: leadFields }, { new: true });
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Lead removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
