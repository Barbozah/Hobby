import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import {Container, Card, Row, Col, Image, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {RiShoppingCartLine} from 'react-icons/ri';

import Sidenav from '../../components/Sidebar/Sidenav';

import { useParams } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import './game.css';

export default function Game() {

    const{id} = useParams();

    var mockgame =  {
        "extraImages": ["https://igg-games.com/wp-content/uploads/2018/12/Arcane-Raise-Torrent-Download.jpg", "https://igg-games.com/wp-content/uploads/2018/12/Arcane-Raise-PC-Crack.jpg"],
        "developers": ["Arcane Raise"],
        "genres": ["Adventure", "RPG", "Strategy", "Casual"],
        "downloads": [{
            "site": "Mega.co.nz",
            "links": ["http://bluemediafiles.com/url-generator.php?url=+F30sKVGya5zG++539sIDRLgo0A5dBnvFKxT4+RDaJnwhd24xn/MiSBkQqVYZN5QnULhCK4YxxQYi4bwUUfy3ABJgVrg4Yk5In/DsdnZ9S8="]
        }, {
            "site": "Openload.co",
            "links": ["https://openload.co/f/vOuShtlpY7A/Arcane.Raise.rar "]
        }, {
            "site": "KumpulBagi",
            "links": ["http://kbagi.com/Digkegiekei/fileuploader-519705/arcane-raise,3948928.rar "]
        }, {
            "site": "UpFile",
            "links": ["http://upfile.mobi/6yYqgInGpQl "]
        }, {
            "site": "Go4Up (Multi Links)",
            "links": ["http://go4up.com/dl/ce156de04315a6 "]
        }, {
            "site": "Uploaded",
            "links": ["http://bluemediafiles.com/url-generator.php?url=AG98GN3lTJJP7r8R5btxQ7TqGxwk12ySjMhSWRHSfJs="]
        }, {
            "site": "Uptobox",
            "links": ["http://bluemediafiles.com/url-generator.php?url=pZrvUAxtqJWSi2HLMDgBIw2Fk7LrytW2VUWJGjsshYkzVp3mPxSy5IcN3z1ZXeZE"]
        }, {
            "site": "Google Drive",
            "links": ["http://bluemediafiles.com/url-generator.php?url=onAhF5ZLCDGjfP3AAUIv/YzOczj0ukN7vUfuebHGPAq+0mW4xX2R4JC1iFzGavFMlEzVDcLEPy1zwNZCSvp4RsFb5gd3R2FFxF3tVfM6OCBKqfr9/aMx58JU5zKE4y7Y"]
        }],
        "title": "– Arcane Raise –",
        "publisher": "WAX Publishing",
        "price": 10.69,
        "discount": 0.2,
        "starsAverage": 1.6,
        "reviewInfo": "",
        "release": "2017-03-10",
        "description": "Arcane Raise is a role-playing video game franchise, wherein a group of resurrected hunters known as Shades, fight alongside humans against monsters in a post-apocalyptic world overrun by an infestation. Do you have what it takes to survive and reclaim what was once yours? Are you looking for a very special experience; one that you will always remember? Look no further than Arcane Raise series! This is a very special gem, Arcane Raise is a hardcore role-playing video game created through passion, dedication and labor of love! Guaranteed be a game you will always remember for better or worse, it will be ingrained in your memory forever and ever. This game aims to redefine the meaning of the word and take it to a whole grand new level!",
        "mainImage": "https://igg-games.com/wp-content/uploads/2018/12/Arcane-Raise-Free-Download.jpg",
        "requirements": {
            "minimum": {
                "OS": "Windows XP, 7, 8 or 10 (or Mac OS X/Linux)",
                "Processor": "1.6 Ghz Intel Atom Z2460 or higher",
                "Memory": "512 MB RAM",
                "Graphics": "Intel HD 3000 or better",
                "DirectX": "Version 9.0c",
                "Storage": "200 MB available space",
                "Sound Card": "DirectX Compatible",
                "Additional Notes": "Audio player which supports .Ogg format or codecs"
            },
            "recommended": {
                "OS": "Windows 10",
                "Processor": "Dual-Core @ 2.5 Ghz or better",
                "Memory": "1024 MB RAM",
                "Graphics": "nVidia GT 730 or better",
                "DirectX": "Version 9.0c",
                "Storage": "250 MB available space",
                "Sound Card": "DirectX Compatible",
                "Additional Notes": ".Ogg Codecs"
            }
        },
        "createdAt": {
            "$date": "2021-06-06T10:53:09.064Z"
        },
        "updatedAt": {
            "$date": "2021-06-07T05:53:51.446Z"
        },
        "status": true,
        "__v": 0
    }
    
  const [game, setGame] = useState();
  const [minimum, setMinimum] = useState([]);
  const [recomended, setRecomended] = useState([]);

  useEffect(() => {
    async function fetchData(url, setter) {//essa função fará a busca no backend pelo id do jogo
      /*const token = localStorage.getItem('token');
      const res = await api.get(url, {
        headers: { Authorization: 'Bearer ' + token}
      }).catch(err => toast.error(err.response.data.message));
      setter(res.data); */
      setter(mockgame)
    }
    fetchData('game/findById', setGame);
  }, []);
  
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
    if(minimum.length > 0){
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
    
  },[minimum])

  
  return (<>
    <Sidenav />
    <Container>
        <Row>
            {!!game ?<div className="d-flex fs-5"> <Link to='/home'>Início</Link><p>{' > '}</p> <Link to={`/loja/${game.genres[0]}`}>{game.genres[0]}</Link><p>{' > '}</p> <Link to={`/games/${id}`} className='disabled-link'>{game.title}</Link> </div> : <h1>nada</h1>}
        </Row>
        <Row>
            {!!game ? <h1 className="text-light mb-5 text-center">{game.title}</h1> : <h1>nada</h1>}
        </Row>
        <Row>
            <Col xs={9} className="d-flex justify-content-center">
                {!!game ? <Image src={game.mainImage} className="w-75"/> : <h1>wallpaper here</h1>}
            </Col>
            <Col className="p-0 d-grid">
                <Row className="my-1">
                    {!!game ? <Image src={game.extraImages[0]}/> : <h1>secondary images here</h1>}
                </Row>
                <Row className="my-1">
                    {!!game ? <Image src={game.extraImages[1]}/> : <h1>secondary images here</h1>}
                </Row>        
                <Row className="mx-0 justify-content-between text-center bg-secondary ">
                    <Col className="p-0 d-flex justify-content-center">
                        {!!game ? <h6 className="text-light">R$ {game.price.toFixed(2).toString().replaceAll(".",",")}</h6>: <h1>price here</h1>}
                    </Col>
                    <Col className="p-0 d-flex justify-content-center">
                        {!!game ? <Button variant="success" className="rounded-0 m-0 w-100">Carrinho <RiShoppingCartLine size={13}/></Button> : <h1>button here</h1>}
                    </Col>
                </Row>  
            </Col>
        </Row>
        <Row>
            <Col xs={9} className="mt-2">
                {!!game ? <p className="text-light lh-base">{game.description}</p> : <p>nada</p>}
            </Col>
            <Col className="mt-2 p-0 mx-2">
                <Row>
                    <Card className="bg-secondary rounded-0">
                    <Card.Body>
                        <Card.Title className="text-light">Avaliações</Card.Title>
                        {!!game ?  <StarRatingComponent name="rate2" editing={false} starCount={5} value={game.starsAverage}/>:<p>nada</p>} 
                        
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
    </Container>
    </>
  );
}
