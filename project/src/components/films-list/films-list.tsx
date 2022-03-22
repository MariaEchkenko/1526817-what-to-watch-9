import { useAppSelector } from '../../hooks/';
import { ALL_GENRES } from '../../const';
import { Movies } from '../../types/movie';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  films: Movies;
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  const genre = useAppSelector((state) => state.genre);

  const selectedFilms = genre === ALL_GENRES
    ? films
    : films.filter((film) => film.genre === genre);
  return (
    <div className="catalog__films-list">
      {selectedFilms.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
        />
      ))}
    </div>
  );
}

export default FilmsList;
