'use client';

import styles from './page.module.css'
import { signOut, useSession } from 'next-auth/react';

export default function Home() {

  const session = useSession();

  // TODO chamar backend para cadastrar o usuario, analisar melhor como vai funcionar o esquema de autenticação
  
  return (
    <div className={styles.content}>
      <div>
          {session?.data?.user?.name}
          <img src={session?.data?.user?.image}></img>
      </div>
      <button onClick={ () => signOut() }>
        Logout
      </button>
    </div>
  )
}
