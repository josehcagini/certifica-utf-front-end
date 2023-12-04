'use client';

import Conteudo from '@/components/criarEvento/conteudo';
import StepNavigation from '@/components/stepNavigation'
import styles from './page.module.css'
import { useState } from 'react'
import { isAdmin } from '@/services/user/userService';
import { getUserRole } from '@/services/session/sessionService';
import { useSession } from 'next-auth/react';
import Loading from './loading';

export default function CriarEvento() {

    const steps = ['Dados Evento', 'Criar Certificado', 'Finalizar']
    const session = useSession();
    const [currentStep, setCurrentStep] = useState(1);

    function updateStep(step) {
        setCurrentStep(step);
    }

    if (session.status === 'loading') {
        return <Loading />
    }   

    return (
        <div className={styles.content}>
            {!isAdmin(getUserRole(session)) && session.data ?
                <h1 style={{ marginTop: '4rem', textAlign: 'center' }}>Você não tem permissão para acessar essa página</h1> :
                <div className={styles.contentAlign}>
                    <div className={styles.stepAlign}>
                        <StepNavigation
                            labelArray={steps}
                            currentStep={currentStep}>
                        </StepNavigation>
                    </div>
                    <Conteudo stepContent={currentStep} updateStep={updateStep} />
                </div>
            }
        </div>
    )
}