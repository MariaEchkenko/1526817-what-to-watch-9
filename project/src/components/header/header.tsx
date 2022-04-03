import Logo from '../logo/logo';
import UserNav from '../user-nav/user-nav';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import SignIn from '../sign-in/sign-in';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);
  return (
    <header className="page-header film-card__head">
      <Logo />
      {authorizationStatus === AuthorizationStatus.Auth
        ? <UserNav />
        : <SignIn />}
    </header>
  );
}

export default Header;
