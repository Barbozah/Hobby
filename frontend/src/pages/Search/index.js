import api from '../../service/api';
import React, { useEffect, useState } from 'react';
import {Container, Card, InputGroup, CardGroup} from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import SideFilter from '../../components/Sidebar/SideFilter';
import Sidenav from '../../components/Sidebar/Sidenav';
import { ToastContainer, toast } from 'react-toastify';
import './style.css'

export default function Search() {

  const rankings = ['Preço', 'Estrelas'];

  const [games, setGames] = useState([]);

  const [filters, setFilters] = useState({});

  const [rank, setRank] = useState('Preço');

  const [searchValue, setSearchValue] = useState('');

  function searchGames(e){
    e.preventDefault();
    const query = {
      title: e.target[0].value,
    }
    console.log(query)
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

  function clique(){

  }

  useEffect(() => {
    async function fetchData(url, setter) {
      const token = localStorage.getItem('token');
      const res = await api.get(url, {
        headers: { Authorization: 'Bearer ' + token}
      }).catch(err => toast.error(err.response.data.message));
      setter(res.data);
    }
    if(!Object.keys(filters).length) 
      fetchData('game/findAllGenres', (data) => {
        const parse = (data) => {
          const r = {};
          for(let d of data){
            r[d] = false;
          }
          return r;
        }
        setFilters(parse(data));
      });
    fetchData('game?size=20', setGames);
  }, [filters, setGames])

  
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
            <InputGroup className='mt-1'>
              <InputGroup.Prepend>
                <InputGroup.Text>Classificar por: </InputGroup.Text>
              </InputGroup.Prepend>
              <div>
                <Form.Control as="select" value={rank} onChange={handleRank}>
                  {rankings.map((r, i) => {
                    return(
                      <option value={r} key={i}>{r}</option>
                      )
                    })}
                </Form.Control>
              </div>
            </InputGroup>
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <CardGroup>
        {games.map((game, index) => 
            <Card className="efeito" key={index} onClick={() => clique(game._id)}>
              <Card.Body className="card-body-search">
                  <Card.Img src={game.mainImage} className="img-card" />
              </Card.Body>
              <Card.Footer className="p-0 d-inline-flex justify-content-between text-center bg-secondary">
                  <h6 className="text-light">R$ {game.price.toFixed(2).toString().replaceAll(".",",")} </h6>
              </Card.Footer>
            </Card>
        )}
      </CardGroup>
    </>
  );
}
