import { useState } from 'react'

import styles_form from './AgendamentosForm.module.css'
import Input from  '../form/Input'
import styles_agendamentos from '../pages/Agendamentos.css'
function AgendamentosForm(){

    const [idPesquisaGet, setIdPesquisaGet] = useState('')
    const [nomePesquisaGet, setNomePesquisaGet] = useState('')
    const [dataPesquisaGet, setDataPesquisaGet] = useState('')
    const [idPesquisaDel, setIdPesquisaDel] = useState('')
    const [nomePesquisaDel, setNomePesquisaDel] = useState('')
    const [idAgendamentoPut, setIdAgendamentoPut] = useState('')
    const [nomeAgendamentoPut, setNomeAgendamentoPut] = useState('')
    const [textoTextArea, setTextArea] = useState('')

    const url_api_agendamentos = "http://localhost:8080/api/agendamentos"

    // Buscar todos
    function handleSubmitGetGlobal(e) {
        e.preventDefault()
        fetch(url_api_agendamentos)
            .then(resp => resp.json())
            .then(data => setTextArea(JSON.stringify(data, null, 2)))
            .catch(err => alert("Erro ao buscar agendamentos: " + err))
    }

    // Buscar por ID
    function handleSubmitIdGet(e) {
        e.preventDefault()
        fetch(`${url_api_agendamentos}/get-por-id/${idPesquisaGet}`)
            .then(resp => resp.json())
            .then(data => setTextArea(JSON.stringify(data, null, 2)))
            .catch(err => alert("Erro ao buscar agendamento por ID: " + err))
    }

    // Buscar por nomePaciente
    function handleSubmitNomeGet(e) {
        e.preventDefault()
        fetch(`${url_api_agendamentos}/buscarDescricao/${nomePesquisaGet}`)
            .then(resp => resp.json())
            .then(data => setTextArea(JSON.stringify(data, null, 2)))
            .catch(err => alert("Erro ao buscar agendamento por nome: " + err))
    }

    // Buscar por data
    function handleSubmitDataGet(e) {
        e.preventDefault()
        fetch(`${url_api_agendamentos}/buscarPorData/${dataPesquisaGet}`)
            .then(resp => resp.json())
            .then(data => setTextArea(JSON.stringify(data, null, 2)))
            .catch(err => alert("Erro ao buscar agendamento por data: " + err))
    }

    // Inserir novo agendamento
    function handleSubmitPost(e) {
        e.preventDefault()
        try {
            const agendamento = JSON.parse(textoTextArea)
            fetch(url_api_agendamentos, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(agendamento)
            })
                .then(resp => resp.json())
                .then(() => {
                    alert("Agendamento cadastrado com sucesso!")
                    setTextArea('')
                })
                .catch(err => alert("Erro ao cadastrar agendamento: " + err))
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.")
        }
    }

    // Deletar por ID
    function handleSubmitDeleteId(e) {
        e.preventDefault()
        fetch(`${url_api_agendamentos}/delete-por-id/${idPesquisaDel}`, {
            method: "DELETE"
        })
            .then(resp => resp.json())
            .then(() => alert("Agendamento deletado com sucesso!"))
            .catch(err => alert("Erro ao deletar agendamento: " + err))
    }

    // Deletar por nomePaciente
    function handleSubmitDeleteNome(e) {
        e.preventDefault()
        fetch(`${url_api_agendamentos}/delete-por-nome/${nomePesquisaDel}`, {
            method: "DELETE"
        })
            .then(resp => resp.json())
            .then(() => alert("Agendamento deletado com sucesso!"))
            .catch(err => alert("Erro ao deletar agendamento: " + err))
    }

    // Atualizar por ID
    function handleSubmitPutId(e) {
        e.preventDefault()
        try {
            const agendamento = JSON.parse(textoTextArea)
            fetch(`${url_api_agendamentos}/update-por-id/${idAgendamentoPut}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(agendamento)
            })
                .then(resp => resp.json())
                .then(() => {
                    alert("Agendamento atualizado com sucesso!")
                    setTextArea('')
                })
                .catch(err => alert("Erro ao atualizar agendamento: " + err))
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.")
        }
    }

    // Atualizar por nomePaciente
    function handleSubmitPutNome(e) {
        e.preventDefault()
        try {
            const agendamento = JSON.parse(textoTextArea)
            fetch(`${url_api_agendamentos}/update-por-nome/${nomeAgendamentoPut}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(agendamento)
            })
                .then(resp => resp.json())
                .then(() => {
                    alert("Agendamento atualizado com sucesso!")
                    setTextArea('')
                })
                .catch(err => alert("Erro ao atualizar agendamento: " + err))
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.")
        }
    }

    return (
        <div className={styles_agendamentos.agendamentos_container}>
            <div style={{width: 800}}>
                <h1>Agendamentos do Sistema</h1>
            
                {/* Buscar todos */}
                <form className={styles_form.form} onSubmit={handleSubmitGetGlobal}>
                    <Input type="sem_tipo" text_btn="BUSCAR TODOS" name="buscarTodos"/>
                </form>
                {/* Buscar por ID */}
                <form className={styles_form.form} onSubmit={handleSubmitIdGet}>
                    <Input value={idPesquisaGet} handleOnChange={e => setIdPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR ID" name="id" placeholder="Insira o ID do agendamento"/>
                </form>
                {/* Buscar por nomePaciente */}
                <form className={styles_form.form} onSubmit={handleSubmitNomeGet}>
                    <Input value={nomePesquisaGet} handleOnChange={e => setNomePesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR NOME" name="nomePaciente" placeholder="Insira o NOME do paciente"/>
                </form>
                {/* Buscar por data */}
                <form className={styles_form.form} onSubmit={handleSubmitDataGet}>
                    <Input value={dataPesquisaGet} handleOnChange={e => setDataPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR DATA" name="dataAgendamento" placeholder="Insira a DATA (YYYY-MM-DD)"/>
                </form>

                {/* Inserir */}
                <form className={styles_form.form} onSubmit={handleSubmitPost}>
                    <Input type="sem_tipo" text_btn="INSERIR AGENDAMENTO" name="agendamento"/>
                </form>

                {/* Deletar por ID */}
                <form className={styles_form.form} onSubmit={handleSubmitDeleteId}>
                    <Input value={idPesquisaDel} handleOnChange={e => setIdPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR ID" name="idDel" placeholder="Insira o ID do agendamento a ser deletado"/>
                </form>
                {/* Deletar por nomePaciente */}
                <form className={styles_form.form} onSubmit={handleSubmitDeleteNome}>
                    <Input value={nomePesquisaDel} handleOnChange={e => setNomePesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR NOME" name="nomePacienteDel" placeholder="Insira o NOME do paciente a ser deletado"/>
                </form>

                {/* Atualizar por ID */}
                <form className={styles_form.form} onSubmit={handleSubmitPutId}>
                    <Input value={idAgendamentoPut} handleOnChange={e => setIdAgendamentoPut(e.target.value)} type="text" text_btn="ATUALIZAR POR ID" name="idPut" placeholder="Insira o ID do agendamento a ser atualizado"/>
                </form>
                {/* Atualizar por nomePaciente */}
                <form className={styles_form.form} onSubmit={handleSubmitPutNome}>
                    <Input value={nomeAgendamentoPut} handleOnChange={e => setNomeAgendamentoPut(e.target.value)} type="text" text_btn="ATUALIZAR POR NOME" name="nomePacientePut" placeholder="Insira o NOME do paciente a ser atualizado"/>
                </form>
            </div>
            <textarea
                placeholder={`{\n  "nomePaciente": "Janderson José",\n  "cpf": "123.456.789-00",\n  "nomeResponsavel": "Maria Aparecida José",\n  "historicoMedico": "Hipertensão controlada; alergia a dipirona.",\n  "telefoneContato": "(48) 99876-5432",\n  "tipoConsulta": "Clínica Geral",\n  "profissionalSaude": "Dra. Fernanda Martins",\n  "dataAgendamento": "2025-06-20T00:00:00.000Z",\n  "horario": "14:30"\n}`}
                rows="8"
                cols="100"
                value={textoTextArea}
                onChange={e => setTextArea(e.target.value)}
            />
        </div>
        
    )
}

export default AgendamentosForm