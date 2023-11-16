'use client'
import styles from './navbar.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
    const session = useSession();
    const userType = 0 /*session?.data?.user?.roles[0]*/
    
    const handleSignOut = (e) => {
        e.preventDefault();
        signOut().then(() => {
            location.href = '/';
        });        
    }

    const toggleDropdown = () => {
        const dropdown = document.querySelector(`.${styles.dropdown}`);
        dropdown.classList.toggle(styles.active);
    }

    const Dropdown = () => {
        return (
            <div className={styles.dropdown} onMouseLeave={toggleDropdown}>
                <p className={styles.dropdownItem}>Nome: {session?.data?.user?.name}</p>
                <p className={styles.dropdownItem}>E-mail: {session?.data?.user?.email}</p>
                <hr className={styles.hr} />
                {userType == 0 ?<>
                    <Link href="/evento/gerenciar" className={styles.dropdownLink}>Gerenciar Eventos</Link>
                    <Link href="/evento/criar" className={styles.dropdownLink}>Criar Evento</Link>
                    </> :
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
                    <Link className={styles.navItem} href="/evento/gerenciar">Gerenciar Eventos</Link> :
                    <Link className={styles.navItem} href="/certificados">Certificados</Link>
            }
            <Link className={styles.navItem} href="/">Home</Link>    
            <img className={styles.profileImage} src={`${session?.data?.user?.image}`} onClick={toggleDropdown} alt={`${session?.data?.user?.name || 'Perfil'}`} width={50} height={50} />
            <Dropdown />
        </nav>
    )
}