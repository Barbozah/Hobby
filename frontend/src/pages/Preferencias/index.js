import React from 'react';
import { Container, Card, Form, Button, Row } from 'react-bootstrap';
import {FiSave} from 'react-icons/fi';
import './preferences.css';


import Sidenav from '../../components/Sidebar/Sidenav';
/*
o que falta: 
>useEffect que vai trazer do backend as preferências do usuário(criar rota de trazer preferencias no backend)
>criar rota para salvar as preferências, exibindo um toast se der sucesso.
*/


export default function Preferencias() {


    function handleSubmit(event){//essa função deve salvar as preferências setadas pelo usuário
        //console.log(event);
        event.preventDefault();
        const c_adulto = document.getElementById('c_adulto').checked;
        const c_violento = document.getElementById('c_violento').checked;
        const c_nudez = document.getElementById('c_nudez').checked;
        const c_explicito = document.getElementById('c_explicito').checked;

        const data = {
            c_adulto,
            c_violento,
            c_nudez,
            c_explicito
        };

        console.log(data);//fazer post no backend
    }

    return (<>
        <Sidenav />
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
                                <Form.Check type="checkbox" label="Conteúdo adulto não específico"/>
                                <span className="legenda">Assinale esta caixa caso aceite ver jogos voltados exclusivamente ao público adulto.</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="c_violento">
                                <Form.Check type="checkbox" label="Violência frequente ou detalhada"/>
                                <span className="legenda">Assinale esta caixa caso aceite ver jogos que contenham violência frequente ou detalhada.</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="c_nudez">
                                <Form.Check type="checkbox" label="Nudez ou conteúdo sexual"/>
                                <span className="legenda">Assinale esta caixa caso aceite ver jogos que contenham nudez ou conteúdo sexual.</span>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="c_explicito">
                                <Form.Check type="checkbox" label="Conteúdo sexual explícito para adultos "/>
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
