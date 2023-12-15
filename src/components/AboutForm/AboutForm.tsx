import React, { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { AboutFields, Sex, setAboutPage } from '../../redux/slice';
import { selectAbout } from '../../redux/selectors';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormControl, MenuItem, Select } from '@mui/material';
import { BtnFilled, BtnOutline } from '../index';
import styles from './AboutForm.module.scss';

const AboutForm: FC = () => {
    const { nickname, surname, name, gender } = useSelector(selectAbout);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<AboutFields>();

    useEffect(() => {
        dispatch(setAboutPage({ nickname, name, surname, gender }));
        // eslint-disable-next-line
    }, []);

    const onSubmit = (data: AboutFields) => {
        dispatch(setAboutPage(data));
        navigate('/advantages');
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete='off'
        >
            <label>
                Никнейм
                <input
                    type='text'
                    id='field-nickname'
                    {...register('nickname', {
                        required: 'Это поле обязательно',
                        maxLength: {
                            value: 30,
                            message: 'Максимальная длина 30 символов',
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message:
                                'Могут быть только латинские буквы и цифры',
                        },
                    })}
                    placeholder='Ваш никнейм'
                    value={nickname}
                    onChange={(e) => {
                        dispatch(
                            setAboutPage({
                                nickname: e.target.value,
                                name,
                                surname,
                                gender,
                            })
                        );
                    }}
                />
                <div className={styles.error}>
                    {errors?.nickname && (
                        <>
                            {errors?.nickname?.message ||
                                'Это поле обязательно'}
                        </>
                    )}
                </div>
            </label>
            <label>
                Имя
                <input
                    type='text'
                    id='field-name'
                    {...register('name', {
                        required: true,
                        maxLength: {
                            value: 50,
                            message: 'Максимальная длина 50 символов',
                        },
                        pattern: {
                            value: /^[a-zA-Zа-яА-Я]+$/,
                            message: 'Могут быть только буквы',
                        },
                    })}
                    placeholder='Ваше имя'
                    value={name}
                    onChange={(e) => {
                        dispatch(
                            setAboutPage({
                                nickname,
                                name: e.target.value,
                                surname,
                                gender,
                            })
                        );
                    }}
                />
                <div className={styles.error}>
                    {errors?.name && (
                        <>{errors?.name?.message || 'Это поле обязательно'}</>
                    )}
                </div>
            </label>
            <label>
                Фамилия
                <input
                    type='text'
                    id='field-surname'
                    {...register('surname', {
                        required: true,
                        maxLength: {
                            value: 50,
                            message: 'Максимальная длина 50 символов',
                        },
                        pattern: {
                            value: /^[a-zA-Zа-яА-Я]+$/,
                            message: 'Могут быть только буквы',
                        },
                    })}
                    placeholder='Ваша фамилия'
                    value={surname}
                    onChange={(e) => {
                        dispatch(
                            setAboutPage({
                                nickname,
                                name,
                                surname: e.target.value,
                                gender,
                            })
                        );
                    }}
                />
                <div className={styles.error}>
                    {errors?.surname && (
                        <>
                            {errors?.surname?.message || 'Это поле обязательно'}
                        </>
                    )}
                </div>
            </label>
            <FormControl className={styles.select__wrapper}>
                <label className={styles.select__label}>Пол</label>
                <Select
                    className={styles.select}
                    {...register('gender', {
                        required: true,
                        validate: (value) => {
                            if (value === Sex.DEFAULT) return 'Выберите пол';
                        },
                    })}
                    id='field-sex'
                    value={gender}
                    onChange={(e) => {
                        dispatch(
                            setAboutPage({
                                nickname,
                                name,
                                surname,
                                gender: e.target.value as Sex,
                            })
                        );
                    }}
                >
                    <MenuItem
                        id='field-sex-option-default'
                        value={Sex.DEFAULT}
                        disabled
                    >
                        {Sex.DEFAULT}
                    </MenuItem>
                    <MenuItem id='field-sex-option-man' value={Sex.MALE}>
                        {Sex.MALE}
                    </MenuItem>
                    <MenuItem id='field-sex-option-woman' value={Sex.FEMALE}>
                        {Sex.FEMALE}
                    </MenuItem>
                </Select>
                <div className={styles.error}>
                    {gender === Sex.DEFAULT && errors?.gender?.message}
                </div>
            </FormControl>
            <div className={styles.form__bottom}>
                <BtnOutline path='/' id='button-back'>
                    Назад
                </BtnOutline>
                <BtnFilled id='button-next' type='submit' value='Отправить' />
            </div>
        </form>
    );
};

export default AboutForm;
