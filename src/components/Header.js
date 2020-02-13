import React from 'react'
import './Header.css'

export default function Header(props) {
    const projectName = props.project;
    const timestamp = new Date().toLocaleString('pt-BR'); // if necessary: 'pt-BR' locale available 
    return (
        <div className='header'>
            <div className='header-brand'>
                Dashboard { projectName ? `(${projectName})` : null }
            </div>
            <div className='header-info'>
                <span>Gerado as: { timestamp }</span> <br/>
                <span className='header-copyright'>por tiago.albuquerque (@tiagoamp)</span>
            </div>            
        </div>
    )
}
