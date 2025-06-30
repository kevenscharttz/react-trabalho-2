import {useState, useEffect} from 'react'

import styles_form from './AgendamentosForm.module.css'
import Input from  '../form/Input'
import styles_agendamentos from '../pages/Agendamentos.css'
function AgendamentosForm(){

    const [PesquisaGet, setPesquisaGet] = useState('')
    const [IdPesquisaGet, setIdPesquisaGet] = useState('')
    const [IdPesquisaDel, setIdPesquisaDel] = useState('')
    const [DescricaoPesquisaGet, setDescricaoPesquisaGet] = useState('')
    const [DescricaoPesquisaDel, setDescricaoPesquisaDel] = useState('')
    const [DataPesquisaGet, setDataPesquisaGet] = useState('')
    const [IdAgendamentosPut, setIdAgendamentosPut] = useState('')
    const [DescricaoAgendamentosPut, setDescricaoPut] = useState('')
    const [textoTextArea, setTextArea] = useState('')

    const url_api_agendamentos = "http://localhost:8080/api/agendamentos"

  
    function handleSubmitIdGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/agendamentos/" + PesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar agendamentos: " + err);
            });

        alert("Id pesquisado = " + PesquisaGet)
    }

    function handleSubmitNameGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/agendamentos/agendamentosId/" + IdPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar agendamentos: " + err);
            });

        alert("Nome pesquisado = " + IdPesquisaGet)
    }

    function handleSubmitUserGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/agendamentos/buscarDescricao/" + DescricaoPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar agendamentos: " + err);
            });

        alert("Agendamentos pesquisado = " + DescricaoPesquisaGet)
    }

    function handleSubmitUserGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/agendamentos/buscarPorData/" + DataPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar agedamentos: " + err);
            });

        alert("Agendamentos pesquisado = " + DataPesquisaGet)
    }

    function handleSubmitPost(e){
        e.preventDefault();

        try {
            
            const agendamentos = JSON.parse(textoTextArea);


            fetch(url_api_agendamentos, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agendamentos)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Agendamento cadastrado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao cadastrar agendamento: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
            console.log(agendamentos)
        }
    }

    function handleSubmitDeleteId(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/agendamentos/deletarId/" + IdPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                alert("Agendamento deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar agendamento: " + err);
            });

        alert("Deletando agendamento de id = " + IdPesquisaDel)
    }

    function handleSubmitDeleteNome(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/agendamentos/deletarDescricao/" + DescricaoPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                alert("Agendamento deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar agendamento: " + err);
            });

        alert("Deletando agendamento de descrição = " + DescricaoPesquisaDel)
    }

    function handleSubmitPutId(e){
        e.preventDefault();

        try {
            
            const agendamentos = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/agendamentos/atualizarId/" + IdAgendamentosPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agendamentos)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Agendamento atualizado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao atualizar agendamento: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }

        alert("Atualizando agendamento de id = " + IdAgendamentosPut)
    }

    function handleSubmitPutNome(e){
        e.preventDefault();

        try {
            const agendamentos = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/agendamentos/atualizarDescricao/" + DescricaoAgendamentosPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agendamentos)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Agendamento atualizado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao atualizar agendamento: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }

        alert("Atualizando agendamento de descrição = " + DescricaoAgendamentosPut)
    }

    return (
        <div className={styles_agendamentos.agendamentos_container}>
            <div style={{width: 800}}>
                <h1>Agendamentos do Sistema</h1>
            
                {/* Pesquisas */}
                <form className={styles_form.form} id="formularioAgendamentosIdGet" onSubmit={handleSubmitIdGet}>
                    <Input value={PesquisaGet} handleOnChange={(e) => setPesquisaGet(e.target.value)} type="text" text_btn="PESQUISA GERAL" placeholder="Pesquisa geral" />
                </form>
                <form className={styles_form.form} id="formularioAgendamentosNomeGet" onSubmit={handleSubmitNameGet}>
                    <Input value={IdPesquisaGet} handleOnChange={(e) => setIdPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR ID" name="id" placeholder="Insira o ID do agendamento a ser pesquisado" />
                </form> 
                <form className={styles_form.form} id="formularioAgendamentosDescricaoGet" onSubmit={handleSubmitUserGet}>
                    <Input value={DescricaoPesquisaGet} handleOnChange={(e) => setDescricaoPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR DESCRIÇÃO" name="descricao" placeholder="Insira a DESCRIÇÃO do agendamento a ser pesquisado"/>
                </form>
                <form className={styles_form.form} id="formularioAgendamentosDataGet" onSubmit={handleSubmitUserGet}>
                    <Input value={DataPesquisaGet} handleOnChange={(e) => setDataPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR DATA" name="data" placeholder="Insira a DATA do agendamento a ser pesquisado"/>
                </form>

                {/* Inserir */}
                <form className={styles_form.form} id="formularioAgendamentosInserir" onSubmit={handleSubmitPost}>
                    <Input type="sem_tipo" text_btn="INSERIR AGENDAMENTO" name="agendamentos"/>
                </form>

                {/* Deletar */}
                <form className={styles_form.form} id="formularioAgendamentosDeletarId" onSubmit={handleSubmitDeleteId}>
                    <Input value={IdPesquisaDel} handleOnChange={(e) => setIdPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR ID" name="id" placeholder="Insira o ID do evento a ser deletado"/>
                </form>
                <form className={styles_form.form} id="formularioAgendamentosDeletarDescricao" onSubmit={handleSubmitDeleteNome}>
                    <Input value={DescricaoPesquisaDel} handleOnChange={(e) => setDescricaoPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR DESCRIÇÃO" name="descricao" placeholder="Insira a DESCRIÇÃO do evento a ser deletado"/>
                </form>

                {/* Atualizar */}
                <form className={styles_form.form} id="formularioAgendamentosAtualizarId" onSubmit={handleSubmitPutId}>
                    <Input value={IdAgendamentosPut} handleOnChange={(e) => setIdAgendamentosPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR ID" name="id" placeholder="Insira o ID do evento a ser atualizado"/>
                </form>
                <form className={styles_form.form} id="formularioAgendamentosAtualizarDescricao" onSubmit={handleSubmitPutNome}>
                    <Input value={DescricaoAgendamentosPut} handleOnChange={(e) => setDescricaoPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR DESCRIÇÃO" name="descricao" placeholder="Insira a DESCRIÇÃO do evento a ser atualizado"/>
                </form>
            </div>
            <textarea
                placeholder={`{\n"nomePaciente": "Janderson José"\n"cpf": "123.456.789-00"\n"nomeResponsave": "Maria Aparecida José"\n"historicoMedico": "Hipertensão controlada; alergia a dipirona."\n"telefoneContato": "(48) 99876-5432"\n"tipoConsulta": "Clínica Geral"\n"profissionalSaude": "Dra. Fernanda Martins"\n"dataAgendamento": 2025-06-20T00:00:00.000+00:00\n "horario": "14:30""\n}`}
                rows="8"
                cols="100"
                value={textoTextArea}
                onChange={e => setTextArea(e.target.value)}
            />
        </div>
        
    )
}

export default AgendamentosForm;