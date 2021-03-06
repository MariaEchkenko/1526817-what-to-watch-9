import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logoutAction } from '../../store/user-process/user-process';
import { useAppDispatch} from '../../hooks';
import { getAvatarUrl } from '../../services/avatar';


function UserNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const avatar = getAvatarUrl();

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MyList}>
            <img src={avatar} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <Link
          className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to="/"
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
}

export default UserNav;
