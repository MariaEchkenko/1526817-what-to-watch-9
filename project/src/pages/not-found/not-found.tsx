import styles from './not-found.module.css';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFound(): JSX.Element {
  return (
    <div className="user-page">
      <Header />

      <section className="user-page__content">
        <div className={styles.container}>
          <div className={styles.text}>
            <h1>404. Page not found</h1>
            <Link to={AppRoute.Main} className={styles.link}>Вернуться на главную</Link>
          </div>
          <img className={styles.img} src="img/404.gif" alt="" width="315" height="500"/>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NotFound;
