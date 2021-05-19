import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SideNav from './components/Sidebar/Sidenav';

import Cadastro from './pages/Cadastro';
import Initial from './pages/Initial';
import Login from './pages/Login';
import Home from './pages/Home';

export default function Routes(){
    return(
        <BrowserRouter>
            <SideNav />
            <Switch>
                <Route path="/" exact component={Initial} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </BrowserRouter>
    )
}
