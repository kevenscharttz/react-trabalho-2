const express = require('express');
const router = express.Router();
const { Professor } = require('../db/mongo');


router.get('/', async (req, res) => {
  try {
    const docs = await Professor.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/get-por-id/:id', async (req, res) => {
  try {
    const doc = await Professor.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ erro: "Professor não encontrado!" });
    }
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-por-nome/:name', async (req, res) => {
  try {
    const professores = await Professor.find({ name: req.params.name });
    if (professores.length === 0) {
      return res.status(404).json({ erro: "Nenhum professor com esse nome foi encontrado!" });
    }
    res.json(professores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, specialty, email, phone_number, school, status } = req.body;
  if (!name || !specialty || !email || !phone_number || !school) {
    return res.status(400).json({ error: "Campos obrigatórios faltando!" });
  }
  try {
    const novoProfessor = await Professor.create({ name, specialty, email, phone_number, school, status });
    res.status(201).json(novoProfessor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-por-id/:id', async (req, res) => {
  try {
    const updated = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ erro: "Professor não encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-por-id/:id', async (req, res) => {
  try {
    const deleted = await Professor.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ erro: "Professor não encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-por-nome/:name', async (req, res) => {
  try {
    const deleted = await Professor.findOneAndDelete({ name: req.params.name });
    if (!deleted) {
      return res.status(404).json({ erro: "Nenhum professor com esse nome foi encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;