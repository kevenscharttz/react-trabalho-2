import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Admin from './components/pages/Admin'
import Professores from './components/pages/Professores'
import Profissionais from './components/pages/Profissionais'
import Alunos from './components/pages/Alunos'
import Eventos from './components/pages/Eventos'
import Agendamentos from './components/pages/Agendamentos'
import Usuarios from './components/pages/Usuarios'

// import styles from './Admin.module.css'
// import gee_img from '../../img/gee_img.png'

import styles from './components/pages/Admin.module.css'
import gee_img from './img/gee_img.png'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import { useEffect, useState } from 'react'
// ...existing imports...

function App() {
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    const jaViu = localStorage.getItem('jaViuSection');
    if (!jaViu) {
      setShowSection(true);
      localStorage.setItem('jaViuSection', 'true');
    }
  }, []);

  return (
    <Router>
      <ul>
        <Navbar />
        {showSection && (
          <section className={styles.home_container}>
            <h1>Bem-vindo a pagina do <span>Administrador</span></h1>
            <p>Gerencie pessoas, agendamentos e muito mais.</p>
            <img src={gee_img} alt="Admin" />
          </section>
        )}
      </ul>
      <Container customClass="min-height">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/professores" element={<Professores />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/profissionais" element={<Profissionais />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
