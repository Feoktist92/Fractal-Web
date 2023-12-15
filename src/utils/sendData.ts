import { SliceState } from '../redux/slice';

export const submitForm = async (data: SliceState) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 0));
        //Отоправка данных
        console.log(data);
        return { success: true, message: 'Форма успешно отправлена' };
    } catch (error) {
        return {
            success: false,
            message: 'Произошла ошибка при отправке формы',
        };
    }
};
