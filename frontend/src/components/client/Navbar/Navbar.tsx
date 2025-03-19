"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.scss';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { Text } from '@/components/server';
import { signOut, useSession } from 'next-auth/react';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopToggleRef = useRef<HTMLButtonElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);
    const { data: session } = useSession();

    const toggleMenu = () => {
        setMenuOpen((prevOpen) => !prevOpen);
        console.log('Menu clicked', menuOpen);
    };

    const handleLogout = () => {
        signOut({ callbackUrl: "/bejelentkezes" });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen) {
                // If the click is on one of the toggle buttons, do nothing.
                if (
                    (desktopToggleRef.current && desktopToggleRef.current.contains(event.target as Node)) ||
                    (mobileToggleRef.current && mobileToggleRef.current.contains(event.target as Node))
                ) {
                    return;
                }
                // If the click is outside both menu containers, close the menu.
                if (
                    desktopMenuRef.current &&
                    !desktopMenuRef.current.contains(event.target as Node) &&
                    mobileMenuRef.current &&
                    !mobileMenuRef.current.contains(event.target as Node)
                ) {
                    setMenuOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <>
            {/* Desktop navbar */}
            <nav className={styles.desktopnavbar}>
                <IconButton icon="HomeIcon" color="transparent" iconProps={{ size: 40 }} href={`/dashboard`} />
                <IconButton icon="ProfileIcon" color="transparent" href={`/profil/${session?.user.user_id}`} iconProps={{ size: 50 }} />
                <IconButton
                    ref={desktopToggleRef}
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

            {/* Desktop Menu */}
            <div
                id="desktopMenu"
                ref={desktopMenuRef}
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
                <Button width={350} style={{ marginBottom: 20 }} href={'/edzestervek'}>Edzéstervek</Button>
                <Button width={350} color='secondary' style={{ marginBottom: 20 }} href={'/edzes'}>Edzés Előzmények</Button>
                <Button width={350} color="secondary" style={{ marginBottom: 20 }} href={'/gyakorlat'}>Gyakorlatok</Button>
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
                        ref={mobileToggleRef}
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
            </nav>
            <div
                id="mobileMenu"
                ref={mobileMenuRef}
                className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
            >
                <div className={styles.innerMenu}>
                    {/* Menu items */}
                    <Button additionalClassName={styles.mobilebutton} rightIcon="DumbellIcon" iconProps={{ size: 45 }} width="90%" style={{ marginBottom: 20 }}>
                        Edzés Kezdése
                    </Button>
                    <Button additionalClassName={styles.mobilebutton} rightIcon="PenPaperIcon" iconProps={{ size: 45 }} width="90%" color="secondary" style={{ marginBottom: 20 }}>
                        Edzéstervező
                    </Button>
                    <Button additionalClassName={styles.mobilebutton} rightIcon="CalendarIcon" iconProps={{ size: 45 }} width="90%" color="secondary" style={{ marginBottom: 20 }}>
                        Edzésterv-tervező
                    </Button>
                    <Text variant="h5" style={{ marginBottom: 20 }}>
                        Saját gyűlytemény
                    </Text>
                    <Button additionalClassName={styles.mobilebutton} width="90%" style={{ marginBottom: 20 }} href={'/edzestervek'}>Edzéstervek</Button>
                    <Button additionalClassName={styles.mobilebutton} width="90%" color='secondary' style={{ marginBottom: 20 }} href={'/edzes'}>Edzés Előzmények</Button>
                    <Button additionalClassName={styles.mobilebutton} width="90%" color="secondary" style={{ marginBottom: 20 }} href={'/gyakorlat'}>Gyakorlatok</Button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
