import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiPackage } from 'react-icons/bi';
import Sidenav from '../../components/Sidebar/Sidenav';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Pedidos() {

    const history = useHistory();
    const [itens, setItens] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('id');

            try {
                const res = await api.get('order/findAllByUserId', {
                    headers: { Authorization: 'Bearer ' + token },
                    params: { user_id },
                }).catch(() => history.push('/home')); //caso tenha qualquer erro ao retornar os pedidos, mandar para a home

                var pedidos = res.data;
                var listaItens = [];

                pedidos.forEach(element => {

                    let payment = ''
                    
                    switch (element.payment) {
                        case 'credit card': //cartão de crédito
                            payment = 'Cartão de crédito';
                            break;
                        default:
                            payment = 'Cartão de crédito';
                            break;
                    }

                    let lastStatus = element.status[element.status.length - 1].name;

                    switch (lastStatus) {
                        case 'waiting':
                            lastStatus = 'Aguardando confirmação';
                            break;
                    
                        case 'approved':
                            lastStatus = 'Confirmado';
                            break;
                        
                        case 'canceled':
                            lastStatus = 'Cancelado';
                            break;
                        default:
                            lastStatus = 'Não foi possível definir o status'
                            break;
                    }

                    let discount = 0;

                    element.itemList.forEach(item => {
                        discount += item.discount;
                    });

                    listaItens.push(
                        {
                            id: element._id,
                            payment,
                            lastStatus,
                            discount,
                            amount: element.amount
                        }
                    )
                });

                setItens(listaItens);
            } catch (e) {
                toast.error(e.message);
            }

        }
        fetchData();
    }, [history]);

    async function sendEmail(order_id){

        try {

            const data = {
                _id : order_id
            }

            const token = localStorage.getItem('token');

            const res = await api.post('order/payment', data ,
            { headers: { Authorization: 'Bearer ' + token }
            }).catch(() => history.push('/home')); //caso tenha qualquer erro , mandar para a home

            var retorno = res.data;
            toast.success(retorno.message);
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (<>
        <Sidenav />
        <Container>
            <Row>
                <Col><h1 className="text-light text-center">Seus Pedidos <BiPackage size={33} /></h1></Col>
            </Row>
            <Row>
                <TableContainer component={Paper}>
                    <Table className="ListaPedidos" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">Forma de Pagamento</TableCell>
                                <TableCell align="left">Status atual</TableCell>
                                <TableCell align="left">itens</TableCell>
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
                                    <TableCell align="left">{row.payment}</TableCell>
                                    <TableCell align="left">{row.lastStatus}</TableCell>
                                    <TableCell align="left">itens</TableCell>
                                    <TableCell align="right">{row.discount.toFixed(2)}</TableCell>
                                    <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
                                    <TableCell align="right">{row.lastStatus === 'Aguardando confirmação' ? <Button variant="primary" className="rounded-0 m-0" onClick={() => sendEmail(row.id)}>Reenviar email</Button> : <p>Nenhuma Ação</p>}</TableCell>
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