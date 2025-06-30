const express = require('express');
const router = express.Router();
const moment = require('moment');
const { Evento } = require('../db/mongo');

router.get('/', async (req, res) => {
  try {
    const docs = await Evento.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/eventosId/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Evento.findById(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/buscarDescricao/:descricao', async (req, res) => {
  const descricao = req.params.descricao;
  try {
    const docs = await Evento.find({ description: descricao });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/buscarPorData/:data', async (req, res) => {
  const data = req.params.data;
  try {
    const docs = await Evento.find({ date: data });
    res.status(200).json(docs);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { description, comments, date } = req.body;

  if (!description || !comments || !date) {
    return res.status(400).json({
      erro: "Os campos 'description', 'comments' e 'date' são obrigatórios!"
    });
  }

  if (!moment(date, ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD"], true).isValid()) {
    return res.status(400).json({
      erro: "O campo 'date' deve estar no formato 'YYYY-MM-DD HH:mm:ss' ou 'YYYY-MM-DD'!"
    });
  }

  try {
    const eventoExistente = await Evento.findOne({ description: description, date: date });
    if (eventoExistente) {
      return res.status(409).json({
        erro: "Já existe um evento com essa descrição e data!"
      });
    }

    const newEvento = await Evento.create({ description, comments, date });
    console.log("Novo evento criado:", newEvento);
    res.status(201).json(newEvento);
  }
  catch (error) {
    console.error("Erro ao criar evento:", error.message);
    return res.status(500).json({
      erro: "Erro interno do servidor ao criar o evento."
    });
  }
});

router.put('/atualizarId/:id', async (req, res) => {
  const id = req.params.id;
  const { description, comments, date } = req.body;
  try {
    const eventoExistente = await Evento.findOne({ description: description, date: date });
    if (eventoExistente) {
      return res.status(409).json({
        erro: "Já existe um evento com essa descrição e data!"
      });
    }
    const updatedEvento = await Evento.findByIdAndUpdate(
      id,
      { description, comments, date },
      { new: true }
    );
    res.json(updatedEvento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/atualizarDescricao/:descricao', async (req, res) => {
  const descricao = req.params.descricao;
  const { description, comments, date } = req.body;
  try {
    const eventoExistente = await Evento.findOne({ description: description, date: date });
    if (eventoExistente) {
      return res.status(409).json({
        erro: "Já existe um evento com essa descrição e data!"
      });
    }
    const updatedEvento = await Evento.findOneAndUpdate(
      { description: descricao },
      { description, comments, date },
      { new: true }
    );
    res.json(updatedEvento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/deletarId/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEvento = await Evento.findByIdAndDelete(id);
    res.json(deletedEvento);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/deletarDescricao/:descricao', async (req, res) => {
  const descricao = req.params.descricao;
  try {
    const deletedEvento = await Evento.findOneAndDelete({ description: descricao });
    res.json(deletedEvento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;