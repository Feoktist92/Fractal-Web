import React, { FC, ReactNode } from 'react';
import styles from './BtnOutline.module.scss';
import { Link } from 'react-router-dom';

interface BtnOutlineProps {
    children: ReactNode;
    id: string;
    path: string;
    onClick?: () => void;
}

const BtnOutline: FC<BtnOutlineProps> = ({ path, children, id, onClick }) => {
    return (
        <Link to={path} id={id} className={styles.btn} onClick={onClick}>
            {children}
        </Link>
    );
};

export default BtnOutline;
