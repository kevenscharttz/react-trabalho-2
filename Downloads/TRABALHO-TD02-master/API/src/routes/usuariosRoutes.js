const express = require('express');
const router = express.Router();
const { Usuarios } = require('../db/mongo');

router.get('/', async (req, res) => {
  try {
    const docs = await Usuarios.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-por-id/:id', async (req, res) => {
  try {
    const doc = await Usuarios.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-por-nome/:name', async (req, res) => {
  try {
    const usuarios = await Usuarios.find({ name: req.params.name });
    if (usuarios.length === 0) {
      return res.status(404).json({ erro: "Nenhum usuário com esse nome foi encontrado!" });
    }
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get-por-user/:user', async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({ user: req.params.user });
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário com esse nome de usuário não encontrado!" });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email, user, pwd, level, status } = req.body;
  if (!name || !email || !user || !pwd || !level) {
    return res.status(400).json({ error: "Campos obrigatórios faltando!" });
  }
  try {
    const userExistente = await Usuarios.findOne({ user });
    if (userExistente) {
      return res.status(400).json({ error: "Já existe um usuário com esse nome de usuário!" });
    }
    const novoUsuario = await Usuarios.create({ name, email, user, pwd, level, status });
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-por-id/:id', async (req, res) => {
  try {
    if (req.body.user) {
      const userExistente = await Usuarios.findOne({ user: req.body.user, _id: { $ne: req.params.id } });
      if (userExistente) {
        return res.status(400).json({ error: "Já existe um usuário com esse nome de usuário!" });
      }
    }
    const updated = await Usuarios.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-por-nome/:name', async (req, res) => {
  try {
    if (req.body.user) {
      const userExistente = await Usuarios.findOne({ 
        user: req.body.user,
        name: { $ne: req.params.name }
      });
      if (userExistente) {
        return res.status(400).json({ error: "Já existe um usuário com esse nome de usuário!" });
      }
    }
    const updated = await Usuarios.findOneAndUpdate(
      { name: req.params.name }, 
      req.body, 
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ erro: "Nenhum usuário com esse nome foi encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/update-por-user/:user', async (req, res) => {
  try {
    if (req.body.user && req.body.user !== req.params.user) {
      const userExistente = await Usuarios.findOne({ user: req.body.user });
      if (userExistente) {
        return res.status(400).json({ error: "Já existe um usuário com esse nome de usuário!" });
      }
    }
    const updated = await Usuarios.findOneAndUpdate(
      { user: req.params.user }, 
      req.body, 
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ erro: "Usuário com esse nome de usuário não foi encontrado!" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-por-id/:id', async (req, res) => {
  try {
    const deleted = await Usuarios.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-por-nome/:name', async (req, res) => {
  try {
    const deleted = await Usuarios.findOneAndDelete({ name: req.params.name });
    if (!deleted) {
      return res.status(404).json({ erro: "Nenhum usuário com esse nome foi encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-por-user/:user', async (req, res) => {
  try {
    const deleted = await Usuarios.findOneAndDelete({ user: req.params.user });
    if (!deleted) {
      return res.status(404).json({ erro: "Usuário com esse nome de usuário não encontrado!" });
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;