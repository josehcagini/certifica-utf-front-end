'use client';

import StepNavigation from '../../../components/stepNavigation' // TODO Trocar para o valor absuluto no lugar do ../
import styles from './page.module.css'
import { useState } from 'react'

export default function CriarEvento() {

    const steps = ['Dados Evento', 'Criar Certificado', 'Finalizar']
    const [ currentStep, setCurrentStep ] = useState(1);

    function updateStep( step ){
        setCurrentStep( step );
    }

    return (
        <div className={styles.content}>
            <div className={styles.stepAlign}>
                <StepNavigation 
                labelArray={steps}
                currentStep={currentStep}
                updateStep={updateStep}>
                </StepNavigation>
            </div>
        </div>
    )
}