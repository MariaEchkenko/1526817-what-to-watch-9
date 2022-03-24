import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/';
import { changeGenre, resetFilmCount } from '../../store/action';
import classNames from 'classnames';


type GenreListProps = {
  activeGenre: string;
  genres: string[];
}

function GenreList({activeGenre, genres}: GenreListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={classNames('catalog__genres-item', {
            'catalog__genres-item--active': genre === activeGenre,
          })}
          onClick={() => {
            dispatch(resetFilmCount());
            dispatch(changeGenre(genre));
          }}
        >
          <Link to="#" className="catalog__genres-link">{genre}</Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
