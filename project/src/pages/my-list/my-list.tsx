import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { fetchFavoriteFilmsAction } from '../../store/favorite-data/favorite-data';
import Logo from '../../components/logo/logo';
import UserNav from '../../components/user-nav/user-nav';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Loader from '../../components/loader/loader';
import Error from '../../components/error/error';
import { LoadingStatus } from '../../const';
import { selectFavoriteFilms, selectIsFavoriteLoaded } from '../../store/favorite-data/selectors';

function MyList(): JSX.Element {
  const favoriteFilms = useAppSelector(selectFavoriteFilms);
  const favoriteStatus = useAppSelector(selectIsFavoriteLoaded);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [dispatch]);

  if (favoriteStatus === LoadingStatus.LOADING) {
    return (
      <Loader />
    );
  }

  if (favoriteStatus === LoadingStatus.FAILED) {
    return (
      <Error />
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
