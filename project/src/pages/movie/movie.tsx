import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { AppRoute } from '../../const';
import { fetchMovieAction, fetchSimilarMoviesAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Tabs from '../../components/tabs/tabs';
import Loader from '../../components/loader/loader';
import { SIMILAR_FILMS_COUNT } from '../../const';

function Movie(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchMovieAction(Number(id)));
    dispatch(fetchSimilarMoviesAction(Number(id)));
  }, [id]);

  const film = useAppSelector((state) => state.film);
  const similarFilms = useAppSelector((state) => state.similarFilms);
  const isDataMovieLoaded = useAppSelector((state) => state.isDataMovieLoaded);
  const isDataSimilarLoaded = useAppSelector((state) => state.isDataSimilarLoaded);

  if (!film) {
    return <Navigate to={AppRoute.Main} />;
  }

  if (!isDataMovieLoaded || !isDataSimilarLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`${AppRoute.Player}/${id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`${AppRoute.Film}/${id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={film}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilms.slice(0, SIMILAR_FILMS_COUNT)}/>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Movie;
