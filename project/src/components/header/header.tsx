import {LogoMod} from '../../types/logo';
import Logo from '../logo/logo';
import UserNav from '../user-nav/user-nav';

type HeaderProps = LogoMod;

function Header({pageLink}: HeaderProps): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <Logo pageLink={pageLink}/>
      <UserNav />
    </header>
  );
}

export default Header;
