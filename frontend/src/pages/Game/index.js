import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri';

import Sidenav from '../../components/Sidebar/Sidenav';

import { useParams } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import './game.css';

export default function Game() {
    const history = useHistory();
    const { id } = useParams();//usamos o id do jogo para requisitar no backend

    const [game, setGame] = useState();
    const [minimum, setMinimum] = useState([]);
    const [recomended, setRecomended] = useState([]);

    const [backgroundButtonCart, setBackgroundButtonCart] = useState({
        variant: 'success',
        description: 'Carrinho'
    });

    const [isGameHasAlready, setIsGameHasAlready] = useState(false);

    useEffect(() => {
        async function fetchData(url, setter) {//essa função fará a busca no backend pelo id do jogo
            const token = localStorage.getItem('token');
            const res = await api.get(url, {
                headers: { Authorization: 'Bearer ' + token }
            }).catch(() => history.push('/home')); //caso tenha qualquer erro ao retornar o jogo, mandar para a home

            var jogo = res.data;
            const id_user = localStorage.getItem('id');

            const user = await api.get(`user/${id_user}`, {
                headers: { Authorization: 'Bearer ' + token }
            })

            if (user.data.gameList.includes(jogo._id)) {
                setIsGameHasAlready(true);
            } else {
                setIsGameHasAlready(false);
            }

            var cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log(cart);

            if (cart.includes(jogo._id)) {//Caso o jogo esteja no carrinho
                setBackgroundButtonCart({
                variant: 'danger',
                description: 'Remover Jogo'
            });
            }

            setter(jogo);
        }
        fetchData(`game/${id}`, setGame);
    }, [id, history]);

    useEffect(() => {
        if (!!game && !!game.requirements) {//alguns jogos não possuem requisitos
            var atributos = []
            var minimos = game.requirements.minimum
            for (var x in minimos) {
                atributos.push(x)
            }
            var req_min = atributos.map(atr => {
                return { atr: atr, valor: game.requirements.minimum[atr] }
            })
            setMinimum(req_min)
        }

    }, [game])

    useEffect(() => {
        if (!!game && !!game.requirements) {
            var atributos_reco = []
            var recomendeds = game.requirements.recommended

            for (var y in recomendeds) {
                atributos_reco.push(y)
            }
            var req_reco = atributos_reco.map(atr => {
                return { atr: atr, valor: game.requirements.recommended[atr] }
            })

            setRecomended(req_reco)
        }

    }, [minimum, game])

    function cartHandle(game_id) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (backgroundButtonCart.variant === 'success') {
            
            setBackgroundButtonCart({
                variant: 'danger',
                description: 'Remover Jogo'
            });

            console.log(cart,'teste_guedes');
            cart.push(game._id);
            console.log(cart);
            localStorage.setItem('cart',JSON.stringify(cart));    

        } else {

            setBackgroundButtonCart({
                variant: 'success',
                description: 'Carrinho'
            });

            let newCart = cart.filter((item) => {
                return item !== game_id;
            });

            console.log(newCart);

            localStorage.setItem('cart',JSON.stringify(newCart));    

        }
    }

    return (<>
        <Sidenav />
        <Container>
            <Row>
                {!!game ? <div className="d-flex fs-5"> <Link to='/home'>Início</Link><p>{' > '}</p> <Link to={`/loja/${game.genres[0]}`}>{game.genres[0]}</Link><p>{' > '}</p> <Link to={`/games/${id}`} className='disabled-link'>{game.title}</Link> </div> : <></>}
            </Row>
            <Row>
                {!!game ? <h1 className="text-light mb-5 text-center">{game.title}</h1> : <></>}
            </Row>
            <Row>
                <Col xs={9} className="d-flex justify-content-center">
                    {!!game ? <Image src={game.mainImage} className="w-75" /> : <></>}
                </Col>
                <Col className="p-0 d-grid">
                    <Row className="my-1">
                        {!!game ? <Image src={game.extraImages[0]} /> : <></>}
                    </Row>
                    <Row className="my-1">
                        {!!game ? <Image src={game.extraImages[1]} /> : <></>}
                    </Row>
                    <Row className="mx-0 justify-content-between text-center bg-secondary ">
                        <Col className="p-0 d-flex justify-content-center">
                            {!!game ? <h6 className="text-light">R$ {game.price.toFixed(2).toString().replaceAll(".", ",")}</h6> : <></>}
                        </Col>
                        <Col className="p-0 d-flex justify-content-center">
                            {!isGameHasAlready && <Button variant={backgroundButtonCart.variant} className="rounded-0 m-0 w-100" onClick={() => cartHandle(game._id)}>{backgroundButtonCart.description} <RiShoppingCartLine size={13} /></Button>}
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
                                {!!game ? <><StarRatingComponent name="rate2" editing={false} starCount={5} value={game.starsAverage} /> <h6 className="text-light">{game.starsAverage}</h6> </> : <></>}

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
                    <hr className="text-light" />
                    <h3 className="text-light">REQUISITOS DO SISTEMA</h3>
                    <Row>
                        <Col>

                            <p className="text-light fs-4">Mínimos: </p>
                            {minimum.length > 0 ? minimum.map((min, index) => (
                                <p key={index} className="text-light">{min.atr}: {min.valor}</p>
                            )) : <p>Esse jogo não possui requisitos informados</p>}
                        </Col>
                        <Col>
                            <p className="text-light fs-4">Recomendados:</p>
                            {recomended.length > 0 ? recomended.map((min, index) => (
                                <p key={index} className="text-light">{min.atr}: {min.valor}</p>
                            )) : <p>Esse jogo não possui requisitos informados</p>}
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>
    </>
    );
}
