import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Cadastro from './pages/Cadastro';
import Initial from './pages/Initial';
import Login from './pages/Initial/Login';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Initial}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/login" component={Login}/> 
            </Switch>
        </BrowserRouter>
    )
}

