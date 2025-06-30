const express = require('express');
const router = express.Router();
const { Agendamento } = require('../db/mongo');

// Buscar todos os agendamentos
router.get('/', async (req, res) => {
  try {
    const docs = await Agendamento.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar agendamento por ID
router.get('/get-por-id/:id', async (req, res) => {
  try {
    const doc = await Agendamento.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ erro: "Agendamento não encontrado!" });
    }
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar agendamentos por tipo de consulta
router.get('/tipo/:tipoConsulta', async (req, res) => {
  try {
    const resultados = await Agendamento.find({ tipoConsulta: { $regex: new RegExp('^' + req.params.tipoConsulta + '$', 'i') } });
    if (resultados.length === 0) {
      return res.status(404).json({
        error: "Nenhum agendamento encontrado.",
        details: `Tipo de consulta '${req.params.tipoConsulta}' não encontrado`
      });
    }
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar agendamentos por nomePaciente (descrição)
router.get('/buscarDescricao/:nomePaciente', async (req, res) => {
  try {
    const docs = await Agendamento.find({ nomePaciente: { $regex: req.params.nomePaciente, $options: 'i' } });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar agendamentos por dataAgendamento (YYYY-MM-DD)
router.get('/buscarPorData/:dataAgendamento', async (req, res) => {
  try {
    const data = new Date(req.params.dataAgendamento);
    const nextDay = new Date(data);
    nextDay.setDate(data.getDate() + 1);
    const docs = await Agendamento.find({
      dataAgendamento: { $gte: data, $lt: nextDay }
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar novo agendamento
router.post('/', async (req, res) => {
  const { nomePaciente, cpf, nomeResponsavel, historicoMedico, telefoneContato, tipoConsulta, profissionalSaude, dataAgendamento, horario } = req.body;
  if (!nomePaciente || !cpf || !tipoConsulta || !profissionalSaude || !dataAgendamento || !horario) {
    return res.status(400).json({ error: "Campos obrigatórios faltando!" });
  }
  try {
    const novoAgendamento = await Agendamento.create({ nomePaciente, cpf, nomeResponsavel, historicoMedico, telefoneContato, tipoConsulta, profissionalSaude, dataAgendamento, horario });
    res.status(201).json(novoAgendamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar agendamento por ID
router.put('/update-por-id/:id', async (req, res) => {
  try {
    const updated = await Agendamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ erro: "Agendamento não encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar agendamento por nomePaciente (primeiro encontrado)
router.put('/update-por-nome/:nomePaciente', async (req, res) => {
  try {
    const updated = await Agendamento.findOneAndUpdate({ nomePaciente: req.params.nomePaciente }, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ erro: "Nenhum agendamento com esse paciente foi encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar agendamento por ID
router.delete('/delete-por-id/:id', async (req, res) => {
  try {
    const deleted = await Agendamento.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ erro: "Agendamento não encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar agendamento por nomePaciente (primeiro encontrado)
router.delete('/delete-por-nome/:nomePaciente', async (req, res) => {
  try {
    const deleted = await Agendamento.findOneAndDelete({ nomePaciente: req.params.nomePaciente });
    if (!deleted) {
      return res.status(404).json({ erro: "Nenhum agendamento com esse paciente foi encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;