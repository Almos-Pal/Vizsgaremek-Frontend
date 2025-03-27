"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './Navbar.module.scss';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import { Text } from '@/components/server';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { ConfirmationModal, Modal } from "../_modal";
import { useEdzes, useModal } from '@/hooks';
import { NewEdzesForm } from '../_forms';

import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const desktopMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const desktopToggleRef = useRef<HTMLButtonElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const startModal = useModal();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const logoutmodal = useModal();
    const [template, setTemplate] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prevOpen) => !prevOpen);
        console.log('Toggle clicked. Menu open:', !menuOpen);
    };

    const handleLogout = () => {
        signOut({ callbackUrl: "/bejelentkezes" });

        logoutmodal.close();
    };

    const currentDate = useMemo(() => new Date().toISOString(), []);
    const currentEdzesID = localStorage.getItem("currentEdzesID");
    const { data: todaysWorkout, isLoading } = useEdzes.findOneByDate(session?.user.user_id!, currentDate);


    const handleNewEdzes = () => {
        console.log(todaysWorkout)


        if (todaysWorkout && todaysWorkout.isFinalized == false) {
            if (currentEdzesID !== todaysWorkout.edzes_id.toString()) {
                
                startModal.open()
            }
            else {

                router.push(`/edzesek/${todaysWorkout?.edzes_id}/szerkeszt`)
            }
        }
        else if (todaysWorkout?.isFinalized) {
            toast.info("A mai napi edzés már befejeződött")
        }
        else if (!todaysWorkout) {
            setTemplate(false)
            setIsModalOpen(true)
        }
    }

    const handleNewEdzesTerv = () => {
        setTemplate(true)
        setIsModalOpen(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen) {
                if (
                    (desktopToggleRef.current && desktopToggleRef.current.contains(event.target as Node)) ||
                    (mobileToggleRef.current && mobileToggleRef.current.contains(event.target as Node))
                ) {
                    return;
                }
                if (
                    (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) &&
                    (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node))
                ) {
                    setMenuOpen(false);
                }
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);
    const routetocurrentedzes = () => {
        router.push(`/edzesek/${todaysWorkout?.edzes_id}/szerkeszt`)
    }
    return (
        <>
            {/* Desktop navbar */}
            <nav className={styles.desktopnavbar}>
                <IconButton icon="HomeIcon" color={pathname === '/dashboard' ? 'secondary' : 'transparent'}
                    iconProps={{ size: 40 }} href={`/dashboard`} />
                <IconButton icon="ProfileIcon" color={pathname === `/profil/${session?.user.user_id}` ? 'secondary' : 'transparent'}
                    href={`/profil/${session?.user.user_id}`} iconProps={{ size: 50 }} />
                <IconButton
                    icon="AddIcon"
                    color="secondary"
                    iconProps={{ size: 60 }}
                    onClick={toggleMenu}
                />
                <IconButton href={'/statisztika'} icon="ChartIcon" color={pathname === '/statisztika' ? 'secondary' : 'transparent'}
                    iconProps={{ size: 40 }} />
                <IconButton
                    icon="LogoutIcon"
                    color="transparent"
                    iconProps={{ size: 40 }}
                    style={{ paddingLeft: '15px' }}
                    onClick={() => logoutmodal.open()}
                />
            </nav>

            {/* Desktop Menu */}
            <div
                id="desktopMenu"
                ref={desktopMenuRef}
                className={`${styles.desktopMenu} ${menuOpen ? styles.desktopMenuOpen : ''}`}
            >
                {/* Menu items */}
                <div className={styles["menuContent"]}>
                    <Button onClick={handleNewEdzes} rightIcon="DumbellIcon" iconProps={{ size: 45 }} width={350} style={{ marginBottom: 20 }}>
                        {Number(currentEdzesID) === todaysWorkout?.edzes_id && todaysWorkout?.isFinalized == false ? "Edzés Folytatása" : "Edzés Kezdése"}

                    </Button>
                    <Button onClick={handleNewEdzesTerv} rightIcon="PenPaperIcon" iconProps={{ size: 45 }} width={350} color="secondary" style={{ marginBottom: 20 }}>
                        Új EdzésTerv
                    </Button>
                    <Text variant="h5" style={{ marginBottom: 20 }}>Saját gyűlytemény</Text>
                    <Button width={350} style={{ marginBottom: 20 }} href={'/edzesek'}>Edzés Előzmények</Button>
                    <Button width={350} color='secondary' style={{ marginBottom: 20 }} href={'/edzestervek'}>Edzéstervek</Button>
                    <Button width={350} color='secondary' rightIcon='FavoriteIcon' iconProps={{ filled: true, size: 40 }} style={{ marginBottom: 20 }} href={'/kedvencek'}>Kedvenc edzések</Button>
                    <Button width={350} color="secondary" style={{ marginBottom: 20 }} href={'/gyakorlatok'}>Gyakorlatok</Button>
                </div>
                {session?.user.isAdmin && (

                    <div className={styles["adminButttonWrapper"]}>

                        <Button width={350} href={"/admin"} rightIcon="ProfileIcon" iconProps={{ size: 35 }} additionalClassName={styles["admin-button-desktop"]}>
                            Admin felület
                        </Button>
                    </div>

                )}
            </div>

            {/* Mobile navbar */}
            <nav className={styles.mobilenavbar}>
                <div className={styles.navItem}>
                    <IconButton href={'/dashboard'} icon="HomeIcon" color={pathname === '/dashboard' ? 'secondary' : 'transparent'}
                        iconProps={{ size: 30 }} />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Főoldal
                    </Text>
                </div>
                <div className={styles.navItem}>
                    <IconButton icon="ProfileIcon" href={`/profil/${session?.user.user_id}`} color={pathname === `/profil/${session?.user.user_id}` ? 'secondary' : 'transparent'}
                        iconProps={{ size: 40 }} />
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
                    <IconButton icon="ChartIcon" color={pathname === '/statisztika' ? 'secondary' : 'transparent'}
                        iconProps={{ size: 30 }} href={'/statisztika'} />
                    <Text variant="caption" color="var(--color-grey-300)">
                        Statisztika
                    </Text>
                </div>
                <div className={styles.navItem}>
                    <IconButton icon="LogoutIcon" onClick={() => logoutmodal.open()} color="transparent" iconProps={{ size: 30 }} />
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
                    <Button  onClick={handleNewEdzes} additionalClassName={styles.mobilebutton} rightIcon="DumbellIcon" iconProps={{ size: 45 }} width="90%" style={{ marginBottom: 20 }}>
                        {Number(currentEdzesID) === todaysWorkout?.edzes_id && todaysWorkout?.isFinalized == false ? "Edzés Folytatása" : "Edzés Kezdése"}
                    </Button>
                    <Button  onClick={handleNewEdzesTerv} additionalClassName={styles.mobilebutton} rightIcon="PenPaperIcon" iconProps={{ size: 45 }} width="90%" color="secondary" style={{ marginBottom: 20 }}>
                        Új EdzésTerv
                    </Button>
                    <Text variant="h5" style={{ marginBottom: 20 }}>
                        Saját gyűlytemény
                    </Text>
                    <Button additionalClassName={styles.mobilebutton} width="90%" color='primary' style={{ marginBottom: 20 }} href={'/edzesek'}>Edzés Előzmények</Button>
                    <Button additionalClassName={styles.mobilebutton} width="90%" color='secondary' style={{ marginBottom: 20 }} href={'/edzestervek'}>Edzéstervek</Button>
                    <Button additionalClassName={styles.mobilebutton} rightIcon='FavoriteIcon' iconProps={{ filled: true, size: 40 }} width="90%" color='secondary' style={{ marginBottom: 20 }} href={'/kedvencek'}>Kedvenc Edzések</Button>
                    <Button additionalClassName={styles.mobilebutton} width="90%" color="secondary" style={{ marginBottom: 20 }} href={'/gyakorlatok'}>Gyakorlatok</Button>

                    {session?.user.isAdmin && (

                        <Button width="90%" href={"/admin"} rightIcon="ProfileIcon" style={{ marginBottom: 20 }} iconProps={{ size: 35 }} additionalClassName={styles["admin-button-desktop"]}>
                            Admin felület
                        </Button>
                    )}
                </div>
            </div>
            <ConfirmationModal visible={logoutmodal.visible} onConfirm={handleLogout} title="Biztos kiszeretne jelentkezni?" onCancel={logoutmodal.close} />


            <Modal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                showCloseButton={false}>
                <NewEdzesForm template={template}  onSuccess={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} />
            </Modal>

            <ConfirmationModal visible={startModal.visible} onConfirm={routetocurrentedzes} title="Biztosan el szeretné indítani a mai edzését?" onCancel={startModal.close}/>
        </>
    );
};

export default Navbar;
