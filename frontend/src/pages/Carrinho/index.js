import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Form, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
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

    const [showConfirmPay, setShowConfirmPay] = useState(false);

    const handleClose = () => setShowConfirmPay(false);
    const handleShow = () => setShowConfirmPay(true);

    var payment = '';

    useEffect(() => {
        if (cart) {

            async function fetchData() {//essa função fará a busca no backend pelo id do jogo
                var lista = [];
                const token = localStorage.getItem('token');

                for (let x = 0; x < cart.length; x++) {
                    const res = await api.get('game/' + cart[x], {
                        headers: { Authorization: 'Bearer ' + token }
                    }).catch(() => history.push('/home')); //caso tenha qualquer erro ao retornar o jogo, mandar para a home
                    var jogo = res.data;

                    lista.push({
                        id: jogo._id,
                        nome: jogo.title,
                        valor: jogo.price,
                        desconto: jogo.discount,
                        valor_total: jogo.price - jogo.discount
                    });
                }
                setItens(lista);

            }
            fetchData();
        }
    }, [history, cart]);

    function handleSubmit(event) {//impedir que usuário recarregue a página se apertar enter
        event.preventDefault();
    };

    function removeCart(game_id) {
        var cart_temp = JSON.parse(localStorage.getItem('cart')) || [];

        var new_cart = cart_temp.filter((item) => {
            return item !== game_id;
        });

        setCart(new_cart);
        localStorage.setItem('cart', JSON.stringify(new_cart));
    };

    function limparCart() {
        localStorage.removeItem('cart');

        var new_cart = [];
        localStorage.setItem('cart', JSON.stringify(new_cart));
        setItens([]);
    };

    function finalizarCarrinho() {
        //Atualiza o carrinho antes de processar
        setCart(JSON.parse(localStorage.getItem('cart')) || []);

        if (itens.length === 0) {
            toast.error('Carrinho está vazio!');
        } else {
            handleShow();
        }
    }

    async function createOrder() {

        debugger;
        var itemList = itens.map((item)=>{
            return  item.id ;
        })

        var user_id = localStorage.getItem('id');
        const data = {
            user_id,
            itemList,
            payment
        }

        const token = localStorage.getItem('token');

        try {
            
            const res = await api.post('order/create', data ,
            { headers: { Authorization: 'Bearer ' + token }
            }).catch(() => history.push('/home')); //caso tenha qualquer erro ao retornar o jogo, mandar para a home
   
            var order = res.data;

            toast.success('Pedido ' + order._id + ' criado com sucesso!');
            localStorage.removeItem('cart');
            setCart([]);

        } catch (e) {
            toast.error(e.message);
        }
    }

    function dropDownHandle(event) {
        switch (event) {
            case 1: //cartão de crédito
                payment = 'credit card';
                handleClose();
                createOrder();
                break;
            default:
                history.push('/home');
                break;
        }
    }

    return (<>
        <Sidenav />
        <Modal
            show={showConfirmPay}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Escolha o método de pagamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DropdownButton id="dropdown-basic-button" title="Método de pagamento">
                    <Dropdown.Item as="button" onClick={() => dropDownHandle(1)}>Cartão de crédito</Dropdown.Item>
                </DropdownButton>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        <Container>
            <Row>
                <Col><h1 className="text-light text-center">Carrinho <RiShoppingCartLine size={33} /></h1></Col>
            </Row>
            <Row>
                <span>
                    <Button variant="light" className="rounded-0 m-0 w-2" onClick={() => limparCart()}>Limpar Carrinho</Button>
                    <Button variant="success" className="rounded-0 m-0 w-2" onClick={() => finalizarCarrinho()}>Finalizar Carrinho</Button>
                </span>
            </Row>
            <Row>
                <TableContainer component={Paper}>
                    <Table className="ListaCarrinho" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">Nome</TableCell>
                                <TableCell align="right">Valor (R$)</TableCell>
                                <TableCell align="right">Desconto (R$)</TableCell>
                                <TableCell align="right">Valor Total (R$)</TableCell>
                                <TableCell align="center">Ação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itens.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="left">{row.nome}</TableCell>
                                    <TableCell align="right">{row.valor}</TableCell>
                                    <TableCell align="right">{row.desconto}</TableCell>
                                    <TableCell align="right">{row.valor_total.toFixed(2)}</TableCell>
                                    <TableCell align="right"><Button variant="danger" className="rounded-0 m-0 w-2" onClick={() => removeCart(row.id)}>Remover</Button></TableCell>
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