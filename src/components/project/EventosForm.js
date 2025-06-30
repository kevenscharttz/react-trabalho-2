import {useState, useEffect} from 'react'

import styles_form from './Style.css'
import Input from  '../form/Input'
import styles_users from '../pages/Eventos.module.css'

function EventosForm(){

    const [PesquisaGet, setPesquisaGet] = useState('')
    const [IdPesquisaGet, setIdPesquisaGet] = useState('')
    const [IdPesquisaDel, setIdPesquisaDel] = useState('')
    const [DescricaoPesquisaGet, setDescricaoPesquisaGet] = useState('')
    const [DescricaoPesquisaDel, setDescricaoPesquisaDel] = useState('')
    const [DataPesquisaGet, setDataPesquisaGet] = useState('')
    const [IdEventoPut, setIdEventosPut] = useState('')
    const [DescricaoEventoPut, setDescricaoPut] = useState('')
    const [textoTextArea, setTextArea] = useState('')

    const url_api_eventos = "http://localhost:8080/api/eventos"

  
    function handleSubmitIdGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/eventos/" + PesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar eventos: " + err);
            });

        alert("Id pesquisado = " + PesquisaGet)
    }

    function handleSubmitNameGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/eventos/eventosId/" + IdPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar usuário: " + err);
            });

        alert("Nome pesquisado = " + IdPesquisaGet)
    }

    function handleSubmitUserGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/eventos/buscarDescricao/" + DescricaoPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar eventos: " + err);
            });

        alert("Eventos pesquisado = " + DescricaoPesquisaGet)
    }

    function handleSubmitUserGet(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/eventos/buscarPorData/" + DataPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar eventos: " + err);
            });

        alert("Eventos pesquisado = " + DataPesquisaGet)
    }

    function handleSubmitPost(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const eventos = JSON.parse(textoTextArea);


            fetch(url_api_eventos, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventos)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Evento cadastrado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao cadastrar evento: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }
    }

    function handleSubmitDeleteId(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/eventos/deletarId/" + IdPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                alert("Evento deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar evento: " + err);
            });

        alert("Deletando evento de id = " + IdPesquisaDel)
    }

    function handleSubmitDeleteNome(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/eventos/deletarDescricao/" + DescricaoPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                alert("Evento deletado com sucesso!");
            })
            .catch(err => {
                alert("Erro ao deletar evento: " + err);
            });

        alert("Deletando evento de descrição = " + DescricaoPesquisaDel)
    }

    function handleSubmitPutId(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const usuario = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/eventos/atualizarId/" + IdEventoPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventos)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Evento atualizado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao atualizar evento: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }

        alert("Atualizando evento de id = " + IdEventoPut)
    }

    function handleSubmitPutNome(e){
        e.preventDefault();

        try {
            const eventos = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/eventos/atualizarDescricao/" + DescricaoEventoPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventos)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Eventos atualizado com sucesso!");
                setTextArea('');
            })
            .catch(err => {
                alert("Erro ao atualizar eventos: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }

        alert("Atualizando eveto de descrição = " + DescricaoEventoPut)
    }

    return (
        <div className={styles_users.usuarios_container}>
            <div style={{width: 800}}>
                <h1>Eventos do Sistema</h1>
            
                {/* Pesquisas */}
                <form className={styles_form.form} id="formularioEventosIdGet" onSubmit={handleSubmitIdGet}>
                    <Input value={PesquisaGet} handleOnChange={(e) => setPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR ID" name="id" placeholder="Insira o ID do evento a ser pesquisado" />
                </form>
                <form className={styles_form.form} id="formularioEventosDescricaoGet" onSubmit={handleSubmitUserGet}>
                    <Input value={DescricaoPesquisaGet} handleOnChange={(e) => setDescricaoPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR DESCRIÇÃO" name="descricao" placeholder="Insira a DESCRIÇÃO do evento a ser pesquisado"/>
                </form>

                {/* Inserir */}
                <form className={styles_form.form} id="formularioEventosInserir" onSubmit={handleSubmitPost}>
                    <Input type="sem_tipo" text_btn="INSERIR EVENTO" name="evento"/>
                </form>

                {/* Deletar */}
                <form className={styles_form.form} id="formularioEventosDeletarId" onSubmit={handleSubmitDeleteId}>
                    <Input value={IdPesquisaDel} handleOnChange={(e) => setIdPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR ID" name="id" placeholder="Insira o ID do evento a ser deletado"/>
                </form>
                <form className={styles_form.form} id="formularioEventosDeletarDescricao" onSubmit={handleSubmitDeleteNome}>
                    <Input value={DescricaoPesquisaDel} handleOnChange={(e) => setDescricaoPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR DESCRIÇÃO" name="descricao" placeholder="Insira a DESCRIÇÃO do evento a ser deletado"/>
                </form>

                {/* Atualizar */}
                <form className={styles_form.form} id="formularioEventosAtualizarId" onSubmit={handleSubmitPutId}>
                    <Input value={IdEventoPut} handleOnChange={(e) => setIdEventosPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR ID" name="id" placeholder="Insira o ID do evento a ser atualizado"/>
                </form>
                <form className={styles_form.form} id="formularioEventosAtualizarDescricao" onSubmit={handleSubmitPutNome}>
                    <Input value={DescricaoEventoPut} handleOnChange={(e) => setDescricaoPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR DESCRIÇÃO" name="descricao" placeholder="Insira a DESCRIÇÃO do evento a ser atualizado"/>
                </form>
            </div>
            <textarea
                placeholder={`{\n   "descricao": "Festa Junina",\n   "data": "2025-06-29",\n   "local": "Salão APAE",\n   "responsavel": "Maria"\n}`}
                rows="8"
                cols="100"
                value={textoTextArea}
                onChange={e => setTextArea(e.target.value)}
            />
        </div>
        
    )
}

export default EventosForm;