import React from 'react';
import {Image, Card, Button} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import {RiShoppingCartLine} from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import './carrocel.css';    
import Tags from './tags';

export default function Carrocel(props){

    const history = useHistory();

    function clique(id) {
        history.push(`/game/${id}`);
    }

    return(
        <Carousel itemsToShow={1}>
            {props.dados ? props.dados.map((dado, index) =>(
                <div key={index} className="sc-gtsrHT cAlXfM rec rec-item-wrapper">
                    <Image src={dado.mainImage} className="w-75 efeito" onClick={() => clique(dado._id)} />
                    <Card className="w-25 rounded-0 border-0 bg-dark">
                        <Card.Body>
                            <Card.Title className="text-light">
                                <span className="efeito onleft" onClick={() => clique(dado._id)}>
                                    {dado.title}
                                </span>
                            </Card.Title>
                            <Tags tags={dado.genres}/>
                            {dado.extraImages && <Card.Img src={dado.extraImages[0]} className="efeito"/>}
                        </Card.Body>
                        <Card.Footer className="p-0 d-inline-flex justify-content-between text-center bg-secondary">
                            <h6 className="text-light">R$ {dado.price.toFixed(2).toString().replaceAll(".",",")}</h6>
                            <Button variant="success" className="rounded-0 m-0 w-50">Carrinho <RiShoppingCartLine size={13}/></Button>
                        </Card.Footer>
                    </Card>
                </div>
            )) : 
                <div className="sc-gtsrHT cAlXfM rec rec-item-wrapper">
                    <Image src="https://via.placeholder.com/500" className="w-75 efeito" />
                    <Card className="w-25 rounded-0 border-0 bg-dark">
                        <Card.Body>
                            <Card.Title className="text-light"></Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            }
        </Carousel>
    )
}