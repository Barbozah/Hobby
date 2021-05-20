import React from 'react';
import {Container, Card} from 'react-bootstrap';
import Carrocel from '../../components/Carrocel';



export default function Home() {

  return (
    <Container className="d-flex justify-content-end">
      <Card className="px-1 w-75 bg-dark">
        <Carrocel/>
      </Card>
        
    </Container>
  );
}
