import React from 'react';

import { useAppDispatch } from '../../redux/store';
import { resetAllFields } from '../../redux/slice';

import { BtnHome } from '../index';

import SuccesIcon from '../../assets/succes.svg';
import ErrorIcon from '../../assets/error.svg';
import CloseIcon from '../../assets/close.svg';
import styles from './Modal.module.scss';

type ModalProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    result: boolean;
};

const Modal: React.FC<ModalProps> = ({ open, setOpen, result }) => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch(resetAllFields());
    };
    return (
        <div
            className={`${styles.overlay} ${styles.animated} ${
                open ? `${styles.show}` : ''
            }`}
        >
            <div className={styles.wrap}>
                <div className={styles.modal}>
                    <div
                        className={
                            result === true
                                ? styles.successHeader
                                : styles.header
                        }
                    >
                        <h3 className={styles.title}>
                            {result === true
                                ? 'Форма успешно отправлена'
                                : 'Ошибка'}
                        </h3>
                        {result === false && (
                            <img
                                src={CloseIcon}
                                style={{ cursor: 'pointer' }}
                                width={20}
                                height={20}
                                alt='close'
                                onClick={() => setOpen(false)}
                            />
                        )}
                    </div>
                    {result === true ? (
                        <img
                            className={styles.icon}
                            src={SuccesIcon}
                            width={80}
                            height={80}
                            alt='Succes'
                        />
                    ) : (
                        <img
                            className={styles.icon}
                            src={ErrorIcon}
                            width={80}
                            height={80}
                            alt='Error'
                        />
                    )}
                    <div className={styles.bottom}>
                        {result === true ? (
                            <BtnHome
                                id='button-to-main'
                                path='/'
                                onClick={handleClose}
                            >
                                На главную
                            </BtnHome>
                        ) : (
                            <button
                                id='button-close'
                                className={styles.btnClose}
                            >
                                Закрыть
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
