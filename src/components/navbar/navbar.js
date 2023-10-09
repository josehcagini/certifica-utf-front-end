'use client'
import styles from './navbar.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
    const session = useSession();
    const user = session?.user;

    const userType = 0;
    const handleSignOut = (e) => {
        e.preventDefault();
        signOut();
    }

    const toggleDropdown = () => {
        const dropdown = document.querySelector(`.${styles.dropdown}`);
        dropdown.classList.toggle(styles.active);
    }

    const Dropdown = () => {
        return (
            <div className={styles.dropdown}>
                <p className={styles.dropdownItem}>Nome: {user?.name || 'User Name'}</p>
                <p className={styles.dropdownItem}>E-mail: {user?.email || 'useremail@gmail.com'}</p>
                <hr className={styles.hr} />
                {userType == 0 ?
                    <Link href="/gerenciareventos" className={styles.dropdownLink}>Gerenciar Eventos</Link> :
                    <Link href="/certificados" className={styles.dropdownLink}>Meus Certificados</Link>
                }
                <Link href='#' className={styles.sair} onClick={handleSignOut}>Sair</Link>
            </div>
        )
    }


    return (
        <nav className={styles.navbar}>
            {
                userType == 0 ?
                    <Link className={styles.navItem} href="/gerenciareventos">Gerenciar Eventos</Link> :
                    <Link className={styles.navItem} href="/certificados">Certificados</Link>
            }
            <Link className={styles.navItem} href="/">Home</Link>    
            <img className={styles.profileImage} src={'images/avatar.png'} onClick={toggleDropdown} alt="Profile Image" width={50} height={50} />
            
            <Dropdown />



        </nav>
    )
}