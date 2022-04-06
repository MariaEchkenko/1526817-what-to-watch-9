import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../../hooks/';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { selectFilms } from '../../store/films-data/selectors';


function Player(): JSX.Element {
  const films = useAppSelector(selectFilms);
  const { id } = useParams();
  const film = films.find((movie) => movie.id === Number(id));

  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isActive) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isActive]);

  const handleFilmActive = () => {
    setIsActive(!isActive);
  };

  const handleFullScreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleExit = () => {
    videoRef.current?.pause();
    navigate(-1);
  };

  if (!film) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={() => {
          handleExit();
        }}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => {
              handleFilmActive();
            }}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              {isActive ? <use xlinkHref="#pause"></use> : <use xlinkHref="#play-s"></use>}
            </svg>
            <span>{isActive ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => {
              handleFullScreen();
            }}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
