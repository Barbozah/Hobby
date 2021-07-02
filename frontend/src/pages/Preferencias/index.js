import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Row } from 'react-bootstrap';
import {FiSave} from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import './preferences.css';


import Sidenav from '../../components/Sidebar/Sidenav';
import axios from '../../service/api';
/*
o que falta: 
>useEffect que vai trazer do backend as preferências do usuário(criar rota de trazer preferencias no backend)
>criar rota para salvar as preferências, exibindo um toast se der sucesso.
*/

export default function Preferencias() {

    const user_id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    const [adult, setAdult] = useState(false)
    const [violence, setViolence] = useState(false)
    const [nude, setNude] = useState(false)
    const [explicit, setExplicit] = useState(false)

    useEffect(() => {
        async function fetchData(id, t) {
            axios.get(`user/${id}`, {headers: { Authorization: 'Bearer ' + t}})
                .then(res => {
                    const settings = {
                        adulto: false, violento: false, 
                        nudez: false, explicito: false
                    }
                    Object.assign(settings, res.data.settings);
                    setAdult(settings.adulto)
                    setViolence(settings.violento)
                    setNude(settings.nudez)
                    setExplicit(settings.explicito)
                })
        }
        fetchData(user_id, token)
    }, [user_id, token])


    function handleSubmit(event){//essa função deve salvar as preferências setadas pelo usuário
        //console.log(event);
        event.preventDefault();
        const adulto = document.getElementById('c_adulto').checked;
        const violento = document.getElementById('c_violento').checked;
        const nudez = document.getElementById('c_nudez').checked;
        const explicito = document.getElementById('c_explicito').checked;

        const data = {
            _id: user_id,
            settings: {
                adulto,
                violento,
                nudez,
                explicito
            }
        };

        axios.post('user/alterSettings', data, {
                headers: { Authorization: 'Bearer ' + token}
            }).then(() => toast.success('Alterações salvas'))
            .catch(err => toast.error(err.response.data.message))
    }

    return (<>
        <Sidenav />
        <ToastContainer />
        <Container>
            <Row className="mb-2">
                <h1 className="text-light text-center">Preferências</h1>
            </Row>
            <Row>
                <Card className="rounded-0 bg-secondary">
                    <Card.Body>
                        <Card.Title className="text-light preferences-title mb-4">Conteúdo</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="c_adulto">
                                <Form.Check type="checkbox" label="Conteúdo adulto não específico" checked={adult} onChange={e=>setAdult(e.target.checked)}/>
                                <span className="legenda">Assinale esta caixa caso aceite ver jogos voltados exclusivamente ao público adulto.</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="c_violento">
                                <Form.Check type="checkbox" label="Violência frequente ou detalhada" checked={violence} onChange={e=>setViolence(e.target.checked)}/>
                                <span className="legenda">Assinale esta caixa caso aceite ver jogos que contenham violência frequente ou detalhada.</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="c_nudez">
                                <Form.Check type="checkbox" label="Nudez ou conteúdo sexual" checked={nude} onChange={e=>setNude(e.target.checked)}/>
                                <span className="legenda">Assinale esta caixa caso aceite ver jogos que contenham nudez ou conteúdo sexual.</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="c_explicito">
                                <Form.Check type="checkbox" label="Conteúdo sexual explícito para adultos " checked={explicit} onChange={e=>setExplicit(e.target.checked)}/>
                                <span className="legenda">Assinale esta caixa caso aceite ver jogos que contenham conteúdo sexual extremo ou explícito voltado exclusivamente ao público adulto.</span>
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Salvar <FiSave/>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>            
        </Container>
    </>
    );
}
