'use client';

import React from 'react';
import styles from './page.module.css'
import { signIn } from 'next-auth/react'
import Spinner from '@/components/spinner';

export default function ButtonLogin() {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleLogin = () => {
        setIsLoading(true);
        signIn('google').catch(() => {
            alert('Erro ao tentar entrar com Google\nTente novamente mais tarde');
        }).finally(() => {
            setIsLoading(false);
        });
    }
    return (
        <div className={styles.content}
            style={{
                pointerEvents: isLoading ?
                    'none' : 'auto',
                backgroundColor: isLoading ?
                    '#e0e0e0' : '#ffffff'
            }} onClick={handleLogin}>
            {isLoading ? <> <Spinner />
                <div className={styles.text}>Aguarde...</div>
            </> : <>
                <img src='/images/google.png' width={30} height={30} />
                <div className={styles.text}>Entrar com Google</div>
            </>}
        </div>
    );
}