import { useAppDispatch } from '../../hooks/';
import { incrementFilmCount } from '../../store/action';

function ButtonShowMore(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={() => dispatch(incrementFilmCount())}
      >
        Show more
      </button>
    </div>
  );
}

export default ButtonShowMore;
