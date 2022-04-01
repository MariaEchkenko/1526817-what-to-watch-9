import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/';
import { AppRoute, AuthorizationStatus } from '../../const';


type ControlsProps = {
  id: number;
  isMain: boolean;
}

function Controls({id, isMain}: ControlsProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <div className="film-card__buttons">
      <Link to={`${AppRoute.Player}/${id}`} className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>
      <button className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
      </button>
      {!isMain && authorizationStatus === AuthorizationStatus.Auth &&
        <Link to={`${AppRoute.Film}/${id}/review`} className="btn film-card__button">Add review</Link>}
    </div>
  );
}

export default Controls;
