const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuariosRoutes');
const professionalsRoutes = require('./professionalsRoutes');
const eventsRoutes = require('./eventsRoutes');
const studentsRoutes = require('./studentsRoutes');
const agendamentosRoutes = require('./agendamentosRoutes');
const teachersRoutes = require('./teachersRoutes');

router.use(express.json());
router.use('/usuarios', usuariosRoutes);
router.use('/professionals', professionalsRoutes);
router.use('/eventos', eventsRoutes);
router.use('/students', studentsRoutes);
router.use('/agendamentos', agendamentosRoutes);
router.use('/teachers', teachersRoutes);

module.exports = router;