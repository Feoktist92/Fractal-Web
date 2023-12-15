import React, { FC } from 'react';

import FolderIcon from '../../assets/folder.svg';
import styles from './UserCard.module.scss';

const UserCard: FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles.logo}>АИ</div>
            <div className={styles.info}>
                <div className={styles.name}>Алексей Иванов</div>
                <ul className={styles.links}>
                    <li>
                        <a
                            href='https://t.me/igor_feoktistov92'
                            target='_blank'
                            className={styles.link}
                            rel='noreferrer'
                        >
                            <img src={FolderIcon} alt='папка' /> Telegram
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://github.com/Feoktist92'
                            className={styles.link}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img src={FolderIcon} alt='папка' /> GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href='https://hh.ru/resume/45c1d7dcff0ca874170039ed1f577a4a4b3347'
                            className={styles.link}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img src={FolderIcon} alt='папка' /> Резюме
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserCard;
