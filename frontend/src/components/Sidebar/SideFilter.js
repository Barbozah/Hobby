import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineClose } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { FaFilter } from 'react-icons/fa'
import { Form, InputGroup } from 'react-bootstrap';
import './SideFilter.css'

export default function SideFilter(props) {

  const {
    handleChangeFilter,
    handleChangeSearch,
    filters
  } = props;

  const [searchFilter, setSearchFilter] = useState('')

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
                onChange={handleChangeSearch}
              />
              <InputGroup.Append>
                { Object.values(filters).filter(f=>f).length > 0 ? 
                  <FaFilter className="icon-filter" onClick={toggleSideFilter} /> :
                  <FiFilter className="icon-filter" onClick={toggleSideFilter} />
                }
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <div className={sideFilter ? 'search-menu active' : 'search-menu'}>
          <ul className='search-menu-items'>
            <li className='searchbar-toggle'>
              <Form>
                <Form.Control 
                  type="text"
                  className="input-search"
                  placeholder="Gênero"
                  value={searchFilter}
                  onChange={(ev) => setSearchFilter(ev.target.value)}
                />
              </Form>
              <div className='menu-search-close' onClick={toggleSideFilter}>
                <AiOutlineClose />
              </div>
            </li>
            <br />
            <Form>
              <ul className='search-menu-items'>
                {!!filters && Object.keys(filters)
                  .filter(f => f.toUpperCase().includes(searchFilter.toUpperCase()))
                  .map((filter, index) => {
                    return (
                      <li key={index} className="search-text">
                        <Form.Check
                          type="checkbox"
                          name={filter}
                          label={filter}
                          checked={filters[filter]}
                          onChange={handleChangeFilter}
                        />
                      </li>
                    );
                  })
                }
              </ul>
            </Form>
          </ul>
        </div>
      </IconContext.Provider>
    </>
  )
}