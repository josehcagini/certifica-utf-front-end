import styles from './page.module.css'
import Step from './step'

export default function StepNavigation( props ){
    return(
        <div className={styles.stepWrapper}>
            {props.labelArray.map( ( item, index ) =>
                <Step 
                key={index} 
                index={index} 
                label={item} 
                updateStep={props.updateStep} 
                selected={props.currentStep === index + 1} 
                completed = {props.currentStep > index + 1} >
                </Step>
            )}
        </div>
    );
}