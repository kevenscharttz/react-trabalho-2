const express = require('express');
const router = express.Router();
const { Agendamento } = require('../db/mongo');

router.get('/', async (req, res) => {
  try {
    const docs = await Agendamento.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

router.get('/tipo/:tipoConsulta', (req, res) => {
  const agendamentosDB = loadAgendamentos();
  const resultados = agendamentosDB.filter(a =>
    a.tipoConsulta.toLowerCase() === req.params.tipoConsulta.toLowerCase()
  );

  if (resultados.length === 0) {
    return res.status(404).json({
      error: "Nenhum agendamento encontrado.",
      details: `Tipo de consulta '${req.params.tipoConsulta}' não encontrado`
    });
  }

  res.json(resultados);
});

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

// Deletar agendamento por nome do paciente (primeiro encontrado)
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