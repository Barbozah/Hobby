import React from 'react';


import {Route, Redirect} from 'react-router-dom';

export default function RotaProtegida(props){
    const logado = !!localStorage.getItem('token');
    return logado ? <Route {...props}/> : <Redirect to="/"/>
}