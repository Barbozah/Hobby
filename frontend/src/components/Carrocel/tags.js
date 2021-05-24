import React from 'react';
import {Button} from 'react-bootstrap';
import './tags.css';    


export default function Tags(props){

    
    return(
        
        <div className="mb-2">
            {props.tags.map(tag =>(
                <Button variant="secondary" className="botaoTag btn-sm m-1">{tag}</Button>
            ))}
        </div>
           
    )
}