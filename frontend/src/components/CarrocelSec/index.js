import React from 'react';
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import { useHistory } from 'react-router-dom';

import './carrocel.css';    


export default function CarrocelSec(props){

    const history = useHistory();

    function clique(id){
        history.push(`/game/${id}`); //irá redirecionar para a página do jogo
    }

    console.log(props.dados);
    return(
        
            <Carousel itemsToShow={props.qtd}>
                {!!props.dados && props.dados.map((dado, index) =>(
                   <Card className="w-100 rounded-0 border-0 bg-dark mx-1 efeito" key={index} onClick={() => clique(dado._id)}>
                       
                       <Card.Body className="p-0">
                           <Card.Img src={dado.mainImage} />                    
                           
                       </Card.Body>
                       <Card.Footer className="p-0 d-inline-flex justify-content-between text-center bg-secondary">
                           <h6 className="text-light">R$ {dado.price.toFixed(2).toString().replaceAll(".",",")} </h6>
                       </Card.Footer>
                   </Card>                   
                ))}

            </Carousel>
           
    )
}

/*
  <>
                <Image src="https://cdn.pocket-lint.com/r/s/1200x/assets/images/134398-games-review-batman-arkham-knight-review-image1-8HL7SgyOGl.jpg" className="w-75"/>
                <Card className="w-25 rounded-0 border-0">
                    
                    <Card.Body>
                        <Card.Title>Batman Arkham City Game of the year edition</Card.Title>
                        <p>inserir tags aqui, faço depois(sugiro compenentização disso)</p> 
                        <Card.Img src="https://cdn.pocket-lint.com/r/s/1200x/assets/images/134398-games-review-batman-arkham-knight-review-image1-8HL7SgyOGl.jpg" />
                        
                        
                    </Card.Body>
                    <Card.Footer className="p-0 d-inline-flex justify-content-between text-center">
                        <h6>R$ 20,00</h6>
                        <Button variant="success" className="rounded-0 m-0 w-50">Carrinho</Button>
                    </Card.Footer>
                </Card>
                </>
                <>
                <Image src="https://i.ytimg.com/vi/SXvQ1nK4oxk/maxresdefault.jpg" className="w-75"/>
                <Card className="w-25 rounded-0 border-0">
                    
                    <Card.Body>
                        <Card.Title>Red Dead Redemption 2</Card.Title>
                        <p>inserir tags aqui, faço depois(sugiro compenentização disso)</p> 
                        <Card.Img src="https://i.ytimg.com/vi/SXvQ1nK4oxk/maxresdefault.jpg" />
                        
                        
                    </Card.Body>
                    <Card.Footer className="p-0 d-inline-flex justify-content-between text-center">
                        <h6>R$ 20,00</h6>
                        <Button variant="success" className="rounded-0 m-0 w-50">Carrinho</Button>
                    </Card.Footer>
                </Card>
                </> */