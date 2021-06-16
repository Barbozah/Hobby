import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import {Container, Card, Row, Col, Image, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RiShoppingCartLine} from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';

import Sidenav from '../../components/Sidebar/Sidenav';

import { useParams } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import './game.css';

export default function Game() {

    const{id} = useParams();//usamos o id do jogo para requisitar no backend

  const [game, setGame] = useState();
  const [minimum, setMinimum] = useState([]);
  const [recomended, setRecomended] = useState([]);

  useEffect(() => {
    async function fetchData(url, setter) {//essa função fará a busca no backend pelo id do jogo
      const token = localStorage.getItem('token');
      const res = await api.get(url, {
        headers: { Authorization: 'Bearer ' + token}
      }).catch(err => toast.error(err.response.data.message));
      setter(res.data); 
    }
    fetchData(`game/${id}`, setGame);
  }, [id]);
  
  useEffect(()=>{
    if(!!game){
        var atributos = []
        var minimos = game.requirements.minimum
        for(var x in minimos){
            atributos.push(x)
        }
        var req_min = atributos.map(atr =>{
            return {atr: atr, valor: game.requirements.minimum[atr]}
        })
        setMinimum(req_min)
    }
    
  },[game])

  useEffect(() =>{
    if(minimum.length > 0 && !!game){
        var atributos_reco = []
        var recomendeds = game.requirements.recommended

        for(var y in recomendeds){
            atributos_reco.push(y)
        }
        var req_reco = atributos_reco.map(atr =>{
            return {atr: atr, valor: game.requirements.recommended[atr]}
        })
        
        setRecomended(req_reco)
    }
    
  },[minimum,game])

  
  return (<>
    <Sidenav />
    <Container>
        <Row>
            {!!game ?<div className="d-flex fs-5"> <Link to='/home'>Início</Link><p>{' > '}</p> <Link to={`/loja/${game.genres[0]}`}>{game.genres[0]}</Link><p>{' > '}</p> <Link to={`/games/${id}`} className='disabled-link'>{game.title}</Link> </div> : <></>}
        </Row>
        <Row>
            {!!game ? <h1 className="text-light mb-5 text-center">{game.title}</h1> : <></>}
        </Row>
        <Row>
            <Col xs={9} className="d-flex justify-content-center">
                {!!game ? <Image src={game.mainImage} className="w-75"/> : <></>}
            </Col>
            <Col className="p-0 d-grid">
                <Row className="my-1">
                    {!!game ? <Image src={game.extraImages[0]}/> : <></>}
                </Row>
                <Row className="my-1">
                    {!!game ? <Image src={game.extraImages[1]}/> : <></>}
                </Row>        
                <Row className="mx-0 justify-content-between text-center bg-secondary ">
                    <Col className="p-0 d-flex justify-content-center">
                        {!!game ? <h6 className="text-light">R$ {game.price.toFixed(2).toString().replaceAll(".",",")}</h6>: <></>}
                    </Col>
                    <Col className="p-0 d-flex justify-content-center">
                        {!!game ? <Button variant="success" className="rounded-0 m-0 w-100">Carrinho <RiShoppingCartLine size={13}/></Button> : <></>}
                    </Col>
                </Row>  
            </Col>
        </Row>
        <Row>
            <Col xs={9} className="mt-2">
                {!!game ? <p className="text-light lh-base">{game.description}</p> : <></>}
            </Col>
            <Col className="mt-2 p-0 mx-2">
                <Row>
                    <Card className="bg-secondary rounded-0">
                    <Card.Body>
                        <Card.Title className="text-light">Avaliações</Card.Title>
                        {!!game ?  <StarRatingComponent name="rate2" editing={false} starCount={5} value={game.starsAverage}/>:<></>} 
                        
                    </Card.Body>
                    </Card>
                </Row>
                <Row className="mt-2">
                    <Card className="bg-secondary rounded-0">
                    <Card.Body>
                        <Card.Title className="text-light">Jogos relacionados</Card.Title>
                        
                        
                    </Card.Body>
                    </Card>
                </Row>
                
            </Col>
        </Row>
        <Row>
            <Col xs={9}>
                <hr className="text-light"/>
                <h3 className="text-light">REQUISITOS DO SISTEMA</h3>
                <Row>
                    <Col>
                        
                        <p className="text-light fs-4">Mínimos: </p>
                        {minimum.map((min,index) => (
                            <p key={index} className="text-light">{min.atr}: {min.valor}</p>
                        ))}
                    </Col>
                    <Col>
                        <p className="text-light fs-4">Recomendados:</p>
                        {recomended.map((min,index) => (
                            <p key={index} className="text-light">{min.atr}: {min.valor}</p>
                        ))}
                    </Col>
                </Row>
            </Col>
        </Row>
        <ToastContainer />
    </Container>
    </>
  );
}
