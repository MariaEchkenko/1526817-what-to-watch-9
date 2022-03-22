import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import { changeGenre } from '../../store/action';
import { Movies } from '../../types/movie';
import classNames from 'classnames';

type GenreListProps = {
  films: Movies;
}

function GenreList({films}: GenreListProps): JSX.Element {
  const genre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  const genres = films.map((film) => film.genre);
  genres.unshift('All genres');
  const uniqueGenres = [...new Set(genres)];

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((uniqueGenre) => (
        <li
          key={uniqueGenre}
          className={classNames('catalog__genres-item', {
            'catalog__genres-item--active': uniqueGenre === genre,
          })}
          onClick={() => dispatch(changeGenre(uniqueGenre))}
        >
          <Link to="#" className="catalog__genres-link">{uniqueGenre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
