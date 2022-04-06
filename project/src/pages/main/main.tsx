import { useAppSelector } from '../../hooks/';
import Header from '../../components/header/header';
import Controls from '../../components/controls/controls';
import GenreList from '../../components/genre-list/genre-list';
import FilmsList from '../../components/films-list/films-list';
import ButtonShowMore from '../../components/button-show-more/button-show-more';
import Footer from '../../components/footer/footer';
import Loader from '../../components/loader/loader';
import Error from '../../components/error/error';
import { LoadingStatus, ALL_GENRES } from '../../const';
import { createGenresList } from '../../utils';
import { selectFilms,
  selectPromoFilm,
  selectActiveGenre,
  selectRenderedFilms,
  selectFilmsStatus,
  selectPromoStatus } from '../../store/films-data/selectors';

function Main(): JSX.Element {
  const films = useAppSelector(selectFilms);
  const promoFilm = useAppSelector(selectPromoFilm);
  const activeGenre = useAppSelector(selectActiveGenre);
  const renderedFilms = useAppSelector(selectRenderedFilms);
  const filmsStatus = useAppSelector(selectFilmsStatus);
  const promoFilmStatus = useAppSelector(selectPromoStatus);

  const uniqueGenres = createGenresList(films);

  const selectedFilms = activeGenre === ALL_GENRES
    ? films
    : films.filter((film) => film.genre === activeGenre);


  if (!promoFilm || filmsStatus === LoadingStatus.LOADING) {
    return (
      <Loader />
    );
  }

  if (filmsStatus === LoadingStatus.FAILED || promoFilmStatus === LoadingStatus.FAILED) {
    return (
      <Error />
    );
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src= {promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm?.posterImage} alt={promoFilm?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <Controls id={Number(promoFilm?.id)} isFavorite={promoFilm.isFavorite} isMain/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList activeGenre={activeGenre} genres={uniqueGenres} />
          <FilmsList films={selectedFilms.slice(0, renderedFilms)}/>
          {selectedFilms.length > renderedFilms && <ButtonShowMore />}

        </section>

        <Footer />
      </div>
    </>
  );
}

export default Main;
