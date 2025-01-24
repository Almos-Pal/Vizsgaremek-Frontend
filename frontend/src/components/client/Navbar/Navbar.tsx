import React from 'react';
import styles from './Navbar.module.scss';
import { Icons } from '@/components/server';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { Text } from '@/components/server';



const Navbar: React.FC = () => {
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
                    <IconButton
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
            </nav>
        </>
    );
};

export default Navbar;