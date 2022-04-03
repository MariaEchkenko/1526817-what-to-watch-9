import { useAppSelector } from '../../hooks/';
import Logo from '../../components/logo/logo';
import UserNav from '../../components/user-nav/user-nav';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Loader from '../../components/loader/loader';
import { LoadingStatus } from '../../const';
import { selectFavoriteFilms, selectIsFavoriteLoaded } from '../../store/favorite-data/selectors';

function MyList(): JSX.Element {
  const favoriteFilms = useAppSelector(selectFavoriteFilms);
  const isFavoriteLoaded = useAppSelector(selectIsFavoriteLoaded);

  if (isFavoriteLoaded === LoadingStatus.LOADING) {
    return (
      <Loader />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserNav />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList films={favoriteFilms}/>
      </section>

      <Footer />

    </div>
  );
}

export default MyList;
