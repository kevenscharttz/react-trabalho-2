const express = require('express');
const router = express.Router();
const { Profissional } = require('../db/mongo');

router.get('/', async (req, res) => {
  try {
    const docs = await Profissional.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-por-id/:id', async (req, res) => {
  try {
    const doc = await Profissional.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ erro: "Profissional não encontrado!" });
    }
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-por-nome/:name', async (req, res) => {
  try {
    const profissionais = await Profissional.find({ name: req.params.name });
    if (profissionais.length === 0) {
      return res.status(404).json({ erro: "Nenhum profissional com esse nome foi encontrado!" });
    }
    res.json(profissionais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, specialty, contact, phone_number, status } = req.body;
  if (!name || !specialty || !contact || !phone_number) {
    return res.status(400).json({ error: "Campos obrigatórios faltando!" });
  }
  try {
    const novoProfissional = await Profissional.create({ name, specialty, contact, phone_number, status });
    res.status(201).json(novoProfissional);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-por-id/:id', async (req, res) => {
  try {
    const updated = await Profissional.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ erro: "Profissional não encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-por-id/:id', async (req, res) => {
  try {
    const deleted = await Profissional.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ erro: "Profissional não encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar profissional por nome (primeiro encontrado)
router.delete('/delete-por-nome/:name', async (req, res) => {
  try {
    const deleted = await Profissional.findOneAndDelete({ name: req.params.name });
    if (!deleted) {
      return res.status(404).json({ erro: "Nenhum profissional com esse nome foi encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;