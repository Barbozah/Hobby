import React from 'react';
import {Button} from 'react-bootstrap';
import './tags.css';    


export default function Tags(props){

    
    return(
        
        <div className="mb-2">
            {props.tags.map((tag,index) =>(
                <Button variant="secondary" className="botaoTag btn-sm m-1" key={index}>{tag}</Button>
            ))}
        </div>
           
    )
}