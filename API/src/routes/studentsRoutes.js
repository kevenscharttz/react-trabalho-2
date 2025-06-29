const express = require('express');
const router = express.Router();
const { Estudante } = require('../db/mongo');

router.get('/', async (req, res) => {
  try {
    const docs = await Estudante.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/get-por-id/:id', async (req, res) => {
  try {
    const doc = await Estudante.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ erro: "Estudante não encontrado!" });
    }
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-por-nome/:name', async (req, res) => {
  try {
    const estudantes = await Estudante.find({ name: req.params.name });
    if (estudantes.length === 0) {
      return res.status(404).json({ erro: "Nenhum estudante com esse nome foi encontrado!" });
    }
    res.json(estudantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, age, parents, phone_number, special_needs, status } = req.body;
  if (!name || !age || !parents || !phone_number) {
    return res.status(400).json({ error: "Campos obrigatórios faltando!" });
  }
  try {
    const novoEstudante = await Estudante.create({ name, age, parents, phone_number, special_needs, status });
    res.status(201).json(novoEstudante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-por-id/:id', async (req, res) => {
  try {
    const updated = await Estudante.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ erro: "Estudante não encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-por-id/:id', async (req, res) => {
  try {
    const deleted = await Estudante.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ erro: "Estudante não encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar estudante por nome (primeiro encontrado)
router.delete('/delete-por-nome/:name', async (req, res) => {
  try {
    const deleted = await Estudante.findOneAndDelete({ name: req.params.name });
    if (!deleted) {
      return res.status(404).json({ erro: "Nenhum estudante com esse nome foi encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;