import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <Link
            to={'/'}
            style={{ color: 'white', textDecoration: 'none' }}
            className='text text_type_main-default ml-2 mr-10'
          >
            Конструктор
          </Link>
        </>
        <>
          <ListIcon type={'primary'} />
          <Link
            to={'/feed'}
            style={{ color: 'white', textDecoration: 'none' }}
            className='text text_type_main-default ml-2'
          >
            Лента заказов
          </Link>
        </>
      </div>
      <Link to={'/'}>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
      </Link>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <Link
          to={'/profile'}
          style={{ color: 'white', textDecoration: 'none' }}
          className='text text_type_main-default ml-2'
        >
          {userName || 'Личный кабинет'}
        </Link>
      </div>
    </nav>
  </header>
);
