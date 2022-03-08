import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';


type FilmCardProps = {
  id: number,
  filmName: string;
  filmImage: string;
  onHover: (id: number) => void;
}

function FilmCard({id, filmName, filmImage, onHover}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => onHover(id)}>
      <div className="small-film-card__image">
        <img src={filmImage} alt={filmName} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Film}/${id}`}>{filmName}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
