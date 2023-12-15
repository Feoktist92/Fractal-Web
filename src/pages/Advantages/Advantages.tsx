import React from 'react';
import { AdvantagesForm, Steps } from '../../components';
import styles from './Advantages.module.scss';

const Advantages = () => {
    return (
        <div className={styles.container}>
            <Steps activeStep={1} />
            <AdvantagesForm />
        </div>
    );
};

export default Advantages;
