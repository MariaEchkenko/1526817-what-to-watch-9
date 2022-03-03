import Logo from '../../components/logo/logo';
import UserNav from '../../components/user-nav/user-nav';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import {Movies} from '../../types/movie';

type MyListProps = {
  films: Movies;
}

function MyList({films}: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserNav />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={films}/>
      </section>

      <Footer />

    </div>
  );
}

export default MyList;
