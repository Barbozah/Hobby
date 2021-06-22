import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import RotaProtegida from './components/RotaProtegida';
import NotFound from './components/NotFound';
import Cadastro from './pages/Cadastro';
import Initial from './pages/Initial';
import Login from './pages/Login';
import Home from './pages/Home';
import Game from './pages/Game';
import Ajuda from './pages/Ajuda';
import Biblioteca from './pages/Biblioteca';
import Whishlist from './pages/Wishlist';
import OutOfService from './pages/OutOfService';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Initial} />
                <Route path="/outOfService" component={ OutOfService }/>
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/login" component={Login}/>
                <RotaProtegida path="/library" component={Biblioteca} />
                <RotaProtegida path="/wishlist" component={Whishlist} />
                <RotaProtegida path="/help" component={Ajuda} />
                <RotaProtegida path="/home" component={Home}/>
                <RotaProtegida path="/game/:id" component={Game} />
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}
