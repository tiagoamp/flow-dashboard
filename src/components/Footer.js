import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer>
            <div className='header-info'>
                <span className='header-copyright'>dashboard {t('by')} tiago.albuquerque (@tiagoamp)</span>
            </div>
        </footer>
    )
}
