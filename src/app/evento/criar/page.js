'use client';

import StepNavigation from '../../../components/stepNavigation' // TODO Trocar para o valor absuluto no lugar do ../
import styles from './page.module.css'
import React, { useState } from 'react'

export default function Login() {

    const labelArray = ['Dados Evento', 'Criar Certificado', 'Finalizar']
    const [ currentStep, setCurrentStep ] = useState(1);

    function updateStep( step ){
        setCurrentStep( step );
    }

    return (
        <div className={styles.content}>
            <div className={styles.stepAlign}>
                <StepNavigation 
                labelArray={labelArray}
                currentStep={currentStep}
                updateStep={updateStep}>
                </StepNavigation>
            </div>
        </div>
    )
}