import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Image } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import Sidenav from '../../components/Sidebar/Sidenav';

import './carrinho.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Carrinho() {

    const [busy, setBusy] = useState(true)
    const history = useHistory();
    const [items, setItems] = useState([]);
    const cart = useState(JSON.parse(localStorage.getItem('cart')) || [])[0];

    useEffect(() => {

        var gamesList = [];

        if (cart) {

            async function fetchData(url) {//essa função fará a busca no backend pelo id do jogo
                const token = localStorage.getItem('token');
                const res = await api.get(url, {
                    headers: { Authorization: 'Bearer ' + token }
                }).catch(err => {
                    try{
                        toast(err.response.data.message);
                    }catch{
                        toast('Desculpe, nosso servidor está fora do ar');
                        history.push('/home')
                    }
                }); //caso tenha qualquer erro ao retornar o jogo, mandar para a home

                var jogo = (res || {data:{}}).data;

                gamesList.push({
                    id: jogo._id,
                    imagem: jogo.mainImage,
                    nome: jogo.title,
                    valor: jogo.price,
                    desconto: jogo.discount
                });

            }

            async function loadCart() {

                for(let game of cart){
                    await fetchData('game/' + game);
                }
                setItems(gamesList);
                setBusy(false);
            }
            
            loadCart();
        }
    },[cart, history]);

    return (<>
        <Sidenav />
        <Container>
            <Row>
                <Col>
                    <div className="text-light text-center">
                        <h1>Carrinho <FiShoppingCart size={60} /></h1>
                        <Spinner size="sm" animation="grow" variant="light" hidden={!busy} />
                    </div>
                </Col>
            </Row>
            <Row>
                <TableContainer component={Paper}>
                    <Table className="ListaCarrinho" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right">Nome</TableCell>
                                <TableCell align="right">Valor (R$)</TableCell>
                                <TableCell align="right">Desconto (%)</TableCell>
                                <TableCell align="right">Valor Total (R$)</TableCell>
                                <TableCell align="right">Ação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        <Image src={row.imagem} className="tumbnail" />
                                    </TableCell> 
                                    <TableCell align="right" component="th" scope="row">
                                        {row.nome}
                                    </TableCell>
                                    <TableCell align="right">{row.valor}</TableCell>
                                    <TableCell align="right">{`${row.desconto*100}%`}</TableCell>
                                    <TableCell align="right">{row.valor - row.desconto}</TableCell>
                                    <TableCell align="right"><Button variant="danger" className="rounded-0 m-0 w-2">Remover</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Row>
            <ToastContainer />
        </Container>
    </>
    );
}