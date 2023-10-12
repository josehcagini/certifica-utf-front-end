import styles from './page.module.css'
import React, { useState } from 'react';

export default function Step( props ){
    return(
        <div className={ `${styles.stepBlock } ${ props.selected ? styles.selected : props.completed ? styles.completed : "" }` }>
            <div className={ styles.circleWrapper} onClick={ () => props.updateStep( props.index + 1 )}>
                <div className={styles.informations}>
                    <div className={styles.circle}>
                        { props.completed ? <img src='/images/right.png' width={15} height={15} style={{}}/> : props.index + 1 }
                    </div>
                    <span>{props.label}</span>
                </div>
            </div>
        </div>
    );
}