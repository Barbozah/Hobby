import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import {Container, Card} from 'react-bootstrap';
import Carrocel from '../../components/Carrocel';
import CarrocelSec from '../../components/CarrocelSec';
import SideFilter from '../../components/Sidebar/SideFilter';
import Sidenav from '../../components/Sidebar/Sidenav';
import { ToastContainer, toast } from 'react-toastify';
import './style.css'
import { Form, Col } from 'react-bootstrap';

export default function Home() {

  const rankings = {
    'price': 'Preço'
  };

  const [filters, setFilters] = useState({})

  const [rank, setRank] = useState('price')

  const [searchValue, setSearchValue] = useState('')

  function searchGames(e){
    e.preventDefault();
    // const query = {
    //   title: e.target[0].value,
    // }
  }

  function handleChange(ev) {
    setFilters({...filters, [ev.target.name]: ev.target.checked});
  }

  function handleChangeSearch(ev) {
    setSearchValue(ev.target.value);
  }

  function handleRank(ev){
    setRank(ev.target.value);
  }

  useEffect(() => {
    async function fetchData(url, setter) {
      const token = localStorage.getItem('token');
      const res = await api.get(url, {
        headers: { Authorization: 'Bearer ' + token}
      }).catch(err => toast.error(err.response.data.message));
      const parse = (data) => {
        const r = {};
        for(let d of data){
          r[d] = false;
        }
        return r;
      }
      setter(parse(res.data));
    }
    if(!Object.keys(filters).length) fetchData('game/findAllGenres', setFilters);
  }, [filters])

  
  return (<>
    <Sidenav />
    <SideFilter 
      searchGames={searchGames} 
      handleChange={handleChange} 
      filters={filters}
      searchValue={searchValue}
      handleChangeSearch={handleChangeSearch}
    />
    <Container className="topscreen">
      <ToastContainer />
      <Card className="bg-transparent border-0 ml-5">
        <Card.Body className="p-0">
          <Card.Title className="text-light fs-6">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Classificar por: </Form.Label>
              <Col sm="1">
                <Form.Control as="select">
                  {Object.keys(rankings).map((r, i) => {
                    return(
                      <option value={r}>{rankings[r]}</option>
                      )
                    })}
                </Form.Control>
            </Col>
          </Form.Group>
          {/* <Form.Control >
            <label id="label-rank">Classificar por: </label>
            <select
              labelId="label-rank"
              id="select-rank"
              value={rank}
              onChange={handleRank}
            >
              {Object.keys(rankings).map((r, i) => {
                return(
                  <item value={r}>{rankings[r]}</item>
                )
              })}
            </select>
          </Form.Control> */}
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}
