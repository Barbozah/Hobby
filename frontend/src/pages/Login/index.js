import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Logo from '../../components/Logo';
import api from '../../service/api';
import './style.css';

export default function Login() {

    const [validated, setValidated] = useState(false);
    const history = useHistory();

    async function handleSubmit(event){
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }else{
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
  
        const data = {
          email,
          password
        };
  
        try{

         const response = api.post('signin',data);
          
         localStorage.setItem('token', response.access_token);
         history.push('/home');

        }catch(e){
          alert(e);
        }



        
      }
    
      setValidated(true);
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
            <Form.Group  controlId="email" className="mt-2" >
                <Form.Control
                required
                type="email"
                placeholder="Email"
                className="rounded-0 input-login text-light border-secondary" 
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
                className="rounded-0 input-login text-light border-secondary"
                minlength={6}
                maxLength={8}
                />
                <Form.Control.Feedback type="invalid">
                Por favor, informe uma senha entre 6 e 8 caracteres.
                </Form.Control.Feedback>
            </Form.Group>
            <Button 
            type="submit" 
            variant="light" 
            className="rounded-0 mt-2 w-100" 
            block>
                Entrar
            </Button>
        </Form>
      </Row> 

    </Container>
  );
}


