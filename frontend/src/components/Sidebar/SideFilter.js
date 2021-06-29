import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineClose } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { Form, InputGroup } from 'react-bootstrap';
import './SideFilter.css'

export default function SideFilter(props) {

  const {
    searchGames,
    handleChange,
    filters,
    searchValue,
    handleChangeSearch
  } = props;

  const [sideFilter, setSideFilter] = useState(false)

  const toggleSideFilter = () => setSideFilter(!sideFilter)

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidesearch'>
          <div className='menu-search'>
          <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar"
                className="input-search back-filter"
                value={searchValue}
                onChange={(ev) => handleChangeSearch(ev)}
              />
              <InputGroup.Append>
                <FiFilter className="icon-filter" onClick={toggleSideFilter} />
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <div className={sideFilter ? 'search-menu active' : 'search-menu'}>
          <ul className='search-menu-items'>
            <li className='searchbar-toggle'>
              <Form onSubmit={searchGames}>
                <Form.Control 
                  type="text"
                  className="input-search"
                  placeholder="Buscar"
                  value={searchValue}
                  onChange={(ev) => handleChangeSearch(ev)}
                />
              </Form>
              <div className='menu-search-close' onClick={toggleSideFilter}>
                <AiOutlineClose />
              </div>
            </li>
            <br />
            <Form onSubmit={searchGames}>
              <ul className='search-menu-items'>
                {!!filters && Object.keys(filters).map((filter, index) => {
                  return (
                    <li key={index} className="search-text">
                      <Form.Check
                        type="checkbox"
                        name={filter}
                        label={filter}
                        checked={filters[filter]}
                        onChange={handleChange}
                      />
                    </li>
                  );
                })}
              </ul>
            </Form>
          </ul>
        </div>
      </IconContext.Provider>
    </>
  )
}