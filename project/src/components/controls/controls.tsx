import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { sendFavoriteFilmAction } from '../../store/favorite-data/favorite-data';

type ControlsProps = {
  id: number;
  isFavorite: boolean;
  isMain: boolean;
}

function Controls({id, isFavorite, isMain}: ControlsProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleFilmStatus = () => {
    if (isAuth) {
      dispatch(sendFavoriteFilmAction({id, status: Number(!isFavorite)}));
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="film-card__buttons">
      <Link to={`${AppRoute.Player}/${id}`} className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={handleFilmStatus}
      >
        <svg viewBox="0 0 19 20" width="19" height="20">
          {isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
        </svg>
        <span>My list</span>
      </button>
      {!isMain && isAuth &&
        <Link to={`${AppRoute.Film}/${id}/review`} className="btn film-card__button">Add review</Link>}
    </div>
  );
}

export default Controls;
