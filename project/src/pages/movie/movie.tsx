import { useParams, Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Movies } from '../../types/movie';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Tabs from '../../components/tabs/tabs';

type MovieProps = {
  films: Movies;
}

function Movie({films}: MovieProps): JSX.Element {
  const { id } = useParams();
  const movie = films.find((film) => film.id === Number(id));

  if (!movie) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
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
              <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={movie}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={films.slice(0, 4)}/>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Movie;
