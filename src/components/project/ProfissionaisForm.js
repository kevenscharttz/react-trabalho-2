

import {useState, useEffect} from 'react'

import styles_form from './ProfissionaisForm.module.css'
import Input from  '../form/Input'
import styles_prof from '../pages/Profissionais.module.css'

function ProfissionaisForm(){

    const [idPesquisaGet, setIdPesquisaGet] = useState('')
    const [idPesquisaDel, setIdPesquisaDel] = useState('')
    const [nomePesquisaDel, setNomePesquisaDel] = useState('')
    const [nomePesquisaGet, setNomePesquisaGet] = useState('')
    const [idProfissonalPost, setIdPesquisaPost] = useState('')
    const [idProfissonalPut, setIdPesquisaPut] = useState('')
    const [novoProfissional, setNovoProfissional] = useState('')
    const [textoTextArea, setTextArea] = useState('')

    const url_api_profissonais = "http://localhost:8080/api/professionals"

    function handleSubmitGetGlobal(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/professionals/")
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar estudantes: " + err);
            });

        alert("Todos os profissionais foram pesquisados")
    }

    function handleSubmitIdGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/professionals/get-por-id/" + idPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data); // Aqui você pode atualizar o estado com os profissionais
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar profissionais: " + err);
            });

        alert("Id pesquisado = " + idPesquisaGet)
    }

    function handleSubmitNameGet(e){
        e.preventDefault();


        fetch("http://localhost:8080/api/professionals/get-por-nome/" + nomePesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data); // Aqui você pode atualizar o estado com os profissionais
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar profissionais: " + err);
            });

        alert("Nome pesquisado = " + nomePesquisaGet)
    }

    function handleSubmitPost(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const profissional = JSON.parse(textoTextArea);

            fetch(url_api_profissonais, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profissional)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Profissional cadastrado com sucesso!");
                // Limpa o textarea ou faz outras ações necessárias
                setNovoProfissional('');
            })
            .catch(err => {
                alert("Erro ao cadastrar profissional: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }
    }

    function handleSubmitDeleteId(e){
        e.preventDefault();


        fetch("http://localhost:8080/api/professionals/delete-por-id/" + idPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data); // Aqui você pode atualizar o estado com os profissionais
            })
            .catch(err => {
                alert("Erro ao buscar profissionais: " + err);
            });

        alert("Deletando profissional de id = " + idPesquisaDel)
    }

    function handleSubmitDeleteNome(e){
        e.preventDefault();


        fetch("http://localhost:8080/api/professionals/delete-por-nome/" + nomePesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                alert("Erro ao buscar profissionais: " + err);
            });

        alert("Deletando profissional de nome = " + nomePesquisaDel)
    }

    function handleSubmitPut(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const profissional = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/professionals/update-por-id/" + idProfissonalPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profissional)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Profissional cadastrado com sucesso!");
                // Limpa o textarea ou faz outras ações necessárias
                setNovoProfissional('');
            })
            .catch(err => {
                alert("Erro ao editar profissional: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }


        alert("Atualizando profissional de id = " + idProfissonalPost)
    }

    return (
        <div className={styles_prof.profissionais_container}>
            <div style={{width: 800}}>
                <h1>Profissionais de Saúde</h1>

                <form className={styles_form.form} id="formularioProfissionaisGetGlobal" onSubmit={handleSubmitGetGlobal}>
                    <Input type="sem_tipo" text_btn="BUSCAR TODOS OS PROFISSIONAIS" name="Name"/>
                </form>
                <form className={styles_form.form} id="formularioProfissionaisIdGet" onSubmit={handleSubmitIdGet}>
                    <Input value={idPesquisaGet} handleOnChange={(e) => setIdPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR ID" name="Name" placeholder="Insira o ID do profissional a ser pesquisado" />
                </form>
                <form className={styles_form.form} id="formularioProfissionaisNameGet" onSubmit={handleSubmitNameGet}>
                    <Input value={nomePesquisaGet} handleOnChange={(e) => setNomePesquisaGet(e.target.value)}type="text" text_btn="PESQUISAR POR NOME" name="Name" placeholder="Insira o NOME do profissional a ser pesquisado"/>
                </form>
                <form className={styles_form.form} id="formularioProfissionaisInserir" onSubmit={handleSubmitPost}>
                    <Input type="sem_tipo" text_btn="INSERIR" name="Name"/>
                </form>
                <form className={styles_form.form} id="formularioProfissionaisDeletarId" onSubmit={handleSubmitDeleteId}>
                    <Input value={idPesquisaDel} handleOnChange={(e) => setIdPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR ID" name="Name" placeholder="Insira o ID do profissional deletado"/>
                </form>
                <form className={styles_form.form} id="formularioProfissionaisDeletarNome" onSubmit={handleSubmitDeleteNome}>
                    <Input value={nomePesquisaDel} handleOnChange={(e) => setNomePesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR NOME" name="Name" placeholder="Insira o NOME do profissional deletado"/>
                </form>
                <form className={styles_form.form} id="formularioProfissionaisAtualizar" onSubmit={handleSubmitPut}>
                    <Input value={idProfissonalPut} handleOnChange={(e) => setIdPesquisaPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR ID" name="Name" placeholder="Insira o ID do profissional a ser atualizado"/>
                </form>
            </div>
            <textarea
                placeholder={`{\n   'name': 'Diogo Zaccaron'\n    'specialty': 'Pediatra'\n   'contact': 'diogozacca@unesc.net'\n    'phone_number': '48 3244-3212'\n    'status': 'on'\n}`}
                rows="5"
                cols="100"
                value={textoTextArea}
                onChange={e => setTextArea(e.target.value)}
            />
        </div>
        
    )
}

export default ProfissionaisForm