import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Movie } from '../../types/movie';
import VideoPlayer from '../video-player/video-player';

const TIMEOUT = 1000;

type FilmCardProps = {
  film: Movie;
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  let timer: ReturnType<typeof setTimeout>;

  const handleFilmActive = () => {
    timer = setTimeout(() => {
      setIsActive(true);
    }, TIMEOUT);
  };

  const handleFilmUnactive = () => {
    clearTimeout(timer);
    setIsActive(false);
  };

  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={handleFilmActive}
      onMouseLeave={handleFilmUnactive}
    >
      <div className="small-film-card__image">
        <VideoPlayer film={film} isPlaying={isActive} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Film}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
