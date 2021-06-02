import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/shield.svg';

export default function Logo(props) {

    var width = "80%";
    var alt = "Hobby Games";
    if(!!props.width){
        width = `${props.width}%`;
    }
    if(!!props.alt){
        alt = props.alt;
    }

  return (
    <>   
        <Image src={logo} width={width} alt={alt} />
     
    </>
  )
}