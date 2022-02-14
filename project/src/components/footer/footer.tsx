import {LogoMod} from '../../types/logo';
import Logo from '../logo/logo';

type FooterProps = LogoMod;

function Footer({pageLink}: FooterProps): JSX.Element {
  return (
    <footer className="page-footer">
      <Logo
        classMod='logo__link logo__link--light'
        pageLink={pageLink}
      />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
