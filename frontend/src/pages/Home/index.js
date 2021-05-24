import React from 'react';
import {Container, Card} from 'react-bootstrap';
import Carrocel from '../../components/Carrocel';



export default function Home() {
  const dados = [{url:"https://cdn.pocket-lint.com/r/s/1200x/assets/images/134398-games-review-batman-arkham-knight-review-image1-8HL7SgyOGl.jpg",
                  title:"Batman Arkham City Game of the year edition", price: 20.00, tags:["Ação", "Aventura", "Mundo aberto"]}, 
                  {url:"https://i.ytimg.com/vi/SXvQ1nK4oxk/maxresdefault.jpg",
                  title:"Red Dead Redemption 2", price: 20.55, tags:["Ação", "Aventura", "Mundo aberto"]}];
  return (
    <Container>
      <Card className="px-1 w-100 bg-transparent border-0 ml-5">
        <Carrocel dados={dados}/>
      </Card>
      
        
    </Container>
  );
}
