import {Movies} from '../../types/movie';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  films: Movies;
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          filmName={film.name}
          filmImage={film.previewImage}
        />
      ))}
    </div>
  );
}

export default FilmsList;
