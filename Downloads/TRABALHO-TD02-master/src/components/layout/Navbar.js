import { Link } from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'


function Navbar(){
    
    
    
    return (
        <nav class={styles.navbar}>
            <Container>
                <h1>GEE - Gestão de Ensino Especial</h1>
                <ul class={styles.list}>
                    <li className={styles.item}> 
                        <Link to="/admin">Admin</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/profissionais">Profissionais de Saúde</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/alunos">Alunos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/eventos">Eventos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/agendamentos">Agendamentos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/usuarios">Usuarios</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/professores">Professores</Link>
                    </li>
                </ul>

            </Container>
        </nav>
    )
}

export default Navbar