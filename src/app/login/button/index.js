'use client';

import React from 'react';
import styles from './page.module.css'
import { signIn } from 'next-auth/react'

export default function ButtonLogin(){
    return(
        <div className={styles.content} onClick={ () => signIn('google')}> 
            <img src='/images/google.png' width={30} height={30}/>
            <div className={styles.text}>Sign in with Google</div>
        </div>
    );
}