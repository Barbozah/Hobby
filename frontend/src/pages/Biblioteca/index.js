import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Container, Row, Col, Image, Form} from 'react-bootstrap';

import Sidenav from '../../components/Sidebar/Sidenav';


export default function Biblioteca() {
    const history = useHistory();

    var jogos = [{mainImage: "http://cdn26.us1.fansshare.com/photo/pcwallpapers/batman-arkham-origins-video-game-hd-wallpaper-pc-gaming-wallpapers-1060311066.jpg", _id: 1, title: "java"},
                {mainImage: "http://cdn26.us1.fansshare.com/photo/pcwallpapers/batman-arkham-origins-video-game-hd-wallpaper-pc-gaming-wallpapers-1060311066.jpg", _id: 2, title: "python"},
                {mainImage: "http://cdn26.us1.fansshare.com/photo/pcwallpapers/batman-arkham-origins-video-game-hd-wallpaper-pc-gaming-wallpapers-1060311066.jpg", _id: 3, title: "c++"},
                {mainImage: "http://cdn26.us1.fansshare.com/photo/pcwallpapers/batman-arkham-origins-video-game-hd-wallpaper-pc-gaming-wallpapers-1060311066.jpg", _id: 4, title: "php"},
                {mainImage: "http://cdn26.us1.fansshare.com/photo/pcwallpapers/batman-arkham-origins-video-game-hd-wallpaper-pc-gaming-wallpapers-1060311066.jpg", _id: 5, title: "batman"}]

    const [jogo, setJogo] = useState(jogos);
    const [pesquisa, setPesquisa] = useState("");

    function verJogo(id){
        history.push(`/game/${id}`);
    }
  
    function handleSubmit(event){
        event.preventDefault();
        const pes = document.getElementById('Pesquisar').value;

        setPesquisa(pes);
    }
  
  return (<>
    <Sidenav />
    <Container>
        <Row>
            <h1 className="text-light text-center">Biblioteca</h1>
        </Row>
        <Row>
            <Col>
                <h3 className="text-light">Classificar por: Recente</h3>
            </Col>
            <Col className="d-flex justify-content-end">
                <Form className="mb-5" onSubmit={handleSubmit}>
            
                    <Form.Group controlId="Pesquisar" className="mt-2" >
                        <Form.Control
                        type="text"
                        placeholder="Pesquisar"
                        className="rounded-0 input-cadastro text-light border-secondary" 
                        />
                        <Form.Control.Feedback type="invalid">
                        Por favor, informe uma senha contendo de 6 a 8 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        <Row>
            {pesquisa === "" ? jogo.map((j,index) => (
                <Col xs={3} className="my-2" onClick={() => verJogo(j._id)} key={index}>
                    <Image src={j.mainImage} className="w-100 efeito" />
                </Col>
            )) : jogo.filter(f =>{
               return f.title.includes(pesquisa);
            }).map((f,index) => (
                <Col xs={3} className="my-2" onClick={() => verJogo(f._id)} key={index}>
                    <Image src={f.mainImage} className="w-100 efeito" />
                </Col>
            ))}  
        </Row>
 
    </Container>
    </>
  );
}
