import { Comments } from '../../types/comment';
import Review from '../review/review';

type FilmReviewsProps = {
  reviews: Comments;
}

function FilmReviews({reviews}: FilmReviewsProps): JSX.Element {
  const halfIndex = Math.ceil(reviews.length/2);
  const reviewsFirstCol = reviews.slice(0, halfIndex);
  const reviewsSecondCol = reviews.slice(halfIndex, reviews.length);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsFirstCol.map((review) => (
          <Review
            key = {review.user.id}
            review = {review}
          />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviewsSecondCol.map((review) => (
          <Review
            key = {review.user.id}
            review = {review}
          />
        ))}
      </div>
    </div>
  );
}

export default FilmReviews;
