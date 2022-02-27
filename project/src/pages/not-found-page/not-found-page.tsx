import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFoundPage(): JSX.Element {
  return (
    <div className="user-page">
      <Header />

      <section className="user-page__content">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </section>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
