import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useAppSelector } from '../../hooks/';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import Error from '../../components/error/error';
import { selectFilms } from '../../store/films-data/selectors';

dayjs.extend(duration);

function Player(): JSX.Element {
  const films = useAppSelector(selectFilms);
  const { id } = useParams();
  const film = films.find((movie) => movie.id === Number(id));

  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleExit = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      navigate(-1);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const formatRunTime = () => {
    if (videoRef.current) {
      const runTime = videoRef.current.duration - currentTime;
      const format = dayjs.duration(runTime).asMinutes() > 60
        ? '-HH:mm:ss'
        : '-mm:ss';
      return dayjs.duration(runTime, 'seconds').format(format);
    }
  };

  const handleLoaded = () => {
    if (videoRef.current) {
      setIsLoading(false);
    }
  };

  if (!film) {
    return <Error />;
  }

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={handleExit}
      >
        Exit
      </button>

      {isLoading
        ? <Loader />
        :
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"></progress>
              <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{formatRunTime()}</div>
          </div>

          <div className="player__controls-row">
            <button
              type="button"
              className="player__play"
              onClick={handleFilmActive}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                {isActive ? <use xlinkHref="#pause"></use> : <use xlinkHref="#play-s"></use>}
              </svg>
              <span>{isActive ? 'Pause' : 'Play'}</span>
            </button>
            <div className="player__name">{film.name}</div>

            <button
              type="button"
              className="player__full-screen"
              onClick={handleFullScreen}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>}
    </div>
  );
}

export default Player;
