

import {useState, useEffect} from 'react'

import styles_form from './AlunoForm.module.css'
import Input from  '../form/Input'
import styles_student from '../pages/Aluno.module.css'
import Aluno from '../pages/Alunos'

function AlunoForm(){

    const [idPesquisaGet, setIdPesquisaGet] = useState('')
    const [idPesquisaDel, setIdPesquisaDel] = useState('')
    const [nomePesquisaDel, setNomePesquisaDel] = useState('')
    const [nomePesquisaGet, setNomePesquisaGet] = useState('')
    const [idStudentPost, setIdPesquisaPost] = useState('')
    const [idStudentPut, setIdPesquisaPut] = useState('')
    const [novoStudents, setNovoStudents] = useState('')
    const [textoTextArea, setTextArea] = useState('')

    const url_api_Students = "http://localhost:8080/api/students"

  
    function handleSubmitGetGlobal(e){
        e.preventDefault();

        fetch("http://localhost:8080/api/students/")
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

        fetch("http://localhost:8080/api/students/get-por-id/" + idPesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data); // Aqui você pode atualizar o estado com os estudantes
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar estudantes: " + err);
            });

        alert("Id pesquisado = " + idPesquisaGet)
    }

    function handleSubmitNameGet(e){
        e.preventDefault();


        fetch("http://localhost:8080/api/students/get-por-nome/" + nomePesquisaGet)
            .then(resp => resp.json())
            .then(data => {
                console.log(data); // Aqui você pode atualizar o estado com os estudantes
                setTextArea(JSON.stringify(data,null,2))
            })
            .catch(err => {
                alert("Erro ao buscar estudantes: " + err);
            });

        alert("Nome pesquisado = " + nomePesquisaGet)
    }

    function handleSubmitPost(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const student = JSON.parse(textoTextArea);

            fetch(url_api_Students, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Estudante cadastrado com sucesso!");
                // Limpa o textarea ou faz outras ações necessárias
                setNovoStudents('');
            })
            .catch(err => {
                alert("Erro ao cadastrar esrtudante: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }
    }

    function handleSubmitDeleteId(e){
        e.preventDefault();


        fetch("http://localhost:8080/api/students/delete-por-id/" + idPesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data); // Aqui você pode atualizar o estado com os estudentes
            })
            .catch(err => {
                alert("Erro ao buscar estudante: " + err);
            });

        alert("Deletando estudante de id = " + idPesquisaDel)
    }

    function handleSubmitDeleteNome(e){
        e.preventDefault();


        fetch("http://localhost:8080/api/students/delete-por-nome/" + nomePesquisaDel, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                alert("Erro ao buscar estudante: " + err);
            });

        alert("Deletando estudante por nome = " + nomePesquisaDel)
    }

    function handleSubmitPut(e){
        e.preventDefault();

        try {
            // Tenta converter o texto do textarea em objeto
            const student = JSON.parse(textoTextArea);

            fetch("http://localhost:8080/api/students/update-por-id/" + idStudentPut, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
            .then(resp => resp.json())
            .then(data => {
                alert("Estudante cadastrado com sucesso!");
                // Limpa o textarea ou faz outras ações necessárias
                setNovoStudents('');
            })
            .catch(err => {
                alert("Erro ao editar estudante: " + err);
            });
        } catch (err) {
            alert("JSON inválido! Corrija o formato dos dados.");
        }


        alert("Atualizando estudante por id = " + idStudentPost)
    }

    return (
        <div className={styles_student.students_container}>
            <div style={{width: 800}}>
                <h1>Estudantes</h1>

                <form className={styles_form.form} id="formularioStudantsGetGlobal" onSubmit={handleSubmitGetGlobal}>
                    <Input type="sem_tipo" text_btn="BUSCAR TODOS OS ESTUDANTES" name="Name"/>
                </form>
                <form className={styles_form.form} id="formularioStudantsIdGet" onSubmit={handleSubmitIdGet}>
                    <Input value={idPesquisaGet} handleOnChange={(e) => setIdPesquisaGet(e.target.value)} type="text" text_btn="PESQUISAR POR ID" name="Name" placeholder="Insira o ID do estudantes a ser pesquisado" />
                </form>
                <form className={styles_form.form} id="formularioStudantsNameGet" onSubmit={handleSubmitNameGet}>
                    <Input value={nomePesquisaGet} handleOnChange={(e) => setNomePesquisaGet(e.target.value)}type="text" text_btn="PESQUISAR POR NOME" name="Name" placeholder="Insira o NOME do estudantes a ser pesquisado"/>
                </form>
                <form className={styles_form.form} id="formularioStudantsDeletarId" onSubmit={handleSubmitDeleteId}>
                    <Input value={idPesquisaDel} handleOnChange={(e) => setIdPesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR ID" name="Name" placeholder="Insira o ID do estudantes deletado"/>
                </form>
                <form className={styles_form.form} id="formularioStudantsDeletarNome" onSubmit={handleSubmitDeleteNome}>
                    <Input value={nomePesquisaDel} handleOnChange={(e) => setNomePesquisaDel(e.target.value)} type="text" text_btn="DELETAR POR NOME" name="Name" placeholder="Insira o NOME do estudantes deletado"/>
                </form>
                <form className={styles_form.form} id="formularioStudantsAtualizar" onSubmit={handleSubmitPut}>
                    <Input value={idStudentPut} handleOnChange={(e) => setIdPesquisaPut(e.target.value)}  type="text" text_btn="ATUALIZAR POR ID" name="Name" placeholder="Insira o ID do estudantes a ser atualizado"/>
                </form>
                <form className={styles_form.form} id="formularioStudantsInserir" onSubmit={handleSubmitPost}>
                    <Input type="sem_tipo" text_btn="INSERIR" name="Name"/>
                </form>
            </div>
            <textarea
                placeholder={`{\n   "name": "Batutinha"\n    "age": "12"\n   "parents": "Bandit Heeler e Chilli Heeler"\n    "phone_number": "48 9654 3210"\n  "special_needs": "Problemas de visão"\n  "status": "on"\n}`}
                rows="5"
                cols="100"
                value={textoTextArea}
                onChange={e => setTextArea(e.target.value)}
            />
        </div>
        
    )
}

export default AlunoForm