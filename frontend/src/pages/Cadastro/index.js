import React, {useState} from 'react';
import {Container, Button, Form, Row, Col} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './style.css';
import Logo from '../../components/Logo';
import api from '../../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cadastro() {

 
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  async function handleSubmit(event){
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }else{
      const name = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('senha').value;

      const data = {
        name,
        email,
        password
      };
      api.post('user/signup', data)
        .then(response => {
          localStorage.setItem('token', response.access_token);
          toast.success('Cadastro realizado com sucesso. ')
          history.push('/login');
        }).catch(err => toast.error(err.response.data.message));
    }
  };



  return (


    <Container className="justify-content-center my-5 w-25 bg-secondary p-5">
      <Row>
        <Col className="d-flex justify-content-center mb-4">
          <Logo width={60}/>
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
           
            <Form.Group  controlId="email" className="mt-2" >
              <Form.Control
                required
                type="email"
                placeholder="Email"
                className="rounded-0 input-cadastro text-light border-secondary" 
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe um endere??o de email v??lido.
              </Form.Control.Feedback>
            </Form.Group>
        
            <Form.Group controlId="senha" className="mt-2" >
              <Form.Control
                required
                type="password"
                placeholder="Senha"
                className="rounded-0 input-cadastro text-light border-secondary" 
                minLength={6}
                maxLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, informe uma senha contendo de 6 a 8 caracteres.
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
      <ToastContainer />
    </Container>
  );
}
