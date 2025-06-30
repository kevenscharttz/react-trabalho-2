import {useState, useEffect} from 'react'

import styles_form from './UsuariosForm.module.css'
import Input from  '../form/Input'
import styles_users from '../pages/Usuarios.module.css'
<<<<<<< HEAD
=======

>>>>>>> e5ceed470864d269ed03f6278fe257db23e6bf61

function UsuariosForm(){

    const [idPesquisaGet, setIdPesquisaGet] = useState('')
    const [idPesquisaDel, setIdPesquisaDel] = useState('')
    const [nomePesquisaDel, setNomePesquisaDel] = useState('')
    const [nomePesquisaGet, setNomePesquisaGet] = useState('')
    const [userPesquisaGet, setUserPesquisaGet] = useState('')
    const [userPesquisaDel, setUserPesquisaDel] = useState('')
    const [idUsuarioPut, setIdUsuarioPut] = useState('')
    const [nomeUsuarioPut, setNomeUsuarioPut] = useState('')
    const [userUsuarioPut, setUserUsuarioPut] = useState('')
    const [textoTextArea, setTextArea] = useState('')

    const url_api_usuarios = "http://localhost:8080/api/usuarios"

    function handleSubmitGetGlobal(e){
        e.preventDefault();

        fetch(url_api_usuarios)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar estudantes: " + err);
            });

        alert("Todos os estudantes foram pesquisados")
    }

  
    function handleSubmitIdGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/usuarios/get-por-id/" + idPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar usuário: " + err);
            });

        alert("Id pesquisado = " + idPesquisaGet)
    }

    function handleSubmitNameGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/usuarios/get-por-nome/" + nomePesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar usuário: " + err);
            });

        alert("Nome pesquisado = " + nomePesquisaGet)
    }

    function handleSubmitUserGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/usuarios/get-por-user/" + userPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar usuário: " + err);
            });

        alert("Usuário pesquisado = " + userPesquisaGet)
    }

    function handleSubmitPost(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const usuario = JSON.parse(textoTextArea);


            fetch(url_api_usuarios, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Usuário cadastrado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao cadastrar usuário: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }
    }

    function handleSubmitDeleteId(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/usuarios/delete-por-id/" + idPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                alert("Usuário deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar usuário: " + err);
            });

        alert("Deletando usuário de id = " + idPesquisaDel)
    }

    function handleSubmitDeleteNome(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/usuarios/delete-por-nome/" + nomePesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                alert("Usuário deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar usuário: " + err);
            });

        alert("Deletando usuário de nome = " + nomePesquisaDel)
    }

    function handleSubmitDeleteUser(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/usuarios/delete-por-user/" + userPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                alert("Usuário deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar usuário: " + err);
            });

        alert("Deletando usuário = " + userPesquisaDel)
    }

    function handleSubmitPutId(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const usuario = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/usuarios/update-por-id/" + idUsuarioPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Usuário atualizado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao atualizar usuário: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }

        alert("Atualizando usuário de id = " + idUsuarioPut)
    }

    function handleSubmitPutNome(e){
        e.preventDefault();

        try {
            const usuario = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/usuarios/update-por-nome/" + nomeUsuarioPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Usuário atualizado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao atualizar usuário: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }

        alert("Atualizando usuário de nome = " + nomeUsuarioPut)
    }

    function handleSubmitPutUser(e){
        e.preventDefault();

        try {
            const usuario = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/usuarios/update-por-user/" + userUsuarioPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Usuário atualizado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao atualizar usuário: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }

        alert("Atualizando usuário = " + userUsuarioPut)
    }

    return (
        <div className={styles_users.usuarios_container}>
            <div style={{width: 800}}>
                <h1>Usuários do Sistema</h1>
            
                {/* Pesquisas */}
                <form className={styles_form.form} id="formularioUsuariosGetGlobal" onSubmit={handleSubmitGetGlobal}>
                    <Input type="sem_tipo" text_btn="BUSCAR TODOS OS USUARIOS" name="Name"/>
                </form>
                <form className={styles_form.form} id="formularioUsuariosIdGet" onSubmit={handleSubmitIdGet}>
                    <Input value={idPesquisaGet} handleOnChange={(e) => setIdPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR ID" name="Name" placeholder="Insira o ID do usuário a ser pesquisado" />
                </form>
                <form className={styles_form.form} id="formularioUsuariosNameGet" onSubmit={handleSubmitNameGet}>
                    <Input value={nomePesquisaGet} handleOnChange={(e) => setNomePesquisaGet(e.target.value)}type="text" text_btn="PESQUISAR POR NOME" name="Name" placeholder="Insira o NOME do usuário a ser pesquisado"/>
                </form>
                <form className={styles_form.form} id="formularioUsuariosUserGet" onSubmit={handleSubmitUserGet}>
                    <Input value={userPesquisaGet} handleOnChange={(e) => setUserPesquisaGet(e.target.value)}type="text" text_btn="PESQUISAR POR USUÁRIO" name="Name" placeholder="Insira o USUÁRIO a ser pesquisado"/>
                </form>

                {/* Inserir */}
                <form className={styles_form.form} id="formularioUsuariosInserir" onSubmit={handleSubmitPost}>
                    <Input type="sem_tipo" text_btn="INSERIR USUÁRIO" name="Name"/>
                </form>

                {/* Deletar */}
                <form className={styles_form.form} id="formularioUsuariosDeletarId" onSubmit={handleSubmitDeleteId}>
                    <Input value={idPesquisaDel} handleOnChange={(e) => setIdPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR ID" name="Name" placeholder="Insira o ID do usuário a ser deletado"/>
                </form>
                <form className={styles_form.form} id="formularioUsuariosDeletarNome" onSubmit={handleSubmitDeleteNome}>
                    <Input value={nomePesquisaDel} handleOnChange={(e) => setNomePesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR NOME" name="Name" placeholder="Insira o NOME do usuário a ser deletado"/>
                </form>
                <form className={styles_form.form} id="formularioUsuariosDeletarUser" onSubmit={handleSubmitDeleteUser}>
                    <Input value={userPesquisaDel} handleOnChange={(e) => setUserPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR USUÁRIO" name="Name" placeholder="Insira o USUÁRIO a ser deletado"/>
                </form>

                {/* Atualizar */}
                <form className={styles_form.form} id="formularioUsuariosAtualizarId" onSubmit={handleSubmitPutId}>
                    <Input value={idUsuarioPut} handleOnChange={(e) => setIdUsuarioPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR ID" name="Name" placeholder="Insira o ID do usuário a ser atualizado"/>
                </form>
                <form className={styles_form.form} id="formularioUsuariosAtualizarNome" onSubmit={handleSubmitPutNome}>
                    <Input value={nomeUsuarioPut} handleOnChange={(e) => setNomeUsuarioPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR NOME" name="Name" placeholder="Insira o NOME do usuário a ser atualizado"/>
                </form>
                <form className={styles_form.form} id="formularioUsuariosAtualizarUser" onSubmit={handleSubmitPutUser}>
                    <Input value={userUsuarioPut} handleOnChange={(e) => setUserUsuarioPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR USUÁRIO" name="Name" placeholder="Insira o USUÁRIO a ser atualizado"/>
                </form>
            </div>
            <textarea
                placeholder={`{\n   "name": "João Silva",\n   "email": "joao@email.com",\n   "user": "joaosilva",\n   "pwd": "senha123",\n   "level": "admin",\n   "status": "ativo"\n}`}
                rows="8"
                cols="100"
                value={textoTextArea}
                onChange={e => setTextArea(e.target.value)}
            />
        </div>
        
    )
}

export default UsuariosForm;