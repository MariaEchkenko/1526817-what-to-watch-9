import dayjs from 'dayjs';
import { Comment } from '../../types/comment';

type ReviewProps = {
  review: Comment;
}

function Review({review}: ReviewProps): JSX.Element {
  const attributeDate = dayjs(review.date).format('YYYY-MM-DD');
  const reviewDate = dayjs(review.date).format('MMMM DD, YYYY');

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={attributeDate}>{reviewDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default Review;
