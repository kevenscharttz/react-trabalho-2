const mongoose = require('mongoose');

 mongoose.connect('mongodb://127.0.0.1:27017/a11');

mongoose.connection.on('connected', () => {
  console.log('MongoDB conectado');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

const agendamentoSchema = new mongoose.Schema({
    nomePaciente: String,
    cpf: String,
    nomeResponsavel: String,
    historicoMedico: String,
    telefoneContato: String,
    tipoConsulta: String,
    profissionalSaude: String,
    dataAgendamento: Date,
    horario: String
});

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

const eventsSchema = new mongoose.Schema({
    description: String,
    comments: String,
    date: String
});

const Evento = mongoose.model('Evento', eventsSchema);

const professionalsSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    contact: String,
    phone_number: String,
    status: String
});

const Profissional = mongoose.model('Profissional', professionalsSchema);

const studentsSchema = new mongoose.Schema({
    name: String,
    age: String,
    parents: String,
    phone_number: String,
    special_needs: String,
    status: String
});

const Estudante = mongoose.model('Estudante', studentsSchema);

const professorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    email: String,
    phone_number: String,
    school: String,
    status : Boolean
});

const Professor = mongoose.model('Professor', professorSchema);

const usuarioSchema = new mongoose.Schema({
    name: String,
    email: String,
    user: String,
    pwd: String,
    level: String,
    status: Boolean
});

const Usuarios = mongoose.model('Usuario', usuarioSchema);

module.exports = { Evento, Agendamento, Profissional, Estudante, Professor, Usuarios };