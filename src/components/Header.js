import React from 'react'
import { useTranslation } from 'react-i18next';
import './Header.css'

export default function Header(props) {
    const { t } = useTranslation();
    const projectName = props.project;
    const timestamp = new Date().toLocaleString('pt-BR'); // if necessary: 'pt-BR' locale available 
    return (
        <div className='header'>
            <div className='header-brand'>
                Dashboard { projectName ? `(${projectName})` : null }
            </div>
            <div className='header-info'>
                <span>{t('timestamp')}: { timestamp }</span> <br/>
                <span className='header-copyright'>{t('by')} tiago.albuquerque (@tiagoamp)</span>
            </div>            
        </div>
    )
}
