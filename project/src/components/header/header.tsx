import Logo from '../logo/logo';
import UserNav from '../user-nav/user-nav';

function Header(): JSX.Element {
  return (
    <header className="page-header film-card__head">
      <Logo />
      <UserNav />
    </header>
  );
}

export default Header;
