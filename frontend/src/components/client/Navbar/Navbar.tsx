"use client";
import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { Text } from '@/components/server';
import { signOut, useSession } from 'next-auth/react';


const Navbar: React.FC = () => {

    const toggleMenu = () => {
        setMenuOpen((prevOpen) => !prevOpen);
        console.log('Menu clicked', menuOpen);
    };
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession();
    console.log('navbar session: ', session?.user.user_id)

    const handleLogout = () => {
        signOut({ callbackUrl: "/bejelentkezes" }); // or "/" or any other route
    };

    return (
        <>
            {/* Desktop navbar */}
            <nav className={styles.desktopnavbar}>
                <IconButton icon="HomeIcon" color="transparent" iconProps={{ size: 40 }} href={`/dashboard`}  />
                <IconButton icon="ProfileIcon" color="transparent" href={`/profil/${session?.user.user_id}`} iconProps={{ size: 50 }} />
                <IconButton
                    icon="AddIcon"
                    color="secondary"
                    iconProps={{ size: 60 }}
                    onClick={toggleMenu}
                />
                <IconButton icon="ChartIcon" color="transparent" iconProps={{ size: 40 }} />
                <IconButton
                    icon="LogoutIcon"
                    color="transparent"
                    iconProps={{ size: 40 }}
                    style={{ paddingLeft: '15px' }}
                    onClick={handleLogout}
                />
            </nav>

            {/* Desktop Menu as a sibling element */}
            <div
                id="desktopMenu"
                className={`${styles.desktopMenu} ${menuOpen ? styles.desktopMenuOpen : ''}`}
            >
                {/* Menu items */}
                <Button rightIcon="DumbellIcon" iconProps={{ size: 45 }} width={350} style={{ marginBottom: 20 }}>
                    Edzés Kezdése
                </Button>
                <Button rightIcon="PenPaperIcon" iconProps={{ size: 45 }} width={350} color="secondary" style={{ marginBottom: 20 }}>
                    Edzéstervező
                </Button>
                <Button rightIcon="CalendarIcon" iconProps={{ size: 50 }} width={350} color="secondary" style={{ marginBottom: 20 }}>
                    Edzésterv-tervező
                </Button>
                <Text variant="h5" style={{ marginBottom: 20 }}>Saját gyűlytemény</Text>
                <Button width={350} style={{ marginBottom: 20 }}>Edzéstervek</Button>
                <Button width={350} color="secondary" style={{ marginBottom: 20 }}>Gyakorlatok</Button>
            </div>

            {/* Mobile navbar */}
            <nav className={styles.mobilenavbar}>
                <div className={styles.navItem}>
                    <IconButton icon="HomeIcon" color="transparent" iconProps={{ size: 30 }} />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Főoldal
                    </Text>
                </div>
                <div className={styles.navItem}>
                    <IconButton icon="ProfileIcon" href={`/profil/${session?.user.user_id}`} color="transparent" iconProps={{ size: 40 }} />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Profil
                    </Text>
                </div>
                <div className={styles.navItem}>
                    <IconButton
                        icon="AddIcon"
                        color="secondary"
                        iconProps={{ size: 50 }}
                        onClick={toggleMenu}
                    />
                </div>
                <div className={styles.navItem}>
                    <IconButton icon="ChartIcon" color="transparent" iconProps={{ size: 30 }} />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Statisztika
                    </Text>
                </div>
                <div className={styles.navItem}>
                    <IconButton icon="LogoutIcon" onClick={handleLogout} color="transparent" iconProps={{ size: 30 }} />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Kilépés
                    </Text>
                </div>

                {/* Mobile Menu using separate mobile classes */}
            </nav>
            <div
                id="mobileMenu"
                className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
            >
                <div className={styles.innerMenu}>
                    {/* Menu items go here */}
                    <Button additionalClassName={styles.mobilebutton} rightIcon="DumbellIcon" iconProps={{ size: 45 }} width="100%" style={{ marginBottom: 20 }}>
                        Edzés Kezdése
                    </Button>
                    <Button additionalClassName={styles.mobilebutton} rightIcon="PenPaperIcon" iconProps={{ size: 45 }} width="100%" color="secondary" style={{ marginBottom: 20 }}>
                        Edzéstervező
                    </Button>
                    <Button additionalClassName={styles.mobilebutton} rightIcon="CalendarIcon" iconProps={{ size: 45 }} width="100%" color="secondary" style={{ marginBottom: 20 }}>
                        Edzésterv-tervező
                    </Button>
                    <Text variant="h5" style={{ marginBottom: 20 }}>
                        Saját gyűlytemény
                    </Text>
                    <Button additionalClassName={styles.mobilebutton} width="100%" style={{ marginBottom: 20 }}>
                        Edzéstervek
                    </Button>
                    <Button additionalClassName={styles.mobilebutton} width="100%" color="secondary" style={{ marginBottom: 20 }}>
                        Gyakorlatok
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Navbar;