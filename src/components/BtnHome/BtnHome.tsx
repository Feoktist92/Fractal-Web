import React, { FC, ReactNode } from 'react';
import styles from './BtnHome.module.scss';
import { Link } from 'react-router-dom';

interface BtnHomeProps {
    children: ReactNode;
    id: string;
    path: string;
    onClick?: () => void;
}

const BtnHome: FC<BtnHomeProps> = ({ path, children, id, onClick }) => {
    return (
        <Link to={path} id={id} className={styles.btn} onClick={onClick}>
            {children}
        </Link>
    );
};

export default BtnHome;
