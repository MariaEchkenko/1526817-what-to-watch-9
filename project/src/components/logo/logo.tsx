import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/';
import { changeGenre, resetFilmCount } from '../../store/action';
import { LogoMod } from '../../types/logo';
import { ALL_GENRES, AppRoute } from '../../const';

type LogoProps = LogoMod;

function Logo({classMod='logo__link'}: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="logo">
      <Link
        className={classMod}
        to={AppRoute.Main}
        onClick={() => {
          dispatch(resetFilmCount());
          dispatch(changeGenre(ALL_GENRES));
        }}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
