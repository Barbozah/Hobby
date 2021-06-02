import React from 'react';
import Logo from '../../components/ShieldLogo';
import './style.css';

export default function OutOfService() {
  return (
    <div className="wrapper">
      <div id="message">
      <Logo shield width="30"/>
        Desculpe, nosso servico está fora do ar no momento!
      </div>
    </div>
  );
}
