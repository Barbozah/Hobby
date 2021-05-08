import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

 
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}