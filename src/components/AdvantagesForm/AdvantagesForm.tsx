import React, { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { AdvantagesFields, setAdvantagesPage } from '../../redux/slice';
import { selectAdvantages } from '../../redux/selectors';

import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import {
    Box,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { BtnFilled, BtnOutline } from '../index';
import BasketIcon from '../../assets/basket.svg';
import PlusIcon from '../../assets/plus-icon.svg';
import styles from './AdvantagesForm.module.scss';

const AdvantagesForm: FC = () => {
    const { advantagesInputs, checkboxOne, checkboxTwo, checkboxThree, radio } =
        useSelector(selectAdvantages);
    const AdvantageFields = useSelector(selectAdvantages);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setError,
        clearErrors,
        getValues,
    } = useForm<AdvantagesFields>();

    useEffect(() => {
        dispatch(setAdvantagesPage(AdvantageFields));
        // eslint-disable-next-line
    }, []);

    const onSubmit = (data: AdvantagesFields) => {
        const { checkboxOne, checkboxTwo, checkboxThree } = getValues();
        if (!checkboxOne && !checkboxTwo && !checkboxThree) {
            setError('checkboxOne', {
                type: 'manual',
                message: 'Выберите хотя бы один чекбокс',
            });
            setError('checkboxTwo', {
                type: 'manual',
                message: 'Выберите хотя бы один чекбокс',
            });
            setError('checkboxThree', {
                type: 'manual',
                message: 'Выберите хотя бы один чекбокс',
            });
            return;
        }
        clearErrors(['checkboxOne', 'checkboxTwo', 'checkboxThree']);
        dispatch(setAdvantagesPage(data));
        navigate('/info');
    };

    const handleAddAdvantage = () => {
        dispatch(
            setAdvantagesPage({
                ...AdvantageFields,
                advantagesInputs: [...advantagesInputs, ''],
            })
        );
    };

    const handleRemoveAdvantage = (index: number) => {
        const newAdvantages = [...advantagesInputs];
        newAdvantages.splice(index, 1);
        dispatch(
            setAdvantagesPage({
                ...AdvantageFields,
                advantagesInputs: newAdvantages,
            })
        );
    };

    const handleChangeAdvantage = (index: number, value: string) => {
        const newAdvantages = [...advantagesInputs];
        newAdvantages[index] = value;
        dispatch(
            setAdvantagesPage({
                ...AdvantageFields,
                advantagesInputs: newAdvantages,
            })
        );
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setAdvantagesPage({ ...AdvantageFields, radio: event.target.value })
        );
    };
    const handleCheckboxChange = (name: string, checked: boolean) => {
        dispatch(
            setAdvantagesPage({
                ...AdvantageFields,
                [name]: checked,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label>Преимущества</label>
            {advantagesInputs.map((advantage, index) => (
                <div key={index} className={styles.advantageItem}>
                    <input
                        {...register(`advantagesInputs.${index}`, {
                            required: 'Это поле обязательно',
                            minLength: {
                                value: 2,
                                message: 'Минимум 2 символа',
                            },
                        })}
                        placeholder='Ваши преимущества'
                        id={`field-advatages-${index + 1}`}
                        type='text'
                        value={advantage}
                        onChange={(e) =>
                            handleChangeAdvantage(index, e.target.value)
                        }
                    />
                    <img
                        src={BasketIcon}
                        onClick={() => handleRemoveAdvantage(index)}
                        alt='Корзина'
                    />
                    <div className={styles.error}>
                        {errors?.advantagesInputs?.[index] &&
                            errors?.advantagesInputs?.[index]?.message}
                    </div>
                </div>
            ))}
            <img
                src={PlusIcon}
                alt='Добавить'
                onClick={handleAddAdvantage}
                className={styles.plusIcon}
            />

            <div className={styles.checkboxGroup}>
                <label>Checkbox группа</label>
                <Box>
                    <Controller
                        control={control}
                        name={'checkboxOne'}
                        defaultValue={checkboxOne}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                className={styles.checkboxLabel}
                                label='1'
                                id='field-checkbox-1'
                                control={
                                    <Checkbox
                                        checked={value}
                                        onChange={(e) => {
                                            onChange(e.target.checked);
                                            handleCheckboxChange(
                                                'checkboxOne',
                                                e.target.checked
                                            );
                                        }}
                                    />
                                }
                            />
                        )}
                    />
                </Box>
                <Box>
                    <Controller
                        control={control}
                        name={'checkboxTwo'}
                        defaultValue={checkboxTwo}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                className={styles.checkboxLabel}
                                label='2'
                                id='field-checkbox-2'
                                control={
                                    <Checkbox
                                        checked={value}
                                        onChange={(e) => {
                                            onChange(e.target.checked);
                                            handleCheckboxChange(
                                                'checkboxTwo',
                                                e.target.checked
                                            );
                                        }}
                                    />
                                }
                            />
                        )}
                    />
                </Box>
                <Box>
                    <Controller
                        control={control}
                        name={'checkboxThree'}
                        defaultValue={checkboxThree}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                className={styles.checkboxLabel}
                                label='3'
                                id='field-checkbox-3'
                                control={
                                    <Checkbox
                                        checked={value}
                                        onChange={(e) => {
                                            onChange(e.target.checked);
                                            handleCheckboxChange(
                                                'checkboxThree',
                                                e.target.checked
                                            );
                                        }}
                                    />
                                }
                            />
                        )}
                    />
                </Box>
                <div className={styles.error}>
                    {(errors?.checkboxOne ||
                        errors?.checkboxTwo ||
                        errors?.checkboxThree) &&
                        'Выберите хотя бы один чекбокс'}
                </div>
            </div>

            <RadioGroup
                className={styles.radioGroup}
                defaultValue='1'
                value={radio}
                onChange={handleRadioChange}
            >
                <label> Radio группа</label>
                <FormControlLabel
                    id='field-radio-group-option-1'
                    value='1'
                    control={
                        <Radio
                            {...register('radio', {
                                required: 'Выберите радио кнопку',
                            })}
                        />
                    }
                    label='1'
                />
                <FormControlLabel
                    id='field-radio-group-option-2'
                    value='2'
                    control={
                        <Radio
                            {...register('radio', {
                                required: 'Выберите радио кнопку',
                            })}
                        />
                    }
                    label='2'
                />
                <FormControlLabel
                    id='field-radio-group-option-3'
                    value='3'
                    control={
                        <Radio
                            {...register('radio', {
                                required: 'Выберите радио кнопку',
                            })}
                        />
                    }
                    label='3'
                />
                <div className={styles.error}>
                    {errors?.radio && errors?.radio.message}
                </div>
            </RadioGroup>

            <div className={styles.form__bottom}>
                <BtnOutline path='/about' id='button-back'>
                    Назад
                </BtnOutline>
                <BtnFilled id='button-next' type='submit' value='Далее' />
            </div>
        </form>
    );
};

export default AdvantagesForm;
