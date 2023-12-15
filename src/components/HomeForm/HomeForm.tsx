import React, { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { HomeFields, setHomePage } from '../../redux/slice';
import { selectHome } from '../../redux/selectors';

import { useNavigate } from 'react-router-dom';

import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';

import { BtnFilled } from '../index';
import styles from './HomeForm.module.scss';

const HomeForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { email, phone } = useSelector(selectHome);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<HomeFields>();

    useEffect(() => {
        dispatch(setHomePage({ email, phone }));
        // eslint-disable-next-line
    }, []);

    const onSubmit = (data: HomeFields) => {
        dispatch(setHomePage(data));
        navigate('/about');
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete='off'
        >
            <label>
                Номер телефона
                <InputMask
                    type='text'
                    mask='+7 (999) 999-99-99'
                    maskChar='_'
                    {...register('phone', {
                        required: 'Поле обязательно',
                        pattern: {
                            value: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
                            message: 'Неверный формат',
                        },
                    })}
                    placeholder='+7 999 999-99-99'
                    value={phone}
                    onChange={(e) =>
                        dispatch(
                            setHomePage({
                                phone: e.target.value.replace(/[+()\s_-]/g, ''),
                                email,
                            })
                        )
                    }
                />
                <div className={styles.error}>
                    {errors?.phone && (
                        <>{errors?.phone?.message || 'Это поле обязательно'}</>
                    )}
                </div>
            </label>
            <label>
                Email
                <input
                    type='email'
                    {...register('email', {
                        required: 'Поле обязательно',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Неверный формат',
                        },
                    })}
                    placeholder='webstudio.fractal@example.com'
                    value={email}
                    onChange={(e) =>
                        dispatch(setHomePage({ email: e.target.value, phone }))
                    }
                />
                <div className={styles.error}>
                    {errors?.email && (
                        <>{errors?.email?.message || 'Это поле обязательно'}</>
                    )}
                </div>
            </label>
            <BtnFilled id='button-start' type='submit' value='Начать' />
        </form>
    );
};

export default HomeForm;
