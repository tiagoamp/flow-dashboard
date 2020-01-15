import React from 'react'
import './Header.css'

export default function Header(props) {
    const projectName = props.project;
    const timestamp = new Date().toLocaleString(); // TODO: locale formatter !!!
    return (
        <div className='header'>
            <div className='header-brand'>
                Dashboard { projectName ? `(${projectName})` : null }
            </div>
            <div className='header-info'>
                <span>Generated at: { timestamp }</span> <br/>
                <span className='header-copyright'>by @tiagoamp</span>
            </div>            
        </div>
    )
}
