import { useState } from 'react'
import styles from './Login.module.css'
import App from './App'
// import Admin from './components/pages/Admin'
import olho_fechado from './img/olho_fechado.png'
import olho_aberto from './img/olho_aberto.png'

function Login(){

    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [acessoPermitido, setAcessoPermitido] = useState(false)
    const [showSenha, setShowSenha] = useState(false)

    function tentarAcesso(){
        if(senha === 'Botafogo' && nome === 'Diogo'){
            alert("Acesso permitido")
            setAcessoPermitido(true)
        } else {
            alert('Acesso negado')
        }
    }

    if(acessoPermitido){
        return <App />
    }

    return(
        <div className={styles.login_container}>
            <h1>Pagina de Login</h1>

            <form className={styles.login_form} onSubmit={tentarAcesso}>
                <input type="text"
                    placeholder='Digite o nome de usuario'
                    name='nome'
                    id='nome'
                    onChange={(e) => setNome(e.target.value)}
                    value={nome} />
                <div className={styles.campo_senha}>
                    <input
                        type={showSenha ? 'text' : 'password'}
                        placeholder='Digite a senha'
                        name='senha'
                        id='senha'
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                    />
                    <button
                        type="button"
                        onClick={() => setShowSenha((prev) => !prev)}
                    >
                        {showSenha ? <img src={olho_aberto} alt="olho aberto"></img> : <img src={olho_fechado} alt="olho fechado"></img>}
                    </button>
                </div>
                <button type='submit'>Acessar</button>
            </form>
        </div>
    )
}


export default Login