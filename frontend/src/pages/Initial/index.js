import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import './init.css';
import Logo from '../../components/Logo';


export default function Initial() {

    const history = useHistory()


    function logarEmailSenha(){
        history.push('/login');
    }


  return (
    <Container className="justify-content-center my-5 w-25 bg-secondary p-5">
    <Row>
        <Col className="d-flex justify-content-center mb-4">
          <Logo width={60}/>
        </Col>
        
      </Row>
      <Row>     
        <button className="my-3 rounded-0 btn-proprio" onClick={logarEmailSenha}>
            Entrar com email e senha
        </button>
        <button  className="my-3 rounded-0 btn-proprio">
            Entrar com o Google
        </button>
        <p>Não tem uma conta? <Link to="/cadastro">Cadastrar</Link></p>
      </Row> 

    </Container>
  );
}


