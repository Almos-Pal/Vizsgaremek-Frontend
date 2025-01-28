"use client";

import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { Icons } from '@/components/server';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { Text } from '@/components/server';
import { on } from 'events';



const Navbar: React.FC = () => {

    const [menuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {
        setMenuOpen((prevOpen) => !prevOpen);
        console.log('Menu clicked');
        console.log(menuOpen)
    };


    return (
        <>
            {/* Desktop navbar */}
            <nav className={styles.desktopnavbar}>
                <IconButton
                    icon="HomeIcon"
                    color="transparent"
                    iconProps={{ size: 40 }}
                />
                <IconButton
                    icon="ProfileIcon"
                    color="transparent"
                    iconProps={{ size: 50 }}
                />
                <IconButton
                    icon="AddIcon"
                    color="secondary"
                    iconProps={{ size: 60 }}
                    onClick={toggleMenu}
                />

                <IconButton
                    icon="ChartIcon"
                    color="transparent"
                    iconProps={{ size: 40 }}
                />
                <IconButton
                    icon="LogoutIcon"
                    color="transparent"
                    iconProps={{ size: 40 }}
                    style={{ paddingLeft: '15px' }}
                />

                <div id='deskptopMenu'   className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}                >
                    {/* Menu items go here */}
                    <Button  rightIcon='DumbellIcon' iconProps={{ size: 45 }} width={350} style={{marginBottom: 20}}   >Edzés Kezdése</Button>
                    <Button rightIcon='PenPaperIcon' iconProps={{ size: 45 }} width={350} color='secondary' style={{marginBottom: 20}} >Edzéstervező</Button>
                    <Button rightIcon='CalendarIcon' iconProps={{ size: 50 }} width={350} color='secondary'style={{marginBottom: 20}} >Edzésterv-tervező</Button>

                    <Text variant='h5' style={{marginBottom: 20}}> Saját gyűlytemény</Text>

                    <Button width={350} style={{marginBottom: 20}}>Edzéstervek</Button>
                    <Button width={350} color='secondary' style={{marginBottom: 20}}>Gyakorlatok</Button>
                    {/* ...and so on */}
                </div>
            </nav>




            {/* Mobile navbar  */}
            <nav className={styles.mobilenavbar}>
                <div className={styles.navItem}>
                    <IconButton
                        icon="HomeIcon"
                        color="transparent"
                        iconProps={{ size: 30 }}
                    />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Főoldal
                    </Text>
                </div>

                <div className={styles.navItem}>
                    <IconButton
                        icon="ProfileIcon"
                        color="transparent"
                        iconProps={{ size: 40 }}
                    />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Profil
                    </Text>
                </div>

                <div className={styles.navItem}>
                    <IconButton onClick={toggleMenu}
                        icon="AddIcon"
                        color="secondary"
                        iconProps={{ size: 50 }}
                    />
                </div>

                <div className={styles.navItem}>
                    <IconButton
                        icon="ChartIcon"
                        color="transparent"
                        iconProps={{ size: 30 }}
                    />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Statisztika
                    </Text>
                </div>

                <div className={styles.navItem}>
                    <IconButton
                        icon="LogoutIcon"
                        color="transparent"
                        iconProps={{ size: 30 }}
                    />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Kilépés
                    </Text>
                </div>


                <div id='mobileMenu'  className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}                >
                    <div className={styles.innerMenu}>
                        {/* Menu items go here */}
                        <Button  rightIcon='DumbellIcon' iconProps={{ size: 45 }} width={"100%"} style={{marginBottom: 20}} >Edzés Kezdése</Button>
                        <Button rightIcon='PenPaperIcon' iconProps={{ size: 45 }} width={"100%"} color='secondary' style={{marginBottom: 20}}>Edzéstervező</Button>
                        <Button rightIcon='CalendarIcon' iconProps={{ size: 45 }} width={"100%"} color='secondary'style={{marginBottom: 20}} >Edzésterv-tervező</Button>
                        <Text variant='h5' style={{marginBottom: 20}}> Saját gyűlytemény</Text>
                        <Button width={"100%"} style={{marginBottom: 20}}>Edzéstervek</Button>
                        <Button width={"100%"} color='secondary' style={{marginBottom: 20}}>Gyakorlatok</Button>
                        {/* ...and so on */}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;