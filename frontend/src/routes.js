import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import RotaProtegida from './components/RotaProtegida';
import NotFound from './components/NotFound';
import Cadastro from './pages/Cadastro';
import Initial from './pages/Initial';
import Login from './pages/Login';
import Home from './pages/Home';
import OutOfService from './pages/OutOfService';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Initial} />
                <Route path="/outOfService" component={ OutOfService }/>
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/login" component={Login}/>
                <RotaProtegida path="/home" component={Home}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}
