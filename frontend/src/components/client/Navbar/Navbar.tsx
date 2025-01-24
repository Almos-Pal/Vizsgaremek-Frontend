import React from 'react';
import styles from './Navbar.module.scss';
import { Icons } from '@/components/server';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { HomeIcon } from '@/components/server/Icons';


const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <IconButton icon='HomeIcon' color='transparent' iconProps={{size: 36}} />
            <IconButton icon='ProfileIcon' color='transparent' iconProps={{size: 40}} />
            <IconButton icon='AddIcon' color='secondary' iconProps={{size: 50}} />
            <IconButton icon='ChartIcon' color='transparent' iconProps={{size: 33}} />
            <IconButton icon='LogoutIcon' color='transparent' iconProps={{size: 33}} style={{paddingLeft: '15px'}}/>
        </nav>

    );
};

export default Navbar;