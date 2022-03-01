import {Link} from 'react-router-dom';
import {LogoMod} from '../../types/logo';
import {AppRoute} from '../../const';

type LogoProps = LogoMod;

function Logo({classMod='logo__link'}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link className={classMod} to={AppRoute.Main}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
