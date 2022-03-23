import { useAppSelector } from '../../hooks/';
import Header from '../../components/header/header';
import Controls from '../../components/controls/controls';
import GenreList from '../../components/genre-list/genre-list';
import FilmsList from '../../components/films-list/films-list';
import ButtonShowMore from '../../components/button-show-more/button-show-more';
import Footer from '../../components/footer/footer';
import { ALL_GENRES } from '../../const';
import { createGenresList } from '../../utils';

type MainProps = {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmYear: number;
}

function Main({promoFilmName, promoFilmGenre, promoFilmYear}: MainProps): JSX.Element {
  const films = useAppSelector((state) => state.allFilms);
  const activeGenre = useAppSelector((state) => state.genre);
  const stepFilms = useAppSelector((state) => state.stepFilms);

  const uniqueGenres = createGenresList(films);

  const selectedFilms = activeGenre === ALL_GENRES
    ? films
    : films.filter((film) => film.genre === activeGenre);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilmName}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilmGenre}</span>
                <span className="film-card__year">{promoFilmYear}</span>
              </p>

              <Controls />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList activeGenre={activeGenre} genres={uniqueGenres} />
          <FilmsList films={selectedFilms.slice(0, stepFilms)}/>
          {selectedFilms.length > stepFilms && <ButtonShowMore />}

        </section>

        <Footer />
      </div>
    </>
  );
}

export default Main;
