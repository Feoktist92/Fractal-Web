import React from 'react';
import { AboutForm, Steps } from '../../components';
import styles from './About.module.scss';

const About = () => {
    return (
        <div className={styles.container}>
            <Steps activeStep={0} />
            <AboutForm />
        </div>
    );
};

export default About;
