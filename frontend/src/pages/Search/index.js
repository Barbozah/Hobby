import api from '../../service/api';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {Container, Card, InputGroup, Spinner } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import SideFilter from '../../components/Sidebar/SideFilter';
import Sidenav from '../../components/Sidebar/Sidenav';
import Pagination from '../../components/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import * as QueryString from "query-string"
import './style.css'

export default function Search(props) {
  
  const parsed = QueryString.parse(props.location.search);

  const rankings = ['Nome', 'Preço', 'Estrelas'];
  
  const [rank, setRank] = useState('Nome');

  const pageSizes = [12, 24, 32, 48, 52, 100];

  const [pageSize, setPageSize] = useState(12)

  const [games, setGames] = useState([]);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({});

  const [lastSearch, setLastSearch] = useState('');

  const [busy, setBusy] = useState(false);

  const history = useHistory();

  const searchGames = useCallback((value) => {
    setBusy(true);
    setLastSearch(value);

    const sort = {
      'Nome': 'title',
      'Preço': 'price',
      'Estrelas': 'starsAverage_desc'
    }[rank];
    const query = {
      query: {title: {$regex: value, $options: 'i'}},
      sort: sort,
      page: page-1,
      size: pageSize
    }
    const genres = Object.keys(filters)
      .filter(g => filters[g]);
    if(genres.length > 0) query.query.genres = genres;
    const token = localStorage.getItem('token');
    api.post('game/search', query, {
      headers: { Authorization: 'Bearer ' + token}
    }).then((res) => {
      api.post('game/total', query, {
        headers: { Authorization: 'Bearer ' + token}
      }).then(res => setTotal(res.data))
        .catch(err => toast.error(err.response.data.message))
      setGames(res.data)
      setBusy(false);
    })
    .catch(err => toast.error(err.response.data.message));
  }, [filters, page, pageSize, rank])

  function handleChangeFilter(ev) {
    setFilters({...filters, [ev.target.name]: ev.target.checked});
  }

  function handleChangeSearch(ev) {
    searchGames(ev.target.value)
  }

  const handlePage = useCallback((p) => {
    setPage(p);
  }, []);

  function clique(id){
    history.push(`/game/${id}`)
  }

  const fetchData = useCallback(async (url, setter, op) => {
    const token = localStorage.getItem('token');
    if(!op) {
      const res = await api.get(url, {
        headers: { Authorization: 'Bearer ' + token}
      }).catch(err => toast.error(err.response.data.message));
      setter(res.data);
    }else{
      const res = await api.post(url, op, {
        headers: { Authorization: 'Bearer ' + token}
      }).catch(err => toast.error(err.response.data.message));
      setter(res.data);
    }
  }, []);

  const fetchGames = useCallback(async () => {
    const token = localStorage.getItem('token');
    api.post('game/total', {}, {
      headers: { Authorization: 'Bearer ' + token}
    }).then(res => {
      setTotal(res.data);
    }).catch(err => toast.error(err.response.data.message));
    fetchData('game/search', setGames, {
      sort: 'title',
      size: 12
    });
  }, [fetchData]);

  useEffect(() => {
    searchGames(lastSearch);
  }, [page, lastSearch, searchGames])

  useEffect(() => {
    if(!Object.keys(filters).length) 
      fetchData('game/findAllGenres', (data) => {
        const parse = (data) => {
          const r = {};
          for(let d of data){
            r[d] = false;
          }
          if(parsed.g !== undefined)
            r[parsed.g] = true
          return r;
        }
        setFilters(parse(data));
      }).then(() => fetchGames());
  }, [filters, fetchData, fetchGames, parsed.g])

  
  return (<>
      <Sidenav />
      <SideFilter 
        handleChangeFilter={handleChangeFilter} 
        handleChangeSearch={handleChangeSearch}
        filters={filters}
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
                <Form.Control as="select" value={rank} onChange={(ev) => setRank(ev.target.value)}>
                  {rankings.map((r, i) => {
                    return(
                      <option value={r} key={i}>{r}</option>
                      )
                    })}
                </Form.Control>
              </div>
              <InputGroup.Prepend>
                <InputGroup.Text>Jogos por página: </InputGroup.Text>
              </InputGroup.Prepend>
              <div>
                <Form.Control as="select" value={pageSize} onChange={(ev) => setPageSize(ev.target.value)}>
                  {pageSizes.map((r, i) => {
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
      {games.length < 1 ?
      <Container><h2>Nenhum resultado encontrado</h2></Container> :
      <>
        <Container>
          <Pagination
            totalRecords={total-1}
            pageLimit={pageSize}
            pageNeighbours={13}
            onPageChanged={handlePage}
          ></Pagination>
        </Container>
        <Container>
          { busy ? <Spinner animation="border" /> :
            <div className="card-wrapper">
              {games.map((game, index) => 
                  <Card className="efeito card-w-item" key={index} onClick={() => clique(game._id)}>
                    <Card.Body className="card-body-search">
                        <Card.Img src={game.mainImage} className="img-card" />
                    </Card.Body>
                    <Card.Footer className="text-center bg-secondary">
                        <h6 className="text-light">R$ {game.price.toFixed(2).toString().replaceAll(".",",")} </h6>
                    </Card.Footer>
                  </Card>
              )}
            </div>
          }
        </Container>
      </>
    }
    </>
  );
}
