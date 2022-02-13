import {LogoMod} from '../../types/logo';

type LogoProps = LogoMod;

function Logo({classMod='logo__link', pageLink='/'}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <a className={classMod} href={pageLink}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
}

export default Logo;
