import {useState} from 'react';
import {Movies} from '../../types/movie';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  films: Movies;
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);

  const handleFilmHover = (id: number): void => setActiveFilm(id);

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          id={film.id}
          filmName={film.name}
          filmImage={film.previewImage}
          onHover={handleFilmHover}
        />
      ))}
      <h1 className="visually-hidden">{activeFilm}</h1> {/*Добавила пока,чтобы не крашилась сборка*/}
    </div>
  );
}

export default FilmsList;
