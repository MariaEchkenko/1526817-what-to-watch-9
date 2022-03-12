import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Movie } from '../../types/movie';
import VideoPlayer from '../video-player/video-player';

const TIMEOUT = 1000;

type FilmCardProps = {
  film: Movie;
}

function FilmCard({film}: FilmCardProps): JSX.Element {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFilmActive = () => {
    timerRef.current = setTimeout(() => {
      setIsActive(true);
    }, TIMEOUT);
  };

  const handleFilmInactive = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setIsActive(false);
    }
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleFilmActive}
      onMouseLeave={handleFilmInactive}
      onClick={() => navigate(`${AppRoute.Film}/${film.id}`)}
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
