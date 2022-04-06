import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { fetchReviewsAction } from '../../store/review-data/review-data';
import { Movie } from '../../types/movie';
import Review from '../review/review';
import Loader from '../../components/loader/loader';
import { LoadingStatus } from '../../const';
import { selectReviews, selectReviewsStatus } from '../../store/review-data/selectors';

type FilmReviewsProps = {
  film: Movie;
}

function FilmReviews({film}: FilmReviewsProps): JSX.Element {
  const reviews = useAppSelector(selectReviews);
  const reviewsStatus = useAppSelector(selectReviewsStatus);

  const dispatch = useAppDispatch();

  const id = Number(film.id);

  useEffect(() => {
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);

  const halfIndex = Math.ceil(reviews.length / 2);
  const reviewsFirstCol = reviews.slice(0, halfIndex);
  const reviewsSecondCol = reviews.slice(halfIndex, reviews.length);

  if (reviewsStatus === LoadingStatus.LOADING) {
    return (
      <Loader />
    );
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsFirstCol.map((review) => (
          <Review
            key={review.id}
            review={review}
          />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviewsSecondCol.map((review) => (
          <Review
            key={review.id}
            review={review}
          />
        ))}
      </div>
    </div>
  );
}

export default FilmReviews;
