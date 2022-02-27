import {Link} from 'react-router-dom';
import {LogoMod} from '../../types/logo';

type LogoProps = LogoMod;

function Logo({classMod='logo__link'}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link className={classMod} to='/'>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
