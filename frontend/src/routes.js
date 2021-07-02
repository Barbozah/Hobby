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
import Carrinho from './pages/Carrinho'
import Biblioteca from './pages/Biblioteca';
import Whishlist from './pages/Wishlist';
import Preferencias from './pages/Preferencias';
import OutOfService from './pages/OutOfService';
import Search from './pages/Search';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Initial} />
                <Route path="/outOfService" component={ OutOfService }/>
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/login" component={Login}/>
                <RotaProtegida path="/library" component={Biblioteca} />
                <RotaProtegida path="/cart" component={Carrinho} />
                <RotaProtegida path="/wishlist" component={Whishlist} />
                <RotaProtegida path="/help" component={Ajuda} />
                <RotaProtegida path="/search" component={Search}/>
                <RotaProtegida path="/home" component={Home}/>
                <RotaProtegida path="/game/:id" component={Game} />
                <RotaProtegida path="/settings" component={Preferencias} />
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}
