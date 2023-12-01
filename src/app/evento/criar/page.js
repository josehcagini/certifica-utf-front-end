'use client';

import Conteudo from '@/components/criarEvento/conteudo';
import StepNavigation from '@/components/stepNavigation' 
import styles from './page.module.css'
import { useState } from 'react'
import { isAdmin } from '@/services/user/userService';
import { getUserRole } from '@/services/session/sessionService';
import { useSession } from 'next-auth/react';

export default function CriarEvento() {

    const steps = ['Dados Evento', 'Criar Certificado', 'Finalizar']
    const [ currentStep, setCurrentStep ] = useState(1);

    function updateStep( step ){
        setCurrentStep( step );
    }

    if ( !isAdmin(getUserRole(useSession())) ) {
        // Melhorar a forma de gerenciar as permissões
        // E exibir uma mensagem mais amigável
        // Sugestão: https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
        // Utilizar nas outras páginas também
        return(
            <h1 style={{marginTop:'4rem',textAlign:'center'}}>Você não tem permissão para acessar essa página</h1>
        )
    }
    

    return (
        <div className={styles.content}>
            <div className={styles.contentAlign}>
                <div className={styles.stepAlign}>
                    <StepNavigation 
                    labelArray={steps}
                    currentStep={currentStep}>
                    </StepNavigation>
                </div>
                <Conteudo stepContent={currentStep} updateStep={updateStep}/>
            </div>
        </div>
    )
}