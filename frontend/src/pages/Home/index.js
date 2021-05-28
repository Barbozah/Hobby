import React from 'react';
import {Container, Card} from 'react-bootstrap';
import Carrocel from '../../components/Carrocel';
import CarrocelSec from '../../components/CarrocelSec';//carrocel secundário
import Sidenav from '../../components/Sidebar/Sidenav';




export default function Home() {



  const dados = [{url:"https://cdn.pocket-lint.com/r/s/1200x/assets/images/134398-games-review-batman-arkham-knight-review-image1-8HL7SgyOGl.jpg",
                  title:"Batman Arkham City Game of the year edition", price: 20.00, tags:["Ação", "Aventura", "Mundo aberto"]}, 
                  {url:"https://i.ytimg.com/vi/SXvQ1nK4oxk/maxresdefault.jpg",
                  title:"Red Dead Redemption 2", price: 20.55, tags:["Ação", "Aventura", "Mundo aberto"]}
                  , 
                  {url:"https://i.ytimg.com/vi/SXvQ1nK4oxk/maxresdefault.jpg",
                  title:"Red Dead Redemption 2", price: 20.55, tags:["Ação", "Aventura", "Mundo aberto"]}
                  , 
                  {url:"https://i.ytimg.com/vi/SXvQ1nK4oxk/maxresdefault.jpg",
                  title:"Red Dead Redemption 2", price: 20.55, tags:["Ação", "Aventura", "Mundo aberto"]}];
  return (<>
    <Sidenav />
    <Container>
      <Card className="px-1 w-100 bg-transparent border-0 ml-5">
        <Carrocel dados={dados}/>
      </Card>
      <Card className="px-1 w-100 bg-transparent border-0 ml-5">
        <Card.Body className="p-0">
          <Card.Title className="text-light mb-4 fs-2">Em lançamento</Card.Title>
          <CarrocelSec dados={dados} qtd={4}/>
        </Card.Body>
      </Card>
      <Card className="px-1 w-100 bg-transparent border-0 ml-5">
        <Card.Body className="p-0">
          <Card.Title className="text-light mb-4 fs-2">Em promoção</Card.Title>
          <CarrocelSec dados={dados} qtd={2}/>
        </Card.Body>
      </Card>
      
        
    </Container>
    </>
  );
}
