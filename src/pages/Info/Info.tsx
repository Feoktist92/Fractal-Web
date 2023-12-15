import React from 'react';
import { Steps, InfoForm } from '../../components';
import styles from './Info.module.scss';

const Info = () => {
    return (
        <div className={styles.container}>
            <Steps activeStep={2} />
            <InfoForm />
        </div>
    );
};

export default Info;
