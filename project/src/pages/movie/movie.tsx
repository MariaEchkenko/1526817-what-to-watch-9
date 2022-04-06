import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { fetchMovieAction, fetchSimilarMoviesAction } from '../../store/films-data/films-data';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Tabs from '../../components/tabs/tabs';
import Loader from '../../components/loader/loader';
import Error from '../../components/error/error';
import Controls from '../../components/controls/controls';
import { LoadingStatus, SIMILAR_FILMS_COUNT } from '../../const';
import { selectFilm,
  selectSimilarFilms,
  selectFilmStatus } from '../../store/films-data/selectors';

function Movie(): JSX.Element {
  const film = useAppSelector(selectFilm);
  const similarFilms = useAppSelector(selectSimilarFilms);
  const filmStatus = useAppSelector(selectFilmStatus);

  const dispatch = useAppDispatch();

  const { id } = useParams();
  const selectedFilmId = Number(id);

  useEffect(() => {
    dispatch(fetchMovieAction(selectedFilmId));
    dispatch(fetchSimilarMoviesAction(selectedFilmId));
  }, [dispatch, selectedFilmId]);

  if (!film || filmStatus === LoadingStatus.LOADING) {
    return (
      <Loader />
    );
  }

  if (filmStatus === LoadingStatus.FAILED) {
    return (
      <Error />
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

              <Controls id={selectedFilmId} isFavorite={film.isFavorite} isMain={false} />
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
