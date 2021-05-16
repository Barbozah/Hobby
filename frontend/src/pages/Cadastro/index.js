import React, {useState} from 'react';
import {Container, Button, Form, Image, Row, Col} from 'react-bootstrap';
import './style.css';
import Logo from '../../assets/logo.png';


function Cadastro() {

 
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      const nome = document.getElementById('nome').value;
      const nome_exib = document.getElementById('nome_exib').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      const data = {
        nome,
        nome_exib,
        email,
        senha
      };

      alert(data);
      //após isso, mandar requisição para a API/backend e redirecionar para a página principal
      
    }
  
    setValidated(true);
  };


/*
  comentários:
  >colocar a logo original no src da imagem 
  >não esquecer do style.css criado


*/
  return (


    <Container className="justify-content-center my-5 w-25 bg-secondary p-5">
      <Row>
        <Col className="d-flex justify-content-center mb-4">
          <Image src={Logo} alt="logo Hobby" width={180}></Image>
        </Col>
        
      </Row>
      <Row>     
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-5">
          
          
            <Form.Group controlId="nome" className="mt-2" >
              <Form.Control
                required
                type="text"
                placeholder="Nome"
                className="rounded-0 input-cadastro text-light border-secondary" 
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite Seu nome.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="nome_exib" className="mt-2" >
              <Form.Control
                required
                type="text"
                placeholder="Nome de exibição"
                className="rounded-0 input-cadastro text-light border-secondary" 
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite o nome que será exibido dentro da plataforma.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="email" className="mt-2" >
              <Form.Control
                required
                type="email"
                placeholder="Email"
                className="rounded-0 input-cadastro text-light border-secondary" 
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe um endereço de email válido.
              </Form.Control.Feedback>
            </Form.Group>
        
            <Form.Group controlId="senha" className="mt-2" >
              <Form.Control
                required
                type="password"
                placeholder="Senha"
                className="rounded-0 input-cadastro text-light border-secondary" 
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe uma senha.
              </Form.Control.Feedback>
            </Form.Group>
          <Button 
            type="submit" 
            variant="light" 
            className="rounded-0 mt-2 w-100" 
            block>
              Cadastrar
          </Button>
        </Form>
      </Row> 
    </Container>
  );
}

export default Cadastro;
