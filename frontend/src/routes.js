import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

 
import Initial from './pages/Initial';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Login from './pages/Initial/Login';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Initial}/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}