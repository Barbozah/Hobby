import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { RiShoppingCartLine } from 'react-icons/ri';
import Sidenav from '../../components/Sidebar/Sidenav';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Carrinho() {

    const history = useHistory();
    const [itens, setItens] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {

        var gamesList = [];

        if (cart) {

            async function fetchData(url) {//essa função fará a busca no backend pelo id do jogo
                const token = localStorage.getItem('token');
                const res = await api.get(url, {
                    headers: { Authorization: 'Bearer ' + token }
                }).catch(() => history.push('/home')); //caso tenha qualquer erro ao retornar o jogo, mandar para a home

                console.log(res);

                var jogo = res.data;

                console.log(jogo);

                gamesList.push({
                    id: jogo._id,
                    nome: jogo.title,
                    valor: jogo.price,
                    desconto: jogo.discount
                });

            }
            cart.forEach(element => {
                fetchData('game/' + element);
            });

            setItens(gamesList);
        }
    },[cart]);

    function handleSubmit(event) {//impedir que usuário recarregue a página se apertar enter
        event.preventDefault();
    }

    return (<>
        <Sidenav />
        <Container>
            <Row>
                <Col><h1 className="text-light text-center">Carrinho <RiShoppingCartLine size={33} /></h1></Col>
            </Row>
            <Row>
                <TableContainer component={Paper}>
                    <Table className="ListaCarrinho" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Nome</TableCell>
                                <TableCell align="right">Valor (R$)</TableCell>
                                <TableCell align="right">Desconto (R$)</TableCell>
                                <TableCell align="right">Valor Total (R$)</TableCell>
                                <TableCell align="right">Ação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itens.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell> 
                                     <TableCell component="th" scope="row">
                                        {row.nome}
                                    </TableCell>
                                    <TableCell align="right">{row.valor}</TableCell>
                                    <TableCell align="right">{row.desconto}</TableCell>
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