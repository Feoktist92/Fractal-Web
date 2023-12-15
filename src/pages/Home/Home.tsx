import React from 'react';
import { Divider } from '@mui/material';
import { UserCard, HomeForm } from '../../components';
import styles from './Home.module.scss';

const Home = () => {
    return (
        <div className={styles.home}>
            <UserCard />
            <Divider />
            <HomeForm />
        </div>
    );
};

export default Home;
