import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import {Container, Card} from 'react-bootstrap';
import Carrocel from '../../components/Carrocel';
import CarrocelSec from '../../components/CarrocelSec';//carrocel secundário
import Sidenav from '../../components/Sidebar/Sidenav';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import PreLoader from '../../components/PreLoader';

export default function Home() {

  const [main, setMain] = useState([]);
  const [promo, setPromo] = useState([]);
  const [lanc, setLanc] = useState([]);

  const [busy, setBusy] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchData(url, setter) {
      const token = localStorage.getItem('token');
      const res = await api.get(url, {
        headers: { Authorization: 'Bearer ' + token}
      }).catch(err => {
        try{
          toast.error(err.response.data.message)
        }catch{
          toast.error('Desculpe, nosso servidor está fora do ar')
          history.push('/login')
        }
      });
      setter((res || {data: []}).data);
    }

    async function loadData() {
      await fetchData('game?size=4&sort=price_desc,starsAverage', setMain);
      await fetchData('game?size=10&sort=discount,price_desc,starsAverage', setPromo);
      await fetchData('game?size=10&sort=release_desc,price,starsAverage', setLanc);
      setLoaded(true);
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await sleep(1000);
      setBusy(false);
    }

    loadData();
  }, [history]);

  return busy ? <PreLoader loaded={loaded} /> :
    <> 
      <Sidenav />
      <Container>
        <Card className="px-1 w-100 bg-transparent border-0 ml-5">
          <Carrocel dados={main}/>
        </Card>
        <Card className="px-1 w-100 bg-transparent border-0 ml-5">
          <Card.Body className="p-0">
            <Card.Title className="text-light mb-4 fs-2">Em lançamento</Card.Title>
            <CarrocelSec dados={lanc} qtd={4}/>
          </Card.Body>
        </Card>
        <Card className="px-1 w-100 bg-transparent border-0 ml-5">
          <Card.Body className="p-0">
            <Card.Title className="text-light mb-4 fs-2">Em promoção</Card.Title>
            <CarrocelSec dados={promo} qtd={2}/>
          </Card.Body>
        </Card>
        <ToastContainer />
      </Container>
    </>
}
