import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import Sidenav from '../../components/Sidebar/Sidenav';


export default function Biblioteca() {
    const history = useHistory();


    const [jogos, setJogos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");



    useEffect(() => {
        async function fetchData(url, setter) {
            const token = localStorage.getItem('token');
            const res = await api.get(url, {
                headers: { Authorization: 'Bearer ' + token }
            }).catch(err => toast.error(err.response.data.message));

            var library = res.data.gameList;
            var jogos_retornados = []
            if (library.length > 0) {

                for (let index = 0; index < library.length; index++) {
                    let id_jogo = library[index];
                    var jogo = await api.get(`game/${id_jogo}`, {
                        headers: { Authorization: 'Bearer ' + token }
                    }).catch(err => toast.error(err.response.data.message));
                    jogos_retornados.push(jogo.data);
                } 
                setter(jogos_retornados);
                
            }              
        }
        let id = localStorage.getItem('id');
        fetchData(`user/${id}`, setJogos)
    }, [])


    function verJogo(id) {
        history.push(`/game/${id}`);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    
    function handleChange(value){//sempre que o usuário mudar o valor, alterar o estado da pesquisa para fazer a filtragem
        setPesquisa(value);
    }
    
    return (<>
        <Sidenav />
        <Container>
            <Row>
                <h1 className="text-light text-center">Biblioteca</h1>
            </Row>
            <Row>
                <Col>
                    <h3 className="text-light">Classificar por: Recente</h3>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Form className="mb-5" onSubmit={handleSubmit}>

                        <Form.Group controlId="Pesquisar" className="mt-2" >
                            <Form.Control
                                type="text"
                                placeholder="Pesquisar"
                                className="rounded-0 input-cadastro text-light border-secondary"
                                onChange={event => handleChange(event.target.value)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe uma senha contendo de 6 a 8 caracteres.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                {pesquisa === "" ? jogos.map((j, index) => (
                    <Col xs={3} className="my-2" onClick={() => verJogo(j._id)} key={index}>
                        <Image src={j.mainImage} className="w-100 efeito" />
                    </Col>
                )) : jogos.filter(f => {
                    return f.title.toUpperCase().includes(pesquisa.toUpperCase());//deixa tudo uppercase para ignorar o case sensitive
                }).map((f, index) => (
                    <Col xs={3} className="my-2" onClick={() => verJogo(f._id)} key={index}>
                        <Image src={f.mainImage} className="w-100 efeito" />
                    </Col>
                ))}
            </Row>
            <ToastContainer />
        </Container>
    </>
    );
}
