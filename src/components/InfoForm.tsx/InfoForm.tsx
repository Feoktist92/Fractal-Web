import React, { FC, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { InfoFields, setInfoPage } from '../../redux/slice';
import { selectAll, selectInfo } from '../../redux/selectors';

import { useForm } from 'react-hook-form';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Modal, BtnFilled, BtnOutline } from '../index';
import styles from './InfoForm.module.scss';

import { submitForm } from '../../utils/sendData';

const InfoForm: FC = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const allFields = useSelector(selectAll);
    const { aboutInfo } = useSelector(selectInfo);
    const [result, setResult] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<InfoFields>();

    useEffect(() => {
        dispatch(setInfoPage({ aboutInfo }));
        // eslint-disable-next-line
    }, []);

    const onSubmit = async (data: InfoFields) => {
        dispatch(setInfoPage(data));

        const result = await submitForm(allFields);
        setResult(result?.success);

        setOpen(true);
    };

    const countCharacters = (text: string) => text.replace(/\s/g, '').length;

    return (
        <>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                autoComplete='off'
            >
                <label>
                    О себе
                    <TextareaAutosize
                        minRows={3}
                        className={styles.textarea}
                        id='field-about'
                        {...register('aboutInfo', {
                            required: 'Это поле обязательно',
                            maxLength: {
                                value: 200,
                                message: 'Максимальная длина 200 символов',
                            },
                        })}
                        placeholder='Расскажите о себе'
                        value={aboutInfo}
                        onChange={(e) => {
                            dispatch(
                                setInfoPage({ aboutInfo: e.target.value })
                            );
                        }}
                    />
                    <div className={styles.errorCount}>
                        <div className={styles.error}>
                            {errors?.aboutInfo && (
                                <>
                                    {errors?.aboutInfo?.message ||
                                        'Это поле обязательно'}
                                </>
                            )}
                        </div>
                        <div className={styles.characterCount}>
                            {countCharacters(aboutInfo)}
                        </div>
                    </div>
                </label>
                <div className={styles.form__bottom}>
                    <BtnOutline path='/advantages' id='button-back'>
                        Назад
                    </BtnOutline>
                    <BtnFilled id='button-next' type='submit' value='Далее' />
                </div>
            </form>
            {open && <Modal open={open} setOpen={setOpen} result={result} />}
        </>
    );
};

export default InfoForm;
