import React, { FC } from 'react';
import styles from './BtnFilled.module.scss';

interface BtnFilledProps {
    value: string;
    type: string;
    id?: string;
    onClick?: () => void;
}

const BtnFilled: FC<BtnFilledProps> = ({ value, type, id, onClick }) => {
    return (
        <input
            onClick={onClick}
            type={type}
            id={id}
            className={styles.btn}
            value={value}
        />
    );
};

export default BtnFilled;
