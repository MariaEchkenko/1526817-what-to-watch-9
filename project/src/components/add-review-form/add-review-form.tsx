import {FormEvent, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { sendUserReviewAction } from '../../store/api-actions';
import RatingItem from '../rating-item/rating-item';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

function AddReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleInputChange = (item: number) => setRating(item);

  const isDisabled = (review.length < MIN_REVIEW_LENGTH || review.length > MAX_REVIEW_LENGTH) || rating === 0;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(sendUserReviewAction({
      id: Number(id),
      rating: rating,
      comment: review,
    }));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {Array.from({ length: 10 }, (_, i) => (
            <RatingItem
              key={i + 1}
              item={i + 1}
              onRatingChange={handleInputChange}
            />
          )).reverse()}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={review}
          onChange={(evt) => setReview(evt.target.value)}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isDisabled}>
            Post
          </button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewForm;
