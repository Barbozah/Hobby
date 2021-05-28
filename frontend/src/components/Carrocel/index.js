import React from 'react';
import {Image, Card, Button} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import {RiShoppingCartLine} from 'react-icons/ri';
import './carrocel.css';    
import Tags from './tags';


export default function Carrocel(props){

    
    return(
        
            <Carousel itemsToShow={1}>
                {props.dados.map((dado, index) =>(
                   <div key={index} className="sc-gtsrHT cAlXfM rec rec-item-wrapper">
                   <Image src={dado.url} className="w-75 efeito" />
                   <Card className="w-25 rounded-0 border-0 bg-dark">
                       
                       <Card.Body>
                           <Card.Title className="text-light">{dado.title}</Card.Title>
                           <Tags tags={dado.tags}/>
                           <Card.Img src={dado.url} className="efeito"/>                    
                           
                       </Card.Body>
                       <Card.Footer className="p-0 d-inline-flex justify-content-between text-center bg-secondary">
                           <h6 className="text-light">R$ {dado.price.toFixed(2).toString().replaceAll(".",",")}</h6>
                           <Button variant="success" className="rounded-0 m-0 w-50">Carrinho <RiShoppingCartLine size={13}/></Button>
                       </Card.Footer>
                   </Card>
                   </div>  
                ))}

            </Carousel>
           
    )
}