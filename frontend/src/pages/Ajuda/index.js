
import React from 'react';
import {Container, Card, Row, Col, Form, Accordion} from 'react-bootstrap';
import {RiArrowDownSLine} from 'react-icons/ri';


import Sidenav from '../../components/Sidebar/Sidenav';



export default function Ajuda() {
  
  
  return (<>
    <Sidenav />
    <Container>
       <Row className="d-flex justify-content-center">
           <Col xs={3}>
                <Form className="mb-5">
                    
                    <Form.Group controlId="Pesquisar" className="mt-2" >
                        <Form.Control
                        type="text"
                        placeholder="Pesquisar"
                        className="rounded-0 input-cadastro text-light border-secondary" 
                        />
                        <Form.Control.Feedback type="invalid">
                        Por favor, informe uma senha contendo de 6 a 8 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
           </Col>
        
       </Row>
       <Row>
        <Accordion>
            <Card className="my-2 bg-secondary text-light rounded-0">
                <Accordion.Toggle as={Card.Header} eventKey="0" className="d-flex justify-content-between">
                Perguntas frequentes <span> <RiArrowDownSLine /></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <h3>Como eu compro um jogo?</h3>
                    <p className="text-light">Vá na loja, clique no jogo que você deseja e depois no botão verde "carrinho", depois disso, vá em carrinho e confirme o pagamento</p>
                    <h3>Como eu faço logout?</h3>
                    <p className="text-light">Abra o menu lateral, vá na ultima opção: "sair"</p>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="my-2 bg-secondary text-light rounded-0">
                <Accordion.Toggle as={Card.Header} eventKey="1" className="d-flex justify-content-between">
                Acessibilidade <span> <RiArrowDownSLine /></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                 totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta 
                 sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
                 magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
                 consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                 Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
                 Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat 
                 quo voluptas nulla pariatur?"
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="my-2 bg-secondary text-light rounded-0">
                <Accordion.Toggle as={Card.Header} eventKey="2" className="d-flex justify-content-between">
                Política de devolução <span> <RiArrowDownSLine /></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                <Card.Body>
                    Não aceitamos, tenha um ótimo dia!
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card className="my-2 bg-secondary text-light rounded-0">
                <Accordion.Toggle as={Card.Header} eventKey="3" className="d-flex justify-content-between">
                Quem somos <span> <RiArrowDownSLine /></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                <Card.Body>
                    Alunos de Licenciatura em Computação da UFRPE
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
       </Row>
    </Container>
    </>
  );
}
